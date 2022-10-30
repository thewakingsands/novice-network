const fs = require('fs')

const AGE_90_DAYS = 1000 * 60 * 60 * 24 * 90
const CLEANUP_AGE = AGE_90_DAYS

let files = {}

if (fs.existsSync('dist/files.json')) {
  files = JSON.parse(fs.readFileSync('dist/files.json'))
}

for (const file in files) {
  const lastUpdated = files[file]
  const age = Date.now() - lastUpdated
  if (age > CLEANUP_AGE) {
    console.log(`Deleting ${file}`)
    const filename = `dist/${file}`
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename)
    }
  }
}
