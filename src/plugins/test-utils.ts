import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

type AnyPlugin = any

/** 用 remark/rehype 构建 markdown → HTML 管线（供插件单测使用） */
export async function mdToHtml(
  md: string,
  opts: { remark?: AnyPlugin[]; rehype?: AnyPlugin[] } = {}
): Promise<string> {
  const proc = unified().use(remarkParse).use(remarkGfm)
  for (const p of opts.remark ?? []) {
    if (Array.isArray(p)) proc.use(p[0], p[1])
    else proc.use(p)
  }
  proc.use(remarkRehype, { allowDangerousHtml: true })
  for (const p of opts.rehype ?? []) {
    if (Array.isArray(p)) proc.use(p[0], p[1])
    else proc.use(p)
  }
  proc.use(rehypeStringify, { allowDangerousHtml: true })
  return String(await proc.process(md))
}
