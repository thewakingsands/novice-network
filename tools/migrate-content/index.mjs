// 一次性内容迁移脚本：docs/**/*.md（VuePress）→ src/content/docs/**/*.mdx（Astro/Starlight）
// 迁移完成后保留在仓库供追溯。用法：node tools/migrate-content/index.mjs
//
// 处理项（见 design.md §3.3）：
//  - .md → .mdx；README → index；同目录 *.assets 复制到 public/assets 并改写相对图片引用
//  - frontmatter 注入 slug（原路径 + .htm）与 title（原 frontmatter 或首个 h1）
//  - 小写组件标签规范为 PascalCase（<item> → <Item> 等）
//  - Vue 绑定 :attr="val" → attr={val}
//  - <br> / <img …> 自闭合；裸 < 转义
//  - <IncludePage file="_includes/…"> → MDX import + <div class="included-page">
//  - _includes → src/content/includes
//  - 特殊页：docs/README.md（首页）、job/paladin.md（slot）由人工单独处理，此处跳过

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = path.resolve(import.meta.dirname, '../..')
const DOCS = path.join(ROOT, 'docs')
const OUT_DOCS = path.join(ROOT, 'src/content/docs')
const OUT_INCLUDES = path.join(ROOT, 'src/content/includes')
const PUBLIC_ASSETS = path.join(ROOT, 'public/assets')

// 人工单独处理，自动流程跳过
const SKIP = new Set(['README.md', 'job/paladin.md'])

// 小写组件标签 → 规范 PascalCase
const TAG_MAP = {
  item: 'Item',
  quest: 'Quest',
  action: 'Action',
  status: 'Status',
  pos: 'Pos',
  role: 'Role',
  iconheader: 'IconHeader',
  includepage: 'IncludePage',
  floattoc: 'FloatTOC',
  underconstruction: 'UnderConstruction',
  serverlist: 'ServerList',
  sitesearch: 'SiteSearch',
  buffsearch: 'BuffSearch',
  dutynav: 'DutyNav',
  homepage: 'HomePage',
  sponsors: 'Sponsors',
  xivfontlist: 'XIVFontList',
  zhaodai: 'ZhaoDai',
}

const report = { files: 0, includes: 0, assetsDirs: 0, unmatched: [] }

/** 递归收集 docs 下的 .md 文件（排除 .vuepress、_includes） */
function collectMd(dir, base = dir, list = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    const rel = path.relative(base, full)
    if (rel.startsWith('.vuepress') || rel.startsWith('_includes')) continue
    const st = statSync(full)
    if (st.isDirectory()) collectMd(full, base, list)
    else if (name.endsWith('.md')) list.push(full)
  }
  return list
}

/** 复制所有 *.assets 目录到 public/assets（保留 docs 下的相对结构） */
function copyAssets() {
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name)
      const rel = path.relative(DOCS, full)
      if (rel.startsWith('.vuepress')) continue
      const st = statSync(full)
      if (!st.isDirectory()) continue
      if (name.endsWith('.assets')) {
        const dest = path.join(PUBLIC_ASSETS, rel)
        mkdirSync(path.dirname(dest), { recursive: true })
        cpSync(full, dest, { recursive: true })
        report.assetsDirs++
      } else {
        walk(full)
      }
    }
  }
  walk(DOCS)
}

/** 规范小写组件标签为 PascalCase */
function normalizeTags(body) {
  return body.replace(
    /<(\/?)([a-z][a-zA-Z0-9]*)(?=[\s/>])/g,
    (m, slash, tag) => {
      const canon = TAG_MAP[tag.toLowerCase()]
      return canon ? `<${slash}${canon}` : m
    }
  )
}

/** Vue 绑定 :attr="val" → attr={val}（val 为数值） */
function convertBindings(body) {
  return body.replace(/\s:([a-zA-Z][a-zA-Z0-9]*)="([^"]*)"/g, ' $1={$2}')
}

/** <br> / <img …> 等 void 标签自闭合 */
function selfCloseVoid(body) {
  body = body.replace(/<br\s*\/?>/gi, '<br />')
  body = body.replace(/<hr\s*\/?>/gi, '<hr />')
  body = body.replace(/<img\b([^>]*?)\/?>/gi, (_m, attrs) => {
    const a = attrs.trimEnd()
    return `<img${a ? ` ${a.trim()}` : ''} />`
  })
  return body
}

