import {
  COMPONENT_IMPORTS,
  transformLegacyContainers,
} from './legacy-containers'

/**
 * Vite 源级预处理插件（enforce: 'pre'）——在 MDX/Markdown 解析之前对内容源码做字符串级修复。
 *
 * MDX 会把 `{` 当作表达式起始、把 `<Tag>` 当作组件，因此以下原语法必须在解析前处理：
 *  1. 围栏容器 `;;;` / `:::`（转成 HTML/组件，与 markdown-it 的按行块级解析一致）；
 *  2. 标题尾部的 `{.class}`——转义花括号使 MDX 视其为字面文本，后续由 remark-heading-attrs 处理；
 *  3. 为内容中用到的全局组件（Role/Action/Status/… 及容器组件）注入 import——
 *     内容文件保持无 import 的原貌，组件作用域在构建期注入。
 *
 * 只作用于 `src/content/` 下的 `.md` / `.mdx`，不影响其它模块。
 * frontmatter 原样保留；注入的组件 import 置于 frontmatter 之后。
 */

const CONTENT_RE = /[/\\]src[/\\]content[/\\].*\.mdx?$/

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/

// 行尾的 `{.class}` / `{#id}`（标题或段落，如职业卡片标题）——转义花括号以躲过 MDX 表达式解析
const HEADING_ATTRS_RE = /^([^\n{}]*?)\{([.#][^}\n]*)\}([ \t]*)$/gm

/** 内容中会用到的全局组件 → 导入路径（原 VuePress 全局组件，内容无需 import） */
const CONTENT_COMPONENTS: Record<string, string> = {
  Role: '@/components/content/Role.astro',
  Action: '@/components/content/Action.astro',
  Status: '@/components/content/Status.astro',
  Item: '@/components/content/Item.astro',
  Quest: '@/components/content/Quest.astro',
  Pos: '@/components/content/Pos.astro',
  UnderConstruction: '@/components/content/UnderConstruction.astro',
  FloatTOC: '@/components/content/FloatTOC.astro',
  XIVFontList: '@/components/content/XIVFontList.astro',
  ZhaoDai: '@/components/content/ZhaoDai.astro',
  Sponsors: '@/components/content/Sponsors.astro',
  ServerList: '@/components/content/ServerList.astro',
  DutyNav: '@/components/content/DutyNav.astro',
  BuffSearch: '@/components/content/BuffSearch.astro',
  HomePage: '@/components/content/HomePage.astro',
  SiteSearch: '@/components/content/SiteSearch.astro',
  FeedbackForm: '@/components/content/FeedbackForm.astro',
}

/** 容器组件（CollapseText/SegmentText/JobCard）与内容组件合并的导入表 */
const ALL_IMPORTS: Record<string, string> = {
  ...COMPONENT_IMPORTS,
  ...CONTENT_COMPONENTS,
}

function escapeHeadingAttrs(body: string): string {
  return body.replace(
    HEADING_ATTRS_RE,
    (_m, pre: string, inner: string, post: string) =>
      `${pre}\\{${inner}\\}${post}`
  )
}

/** 扫描正文中用到的内容组件标签（`<Name` 后跟空白/自闭合/闭合） */
function scanContentComponents(body: string, used: Set<string>): void {
  for (const name of Object.keys(CONTENT_COMPONENTS)) {
    const re = new RegExp(`<${name}(?=[\\s/>])`)
    if (re.test(body)) used.add(name)
  }
}

export function transformLegacySource(source: string): string {
  const fmMatch = source.match(FRONTMATTER_RE)
  const frontmatter = fmMatch ? fmMatch[0] : ''
  const rawBody = source.slice(frontmatter.length)

  const { code, used } = transformLegacyContainers(rawBody)
  const body = escapeHeadingAttrs(code)

  scanContentComponents(body, used)

  const imports = [...used]
    .map((name) => `import ${name} from '${ALL_IMPORTS[name]}'`)
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
