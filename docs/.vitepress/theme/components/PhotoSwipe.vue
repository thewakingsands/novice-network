<template><span hidden></span></template>

<script>
import { markRaw } from 'vue'
import 'photoswipe/style.css'

export default {
  data() { return { instance: null } },
  beforeUnmount() { this.instance?.destroy() },
  methods: {
    async openSingle(url, element) {
      const { default: PhotoSwipe } = await import('photoswipe')
      this.instance?.destroy()
      const img = element || new Image()
      if (!element) img.src = url
      if (!img.naturalWidth) {
        try { await img.decode() } catch {}
      }
      this.instance = markRaw(new PhotoSwipe({
        dataSource: [{ src: url, width: img.naturalWidth || 1024, height: img.naturalHeight || 1024, alt: img.alt || '' }],
        index: 0,
        closeTitle: '关闭（Esc）',
        zoomTitle: '缩放',
        arrowPrevTitle: '上一张',
        arrowNextTitle: '下一张'
      }))
      this.instance.init()
    }
  }
}
</script>
