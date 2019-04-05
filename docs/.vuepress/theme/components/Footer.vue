<template>
  <div class="footer-container">
    <div class="colored-footer">
      <div class="status-line">
        <span>本页面最后编辑于 2020.20.20 20:20:20</span>
        <a href="#">修订历史</a>
        <a href="#">查看源码</a>
      </div>
      <div class="copyright-line copyright-self">
        <span>{{ $site.title }}</span>
        <router-link to="/">首页</router-link>
        <a href="#">联系</a>
      </div>
      <div class="copyright-line copyright-se">
        This site is not affiliated with Square Enix. FINAL FANTASY is a
        registered trademark of Square Enix Holdings Co., Ltd.
      </div>
      <div class="copyright-line copyright-se">
        Associated materials are copyright of FINAL FANTASY XIV © 2010 - 2019
        SQUARE ENIX CO., LTD. All Rights Reserved.
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
    margin-bottom 0.5em
  .copyright-se
    @media screen and (max-width: 480px)
      text-align left
  .copyright-line
    color #666
  .status-line
    color #333333
    margin-bottom 10px
</style>
