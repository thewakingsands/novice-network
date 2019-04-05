<template>
  <Root class="root-container">
    <div class="main-container full-height">
      <div class="content-outer full-height">
        <div class="content-inner full-height" id="scrolling-element">
          <NavTop />
          <Pager />
          <ContentContainer />
          <Pager />
          <Footer />
        </div>
      </div>
      <div class="nav-menu">
        <NavMenu />
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
.content-inner
  overflow-y auto
  -webkit-overflow-scrolling smooth
</style>

<script>
import Root from './Root.vue'
import NavMenu from '../components/NavMenu'
import NavTop from '../components/NavTop'
import Footer from '../components/Footer'
import Pager from '../components/Pager'
import ContentContainer from '../components/ContentContainer'

export default {
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
