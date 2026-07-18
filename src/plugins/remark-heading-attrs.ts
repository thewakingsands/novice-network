import type { Heading, Paragraph, Root, Text } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 支持标题/段落末尾的 `{.class}` / `{#id}` 语法（复刻 markdown-it-attrs 的实际用例）：
 * 提取类名/ id 写入节点 data.hProperties，并从文本中移除。
 * 例：`## 武僧(格斗家) {.header}` → `<h2 class="header">武僧(格斗家)</h2>`
 *     段落 `武僧(格斗家) {.header}` → `<p class="header">武僧(格斗家)</p>`（职业卡片标题）
 *
 * 注：源码中的花括号已由 vite-legacy-syntax 转义为字面量，MDX 解析后此处再提取。
 */

const TRAILING_ATTRS = /\s*\{([.#][^}]*)\}\s*$/

function applyAttrs(node: Heading | Paragraph): void {
  const last = node.children[node.children.length - 1]
  if (last?.type !== 'text') return
  const text = last as Text
  const m = text.value.match(TRAILING_ATTRS)
  if (!m) return

  const classes: string[] = []
  const ids: string[] = []
  for (const token of m[1].trim().split(/\s+/)) {
    if (token.startsWith('.')) classes.push(token.slice(1))
    else if (token.startsWith('#')) ids.push(token.slice(1))
  }
  if (!classes.length && !ids.length) return

  text.value = text.value.replace(TRAILING_ATTRS, '')

  if (!node.data) node.data = {}
  const data = node.data as { hProperties?: Record<string, unknown> }
  if (!data.hProperties) data.hProperties = {}
  const props = data.hProperties
  if (classes.length) props.className = classes
  if (ids.length) props.id = ids[0]
}

export const remarkHeadingAttrs: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'heading', (node: Heading) => applyAttrs(node))
    visit(tree, 'paragraph', (node: Paragraph) => applyAttrs(node))
  }
}
