// 批量用 MDX 编译器检查所有迁移后的 .mdx，列出失败文件与首行错误（不经 Astro，快速定位）。
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const MDX = path.join(
  ROOT,
  'node_modules/.pnpm/@mdx-js+mdx@3.1.1/node_modules/@mdx-js/mdx/index.js'
)
const { compile } = await import(`file://${MDX}`)
// 与 Astro 一致启用 gfm（表格/删除线/自动链接会影响解析）
const remarkGfm = (await import(`${ROOT}/node_modules/remark-gfm/index.js`))
  .default
const gfmOpts = { remarkPlugins: [[remarkGfm, { singleTilde: false }]] }

const dirs = [
  path.join(ROOT, 'src/content/docs'),
  path.join(ROOT, 'src/content/includes'),
]

function collect(dir, list = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) collect(full, list)
    else if (name.endsWith('.mdx')) list.push(full)
  }
  return list
}

// 应用与真实构建相同的 vite 源级转换（容器、{.header} 转义、组件 import），使检查与构建一致。
// Node 26 支持直接加载 .ts（类型擦除）。
const { transformLegacySource } = await import(
  `${ROOT}/src/plugins/vite-legacy-syntax.ts`
)

let ok = 0
const fails = []
for (const dir of dirs) {
  for (const f of collect(dir)) {
    const raw = readFileSync(f, 'utf8')
    const transformed = transformLegacySource(raw)
    const fm = transformed.match(/^---[\s\S]*?---\r?\n/)
    const fmLines = fm ? fm[0].split('\n').length - 1 : 0
    const src = transformed.slice(fm ? fm[0].length : 0)
    try {
      await compile(src, gfmOpts)
      ok++
    } catch (e) {
      const ln = e.line || e.place?.start?.line
      const fileLine = ln ? ln + fmLines : '?'
      fails.push(
        `${path.relative(ROOT, f)}:${fileLine}  ::  ${e.message.split('\n')[0].slice(0, 70)}`
      )
    }
  }
}
console.log(`OK: ${ok}, FAIL: ${fails.length}`)
for (const l of fails) console.log('  ✗', l)
