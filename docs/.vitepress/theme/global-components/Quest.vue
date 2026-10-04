<template>
  <span title="点击在最终幻想XIV中文维基上查看详情">
    <a :href="wikiLink" target="_blank">
      <img :src="icon" alt="任务" class="no-zoom" />{{ name }}</a
    >
  </span>
</template>
<style lang="stylus" scoped>
img
  vertical-align middle
  cursor pointer!important
</style>
<script>
const images = {
  main: '/images/icons/061412.png',
  side: '/images/icons/061411.png',
  plus: '/images/icons/061419.png'
}

export default {
  props: {
    name: String,
    type: {
      type: String,
      default: 'side'
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon() {
      return images[this.type]
    },
    wikiLink() {
      if (this.search) {
        return (
          'https://ff14.huijiwiki.com/index.php?title=QuestSearch&name=' +
          encodeURIComponent(this.name)
        )
      } else {
        return (
          'https://ff14.huijiwiki.com/wiki/' +
          encodeURIComponent('任务') +
          ':' +
          encodeURIComponent(this.name)
        )
      }
    }
  }
}
</script>
