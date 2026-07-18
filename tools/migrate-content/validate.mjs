// 迁移校验：① 原 docs 的 .htm 路径清单 与 新 dist 产物 逐一对齐；② dist 内站内链接死链检查。
// 用法：先 `pnpm build`，再 `node tools/migrate-content/validate.mjs`
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const DOCS = path.join(ROOT, 'docs')
const DIST = path.join(ROOT, 'dist')

function walk(dir, test, base = dir, list = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    const rel = path.relative(base, full)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, test, base, list)
    else if (test(rel)) list.push(rel)
  }
  return list
}

// ① 期望 URL 集（由 docs 推导）
const expected = new Set()
for (const rel of walk(DOCS, (r) => r.endsWith('.md'))) {
  if (rel.startsWith('.vuepress') || rel.startsWith('_includes')) continue
  const posix = rel.split(path.sep).join('/')
  if (path.basename(posix) === 'README.md') {
    const dir = path.dirname(posix)
    expected.add(dir === '.' ? '/' : `/${dir}`)
  } else {
    expected.add(`/${posix.replace(/\.md$/, '.htm')}`)
  }
}

// 实际 URL 集（dist 中的 index.html）
const actual = new Set()
for (const rel of walk(DIST, (r) => path.basename(r) === 'index.html')) {
  const posix = rel
    .split(path.sep)
    .join('/')
    .replace(/(^|\/)index\.html$/, '')
  actual.add(posix === '' ? '/' : `/${posix}`)
}

const missing = [...expected].filter((u) => !actual.has(u)).sort()
const extra = [...actual]
  .filter((u) => !expected.has(u) && u !== '/404' && u !== '/search.htm')
  .sort()

console.log(`期望页面: ${expected.size}, 实际页面: ${actual.size}`)
console.log(`缺失(在旧站有、新站无): ${missing.length}`)
for (const u of missing) console.log('  - 缺失', u)
console.log(`新增(新站有、旧站无): ${extra.length}`)
for (const u of extra) console.log('  + 新增', u)

// ② 站内链接死链检查
const hasPage = (u) => {
  // u 形如 /a/b.htm 或 /a/b.htm/ 或 /dir
  const clean = u.replace(/[#?].*$/, '').replace(/\/$/, '')
  if (clean === '' || clean === '/') return true
  const p = path.join(DIST, clean)
  if (existsSync(p) && statSync(p).isDirectory()) return true // 目录页
  if (existsSync(p)) return true // 静态资源（public）
  if (existsSync(`${p}/index.html`)) return true
  return false
}

const deadLinks = new Map()
const hrefRe = /href="([^"]+)"/g
for (const rel of walk(DIST, (r) => path.basename(r) === 'index.html')) {
  const html = readFileSync(path.join(DIST, rel), 'utf8')
  const from = `/${rel
    .split(path.sep)
    .join('/')
    .replace(/\/index\.html$/, '')}`
  hrefRe.lastIndex = 0
  let m = hrefRe.exec(html)
  for (; m !== null; m = hrefRe.exec(html)) {
    const href = m[1]
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|mailto:)/i.test(href)) continue
    if (!href.startsWith('/')) continue // 只查绝对站内链接
    if (href.startsWith('/_astro/') || href.startsWith('/assets/')) continue
    if (!hasPage(href)) {
      if (!deadLinks.has(href)) deadLinks.set(href, new Set())
      deadLinks.get(href).add(from)
    }
  }
}

console.log(`\n死链（站内、去重）: ${deadLinks.size}`)
const sorted = [...deadLinks.entries()].sort()
for (const [href, froms] of sorted.slice(0, 60)) {
  console.log(
    `  ✗ ${href}  ←  ${[...froms].slice(0, 2).join(', ')}${froms.size > 2 ? ` …(+${froms.size - 2})` : ''}`
  )
}
if (sorted.length > 60) console.log(`  …还有 ${sorted.length - 60} 个`)
