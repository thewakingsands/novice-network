<template>
  <div class="content-container">
    <div class="content-container-inner" @click.capture="handleClick">
      <Content />
    </div>
  </div>
</template>

<style lang="stylus">
.content-container
  width 100%
  .content-container-inner
    max-width 1200px
    padding 0 20px
    word-break break-all
    @media screen and (max-width: 375px)
      padding 0 10px
      font-size 16px
    margin 1.5em auto
    font-size 18px
    .scroll-focus
      background #fff59d
    p, ul, ol
      line-height 1.6
    img
      max-width 100%
    ins
      text-decoration none
      text-shadow 0px 0px 1px #FFEB3B, 0px 0px 5px #FFEB3B, 0px 0px 10px #FFEB3B
      color #000
    mark
      background-color #dcedc8
    strong
      font-weight normal
      color #d84315
    s
      color #888
</style>

<script>
export default {
  methods: {
    handleClick(event) {
      var element = event.target
      while (element.tagName !== 'A') {
        element = element.parentElement
        if (!element) return
      }
      if (element.origin !== location.origin) return
      if (element.pathname !== location.pathname) return
      if (element.search !== location.search) return
      var hash = element.hash
      var scrollTop = 0
      if (hash) {
        var id = decodeURIComponent(hash.slice(1))
        var scrollToEl = document.getElementById(id)
        if (!scrollToEl) {
          scrollToEl = document.getElementsByName(id)
          if (!scrollToEl) return
          scrollToEl = scrollToEl[0]
        }
        scrollToEl.classList.add('scroll-focus')
        setTimeout(() => {
          scrollToEl && scrollToEl.classList.remove('scroll-focus')
        }, 3000)
        scrollTop = scrollToEl.offsetTop - 45
      }
      var el = document.scrollingElement || window
      try {
        el.scrollTo({ top: scrollTop, behavior: 'smooth' })
      } catch (e) {
        el.scrollTop = scrollTop
      }
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>
