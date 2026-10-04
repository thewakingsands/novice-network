<template>
  <Root class="root-container" :class="[page.frontmatter.className, {dark: isDark}]">
    <div class="main-container">
      <div
        class="content-outer"
        :class="{ fullscreen: !!page.frontmatter.webframe }"
      >
        <div class="content-inner">
          <NavTop @barClicked="showMenu = !showMenu" @toggleDark="isDark = !isDark" :isDark="isDark" />
          <slot>
            <!--如果是instance渲染duty，如果是webframe渲染webframe，其他渲染普通页面-->
            <Duty v-if="page.frontmatter.instance" />
            <WebFrame
              v-else-if="page.frontmatter.webframe"
              :src="page.frontmatter.webframe"
            />
            <main v-else>
              <WhatsNew />
              <Pager v-if="!page.frontmatter.noTopPager" />
              <ContentContainer />
              <Pager />
            </main>
            <footer class="yaofan" v-if="showAd && !page.frontmatter.webframe">
              <div class="yaofan-inner">
                <div class="yaofan-bg">
                  <p>
                    为平衡建站成本，本站《新大陆见闻录》在此处设有广告。<br />
                    如果你愿意取消对本站的广告屏蔽，这将是对我们莫大的支持。<br />
                    当然，你也可以通过
                    <a href="/about.htm"> 捐赠</a>
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
            </footer>
            <Footer v-if="!page.frontmatter.webframe" />
          </slot>
        </div>
      </div>
      <nav class="nav-menu">
        <NavMenu v-model="showMenu" />
      </nav>
    </div>
    <PhotoSwipe ref="photoSwipe" />
  </Root>
</template>

<style lang="stylus">
#root
  background repeating-linear-gradient(0deg, #f8f8f8, #f8f8f8 1px, white 1px, white 2px)
  transition all .5s
  &.dark 
    background #1b1c1d
.home-page .content-container-inner
  max-width 100%
.main-container
  display flex
  flex-direction row
.nav-menu
  order 1
.content-outer
  order 2
  flex 1
  margin-top 40px
  padding-left 250px
  width 100%
  min-height 100vh
  @media screen and (max-width: 1200px) and (min-width: 961px)
    padding-left 250px
  @media screen and (max-width: 960px)
    padding-left 0
  &.fullscreen
    padding-left 260px
    overflow hidden
    @media screen and (max-width: 1200px) and (min-width: 961px)
      padding-left 240px
    @media screen and (max-width: 960px)
      padding-left 0
@media screen and (min-width 961px)
  .hide-large
    display none !important
@media screen and (max-width 960px)
  .hide-small
    display none !important


.yaofan-ad, .yaofan-bg, .yaofan-inner
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
.job-page
  .content-container 
    .content-container-inner
      width 1300px
      max-width 100%
    aside
      display none
    </style>

<script>
import { usePage } from "../utils/page"
import Root from './Root.vue'
import Duty from './Duty.vue'
import WebFrame from './WebFrame.vue'
import NavMenu from '../components/NavMenu.vue'
import WhatsNew from '../components/WhatsNew.vue'
import NavTop from '../components/NavTop.vue'
import Footer from '../components/Footer.vue'
import Pager from '../components/Pager.vue'
import ContentContainer from '../components/ContentContainer.vue'
import PhotoSwipe from '../components/PhotoSwipe.vue'

export default {
  setup() { return { page: usePage() } },
  data() {
    return {
      showMenu: false,
      showAd: false,
      isDark: false
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
    this.showAd = true
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
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
    'page.path'() {
      this.showAd = false
      this.$nextTick(() => { this.showAd = true })
    },
    showAd(val) {
      if (val) {
        setTimeout(() => {
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          } catch (e) {
            console.warn('ads error', e)
          }
        }, 200)
      }
    }
  }
}
</script>
