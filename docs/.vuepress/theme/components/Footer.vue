<template>
  <div class="footer-container">
    <div class="colored-footer">
      <div class="status-line">
        <a target="_blank" rel="noopener noreferer" :href="historyLink">
          修订历史
        </a>
        |
        <a target="_blank" rel="noopener noreferer" :href="editLink">
          编辑本页
        </a>
        |
        <a target="_blank" rel="noopener noreferer" :href="feedbackLink">
          反馈问题
        </a>
        |
        <router-link to="/about"> 关于&amp;捐赠 </router-link>
      </div>
      <div class="status-line">
        《新大陆见闻录》是<a href="https://ffcafe.org/" target="_blank">肥肥咖啡</a>的一个子项目，欢迎<a href="https://ffcafe.org/join-us/">加入我们</a>！
      </div>
        <a
          href="https://travis-ci.org/thewakingsands/novice-network"
          rel="noopener noreferer"
          target="_blank"
        >
          <img
            src="https://travis-ci.org/thewakingsands/novice-network.svg?branch=master"
          />
        </a>
        <a
          href="https://vuepress.vuejs.org/"
          rel="noopener noreferer"
          target="_blank"
        >
          <img src="https://img.shields.io/badge/generator-VuePress-46b683" />
        </a>
      </div>
      <div class="copyright-line copyright-se">
        FINAL FANTASY XIV © 2010 - 2020 SQUARE ENIX CO., LTD. All Rights
        Reserved.
        <router-link to="/takedown">
          Reporting Copyright Infringement(版权投诉)
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
    img
      vertical-align middle
      margin 0 0.25em
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
    },
    feedbackLink() {
      return (
        'https://i.duotai.net/forms/zxjg2/wh956yns?url=' +
        this.$page.relativePath
      )
    }
  }
}
</script>
