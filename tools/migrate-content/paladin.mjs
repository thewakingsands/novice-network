// paladin.md 专用迁移：展开 ::: slot（header → summary → default 顺序），复用通用转换。
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { buildFrontmatter, transformBody } from './index.mjs'

const ROOT = path.resolve(import.meta.dirname, '../..')
const src = readFileSync(path.join(ROOT, 'docs/job/paladin.md'), 'utf8')

// 去掉 frontmatter
const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')

// 展开 slot：删除 `::: slot xxx` 开标记与其对应的裸 `:::` 收尾，内容按原顺序保留。
// 注意末尾另有真实的 `:::segment grey` 容器，需保留——只处理 slot。
const lines = body.split('\n')
const out = []
const stack = []
for (const line of lines) {
  const open = line.match(/^:::\s+slot\s+\w+\s*$/)
  if (open) {
    stack.push('slot')
    continue
  }
  if (/^:::\s*$/.test(line) && stack[stack.length - 1] === 'slot') {
    stack.pop()
    continue
  }
  out.push(line)
}
const flattened = out.join('\n')

const { body: transformed, imports } = transformBody(flattened, 'job')
const fm = buildFrontmatter('title: 骑士', '骑士', 'job/paladin.htm')
const importBlock = imports.length ? `${imports.join('\n')}\n\n` : ''

const outPath = path.join(ROOT, 'src/content/docs/job/paladin.mdx')
mkdirSync(path.dirname(outPath), { recursive: true })
writeFileSync(outPath, `${fm}${importBlock}${transformed}`)
console.log('paladin.mdx 已生成')
