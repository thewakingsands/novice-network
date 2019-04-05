var fs = require('fs')
var path = require('path')

module.exports = (options, ctx) => {
  return {
    name: 'sidenav-plugin',
    clientDynamicModules() {
      // eslint-disable-next-line no-eval
      var toc = eval(
        fs
          .readFileSync(path.join(ctx.sourceDir, '.vuepress', 'toc.js'))
          .toString()
      )
      return {
        name: 'toc.js',
        content: `export const TOC = ${JSON.stringify(toc)}`
      }
    }
  }
}
