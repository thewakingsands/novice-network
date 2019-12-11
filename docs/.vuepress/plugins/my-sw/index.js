const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  define() {
    return {}
  },

  enhanceAppFiles: [path.resolve(__dirname, 'inject.js')]
})
