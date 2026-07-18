// 构建期 cafemaker 查询（图标烘焙）：带磁盘缓存、并发限制、超时与失败降级。
// 移植自 theme/utils/cafeMaker.js 的查询逻辑。网络不可用时返回 null（组件降级为占位）。
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import pLimit from 'p-limit'

const CACHE_DIR = path.resolve(process.cwd(), '.cache/cafemaker')
const API = 'https://cafemaker.wakingsands.com'
const limit = pLimit(8)
const memory = new Map<string, unknown>()

// 熔断：连续失败达到阈值后停止后续网络请求（避免离线/宕机时构建卡顿），全部降级
let consecutiveFailures = 0
let circuitOpen = false
const FAILURE_THRESHOLD = 12

function cacheKey(key: string): string {
  return createHash('sha1').update(key).digest('hex')
}

function readCache<T>(key: string): T | undefined {
  if (memory.has(key)) return memory.get(key) as T
  const file = path.join(CACHE_DIR, `${cacheKey(key)}.json`)
  if (existsSync(file)) {
    try {
      const v = JSON.parse(readFileSync(file, 'utf8')) as T
      memory.set(key, v)
      return v
    } catch {}
  }
  return undefined
}

function writeCache(key: string, value: unknown): void {
  memory.set(key, value)
  try {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true })
    writeFileSync(
      path.join(CACHE_DIR, `${cacheKey(key)}.json`),
      JSON.stringify(value)
    )
  } catch {}
}

async function fetchJson(url: string, init?: RequestInit): Promise<any> {
  const res = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(8000),
  })
  return res.json()
}

/** 带缓存执行；失败返回 null（降级） */
async function cached<T>(
  key: string,
  run: () => Promise<T | null>
): Promise<T | null> {
  const hit = readCache<T | null>(key)
  if (hit !== undefined) return hit
  if (circuitOpen) return null
  return limit(async () => {
    const again = readCache<T | null>(key)
    if (again !== undefined) return again
    if (circuitOpen) return null
    let value: T | null = null
    try {
      value = await run()
      consecutiveFailures = 0
    } catch {
      value = null
      if (++consecutiveFailures >= FAILURE_THRESHOLD) {
        circuitOpen = true
        console.warn(
          '[cafemaker] 连续查询失败，已熔断，后续图标降级为占位（离线或 API 不可用）'
        )
      }
    }
    // 仅缓存成功结果；失败不写盘，以便下次（联网）重试
    if (value !== null) writeCache(key, value)
    return value
  })
}

function padIcon(id: number): string {
  const idStr = String(id).padStart(6, '0')
  const group = `${idStr.substring(0, 3)}000`
  return `${API}/i/${group}/${idStr}.png`
}

export interface ActionResult {
  id: number
  iconUrl: string
}

export function searchAction(
  name: string,
  id?: number,
  jobId?: number | null
): Promise<ActionResult | null> {
  const key = `action:${name}:${id ?? ''}:${jobId ?? ''}`
  return cached(key, async () => {
    const term = id
      ? { term: { ID: id } }
      : {
          bool: {
            must: [
              { match_phrase: { Name_chs: name } },
              {
                bool: {
                  should: [
                    { range: { ClassJobLevel: { gt: 0 } } },
                    { term: { IsPlayerAction: 1 } },
                  ],
                },
              },
              { term: { IsPvP: 0 } },
              ...(jobId ? [{ term: { ClassJobTargetID: jobId } }] : []),
            ],
          },
        }
    const json = await fetchJson(`${API}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        indexes: 'action',
        columns: 'ID,Name,Icon,ClassJobTargetID',
        body: { query: { bool: { should: [[term]] } }, from: 0, size: 100 },
      }),
    })
    const results = json.Results || []
    const found = id
      ? results.find((r: any) => r.ID === id)
      : results.find(
          (r: any) =>
            r.Name === name && (jobId ? r.ClassJobTargetID === jobId : true)
        )
    if (name === '冲刺')
      return { id: found?.ID ?? 0, iconUrl: `${API}/i/000000/000104.png` }
    if (!found) return null
    return { id: found.ID, iconUrl: `${API}${found.Icon}` }
  })
}

export interface StatusResult {
  iconUrl: string
  description: string
  name: string
}

export function searchStatus(
  id: number,
  stack = 0
): Promise<StatusResult | null> {
  const key = `status:${id}:${stack}`
  return cached(key, async () => {
    const json = await fetchJson(
      `${API}/Status?ids=${id}&columns=ID,IconID,Name,MaxStacks,CanDispel,Description`
    )
    const r = (json.Results || [])[0]
    if (!r) return null
    return {
      iconUrl: padIcon(r.IconID + stack),
      description: r.Description || '',
      name: r.Name || '',
    }
  })
}

export interface ItemResult {
  iconUrl: string
}

export function searchItem(name: string): Promise<ItemResult | null> {
  const key = `item:${name}`
  return cached(key, async () => {
    const json = await fetchJson(`${API}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        indexes: 'item',
        columns: 'ID,Name,Icon',
        body: {
          query: { bool: { should: [[{ match_phrase: { Name_chs: name } }]] } },
          from: 0,
          size: 100,
        },
      }),
    })
    const found = (json.Results || []).find((r: any) => r.Name === name)
    if (!found || !found.Icon) return null
    return { iconUrl: `${API}${found.Icon}` }
  })
}
