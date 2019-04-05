<template>
  <div class="nav-top">
    <div class="ui inverted menu">
      <router-link to="/" class="header item">{{ $site.title }}</router-link>
      <div class="right menu">
        <a class="item" href="javascript:;" @click.prevent="scrollToTop"
          ><i class="up angle icon"></i
        ></a>
        <a class="item" href="#"><i class="star outline icon"></i></a>
        <a class="item" href="#"><i class="qrcode icon"></i></a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.nav-top
  position fixed
  top 0
  left 0
  width 100%
  .ui.menu
    border-radius 0
    .right.menu
      .icon
        margin-right 0
</style>

<script>
export default {
  methods: {
    scrollToTop() {
      try {
        document
          .getElementById('scrolling-element')
          .scrollTo({ top: 0, behavior: 'smooth' })
      } catch (e) {
        document.getElementById('scrolling-element').scrollTop = 0
      }
    }
  }
}
</script>
