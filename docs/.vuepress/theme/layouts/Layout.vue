<template>
  <Root class="root-container" :class="$page.frontmatter.className">
    <div class="main-container full-height">
      <div class="content-outer full-height">
        <div class="content-inner full-height">
          <NavTop @barClicked="showMenu = !showMenu" />
          <slot>
            <Duty v-if="$page.frontmatter.instance" />
            <div v-else>
              <Pager v-if="!$page.frontmatter.noTopPager" />
              <ContentContainer />
              <Pager />
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
</style>

<script>
import Root from './Root.vue'
import Duty from './Duty.vue'
import NavMenu from '../components/NavMenu'
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
    Duty
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
