<template>
  <Root class="root-container" :class="$page.frontmatter.className">
    <div class="main-container full-height">
      <div class="content-outer full-height">
        <div class="content-inner full-height">
          <NavTop @barClicked="showMenu = !showMenu" />
          <slot>
            <Pager v-if="!$page.frontmatter.noTopPager" />
            <ContentContainer />
            <Pager />
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
  @media screen and (max-width: 1200px) and (min-width: 961px)
    padding-left 250px
  @media screen and (max-width: 960px)
    padding-left 0
</style>

<script>
import Root from './Root.vue'
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
    PhotoSwipe
  },
  provide() {
    return {
      getPhotoSwipe: this.getPhotoSwipe,
      gotoId: this.gotoId
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
  }
}
</script>
