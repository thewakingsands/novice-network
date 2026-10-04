const path = require('path')
const fs = require('fs')
const pairs = require('../../docs/.vitepress/theme/pairs.json')

async function main() {
  for (const dir in pairs) {
    const urls = pairs[dir].map(x => x[1])
    for (const url of urls) {
      console.log(`downloading ${url}`)

      const resp = await fetch(url)
      if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${url}`)
      const buf = Buffer.from(await resp.arrayBuffer())

      const filename = path.join(
        'docs',
        'ui',
        `${dir}.assets`,
        path.basename(url)
      )

      fs.writeFileSync(filename, buf)
    }
  }
}

main()
