<template>
  <span title="点击在最终幻想XIV中文维基上查看详情">
    <a :href="wikiLink" target="_blank">
      <img
        src="https://huiji-public.huijistatic.com/ff14/uploads/2/21/061411.png"
        alt="任务"
        class="no-zoom"
      />{{ name }}</a
    >
  </span>
</template>
<style lang="stylus" scoped>
img
  vertical-align middle
  cursor pointer!important
</style>
<script>
export default {
  props: {
    name: String
  },
  computed: {
    wikiLink() {
      return (
        'https://ff14.huijiwiki.com/wiki/' +
        encodeURIComponent('任务') +
        ':' +
        encodeURIComponent(this.name)
      )
    }
  }
}
</script>
