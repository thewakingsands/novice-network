import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

/**
 * 复刻原站表格渲染：`<table>` 外包 `<div class="md-table">`，
 * 并为 table 附加 `ui compact grey striped unstackable table` 类（Semantic UI）。
 */

const TABLE_CLASSES = [
  'ui',
  'compact',
  'grey',
  'striped',
  'unstackable',
  'table',
]

export const rehypeLegacyTable: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'table') return
      if (!parent || index === null || index === undefined) return
      // 已被包裹则跳过
      if (
        parent.type === 'element' &&
        (parent as Element).tagName === 'div' &&
        (
          (parent as Element).properties?.className as string[] | undefined
        )?.includes('md-table')
      ) {
        return
      }

      const existing =
        (node.properties?.className as string[] | undefined) ?? []
      node.properties = node.properties || {}
      node.properties.className = [...new Set([...existing, ...TABLE_CLASSES])]

      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['md-table'] },
        children: [node],
      }
      parent.children[index] = wrapper
      return [SKIP, index + 1]
    })
  }
}
