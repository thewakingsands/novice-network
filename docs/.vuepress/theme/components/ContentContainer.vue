<template>
  <div class="content-container">
    <div class="content-container-inner" @click.capture="handleClick">
      <slot></slot>
      <Content v-for="key in slotKeys" :key="key" :slot-key="key" />
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
    blockquote
      border-left 0.4em solid #d9dde0
      margin 1em 0
      padding 1em 1em 1px
      background rgba(217, 221, 224, 0.25)
    @media screen and (max-width: 375px)
      padding 0 10px
      font-size 16px
    margin 1.5em auto
    font-size 18px
    table
      line-height 1.4em
      font-size 0.95em
    .scroll-focus
      background #fff59d
    p, ul, ol
      line-height 1.6
    ul, ol
      padding-left 1.5em
    img
      max-width 100%
      cursor zoom-in
      &.no-zoom
        cursor auto
      &.sm-icon
        vertical-align text-bottom
    .guide.col
      img~p
        color #999
        font-size .8em
    ins
      text-decoration none
      text-shadow 0px 0px 5px #FFEB3B
      color #000
    mark
      background-color #dcedc8
      padding 0 2px
      border-radius 4px
    strong
      font-weight normal
      color #ff5e00
      &.action
        color #00b5ad
    s
      color #888
    p:last-child
      margin-bottom 1em
    h1:last-child, h2:last-child, h3:last-child, h4:last-child, h5:last-child
      margin-bottom 1rem
    code
      display inline-block
      vertical-align text-top
      padding 0 5px
      font-size 0.8em
      border 1px solid #ddd
      border-radius 3px
      background #fcfcfc
    pre
      white-space pre-wrap
      max-width 100%
      max-height 16em
      overflow auto
    .local-time-chs, .eorzea-time-chs
      color #39393c
      padding 0 2px
.dark .content-container .content-container-inner /* 暗色模式 */
  s
    color #555
  mark
    background #366616
    color #f1dbdb
  blockquote
    border-left-color #4c4c4c
    background rgba(217, 221, 224, 0.1)
  code
    border-color #444
    background #000
  ins
    text-shadow 0px 0px 3px #ffc800
    color #fff
  .guide.col img~p
    color #6c6c6c
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
      this.getPhotoSwipe().openSingle(imgSrc, element)
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
