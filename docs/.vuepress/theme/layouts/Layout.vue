<template>
  <Root class="root-container">
    <div class="main-container full-height">
      <div class="content-outer full-height">
        <div class="content-inner full-height" id="scrolling-element">
          <NavTop @barClicked="showMenu = !showMenu" />
          <Pager v-if="!$page.frontmatter.noTopPager" />
          <ContentContainer />
          <Pager />
          <Footer />
        </div>
      </div>
      <div class="nav-menu">
        <NavMenu v-model="showMenu" />
      </div>
    </div>
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
    Pager
  }
}
</script>
