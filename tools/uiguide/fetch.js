const path = require('path')
const fs = require('fs')

const urls = fs
  .readFileSync(path.join(__dirname, 'urls.txt'), 'utf-8')
  .split('\n')
  .filter(x => x)

fetchAll(urls).catch(e => console.error(e))

async function fetchAll(urls) {
  for (const url of urls) {
    await fetchSingle(url)
  }
}

async function fetchSingle(url) {
  console.log(`fetching ${url} ...`)
  const u = new URL(url)
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${url}`)
  const body = await resp.text()

  const relativeFilename = u.pathname.replace(/^\/+|\/+$/g, '') + '.html'
  const destFilename = path.join(__dirname, 'html', relativeFilename)
  const destPath = path.dirname(destFilename)

  console.log(`saving to ${relativeFilename} ...`)

  fs.mkdirSync(destPath, { recursive: true })
  fs.writeFileSync(destFilename, body)
}
