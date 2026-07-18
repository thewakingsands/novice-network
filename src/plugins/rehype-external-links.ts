import type { Element, Root } from 'hast'
import { visit } from 'unist-util-visit'
import type { RehypePlugin } from './types'

const SITE_ORIGIN = 'https://ff14.org'

const isExternalHref = (href: string) => {
  try {
    const url = new URL(href, SITE_ORIGIN)
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      url.origin !== SITE_ORIGIN
    )
  } catch {
    return false
  }
}

/** 让站外 HTTP(S) 链接在新窗口打开；站内、锚点与其他协议保持原样。 */
export const rehypeExternalLinks: RehypePlugin = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'a') return
      const href = node.properties.href
      if (typeof href !== 'string' || !isExternalHref(href)) return
      node.properties.target = '_blank'
      node.properties.rel = ['noopener', 'noreferrer']
    })
  }
}
