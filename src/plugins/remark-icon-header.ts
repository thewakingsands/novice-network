import type { Heading, PhrasingContent, Root, RootContent } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 把 `<IconHeader img="...">标题</IconHeader>` 转成真正的标题元素，使其进入 TOC 与锚点：
 * `<hN class="icon-header"><img class="no-zoom"><span>标题</span></hN>`。
 *
 * 默认为 h2，可用 `level={3}` / `level="3"` 指定 1–6 级。
 * 单行写法在 MDX 中解析为「段落 > 行内 JSX 元素」，多行写法解析为块级 JSX 元素，两者都处理。
 */

const NAME = 'IconHeader'

interface JsxElement {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement'
  name: string | null
  attributes: { type: string; name?: string; value?: unknown }[]
  children: RootContent[]
}

function isIconHeader(node: unknown): node is JsxElement {
  const n = node as JsxElement
  return (
    (n.type === 'mdxJsxFlowElement' || n.type === 'mdxJsxTextElement') &&
    n.name === NAME
  )
}

function isBlank(node: RootContent): boolean {
  return node.type === 'text' && node.value.trim() === ''
}

/** 找出要替换的 IconHeader：块级元素本身，或只含一个 IconHeader 的段落 */
function findIconHeader(node: RootContent): JsxElement | undefined {
  if (isIconHeader(node)) return node
  if (node.type !== 'paragraph') return
  const children = node.children.filter((c) => !isBlank(c))
  if (children.length === 1 && isIconHeader(children[0])) return children[0]
}

/** 块级写法的内容会被包进段落，展开为行内内容 */
function phrasing(children: RootContent[]): PhrasingContent[] {
  return children.flatMap((c) =>
    c.type === 'paragraph' ? c.children : [c as PhrasingContent]
  )
}

function attr(el: JsxElement, name: string): string | undefined {
  const a = el.attributes.find(
    (a) => a.type === 'mdxJsxAttribute' && a.name === name
  )
  if (typeof a?.value === 'string') return a.value
  // `level={3}` 这类表达式属性，value 为表达式源码
  const expr = a?.value as { type?: string; value?: unknown } | undefined
  if (expr?.type === 'mdxJsxAttributeValueExpression') {
    return String(expr.value).trim()
  }
}

function headingDepth(el: JsxElement): Heading['depth'] {
  const level = Number(attr(el, 'level') ?? 2)
  if (!Number.isInteger(level) || level < 1 || level > 6) {
    throw new Error(`<${NAME}> 的 level 必须是 1–6 的整数`)
  }
  return level as Heading['depth']
}

function toHeading(el: JsxElement): Heading {
  const src = attr(el, 'img') ?? ''
  return {
    type: 'heading',
    depth: headingDepth(el),
    data: { hProperties: { className: ['icon-header'] } },
    children: [
      {
        type: 'text',
        value: '',
        data: {
          hName: 'img',
          hProperties: { className: ['no-zoom'], src, alt: '' },
          hChildren: [],
        },
      },
      {
        type: 'emphasis',
        data: { hName: 'span' },
        children: phrasing(el.children),
      },
    ],
  }
}

export const remarkIconHeader: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined || node.type === 'root') return
      const el = findIconHeader(node)
      if (!el) return
      parent.children[index] = toHeading(el)
      return 'skip'
    })
  }
}
