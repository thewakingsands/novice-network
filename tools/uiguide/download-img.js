const path = require('path')
const got = require('got')
const fs = require('fs')
const pairs = require('../../docs/.vuepress/theme/pairs.json')

async function main() {
  for (const dir in pairs) {
    const urls = pairs[dir].map(x => x[1])
    for (const url of urls) {
      console.log(`downloading ${url}`)

      const resp = await got(url, { encoding: null })
      const buf = resp.body

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
