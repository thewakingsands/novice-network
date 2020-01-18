import { getAsyncComponent, getVueComponent } from '@app/util'

export default {
  mounted() {
    this.$router.beforeEach(async (to, from, next) => {
      if (getVueComponent(to.name)) {
        return next()
      }

      try {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(
            () => reject(new Error(`Get component ${to.name} timeout`)),
            2500
          )
          getAsyncComponent(to.name)().then(() => {
            clearTimeout(timer)
            resolve()
          })
        })
        next()
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
