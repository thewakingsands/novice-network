<template>
  <p class="icon-header">
    <img class="no-zoom" :src="$withBase(img)" />
    <span><slot /></span>
  </p>
</template>

<style lang="stylus">
.icon-header
  > img
    width 32px
    height 32px
  > img, > span
    vertical-align middle
  > span
    font-size 20px
</style>

<script>
export default {
  props: {
    img: String
  }
}
</script>
