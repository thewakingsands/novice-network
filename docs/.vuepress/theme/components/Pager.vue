<template>
  <div class="page-pager">
    <div class="left" v-if="prev.href">
      <router-link :to="prev.href">
        <i class="caret left icon"></i> 上一篇：{{ prev.title }}
      </router-link>
    </div>
    <div class="right" v-if="next.href">
      <router-link :to="next.href">
        <i class="caret right icon"></i> 下一篇：{{ next.title }}
      </router-link>
    </div>
    <div class="clear"></div>
  </div>
</template>

<style lang="stylus">
.page-pager
  max-width 1200px
  font-size 16px
  margin 0 auto
  margin-top 2em
  line-height 2
  .left
    float left
  .right
    float right
  .clear
    clear both
</style>

<script>
import { TOC } from '@dynamic/toc'

export default {
  data() {
    return {
      next: {
        title: '',
        href: ''
      },
      prev: {
        title: '',
        href: ''
      }
    }
  },
  created() {
    var flatTitles = []
    for (var title1 of TOC.main) {
      flatTitles = flatTitles.concat(title1.children)
    }
    var index = flatTitles.findIndex(u => u.href === this.$page.path)
    if (index >= 0) {
      var next = flatTitles[index + 1]
      var prev = flatTitles[index - 1]
      if (next) {
        this.next = next
      }
      if (prev) {
        this.prev = prev
      }
    }
  }
}
</script>
