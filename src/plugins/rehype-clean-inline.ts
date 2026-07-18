import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 去掉 remark-flexible-markers / remark-ins 自动附加的 class，
 * 使 `<mark>`、`<ins>` 与原站（markdown-it-mark / markdown-it-ins）的纯标签一致。
 */
export const rehypeCleanInline: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'mark' || node.tagName === 'ins') {
        if (node.properties) {
          node.properties.className = undefined
        }
      }
    })
  }
}
