import Theme from './Theme.vue'
import { withBase } from 'vitepress'
import { initBrowser } from './utils/browser'

const components = import.meta.glob('./global-components/*.vue', { eager: true })

export default {
  Layout: Theme,
  enhanceApp({ app, router }) {
    if (import.meta.env.SSR) {
      app.config.throwUnhandledErrorInProduction = true
    }
    for (const [file, module] of Object.entries(components)) {
      app.component(file.split('/').pop().replace(/\.vue$/, ''), module.default)
    }
    app.config.globalProperties.$withBase = withBase
    if (!import.meta.env.SSR) initBrowser(router)
  }
}
