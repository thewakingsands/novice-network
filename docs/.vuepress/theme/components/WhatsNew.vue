<template>
  <div class="container" v-show="shouldShow">
    <div class="ui tertiary orange inverted segment">
      <div class="msg">
        本站现已支持
        <router-link to="/search.htm">站内搜索</router-link>
        ！点击左上角的搜索按钮即可搜索《新大陆见闻录》全站内容。
      </div>
      <i class="icon close" @click="dismiss"></i>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  max-width 1200px
  margin 0 auto
  padding-top 20px
.segment
  display flex
.msg
  flex 1
.close
  cursor pointer
</style>

<script>
const WHATS_NEW_ID = 'search-inside'

export default {
  data() {
    return {
      shouldShow: true
    }
  },
  methods: {
    dismiss() {
      this.shouldShow = false
      localStorage.whatsNew = WHATS_NEW_ID
      window.ma && window.ma.trackEvent('WhatsNew', 'dismiss', WHATS_NEW_ID)
      window._hmt &&
        window._hmt.push(['_trackEvent', 'WhatsNew', 'dismiss', WHATS_NEW_ID])
    }
  },
  mounted() {
    if (localStorage && localStorage.whatsNew === WHATS_NEW_ID) {
      this.shouldShow = false
    }
  }
}
</script>
