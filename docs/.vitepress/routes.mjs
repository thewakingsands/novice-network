export function rewritePage(file) {
  if (/(^|\/)(README|index)\.md$/i.test(file)) {
    return file.replace(/(README|index)\.md$/i, 'index.md')
  }
  if (file === '404.md') return file
  return file.replace(/\.md$/, '.htm.md')
}

export function pageUrl(file) {
  return '/' + rewritePage(file).replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}

export function rewriteLink(href) {
  if (!href || /^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(href)) return href
  const index = href.search(/[?#]/)
  const path = index < 0 ? href : href.slice(0, index)
  const suffix = index < 0 ? '' : href.slice(index)
  if (path.endsWith('.md')) return rewritePage(path) + suffix
  if (path && !path.endsWith('/') && !/\.[^/]+$/.test(path)) return path + '.htm' + suffix
  return href
}
