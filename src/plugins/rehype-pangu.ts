import type { Element, Root, Text } from 'hast'
import type { Plugin } from 'unified'

/**
 * 中西文间距处理（移植 pangu 的正则逻辑，复刻原站 markdown-it-pangu）：
 * 在 CJK 与英文字母/数字/部分符号之间插入空格。跳过代码/样式/脚本文本。
 *
 * markdown-it-pangu 以段落内的行内 token 流为单位：文本会参考前一个 token 的
 * 末字符（可跨越 **加粗**、链接等标记），遇到行内 HTML（MDX 中即 JSX 元素）
 * 则重新开始；行内代码两侧补空格（位于段首/段尾时除外）。
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

// markdown 生成的行内标记，文本间距可跨越它们延续
const TRANSPARENT = new Set([
  'a',
  'b',
  'del',
  'em',
  'i',
  'ins',
  'mark',
  's',
  'span',
  'strong',
  'sub',
  'sup',
])
// 内容不参与间距处理，视为行内 token 流的断点
const OPAQUE = new Set(['br', 'img', 'kbd', 'pre', 'script', 'style'])

export function spacingText(text: string): string {
  if (!ANY_CJK.test(text)) return text
  return text.replace(CJK_ANS, '$1 $2').replace(ANS_CJK, '$1 $2')
}

type Parent = Root | Element
type Leaf =
  | { kind: 'text'; node: Text }
  | { kind: 'code'; node: Element; parent: Parent }
  | { kind: 'break' }

function lastChar(text: string): string {
  return Array.from(text).at(-1) ?? ''
}

function textContent(node: Element): string {
  return node.children
    .map((child) =>
      child.type === 'text'
        ? child.value
        : child.type === 'element'
          ? textContent(child)
          : ''
    )
    .join('')
}

/** 收集一个块内的行内 token 流；遇到块级/JSX 子树时另起一段递归处理 */
function collect(parent: Parent, leaves: Leaf[]): void {
  for (const child of parent.children) {
    if (child.type === 'text') {
      leaves.push({ kind: 'text', node: child })
    } else if (child.type === 'element' && child.tagName === 'code') {
      leaves.push({ kind: 'code', node: child, parent })
    } else if (child.type === 'element' && TRANSPARENT.has(child.tagName)) {
      collect(child, leaves)
    } else {
      leaves.push({ kind: 'break' })
      if (
        'children' in child &&
        !(child.type === 'element' && OPAQUE.has(child.tagName))
      ) {
        spacingBlock(child as Parent)
      }
    }
  }
}

function spacingBlock(block: Parent): void {
  const leaves: Leaf[] = []
  collect(block, leaves)

  let prev = ''
  leaves.forEach((leaf, index) => {
    if (leaf.kind === 'break') {
      prev = ''
    } else if (leaf.kind === 'text') {
      const value = spacingText(prev + leaf.node.value).slice(prev.length)
      leaf.node.value = value
      if (value) prev = lastChar(value)
    } else {
      const before = leaves[index - 1]
      const after = leaves[index + 1]
      const siblings = leaf.parent.children
      if (
        index > 0 &&
        !(before?.kind === 'text' && /\s$/.test(before.node.value))
      ) {
        siblings.splice(siblings.indexOf(leaf.node), 0, {
          type: 'text',
          value: ' ',
        })
      }
      if (index < leaves.length - 1) {
        if (!(after?.kind === 'text' && /^\s/.test(after.node.value))) {
          siblings.splice(siblings.indexOf(leaf.node) + 1, 0, {
            type: 'text',
            value: ' ',
          })
        }
        prev = ' '
      } else {
        prev = lastChar(textContent(leaf.node))
      }
    }
  })
}

export const rehypePangu: Plugin<[], Root> = () => {
  return (tree) => {
    spacingBlock(tree)
  }
}
