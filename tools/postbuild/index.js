// postbuild：① 生成 dist/search-index.json（cheerio 抽取 .content-container）；
//            ② 将 dist/**/*.htm/index.html 平铺为 dist/**/*.htm 文件（与原站产物结构一致）。

import {
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { load } from 'cheerio'

const ROOT = path.resolve(import.meta.dirname, '../..')
const DIST = path.join(ROOT, 'dist')

/** 递归收集 dist 下的 *.htm/index.html（每页一个目录） */
function collectHtmDirs(dir, list = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (!statSync(full).isDirectory()) continue
    if (name.endsWith('.htm')) {
      const idx = path.join(full, 'index.html')
      try {
        if (statSync(idx).isFile()) list.push(full)
      } catch {}
    } else {
      collectHtmDirs(full, list)
    }
  }
  return list
}

const TITLE_SUFFIX = ' | 新大陆见闻录 - 最终幻想14新手入坑指南手册'

function generateIndex(htmDirs) {
  const indices = []
  for (const dir of htmDirs) {
    const rel = path.relative(DIST, dir).split(path.sep).join('/')
    const url = `/${rel}`
    const html = readFileSync(path.join(dir, 'index.html'), 'utf8')
    const $ = load(html)
    indices.push({
      url,
      title: $('title').text().replace(TITLE_SUFFIX, '').trim(),
      body: $('.content-container').text().replace(/\s+/g, ' ').trim(),
    })
  }
  writeFileSync(path.join(DIST, 'search-index.json'), JSON.stringify(indices))
  const bytes = statSync(path.join(DIST, 'search-index.json')).size
  console.log(
    `[postbuild] 搜索索引：${indices.length} 条，${(bytes / 1024).toFixed(1)} KiB`
  )
}

function flattenHtm(htmDirs) {
  let count = 0
  for (const dir of htmDirs) {
    const entries = readdirSync(dir)
    if (entries.length !== 1 || entries[0] !== 'index.html') {
      throw new Error(
        `[postbuild] ${dir} 含非 index.html 文件，无法平铺：${entries.join(', ')}`
      )
    }
    const content = readFileSync(path.join(dir, 'index.html'))
    rmSync(dir, { recursive: true, force: true })
    writeFileSync(dir, content) // dir 路径本身即目标 .htm 文件
    count++
  }
  console.log(`[postbuild] 平铺 ${count} 个 .htm 页面`)
}

const htmDirs = collectHtmDirs(DIST)
generateIndex(htmDirs)
flattenHtm(htmDirs)
console.log('[postbuild] 完成')
