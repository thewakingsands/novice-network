import {
  COMPONENT_IMPORTS,
  transformLegacyContainers,
} from './legacy-containers'

/**
 * Vite 源级预处理插件（enforce: 'pre'）——在 MDX/Markdown 解析之前对内容源码做字符串级修复。
 *
 * MDX 会把 `{` 当作表达式起始、把 `<tag>` 当作 JSX，因此以下两类原语法必须在解析前处理：
 *  1. 围栏容器 `;;;` / `:::`（转成 HTML/组件，与 markdown-it 的按行块级解析一致）；
 *  2. 标题尾部的 `{.class}`——转义花括号使 MDX 视其为字面文本，后续由 remark-heading-attrs 处理。
 *
 * 只作用于 `src/content/` 下的 `.md` / `.mdx`，不影响其它模块。
 * frontmatter 原样保留；注入的组件 import 置于 frontmatter 之后。
 */

const CONTENT_RE = /[/\\]src[/\\]content[/\\].*\.mdx?$/

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/

// 标题行尾部的 `{.class}` / `{#id}`（转义花括号以躲过 MDX 表达式解析）
const HEADING_ATTRS_RE = /^(#{1,6}[^\n{}]*?)\{([.#][^}\n]*)\}([ \t]*)$/gm

function escapeHeadingAttrs(body: string): string {
  return body.replace(
    HEADING_ATTRS_RE,
    (_m, pre: string, inner: string, post: string) =>
      `${pre}\\{${inner}\\}${post}`
  )
}

export function transformLegacySource(source: string): string {
  const fmMatch = source.match(FRONTMATTER_RE)
  const frontmatter = fmMatch ? fmMatch[0] : ''
  const rawBody = source.slice(frontmatter.length)

  const { code, used } = transformLegacyContainers(rawBody)
  const body = escapeHeadingAttrs(code)

  const imports = [...used]
    .map((name) => `import ${name} from '${COMPONENT_IMPORTS[name]}'`)
    .join('\n')

  const importBlock = imports ? `${imports}\n\n` : ''
  return `${frontmatter}${importBlock}${body}`
}

export function legacySyntaxPlugin() {
  return {
    name: 'novice-network:legacy-syntax',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      // 去掉查询串后再匹配路径
      const path = id.split('?')[0]
      if (!CONTENT_RE.test(path)) return null
      const transformed = transformLegacySource(code)
      if (transformed === code) return null
      return { code: transformed, map: null }
    },
  }
}
