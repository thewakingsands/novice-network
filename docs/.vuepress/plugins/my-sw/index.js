const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  name: 'my-sw',

  define() {
    return {}
  },

  enhanceAppFiles: [path.resolve(__dirname, 'inject.js')]
})
