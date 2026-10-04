import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { globSync, renameSync } from 'node:fs'
import { resolve } from 'node:path'
import { configureMarkdown } from './markdown.mjs'
import { rewritePage } from './routes.mjs'

const outDir = fileURLToPath(new URL('../../dist', import.meta.url))

export default defineConfig({
  lang: 'zh-Hans',
  title: '新大陆见闻录 - 最终幻想14新手入坑指南手册',
  description: '《新大陆见闻录》网站为最终幻想14超实用萌新手册入坑指南，为FF14中文玩家提供涵盖广泛全面、清晰易懂的新手基础攻略指引。',
  outDir,
  cleanUrls: true,
  rewrites: rewritePage,
  srcExclude: ['_includes/**'],
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '最终幻想14,FF14,FFXIV,新人指南,豆芽站,萌新手册,入门攻略,新手教程,职业选择,副本,任务,练级,装备,PVP,生产,采集,钓鱼,海钓,优雷卡,ULK,博兹雅,BZY,古武,魂武,优武,义武' }],
    ['script', { async: '', 'data-ad-client': 'ca-pub-8304225030161579', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' }],
    ['script', { defer: '', src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token":"be74bc1eb92c4cf9adffca9366a9f20f"}' }]
  ],
  markdown: {
    breaks: true,
    headers: { level: [2, 3] },
    anchor: { permalink: false },
    config: configureMarkdown
  },
  vite: {
    build: { chunkSizeWarningLimit: 1500 },
    plugins: [{
      name: 'legacy-htm-preview',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (/\.htm(?:\?|$)/.test(req.url || '')) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
          }
          next()
        })
      }
    }]
  },
  async buildEnd() {
    // Keep existing public URLs while VitePress uses .htm.md route modules.
    for (const file of globSync('**/*.htm.html', { cwd: outDir })) {
      renameSync(resolve(outDir, file), resolve(outDir, file.replace(/\.html$/, '')))
    }
  }
})
