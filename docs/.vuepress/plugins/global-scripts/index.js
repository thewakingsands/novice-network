const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  name: 'global-scripts',

  define() {
    return {}
  },

  enhanceAppFiles: [path.resolve(__dirname, 'inject.js')]
})
