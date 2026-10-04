import assert from 'node:assert/strict'
import { test } from 'node:test'
import { globSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createMarkdownRenderer } from 'vitepress'
import { parse } from 'vue/compiler-sfc'
import matter from 'gray-matter'
import config from '../../docs/.vitepress/config.mjs'
import { rewritePage, pageUrl, rewriteLink } from '../../docs/.vitepress/routes.mjs'

test('public route mapping preserves directory indexes and .htm URLs', () => {
  assert.equal(rewritePage('README.md'), 'index.md')
  assert.equal(pageUrl('duty/README.md'), '/duty/')
  assert.equal(pageUrl('basic/core.md'), '/basic/core.htm')
  assert.equal(rewritePage('404.md'), '404.md')
  const files = [...globSync('**/*.md', { cwd: 'docs', exclude: ['_includes/**', 'public/**', '.vitepress/**'] })]
  const paths = files.map(file => pageUrl(file.replace(/\\/g, '/')))
  assert.equal(new Set(paths).size, files.length, 'route rewrites must not collide')
})

test('Markdown links resolve to the same public paths as route modules', async () => {
  const md = await createMarkdownRenderer(resolve('docs'), config.markdown)
  const html = md.render('[article](/basic/core.md#标题) [index](/duty/README.md)', { cleanUrls: true })
  assert.match(html, /href="\/basic\/core.htm#标题"/)
  assert.match(html, /href="\/duty\/"/)
  assert.equal(rewriteLink('https://example.com/guide.md'), 'https://example.com/guide.md')
  assert.equal(rewriteLink('/handbooks/ubahamut/index.html'), '/handbooks/ubahamut/index.html')
  assert.equal(rewriteLink('/about?from=footer'), '/about.htm?from=footer')
})

test('every article and included fragment produces valid Vue 3 markup', async () => {
  const md = await createMarkdownRenderer(resolve('docs'), config.markdown)
  const failures = []
  for (const file of globSync('docs/**/*.md', { exclude: ['docs/public/**', 'docs/.vitepress/**'] })) {
    const { content } = matter(readFileSync(file, 'utf8'))
    const html = md.render(content, { path: file, relativePath: file.replace(/^docs[\\/]/, '') })
    const { errors } = parse(`<template>${html}</template>`, { filename: file })
    failures.push(...errors.map(error => `${file}: ${error.message}`))
  }
  assert.deepEqual(failures, [])
})
