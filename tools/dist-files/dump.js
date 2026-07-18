// 记录 dist 中各文件的时间戳（合并上次部署的 files.json），供 90 天清理机制使用。
import {
  existsSync,
  globSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'

const now = Date.now()

let files = {}
if (existsSync('lastDeploy/files.json')) {
  files = JSON.parse(readFileSync('lastDeploy/files.json', 'utf8'))
}

const currentFiles = globSync('dist/**/*')
  .filter((p) => statSync(p).isFile())
  .map((x) => x.substring('dist/'.length))
for (const file of currentFiles) {
  files[file] = now
}

writeFileSync('dist/files.json', JSON.stringify(files, null, 2))
