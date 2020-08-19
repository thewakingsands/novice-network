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
            <div class="yaofan" v-if="showAd">
              <div class="yaofan-inner">
                <div class="yaofan-bg">
                  <p>
                    为平衡建站成本，本站《新大陆见闻录》在此处设有广告。<br />
                    如果你愿意取消对本站的广告屏蔽，这将是对我们莫大的支持。<br />
                    当然，你也可以通过
                    <router-link to="/about"> 捐赠</router-link>
                    来支持我们。
                  </p>
                </div>
                <ins
                  class="adsbygoogle yaofan-ad"
                  style="display:block"
                  data-ad-client="ca-pub-8304225030161579"
                  data-ad-slot="3871755301"
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

.yaofan-ad, .yaofan-bg
  width 728px
  height 90px
  @media screen and (max-width 960px)
    width 300px
    height 100px
.yaofan
  width 100%
  margin-top 16px
  display flex
  justify-content center
  .yaofan-inner
    position relative
  .yaofan-bg
    position absolute
    background #efefef
    color #888
    border 4px dashed #ccc
    display flex
    justify-content center
    align-items center
    padding 4px
    @media screen and (max-width 960px)
      font-size 0.9em
      border 2px dashed #ccc
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
      showMenu: false,
      showAd: false
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
    this.$beforeHook = this.$router.beforeEach((to, from, next) => {
      this.showAd = false
      next()
    })
    this.$afterHook = this.$router.afterEach((to, from) => {
      this.showAd = true
    })
    this.showAd = true
  },
  beforeDestroy() {
    if (this.$beforeHook) {
      this.$beforeHook()
    }
    if (this.$afterHook) {
      this.$afterHook()
    }
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
  },
  watch: {
    showAd(val) {
      if (val) {
        setTimeout(() => {
          try {
            // eslint-disable-next-line no-undef
            ;(adsbygoogle = window.adsbygoogle || []).push({})
          } catch (e) {
            console.warn('ads error', e)
          }
        }, 200)
      }
    }
  }
}
</script>
