const path = require('path')
const glob = require('glob')
const fs = require('fs')
const cheerio = require('cheerio')
const diff = require('diff')
const mkdirp = require('mkdirp')

function getFiles() {
  return glob.sync(path.join(__dirname, 'html', 'uiguide', '*.html'))
}

function loadDocument(filename) {
  const contents = fs.readFileSync(filename, 'utf-8')
  return cheerio.load(contents)
}

function findPairs($) {
  const textPairs = []
  const imgPairs = []

  $('.uig-view__keyboard').each(function() {
    const $this = $(this)
    const $gamepad = $this.next('.uig-view__gamepad')

    const textKeyboard = $this.text().trim()
    const textGamepad = $gamepad.text().trim()

    if (textKeyboard !== textGamepad) {
      textPairs.push([textKeyboard, textGamepad])
    }

    const $imgsGamepad = $gamepad.find('.uig-img')

    $this.find('.uig-img').each(function(index) {
      const imgKey = $(this).attr('src')
      const imgGamepad = $imgsGamepad.eq(index).attr('src')

      if (imgKey !== imgGamepad) {
        imgPairs.push([imgKey, imgGamepad])
      }
    })
  })

  return [textPairs, imgPairs]
}

function main() {
  const files = getFiles()
  const imgs = {}

  for (const file of files) {
    console.log(`loading ${file}`)

    const outDir = path.dirname(file).replace('html', 'diff')
    mkdirp(outDir)

    const document = loadDocument(file)
    const [textPairs, imgPairs] = findPairs(document)

    const lines = textPairs.reduce(
      (p, c) => {
        p[0].push(c[0])
        p[1].push(c[1])
        return p
      },
      [[], []]
    )

    if (lines[0].length > 0) {
      const patch = diff.createPatch(
        file.replace(__dirname, ''),
        lines[0].join('\n'),
        lines[1].join('\n')
      )

      fs.writeFileSync(
        file.replace('html', 'diff').replace(/\.html$/, '.patch'),
        patch
      )
    }

    if (imgPairs.length > 0) {
      imgs[path.basename(file).replace(/\.html/, '')] = imgPairs
    }
  }

  fs.writeFileSync(
    'docs/.vuepress/theme/pairs.json',
    JSON.stringify(imgs, null, 2)
  )
}

main()
