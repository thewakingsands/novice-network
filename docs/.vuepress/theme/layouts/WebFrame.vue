<template>
  <div class="webframe-container">
    <iframe ref="iframe" :src="src" noborder></iframe>
  </div>
</template>

<style lang="stylus" scoped>
.webframe-container
  height 100%
  width 100%
iframe
  width 100%
  height 100%
  border none
</style>

<script>
export default {
  props: {
    src: String
  }
}
</script>
