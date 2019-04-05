module.exports = {
  title: 'sitename here',
  markdown: {
    anchor: {
      permalink: false
    }
  },
  plugins: [require('./plugins/sidenav'), '@vuepress/last-updated']
}
