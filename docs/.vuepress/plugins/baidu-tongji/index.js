const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  define() {
    const { siteConfig = {} } = context
    const id = options.id || siteConfig.id
    const HM_ID = id || false
    return { HM_ID }
  },

  enhanceAppFiles: [path.resolve(__dirname, 'inject.js')]
})
