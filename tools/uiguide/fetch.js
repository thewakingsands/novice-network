const path = require('path')
const got = require('got')
const fs = require('fs')
const mkdirp = require('mkdirp')

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
  const resp = await got(url)
  const body = resp.body

  const relativeFilename = u.pathname.replace(/^\/+|\/+$/g, '') + '.html'
  const destFilename = path.join(__dirname, 'html', relativeFilename)
  const destPath = path.dirname(destFilename)

  console.log(`saving to ${relativeFilename} ...`)

  mkdirp.sync(destPath)
  fs.writeFileSync(destFilename, body)
}
