<template>
  <div class="nav-top">
    <div class="ui inverted menu">
      <a
        href="javascript:;"
        class="item icon-item hide-large"
        @click.prevent="$emit('barClicked')"
      >
        <i class="bars icon"></i>
      </a>
      <router-link class="item icon-item hide-small" to="/">
        <i class="home angle icon"></i>
      </router-link>
      <a
        class="item icon-item hide-small"
        href="javascript:;"
        @click.prevent="scrollToTop"
      >
        <i class="up angle icon"></i>
      </a>
      <a
        href="javascript:;"
        @click="showToc = !showToc"
        class="item page-title"
      >
        <i class="caret icon" :class="{ right: !showToc, down: showToc }"></i>
        {{ $page.title }}
      </a>
      <div class="right menu">
        <a class="item icon-item" href="javascript:;">
          <i class="star outline icon"></i>
        </a>
        <a
          class="item icon-item hide-small"
          href="javascript:;"
          @mouseenter="showQr = true"
          @mouseleave="showQr = false"
        >
          <i class="qrcode icon"></i>
        </a>
      </div>
    </div>
    <div class="qr-container" v-if="showQr">
      <div><img :src="dataUrl" /></div>
      <p>
        使用手机扫描二维码，即可在手机上阅读本文。如遇微信无法打开，请使用自带浏览器或谷歌浏览器。
      </p>
    </div>
    <div class="toc-container" v-if="showToc" @click.capture="handleClick">
      <TOC class="toc" />
    </div>
  </div>
</template>

<style lang="stylus">
.nav-top
  position fixed
  z-index 100
  top 0
  left 0
  width 100%
  .ui.menu
    border-radius 0
    .page-title
      flex 1
      word-break break-all
      overflow hidden
      height 40px
      justify-content center
    .icon-item
      padding 0 12px
      > .icon
        margin-right 0
    @media screen and (min-width 961px)
      .hide-large
        display none
    @media screen and (max-width 960px)
      .hide-small
        display none
  .qr-container
    position fixed
    top 40px
    right 0
    width 320px
    background #fff
    box-shadow 2px 2px 6px 0px grey
    p
      padding 10px
      padding-top 0
  .toc-container
    position fixed
    top 40px
    width 100%
    display flex
    justify-content center
    .toc
      background #3f3f3f
      font-size 18px
      width 100%
      max-width 480px
      padding-bottom 0.5em
      ul
        margin 0
        padding 0
        padding-left 1em
        font-size 95%
      li
        list-style none
      a
        display block
        padding 0.5em 1.5em
        color rgba(255, 255, 255, 0.5)
        &:hover, &.active
          color #fff
</style>

<script>
import QRCode from 'qrcode'

export default {
  inject: ['gotoId'],
  data() {
    return {
      showQr: false,
      showToc: false,
      dataUrl: ''
    }
  },
  methods: {
    scrollToTop() {
      this.gotoId('')
    },
    handleClick(event) {
      var element = event.target
      while (element) {
        if (element.tagName === 'A') {
          this.handleClickLink(element, event)
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
      this.showToc = false
      event.preventDefault()
      event.stopPropagation()
    }
  },
  watch: {
    showQr(val) {
      if (!val) {
        this.dataUrl = ''
        return
      }
      QRCode.toDataURL(
        location.origin + this.$withBase(this.$page.path),
        { width: 320, margin: 2 },
        (err, res) => {
          if (err) return
          this.dataUrl = res
        }
      )
    }
  }
}
</script>
