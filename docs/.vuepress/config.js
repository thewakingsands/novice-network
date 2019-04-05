module.exports = {
  title: '萌新手册',
  markdown: {
    anchor: {
      permalink: false
    }
  },
  plugins: [
    require('./plugins/sidenav'),
    '@vuepress/last-updated',
    '@vuepress/nprogress'
  ]
}
