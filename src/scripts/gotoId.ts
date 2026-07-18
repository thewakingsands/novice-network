// 复刻原 Layout.vue 的 gotoId：平滑滚动、-45px 顶栏偏移、3 秒 .scroll-focus 高亮。
export function gotoId(id: string): void {
  const scroller = document.scrollingElement || document.documentElement
  let scrollTop = 0
  if (id) {
    let el = document.getElementById(id)
    if (!el) {
      const named = document.getElementsByName(id)
      if (!named.length) return
      el = named[0] as HTMLElement
    }
    el.classList.add('scroll-focus')
    setTimeout(() => el?.classList.remove('scroll-focus'), 3000)
    scrollTop = el.getBoundingClientRect().top + scroller.scrollTop - 45
  }
  try {
    scroller.scrollTo({ top: scrollTop, behavior: 'smooth' })
  } catch {
    scroller.scrollTop = scrollTop
  }
}

/** 正文/TOC 内的同页锚点链接统一走平滑滚动 */
export function bindAnchorScroll(root: ParentNode = document): void {
  root.addEventListener('click', (event) => {
    let el = event.target as HTMLElement | null
    while (el && el.tagName !== 'A') el = el.parentElement
    if (!el) return
    const a = el as HTMLAnchorElement
    if (a.origin !== location.origin) return
    if (a.pathname !== location.pathname) return
    if (a.search !== location.search) return
    const hash = a.hash
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''
    gotoId(id)
    event.preventDefault()
  })
}