/** 给标签内未加引号的属性值补引号（如 width=250px、rowspan=10）；跳过 {表达式} 值 */
function quoteTagAttrs(body) {
  return body.replace(/<[A-Za-z][^>]*>/g, (tag) =>
    tag.replace(/(\s[a-zA-Z][\w-]*)=([^\s"'{<>/][^\s<>/]*)/g, '$1="$2"')
  )
}

/**
 * 修复 `<Tag …/>文本</Tag>`（自闭合后又带闭合标签）——原站 Vue 的 HTML 解析器宽容，
 * 但 MDX 视为孤立闭合标签。去掉多余的自闭合斜杠，还原为带 slot 内容的开标签。
 */
const COMPONENT_TAGS =
  'Action|Status|Item|Quest|Role|IconHeader|Pos|CollapseText|SegmentText|JobCard'
function fixSelfCloseThenClose(body) {
  const re = new RegExp(
    `<(${COMPONENT_TAGS})\\b([^>]*?)\\s*/>([^<]*)</\\1>`,
    'g'
  )
  return body.replace(re, '<$1$2>$3</$1>')
}

/**
 * 转义裸 <（后面不是可以起始标签名的字符：ASCII 字母、`/`、`!`）。
 * 覆盖 `< 20%`、`<2`、`<逻辑目标>`、`<=`、`<...` 等字面用法；真实标签（<div>、<Item>、</td>、<br/>）不受影响。
 */
function escapeBareLt(body) {
  return body.replace(/<(?=[^A-Za-z/!])/g, '&lt;')
}

/** 改写图片相对引用为 /assets/<reldir>/… 绝对路径 */
function rewriteAssets(body, reldir) {
  const toUrl = (ref) => {
    const clean = ref.replace(/^\.\//, '')
    return path.posix.normalize(path.posix.join('/assets', reldir, clean))
  }
  const isRelative = (u) => !/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#|data:)/i.test(u)
  const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i

  // src="..."（媒体源，相对即视为资源）
  body = body.replace(/(\bsrc=")([^"]+)(")/g, (m, p1, url, p3) =>
    isRelative(url) ? `${p1}${toUrl(url)}${p3}` : m
  )
  // markdown ![](...) 及 [](...) 中的图片
  body = body.replace(/(\]\()([^)\s]+)(\))/g, (m, p1, url, p3) => {
    if (isRelative(url) && (IMG_EXT.test(url) || url.includes('.assets/'))) {
      return `${p1}${toUrl(url)}${p3}`
    }
    return m
  })
  return body
}

/** IncludePage → import + <div class="included-page"><X /></div>，返回 { body, imports } */
function handleIncludes(body) {
  const imports = []
  const seen = new Set()
  const out = body.replace(
    /<IncludePage\s+file="_includes\/([^"]+)\.md"\s*\/>/g,
    (_m, rel) => {
      // rel: basic/level → IncludeBasicLevel
      const name =
        'Include' +
        rel
          .split(/[/-]/)
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join('')
      if (!seen.has(name)) {
        seen.add(name)
        imports.push(`import ${name} from '@/content/includes/${rel}.mdx'`)
      }
      return `<div class="included-page"><${name} /></div>`
    }
  )
  return { body: out, imports }
}

/** 综合转换正文（tags/bindings/void/escape/assets/includes） */
/** 剥离 HTML 注释（MDX 不支持 `<!-- -->`，注释在输出中本就不可见） */
function stripHtmlComments(body) {
  return body.replace(/<!--[\s\S]*?-->/g, '')
}

/**
 * 修复原始 HTML 表格以适配 MDX：
 *  - 未加引号的数值属性（如 rowspan=10）补引号；
 *  - 整个 <table> 折叠为单行（去除内部换行/缩进）——MDX 对含文本的多行单元格解析不稳定，
 *    而单行内联表格可靠工作（<br /> 已负责视觉换行）。
 */
