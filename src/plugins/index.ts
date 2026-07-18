import remarkFlexibleMarkers from 'remark-flexible-markers'
import remarkGfm from 'remark-gfm'
import remarkIns from 'remark-ins'
import { rehypeCleanInline } from './rehype-clean-inline'
import { rehypeExternalLinks } from './rehype-external-links'
import { rehypeLazyImages } from './rehype-lazy-images'
import { rehypeLegacyTable } from './rehype-legacy-table'
import { rehypePangu } from './rehype-pangu'
import { rehypeVuepressSlug } from './rehype-vuepress-slug'
import { remarkCjkBreaks } from './remark-cjk-breaks'
import { remarkHeadingAttrs } from './remark-heading-attrs'
import { remarkMdLinks } from './remark-md-links'
import type { RehypePlugin, RemarkPlugin } from './types'

/**
 * remark 插件顺序（`;;;` / `:::` 容器与 `{.header}` 转义由 Vite 源级插件
 * legacy-syntax 在解析前完成，见 vite-legacy-syntax.ts）：
 * 1. ==mark==（remark-flexible-markers，输出纯 <mark> 以匹配原站）
 * 2. ++ins++（remark-ins）
 * 3. 标题尾 `{.class}`（源码里花括号已被转义为字面量，此处提取并设置 class）
 * 4. 站内 .md → .htm 链接
 * 5. CJK 软换行 → <br>（两侧 CJK 除外）
 */
export const remarkPlugins: RemarkPlugin[] = [
  // 自带 gfm（表格/删除线/自动链接），关闭单波浪线删除线以对齐 markdown-it（仅 ~~ 生效）
  [remarkGfm, { singleTilde: false }],
  [remarkFlexibleMarkers, { markerClassName: () => [] }],
  remarkIns,
  remarkHeadingAttrs,
  remarkMdLinks,
  remarkCjkBreaks,
]

/**
 * rehype 插件顺序：
 * 1. VuePress slugify 覆写 heading id（在 Astro 默认 id 之后运行以覆盖）
 * 2. 表格包裹 .md-table + Semantic UI 类
 * 3. markdown 图片 loading=lazy
 * 4. 站外链接新窗口打开
 * 5. 清理 mark/ins 的自动 class（对齐原站纯标签）
 * 6. pangu 中西文间距（最后，作用于最终文本）
 */
export const rehypePlugins: RehypePlugin[] = [
  rehypeVuepressSlug,
  rehypeLegacyTable,
  rehypeLazyImages,
  rehypeExternalLinks,
  rehypeCleanInline,
  rehypePangu,
]
