const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  name: 'page-timer',

  define() {
    return {}
  },

  clientRootMixin: path.resolve(__dirname, 'mixin.js')
})
