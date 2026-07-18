import type { Element, Root, Text } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 中西文间距处理（移植 pangu 的正则逻辑，复刻原站 markdown-it-pangu）：
 * 在 CJK 与英文字母/数字/部分符号之间插入空格。跳过代码/样式/脚本文本。
 */

const CJK =
  '\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff'

const ANY_CJK = new RegExp(`[${CJK}]`)

// CJK 后紧跟 字母/数字/符号 → 加空格（pangu CJK_ANS）
const CJK_ANS = new RegExp(`([${CJK}])([a-zA-Z0-9\`@#$%^&*\\-=+\\\\|/])`, 'g')
// 字母/数字/符号 后紧跟 CJK → 加空格（pangu ANS_CJK）
const ANS_CJK = new RegExp(
  `([a-zA-Z0-9\`~$%^&*\\-=+\\\\|/!;:,.?])([${CJK}])`,
  'g'
)

const SKIP_PARENTS = new Set(['code', 'pre', 'kbd', 'script', 'style'])

export function spacingText(text: string): string {
  if (!ANY_CJK.test(text)) return text
  return text.replace(CJK_ANS, '$1 $2').replace(ANS_CJK, '$1 $2')
}

export const rehypePangu: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: Text, _index, parent) => {
      if (
        parent &&
        parent.type === 'element' &&
        SKIP_PARENTS.has((parent as Element).tagName)
      ) {
        return
      }
      node.value = spacingText(node.value)
    })
  }
}
