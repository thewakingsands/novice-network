<template>
  <div class="content-container">
    <div class="content-container-inner" @click.capture="handleClick">
      <Content v-for="key in slotKeys" :key="key" :slot-key="key" />
    </div>
  </div>
</template>

<style lang="stylus">
.content-container
  width 100%
  table
    td
      border 1px solid #999
      padding 4px
    border-collapse collapse
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
      &.no-zoom
        cursor auto
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
    p:last-child
      margin-bottom 1em
    h1:last-child, h2:last-child, h3:last-child, h4:last-child, h5:last-child
      margin-bottom 1rem
</style>

<script>
export default {
  inject: ['getPhotoSwipe', 'gotoId'],
  data() {
    return {
      slotKeys: ['default']
    }
  },
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
      if (element.classList.contains('no-zoom')) return
      var imgSrc = element.src
      this.getPhotoSwipe().openSingle(imgSrc)
    },
    updateSlotKeys() {
      if (
        this.$page &&
        this.$page.frontmatter &&
        this.$page.frontmatter.slots
      ) {
        this.slotKeys = this.$page.frontmatter.slots
      } else {
        this.slotKeys = ['default']
      }
    }
  },
  watch: {
    $page() {
      this.updateSlotKeys()
    }
  },
  created() {
    this.updateSlotKeys()
  }
}
</script>
