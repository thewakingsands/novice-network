<template>
  <div class="footer-container">
    <div class="colored-footer">
      <div class="status-line">
        <span v-if="$page.lastUpdated"> {{ $page.lastUpdated }} | </span>
        <a target="_blank" rel="noopener noreferer" :href="historyLink">
          历史
        </a>
        |
        <a target="_blank" rel="noopener noreferer" :href="editLink">
          编辑
        </a>
        |
        <a target="_blank" rel="noopener noreferer" :href="sourceLink">
          源码
        </a>
      </div>
      <div class="copyright-line copyright-self">
        <router-link to="/">{{ $site.title }}</router-link>
        is powered by
        <a
          href="https://vuepress.vuejs.org/"
          rel="noopener noreferer"
          target="_blank"
        >
          VuePress
        </a>
        ,
        <a
          href="https://travis-ci.org/thewakingsands/novice-network"
          rel="noopener noreferer"
          target="_blank"
        >
          Travis CI
        </a>
        and
        <a
          href="https://github.com/thewakingsands/novice-network-pages/deployments"
          rel="noopener noreferer"
          target="_blank"
        >
          GitHub Pages
        </a>
        .
        <router-link to="/about.html">
          关于
        </router-link>
      </div>
      <div class="copyright-line copyright-se">
        This site is not affiliated with Square Enix. FINAL FANTASY is a
        registered trademark of Square Enix Holdings Co., Ltd.
        <br />
        Associated materials are copyright of FINAL FANTASY XIV © 2010 - 2019
        SQUARE ENIX CO., LTD. All Rights Reserved.
        <router-link to="/takedown.html">
          Reporting Copyright Infringement
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.footer-container
  margin 0 60px
  margin-top 20px
  border-top 1px solid #eee
  @media screen and (max-width: 480px)
    margin-left 10px
    margin-right 10px
    margin-bottom 40px
  .colored-footer
    padding-top 20px
    padding-bottom 20px
    text-align center
  .copyright-self
    margin-bottom 1em
  .copyright-line
    color #666
  .copyright-se
    text-align left
    color #999
  .status-line
    color #333333
    margin-bottom 10px
</style>

<script>
export default {
  computed: {
    historyLink() {
      return (
        'https://github.com/thewakingsands/novice-network/blame/master/docs/' +
        this.$page.relativePath
      )
    },
    editLink() {
      return (
        'https://github.com/thewakingsands/novice-network/edit/master/docs/' +
        this.$page.relativePath
      )
    },
    sourceLink() {
      return (
        'https://raw.githubusercontent.com/thewakingsands/novice-network/master/docs/' +
        this.$page.relativePath
      )
    }
  }
}
</script>
