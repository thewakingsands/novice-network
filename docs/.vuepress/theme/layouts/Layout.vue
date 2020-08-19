<template>
  <Root class="root-container" :class="$page.frontmatter.className">
    <div class="main-container full-height">
      <div class="content-outer full-height">
        <div class="content-inner full-height">
          <NavTop @barClicked="showMenu = !showMenu" />
          <slot>
            <Duty v-if="$page.frontmatter.instance" />
            <WebFrame
              v-else-if="$page.frontmatter.webframe"
              :src="$page.frontmatter.webframe"
            />
            <div v-else>
              <WhatsNew />
              <Pager v-if="!$page.frontmatter.noTopPager" />
              <ContentContainer />
              <Pager />
            </div>
            <div class="yaofan">
              <div class="yaofan-bg">
                <div class="yaofan-bg-inner">
                  <p>
                    为平衡建站成本，本站《新大陆见闻录》在此处设有广告。<br />
                    如果你愿意取消对本站的广告屏蔽，这将是对我们莫大的支持。<br />
                    当然，你也可以通过
                    <router-link to="/about"> 捐赠</router-link>
                    来支持我们。
                  </p>
                </div>
              </div>
              <div class="yaofan-inner">
                <ins
                  class="adsbygoogle"
                  style="display:block"
                  data-ad-client="ca-pub-8304225030161579"
                  data-ad-slot="3871755301"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
            <Footer />
          </slot>
        </div>
      </div>
      <div class="nav-menu">
        <NavMenu v-model="showMenu" />
      </div>
    </div>
    <PhotoSwipe ref="photoSwipe" />
  </Root>
</template>

<style lang="stylus">
.main-container
  display flex
  flex-direction row
.nav-menu
  order 1
.content-outer
  order 2
  flex 1
  padding-top 40px
  padding-left 280px
  width 100%
  @media screen and (max-width: 1200px) and (min-width: 961px)
    padding-left 250px
  @media screen and (max-width: 960px)
    padding-left 0
@media screen and (min-width 961px)
  .hide-large
    display none
@media screen and (max-width 960px)
  .hide-small
    display none
.yaofan
  width 100%
  margin-top 16px
  min-height 90px
  position relative
  .yaofan-bg
    position absolute
    top 0
    left 0
    width 100%
    height 90px
    display flex
    justify-content center
    .yaofan-bg-inner
      background #efefef
      width 50%
      min-width 500px
      height 100%
      display flex
      justify-content center
      align-items center
      color #888
      @media screen and (max-width 960px)
        width 100%
        max-width 500px
      border 4px dashed #ccc
</style>

<script>
import Root from './Root.vue'
import Duty from './Duty.vue'
import WebFrame from './WebFrame.vue'
import NavMenu from '../components/NavMenu'
import WhatsNew from '../components/WhatsNew'
import NavTop from '../components/NavTop'
import Footer from '../components/Footer'
import Pager from '../components/Pager'
import ContentContainer from '../components/ContentContainer'
import PhotoSwipe from '../components/PhotoSwipe'

export default {
  data() {
    return {
      showMenu: false
    }
  },
  components: {
    Root,
    NavMenu,
    ContentContainer,
    NavTop,
    Footer,
    Pager,
    PhotoSwipe,
    Duty,
    WebFrame,
    WhatsNew
  },
  provide() {
    return {
      getPhotoSwipe: this.getPhotoSwipe,
      gotoId: this.gotoId
    }
  },
  mounted() {
    import('@thewakingsands/kit-tooltip').then(x => x.initTooltip())
  },
  methods: {
    getPhotoSwipe() {
      return this.$refs.photoSwipe
    },
    gotoId(id) {
      var scrollTop = 0
      if (id) {
        var scrollToEl = document.getElementById(id)
        if (!scrollToEl) {
          scrollToEl = document.getElementsByName(id)
          if (!scrollToEl) return
          scrollToEl = scrollToEl[0]
        }
        scrollToEl.classList.add('scroll-focus')
        setTimeout(() => {
          scrollToEl && scrollToEl.classList.remove('scroll-focus')
        }, 3000)
        scrollTop = scrollToEl.offsetTop - 45
      }
      var el = document.scrollingElement || window
      try {
        el.scrollTo({ top: scrollTop, behavior: 'smooth' })
      } catch (e) {
        el.scrollTop = scrollTop
      }
    }
  }
}
</script>
