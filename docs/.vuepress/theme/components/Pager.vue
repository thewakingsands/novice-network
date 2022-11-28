<template>
  <div class="page-pager">
    <div class="left" v-if="prev.href">
      <router-link :to="prev.href">
        <i class="caret left icon"></i> {{ prev.title }}
      </router-link>
    </div>
    <div class="right" v-if="next.href">
      <router-link :to="next.href">
        <i class="caret right icon"></i> {{ next.title }}
      </router-link>
    </div>
    <div class="back right" v-else>
      <a href="javascript:history.back();">
        <span>◀ 返回</span>
      </a>
    </div>
    <div class="clear"></div>
  </div>
</template>

<style lang="stylus">
.page-pager
  max-width 1200px
  font-size 16px
  margin 0 auto
  margin-top 1em
  line-height 2
  .left
    float left
  .right
    float right
  .clear
    clear both
  .back
    background #a9a9a947
    border-radius 10px
    padding 3px 8px
    margin-right 0.5em
    a
      color #888
</style>

<script>
import { TOC } from '../toc'

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
    this.updatePager()
  },
  methods: {
    updatePager() {
      this.prev = {
        title: '',
        href: ''
      }
      this.next = {
        title: '',
        href: ''
      }
      var flatTitles = []
      for (var title1 of TOC.main) {
        flatTitles = flatTitles.concat(
          title1.children && title1.children.filter(x => !x.belongsTo)
        )
      }
      var index = flatTitles.findIndex(u => u && u.href === this.$page.path)
      if (index >= 0) {
        var next = flatTitles[index + 1]
        var prev = flatTitles[index - 1]
        if (next) {
          this.next = next
        } else {
          this.next = { title: '', href: '' }
        }
        if (prev) {
          this.prev = prev
        } else {
          this.prev = { title: '', href: '' }
        }
      }
    }
  },
  watch: {
    $page() {
      this.updatePager()
    }
  }
}
</script>
