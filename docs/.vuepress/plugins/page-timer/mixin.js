import { getAsyncComponent, getVueComponent } from '@app/util'

export default {
  mounted() {
    this.$router.beforeEach(async (to, from, next) => {
      if (getVueComponent(to.name)) {
        return next()
      }
      if (typeof location === 'undefined') {
        return next()
      }

      try {
        new Promise(function (resolve, reject) {
          var timer = setTimeout(
            () => reject(new Error(`Get component ${to.name} timeout`)),
            2500
          )
          getAsyncComponent(to.name)().then(() => {
            clearTimeout(timer)
            resolve()
          }).catch(reject)
        })
        .then(next)
        .catch(function (e) {
          console.error(e)
          if (from.name) {
            location.href = to.fullPath
          } else {
            next()
          }
        })
      } catch (e) {
        console.error(e)
        if (from.name) {
          location.href = to.fullPath
        } else {
          next()
        }
      }
    })
  }
}
