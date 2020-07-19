let timer = null

export default {
  mounted() {
    this.$router.beforeEach(async (to, from, next) => {
      clearTimeout(timer)
      next()
      if (typeof location === 'undefined') {
        return
      }
      if (from.path === to.path) {
        return
      }
      var oldPath = location.href
      timer = setTimeout(function() {
        if (to.path !== location.pathname && location.href === oldPath) {
          if (from.name) {
            location.href = to.fullPath
          }
        }
      }, 2400)
    })
  }
}
