<template>
  <p class="icon-header">
    <img class="no-zoom" :src="$withBase(img)" />
    <span><slot /></span>
  </p>
</template>

<style lang="stylus">
.icon-header
  > img
    width 2.5em
    height 2.5em
  > img, > span
    vertical-align middle
  > span
    font-size 1.5em
    font-weight bold
</style>

<script>
export default {
  props: {
    img: String
  }
}
</script>
