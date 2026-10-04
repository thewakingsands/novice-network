const glob = require('node:fs').globSync
const fs = require('fs')
const now = Date.now()

let files = {}

if (fs.existsSync('lastDeploy/files.json')) {
  files = JSON.parse(fs.readFileSync('lastDeploy/files.json'))
}

const currentFiles = glob('dist/**/*').map(x => x.replace(/\\/g, '/').substring('dist/'.length))
for (const file of currentFiles) {
  files[file] = now
}

fs.writeFileSync('dist/files.json', JSON.stringify(files, null, 2))
