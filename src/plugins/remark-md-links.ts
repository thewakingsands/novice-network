import type { Link, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * 站内 `*.md` 链接改写为 `*.htm`（复刻 vuepress-plugin-clean-urls 的 normalSuffix 行为）：
 * - `foo/bar.md#anchor` → `foo/bar.htm#anchor`
 * - `README.md` / `foo/README.md` → 目录索引（`` / `foo/`）
 * - 保留锚点与查询串；外链（http/协议相对）与非 .md 链接不动。
 */

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i

export const remarkMdLinks: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'link', (node: Link) => {
      const url = node.url
      if (!url || EXTERNAL.test(url)) return

      // 拆出 path 与 后缀（#anchor / ?query）
      const suffixMatch = url.match(/[#?].*$/)
      const suffix = suffixMatch ? suffixMatch[0] : ''
      const path = suffix ? url.slice(0, -suffix.length) : url

      if (/README\.md$/.test(path)) {
        node.url = path.replace(/README\.md$/, '') + suffix
        return
      }
      if (/\.md$/.test(path)) {
        node.url = `${path.replace(/\.md$/, '.htm')}${suffix}`
      }
    })
  }
}
