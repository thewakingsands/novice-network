<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div
    class="pswp"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
    ref="container"
  >
    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button
            class="pswp__button pswp__button--close"
            title="关闭（Esc）"
          ></button>

          <button class="pswp__button pswp__button--fs" title="全屏"></button>

          <button class="pswp__button pswp__button--zoom" title="缩放"></button>

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip"></div>
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          title="上一张（左箭头）"
        ></button>

        <button
          class="pswp__button pswp__button--arrow--right"
          title="下一张（右箭头）"
        ></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

export default {
  data() {
    return {
      instance: null
    }
  },
  methods: {
    openSingle(url) {
      if (this.instance) {
        try {
          this.instance.destroy()
        } catch (e) {}
      }
      var img = new Image(url)
      img.src = url
      img.removeAttribute('width')
      img.removeAttribute('height')
      var width = img.naturalWidth || img.width
      var height = img.naturalHeight || img.height
      var instance = new PhotoSwipe(
        this.$refs.container,
        PhotoSwipeUIDefault,
        [
          {
            src: url,
            w: width || 1000,
            h: height || 1000
          }
        ],
        {
          index: 0,
          history: false
        }
      )
      instance.init()
      if (!width || !height) {
        img.onload = img.onloadedmetadata = () => {
          if (width !== img.width || height !== img.height) {
            width = instance.items[0].width = img.naturalWidth || img.width
            height = instance.items[0].height = img.naturalHeight || img.height
            instance.invalidateCurrItems()
            instance.updateSize(true)
          }
        }
      }
      this.instance = instance
    }
  }
}
</script>