function fixHtmlTables(body) {
  return body
    .replace(/(\s[a-zA-Z][a-zA-Z0-9-]*)=([0-9]+)(?=[\s/>])/g, '$1="$2"')
    .replace(/<table[\s\S]*?<\/table>/g, (m) => m.replace(/\n\s*/g, ''))
}

export function transformBody(rawBody, reldir) {
  let body = rawBody
  body = stripHtmlComments(body)
  body = normalizeTags(body)
  body = convertBindings(body)
  body = fixSelfCloseThenClose(body)
  body = selfCloseVoid(body)
  body = escapeBareLt(body)
  body = rewriteAssets(body, reldir)
  body = quoteTagAttrs(body)
  body = fixHtmlTables(body)
  const { body: withIncludes, imports } = handleIncludes(body)
  return { body: withIncludes, imports }
}

/** 从首个 h1 或文件名推导标题 */
function deriveTitle(body, fallback) {
  const m = body.match(/^#\s+(.+)$/m)
  if (m) {
    return m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/\{\.[^}]*\}/g, '')
      .replace(/[*_`]/g, '')
      .trim()
  }
  return fallback
}

/** 拆分 frontmatter 与正文 */
function splitFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { fm: null, body: src }
  return { fm: m[1], body: src.slice(m[0].length) }
}

export function buildFrontmatter(fmInner, title, slug) {
  const lines = fmInner ? fmInner.split('\n') : []
  const hasTitle = lines.some((l) => /^title\s*:/.test(l))
  if (!hasTitle) lines.unshift(`title: ${JSON.stringify(title)}`)
  if (slug) lines.push(`slug: ${slug}`)
  return `---\n${lines.join('\n')}\n---\n`
}

function migrateFile(full) {
  const rel = path.relative(DOCS, full) // e.g. basic/battle.md
  if (SKIP.has(rel)) return

  const src = readFileSync(full, 'utf8')
  const { fm, body: rawBody } = splitFrontmatter(src)

  const reldir = path.dirname(rel) === '.' ? '' : path.dirname(rel)
  const isReadme = path.basename(rel) === 'README.md'

  // 目标路径 & slug
  let outRel
  let slug = null
  if (isReadme) {
    outRel = path.join(reldir, 'index.mdx')
    // index 页不设 .htm slug（沿用 Starlight 默认目录路由）
  } else {
    outRel = rel.replace(/\.md$/, '.mdx')
    slug = `${rel.replace(/\.md$/, '.htm')}`
  }

  const { body, imports } = transformBody(rawBody, reldir)
  const title = deriveTitle(rawBody, path.basename(rel, '.md'))
  const newFm = buildFrontmatter(fm, title, slug)
  const importBlock = imports.length ? `${imports.join('\n')}\n\n` : ''

  const outPath = path.join(OUT_DOCS, outRel)
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, `${newFm}${importBlock}${body}`)
  report.files++
}

function migrateIncludes() {
  const dir = path.join(DOCS, '_includes')
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const full = path.join(d, name)
      const st = statSync(full)
      if (st.isDirectory()) {
        walk(full)
        continue
      }
      if (!name.endsWith('.md')) continue
      const rel = path.relative(dir, full) // basic/level.md
      const reldir = path.posix.join('_includes', path.dirname(rel))
      const src = readFileSync(full, 'utf8')
      const { body: rawBody } = splitFrontmatter(src)
      const { body, imports } = transformBody(rawBody, reldir)
      const importBlock = imports.length ? `${imports.join('\n')}\n\n` : ''
      const outPath = path.join(OUT_INCLUDES, rel.replace(/\.md$/, '.mdx'))
      mkdirSync(path.dirname(outPath), { recursive: true })
      writeFileSync(outPath, `${importBlock}${body}`)
      report.includes++
    }
  }
  walk(dir)
}

function main() {
  if (!existsSync(DOCS)) {
    console.error('docs/ 不存在')
    process.exit(1)
  }
  copyAssets()
  for (const f of collectMd(DOCS)) migrateFile(f)
  migrateIncludes()
  console.log('迁移完成：', JSON.stringify(report, null, 2))
}

// 仅在直接执行时运行（供 paladin.mjs 复用导出的函数）
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main()
}
