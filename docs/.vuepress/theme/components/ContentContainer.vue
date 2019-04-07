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
      cursor zoom-in
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
  inject: ['getPhotoSwipe', 'gotoId'],
  methods: {
    handleClick(event) {
      var element = event.target
      while (element) {
        if (element.tagName === 'A') {
          this.handleClickLink(element, event)
          break
        }
        if (element.tagName === 'IMG') {
          this.handleClickImg(element, event)
          break
        }
        element = element.parentElement
      }
    },
    handleClickLink(element, event) {
      if (element.origin !== location.origin) return
      if (element.pathname !== location.pathname) return
      if (element.search !== location.search) return
      var hash = element.hash
      var id = ''
      if (hash) {
        id = decodeURIComponent(hash.slice(1))
      }
      this.gotoId(id)
      event.preventDefault()
      event.stopPropagation()
    },
    handleClickImg(element, event) {
      var imgSrc = element.src
      this.getPhotoSwipe().openSingle(imgSrc)
    }
  }
}
</script>
