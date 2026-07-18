import type { Break, Parent, Root, Text } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 复刻原站 `breaks: true` + markdown-it-cjk-breaks 的组合行为：
 * 段落内的软换行渲染为 `<br>`，但当换行两侧均为 CJK 字符时不渲染（直接相连）。
 */

// 覆盖常用中日韩统一表意文字、假名、标点、全角字符等区段
const CJK =
  /[\u2E80-\u9FFF\uF900-\uFAFF\u3040-\u30FF\u3000-\u303F\uFF00-\uFFEF]/

export const remarkCjkBreaks: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: Text, index, parent: Parent | undefined) => {
      if (!parent || index === null || index === undefined) return
      if (!node.value.includes('\n')) return

      const segments = node.value.split('\n')
      const replacement: Array<Text | Break> = []

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i]
        if (i > 0) {
          const prev = segments[i - 1]
          const prevChar = prev.slice(-1)
          const nextChar = seg.slice(0, 1)
          const cjkJoin =
            prevChar !== '' &&
            nextChar !== '' &&
            CJK.test(prevChar) &&
            CJK.test(nextChar)
          if (cjkJoin) {
            // 两侧均为 CJK：不换行，直接拼接到上一段末尾
            const last = replacement[replacement.length - 1]
            if (last && last.type === 'text') {
              last.value += seg
              continue
            }
          } else {
            replacement.push({ type: 'break' })
          }
        }
        replacement.push({ type: 'text', value: seg })
      }

      // 清理可能产生的空文本节点
      const cleaned = replacement.filter(
        (n) => n.type !== 'text' || n.value.length > 0
      )
      parent.children.splice(index, 1, ...cleaned)
      return index + cleaned.length
    })
  }
}
