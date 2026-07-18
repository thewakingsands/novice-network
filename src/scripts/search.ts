import MiniSearch from 'minisearch'

// CJK 字符判定（覆盖常用中日韩表意文字、假名、扩展 A）
const CJK_CHAR = /[\u2E80-\u9FFF\uF900-\uFAFF\u3040-\u30FF\u3400-\u4DBF]/

interface Doc {
  url: string
  title: string
  body: string
}
interface Hit {
  url: string
  title: string
  body: string
}

/**
 * CJK bigram + unigram 分词器（索引/查询同构）：
 * - CJK 连续段：拆成全部 bigram 与全部 unigram → 支持长度 ≥1 的任意中文子串匹配；
 * - 非 CJK：按非字母数字切词并转小写。
 */
export function tokenize(text: string): string[] {
  const tokens: string[] = []
  let i = 0
  const n = text.length
  while (i < n) {
    const ch = text[i]
    if (CJK_CHAR.test(ch)) {
      let j = i
      while (j < n && CJK_CHAR.test(text[j])) j++
      const run = text.slice(i, j)
      for (let k = 0; k < run.length; k++) {
        tokens.push(run[k]) // unigram
        if (k + 1 < run.length) tokens.push(run.slice(k, k + 2)) // bigram
      }
      i = j
    } else {
      let j = i
      while (j < n && !CJK_CHAR.test(text[j])) j++
      const seg = text.slice(i, j).toLowerCase()
      for (const w of seg.split(/[^a-z0-9]+/i)) {
        if (w) tokens.push(w)
      }
      i = j
    }
  }
  return tokens
}

let miniPromise: Promise<MiniSearch<Doc>> | null = null

/** 惰性加载索引并在内存中构建 MiniSearch */
export function getSearch(): Promise<MiniSearch<Doc>> {
  if (!miniPromise) {
    miniPromise = (async () => {
      const res = await fetch('/search-index.json')
      const docs: Doc[] = await res.json()
      const mini = new MiniSearch<Doc>({
        idField: 'url',
        fields: ['title', 'body'],
        storeFields: ['url', 'title', 'body'],
        tokenize,
        processTerm: (t) => t, // tokenize 已处理大小写
        searchOptions: { combineWith: 'AND', prefix: false, fuzzy: false },
      })
      mini.addAll(docs.map((d) => ({ ...d, id: d.url })) as unknown as Doc[])
      return mini
    })()
  }
  return miniPromise
}

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"]/g,
    (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot' }[c]};`
  )

/** 生成高亮：把查询子串（及其空格分隔部分）在文本中包裹 <em> */
function highlight(text: string, terms: string[]): string {
  const escaped = escapeHtml(text)
  let out = escaped
  for (const term of terms) {
    if (!term) continue
    const et = escapeHtml(term)
    const re = new RegExp(et.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    out = out.replace(re, (m) => `<em>${m}</em>`)
  }
  return out
}

/** 从正文中截取包含首个命中的片段（约 3 行），并高亮 */
function snippet(body: string, terms: string[]): string {
  let pos = -1
  for (const term of terms) {
    const p = body.indexOf(term)
    if (p >= 0 && (pos < 0 || p < pos)) pos = p
  }
  const start = pos < 0 ? 0 : Math.max(0, pos - 30)
  const slice = body.slice(start, start + 140)
  const prefix = start > 0 ? '…' : ''
  return `${prefix}${highlight(slice, terms)}…`
}

export interface SearchResult {
  url: string
  titleHtml: string
  bodyHtml: string
}

/** 执行搜索，返回带高亮的结果 */
export async function runSearch(query: string): Promise<SearchResult[]> {
  const q = query.trim()
  if (!q) return []
  const mini = await getSearch()
  const terms = q.split(/\s+/).filter(Boolean)
  const hits = mini.search(q) as unknown as Hit[]
  return hits.map((h) => ({
    url: h.url,
    titleHtml: highlight(h.title, terms),
    bodyHtml: snippet(h.body, terms),
  }))
}
