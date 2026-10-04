// 构建期 XIVAPI v2 查询（图标烘焙）：带磁盘缓存、并发限制、超时与失败降级。
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import XIVAPI from '@thewakingsands/xivapi-v2'
import pLimit from 'p-limit'

const CACHE_DIR = path.resolve(process.cwd(), '.cache/xivapi-v2')
const ASSET_API = 'https://xivapi-v2.xivcdn.com/api/asset'
const limit = pLimit(8)
const memory = new Map<string, unknown>()
const xivapi = new XIVAPI({ language: 'chs' })

let consecutiveFailures = 0
let circuitOpen = false
const FAILURE_THRESHOLD = 12
const REQUEST_TIMEOUT = 8_000

interface Icon {
  id: number
  path: string
  path_hr1?: string
}

function formatIcon(icon: Icon | string): string {
  const path = typeof icon === 'string' ? icon : icon.path_hr1 || icon.path
  return `${ASSET_API}?${new URLSearchParams({ path, format: 'png' })}`
}

interface RowReference {
  value: number
}

interface ActionFields {
  Name: string
  Icon: Icon
  ClassJob?: RowReference
  ClassJobLevel?: number
  IsPlayerAction?: boolean
}

interface StatusFields {
  Name: string
  Icon: Icon
  Description: string
}

interface ItemFields {
  Name: string
  Icon: Icon
}

function cacheKey(key: string): string {
  return createHash('sha1').update(key).digest('hex')
}

function readCache<T>(key: string): T | undefined {
  if (memory.has(key)) return memory.get(key) as T
  const file = path.join(CACHE_DIR, `${cacheKey(key)}.json`)
  if (existsSync(file)) {
    try {
      const value = JSON.parse(readFileSync(file, 'utf8')) as T
      memory.set(key, value)
      return value
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

async function withTimeout<T>(request: Promise<T>): Promise<T> {
  let timer: NodeJS.Timeout | undefined
  try {
    return await Promise.race([
      request,
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error('XIVAPI request timed out')),
          REQUEST_TIMEOUT
        )
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

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
      value = await withTimeout(run())
      consecutiveFailures = 0
    } catch {
      if (++consecutiveFailures >= FAILURE_THRESHOLD) {
        circuitOpen = true
        console.warn(
          '[xivapi] 连续查询失败，已熔断，后续图标降级为占位（离线或 API 不可用）'
        )
      }
    }
    if (value !== null) writeCache(key, value)
    return value
  })
}

function iconWithOffset(icon: Icon, offset: number): string {
  if (!offset) return formatIcon(icon)
  const id = icon.id + offset
  const idString = String(id).padStart(6, '0')
  const group = `${idString.slice(0, 3)}000`
  return formatIcon(`ui/icon/${group}/${idString}_hr1.tex`)
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
  const key = `action-v3-png:${name}:${id ?? ''}:${jobId ?? ''}`
  return cached(key, async () => {
    if (name === '冲刺') {
      return {
        id: id ?? 3,
        iconUrl: formatIcon('ui/icon/000000/000104_hr1.tex'),
      }
    }
    if (id !== undefined) {
      const row = await xivapi.data
        .sheets()
        .get<ActionFields>('Action', String(id), {
          fields: ['Name', 'Icon', 'ClassJob'],
        })
      return row.fields.Icon
        ? { id: row.row_id, iconUrl: formatIcon(row.fields.Icon) }
        : null
    }
    const response = await xivapi.search<ActionFields>({
      sheets: 'Action',
      fields: ['Name', 'Icon', 'ClassJob', 'ClassJobLevel', 'IsPlayerAction'],
      query: `+Name=${JSON.stringify(name)} +IsPvP=false`,
      limit: 100,
    })
    // 同名技能常有 NPC 版本或旧版行：优先本职业、再优先玩家技能，
    // 都不满足时仍取任意带图标的行（如优雷卡文理技能等特殊技能）
    const rank = ({ fields }: { fields: ActionFields }) =>
      (jobId && fields.ClassJob?.value === jobId ? 2 : 0) +
      ((fields.ClassJobLevel ?? 0) > 0 || fields.IsPlayerAction ? 1 : 0)
    const found = response.results
      .filter((row) => row.fields.Name === name && row.fields.Icon?.id > 0)
      .reduce<(typeof response.results)[number] | undefined>(
        (best, row) => (!best || rank(row) > rank(best) ? row : best),
        undefined
      )
    return found
      ? { id: found.row_id, iconUrl: formatIcon(found.fields.Icon) }
      : null
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
  const key = `status-v2-png:${id}:${stack}`
  return cached(key, async () => {
    const row = await xivapi.data
      .sheets()
      .get<StatusFields>('Status', String(id), {
        fields: ['Name', 'Icon', 'Description'],
      })
    const fields = row.fields
    if (!fields.Icon) return null
    return {
      iconUrl: iconWithOffset(fields.Icon, stack),
      description: fields.Description || '',
      name: fields.Name || '',
    }
  })
}

export interface ItemResult {
  iconUrl: string
}

export function searchItem(name: string): Promise<ItemResult | null> {
  const key = `item-v2-png:${name}`
  return cached(key, async () => {
    const response = await xivapi.search<ItemFields>({
      sheets: 'Item',
      fields: ['Name', 'Icon'],
      query: `Name=${JSON.stringify(name)}`,
      limit: 100,
    })
    const found = response.results.find(
      (row) => row.fields.Name === name && row.fields.Icon?.id > 0
    )
    return found ? { iconUrl: formatIcon(found.fields.Icon) } : null
  })
}
