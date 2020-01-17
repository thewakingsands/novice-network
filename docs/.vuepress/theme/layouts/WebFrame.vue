<template>
  <div>
    <iframe
      ref="iframe"
      :style="{ height: iframeHeight }"
      :src="src"
      noborder
      @load="frameload"
    ></iframe>
  </div>
</template>

<style lang="stylus" scoped>
iframe
  width 100%
  border none
</style>

<script>
export default {
  data() {
    return {
      iframeHeight: 200
    }
  },
  props: {
    src: String
  },
  mounted() {},
  methods: {
    frameload() {
      const iframe = this.$refs.iframe
      console.log('iframe loaded!', iframe)
      const height = iframe.contentWindow.document.body.getBoundingClientRect()
        .height
      console.log('height', height)
      this.iframeHeight = Math.round(height) + 1 + 'px'
    }
  }
}
</script>
