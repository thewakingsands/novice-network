<template>
  <img
    :src="$withBase('/images/jobs/' + name + '.png')"
    class="no-zoom sm-icon" height="20"
  />
</template>
<style lang="stylus" scoped>
img {
  margin-right 0.1em
}
</style>
<script>
export default {
  props: {
    name: String
  }
}
</script>