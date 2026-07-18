import type { Heading, Root, Text } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 支持标题末尾的 `{.class}` 语法（markdown-it-attrs 的实际用例，40 处均为 `{.header}`）：
 * 提取类名写入 heading 的 data.hProperties.className，并从标题文本中移除。
 * 例：`## 武僧(格斗家) {.header}` → `<h2 class="header">武僧(格斗家)</h2>`
 */

const TRAILING_ATTRS = /\s*\{([^}]+)\}\s*$/

export const remarkHeadingAttrs: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'heading', (node: Heading) => {
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

      text.value = text.value.replace(TRAILING_ATTRS, '')

      if (!node.data) node.data = {}
      const data = node.data as { hProperties?: Record<string, unknown> }
      if (!data.hProperties) data.hProperties = {}
      const props = data.hProperties
      if (classes.length) props.className = classes
      if (ids.length) props.id = ids[0]
    })
  }
}
