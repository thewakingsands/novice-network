import { globSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import matter from 'gray-matter'
import { pageUrl } from '../routes.mjs'

const docs = fileURLToPath(new URL('../../', import.meta.url))

export default {
  watch: ['../../**/*.md'],
  load() {
    return [...globSync('**/*.md', { cwd: docs, exclude: ['_includes/**', 'public/**', '.vitepress/**'] })]
      .sort()
      .map(file => {
        const { data } = matter(readFileSync(resolve(docs, file), 'utf8'))
        const relativePath = file.replace(/\\/g, '/')
        return { relativePath, path: pageUrl(relativePath), frontmatter: { underConstruction: !!data.underConstruction } }
      })
  }
}
