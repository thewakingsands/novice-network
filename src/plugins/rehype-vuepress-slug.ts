import type { Element, Root, Text } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'
import { slugify } from '../utils/slugify'

/**
 * 用移植的 VuePress slugify 覆写全部 heading 的 id，并把重算后的 headings
 * 写回 file.data.astro.headings，保证页内锚点与 TOC 与原站完全一致。
 */

const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

interface AstroHeading {
  depth: number
  slug: string
  text: string
}

function textContent(node: Element): string {
  let out = ''
  visit(node, 'text', (t: Text) => {
    out += t.value
  })
  return out
}

export const rehypeVuepressSlug: Plugin<[], Root> = () => {
  return (tree, file: VFile) => {
    const headings: AstroHeading[] = []
    const used = new Map<string, number>()

    visit(tree, 'element', (node: Element) => {
      if (!HEADINGS.has(node.tagName)) return
      const depth = Number(node.tagName.slice(1))
      const text = textContent(node).trim()
      let slug = slugify(text)

      // 与原站一致地处理重复 id（VuePress/markdown-it-anchor 追加 -1、-2…）
      if (used.has(slug)) {
        const n = (used.get(slug) as number) + 1
        used.set(slug, n)
        slug = `${slug}-${n}`
      } else {
        used.set(slug, 0)
      }

      node.properties = node.properties || {}
      node.properties.id = slug
      headings.push({ depth, slug, text })
    })

    if (!file.data) file.data = {}
    const data = file.data as { astro?: { headings?: AstroHeading[] } }
    if (!data.astro) data.astro = {}
    data.astro.headings = headings
  }
}
