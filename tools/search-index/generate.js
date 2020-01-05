const glob = require('glob').sync
const fs = require('fs')
const cheerio = require('cheerio')
const fetch = require('isomorphic-fetch')

const htmlFiles = glob('dist/**/*.{html,htm}')

const indices = []

console.log('Generating search index...')

for (const filename of htmlFiles) {
  const url = filename.replace(/^dist[\\/]/, '').replace(/[\\/]+/g, '/')
  if (url === '404.html') {
    continue
  }

  const rawContent = fs.readFileSync(filename).toString()
  const $ = cheerio.load(rawContent)
  const indexObject = {
    url,
    title: $('title')
      .text()
      .replace(' | 新大陆见闻录 - 《最终幻想14》萌新指导手册', ''),
    body: $('.content-container').text()
  }
  indices.push(indexObject)
}

const body = JSON.stringify(indices)
console.log(
  `Putting ${Buffer.from(body).length} bytes (${
    indices.length
  } items) of index to server ...`
)

fetch(`${process.env.INDEX_SERVER}/index`, {
  method: 'PUT',
  body: JSON.stringify(indices),
  headers: {
    'Content-Type': 'application/json',
    'X-Update-Key': process.env.UPDATE_KEY
  }
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error)
