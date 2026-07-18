import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/** 为所有 `<img>` 添加 `loading="lazy"`（复刻原站 extendMarkdown 的 image 规则）。 */
export const rehypeLazyImages: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return
      node.properties = node.properties || {}
      if (node.properties.loading === undefined) {
        node.properties.loading = 'lazy'
      }
    })
  }
}
