const scripts = new Map()

function loadScript(src) {
  if (!scripts.has(src)) {
    scripts.set(src, new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = resolve
      script.onerror = () => reject(new Error(`无法加载 ${src}`))
      document.head.appendChild(script)
    }))
  }
  return scripts.get(src)
}

function loadStyle(href) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

async function initMaps() {
  loadStyle('https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css')
  loadStyle('https://cdn.jsdelivr.net/npm/@thewakingsands/eorzea-interactive-map@1.1.1/dist/map.css')
  await loadScript('https://cdn.jsdelivr.net/npm/jquery@4.0.0/dist/jquery.min.js')
  await loadScript('https://cdn.jsdelivr.net/npm/@thewakingsands/eorzea-interactive-map@1.1.1/dist/map.js')
  await import('./mapLoader')
}

export function initBrowser(router) {
  initMaps().catch(console.error)
  if (!import.meta.env.PROD || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return

  if (location.hostname !== 'ff14.org') {
    location.hostname = 'ff14.org'
    return
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error)
  }
  window._hmt = window._hmt || []
  loadScript('https://hm.baidu.com/hm.js?215a46d31e2c4aaa8e1cdd94fcfe8aa4').catch(console.error)
  router.onAfterRouteChange = path => window._hmt.push(['_trackPageview', path])
}
