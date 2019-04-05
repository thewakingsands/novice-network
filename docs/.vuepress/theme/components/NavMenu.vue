<template>
  <div class="nav-container">
    <div class="menus" :class="{ show: showMenu }">
      <div class="ui vertical inverted menu menu-list">
        <div
          class="item header"
          v-for="(title1, index1) in toc"
          :key="index1"
          :class="{
            expand:
              index1 === currentTitle1
                ? expandedTitles.indexOf(index1) < 0
                : expandedTitles.indexOf(index1) >= 0
          }"
        >
          <div class="title" @click.stop="toggleExpand(index1)">
            {{ title1.title }} <i class="caret down icon expand-icon"></i>
          </div>
          <div class="menu">
            <router-link
              :to="title2.href"
              class="item"
              :class="{
                active: index2 === currentTitle2 && index1 === currentTitle1
              }"
              v-for="(title2, index2) in title1.children"
              :key="index2"
            >
              {{ title2.title }}
            </router-link>
            <a
              :href="title2.href"
              class="item"
              v-for="(title2, index2) in title1.externalChildren"
              :key="index2"
              target="_blank"
              rel="noopenner noreferer"
            >
              {{ title2.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="toggle-button" :class="{ 'menu-show': showMenu }">
      <button
        class="ui large green circular icon button"
        @click.prevent="showMenu = !showMenu"
      >
        <i class="icon chevron right"></i>
      </button>
    </div>
  </div>
</template>

<style lang="stylus">
.nav-container
  height 100%
  padding-top 40px
  .menu
    border-radius 0
  .menu-nav
    display flex
    margin-bottom 0
    .item
      flex 1
      justify-content center
  .menu-list
    margin-top 0
    flex 1
    overflow-y auto
    -webkit-overflow-scrolling smooth
    min-width 15em
    font-size 18px
    @media screen and (max-width: 1200px) and (min-width: 961px)
      font-size 16px
    @media screen and (max-width: 960px)
      font-size 18px
    .header.item
      cursor pointer
    .title
      color #ddd
      &:hover
        color #fff
      i.icon
        float right
    .item
      &.active
        background-color #666 !important
      .menu
        display none
        overflow hidden
      .expand-icon
        transition 300ms
        transform rotate3d(0, 0, 1, -90deg)
      &.expand
        .menu
          display block
        .expand-icon
          transform rotate3d(0, 0, 1, 0)
  .menus
    display flex
    flex-direction column
    height 100%
    @media screen and (max-width 960px)
      position fixed
      transform translate3d(-100%, 0, 0)
      transition 300ms
      &.show
        transform translate3d(0, 0, 0)
  .toggle-button
    display none
    button
      margin 0
    @media screen and (max-width 960px)
      display block
      position fixed
      z-index 500
      bottom 5px
      left 5px
      transform translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)
      transition 300ms
      &.menu-show
        transform translate3d(270px, 0, 0) rotate3d(0, 0, 1, 180deg)
</style>

<script>
import { TOC } from '@dynamic/toc'

export default {
  data() {
    return {
      showMenu: false,
      toc: TOC.main,
      expandedTitles: []
    }
  },
  computed: {
    currentTitle1() {
      return this.toc.findIndex(
        t => t.children && t.children.find(u => u.href === this.$page.path)
      )
    },
    currentTitle2() {
      var title1 = this.toc[this.currentTitle1]
      return (
        title1.children &&
        title1.children.findIndex(u => u.href === this.$page.path)
      )
    }
  },
  methods: {
    toggleExpand(titleIndex) {
      var index = this.expandedTitles.indexOf(titleIndex)
      if (index >= 0) {
        this.expandedTitles.splice(index)
      } else {
        this.expandedTitles.push(titleIndex)
      }
    }
  }
}
</script>
