<template>
  <div class="nav-top">
    <div class="ui inverted menu">
      <router-link to="/" class="header item">{{ $site.title }}</router-link>
      <div class="right menu">
        <a class="item" href="javascript:;" @click.prevent="scrollToTop">
          <i class="up angle icon"></i>
        </a>
        <a class="item" href="javascript:;">
          <i class="star outline icon"></i>
        </a>
        <a
          class="item"
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
    .right.menu
      .icon
        margin-right 0
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
</style>

<script>
import QRCode from 'qrcode'

export default {
  data() {
    return {
      showQr: false,
      dataUrl: ''
    }
  },
  methods: {
    scrollToTop() {
      var el = document.scrollingElement || window
      try {
        el.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (e) {
        el.scrollTop = 0
      }
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
