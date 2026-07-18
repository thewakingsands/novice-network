// 清理超过 90 天未在部署产物中出现的文件（配合 dump.js 的 files.json 时间戳）。
import { existsSync, readFileSync, unlinkSync } from 'node:fs'

const CLEANUP_AGE = 1000 * 60 * 60 * 24 * 90

let files = {}
if (existsSync('dist/files.json')) {
  files = JSON.parse(readFileSync('dist/files.json', 'utf8'))
}

for (const file in files) {
  const age = Date.now() - files[file]
  if (age > CLEANUP_AGE) {
    console.log(`Deleting ${file}`)
    const filename = `dist/${file}`
    if (existsSync(filename)) unlinkSync(filename)
  }
}
