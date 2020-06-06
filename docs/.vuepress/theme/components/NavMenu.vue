<template>
  <div class="nav-container">
    <div class="menus" :class="{ show: showMenu }">
      <div class="ui vertical inverted menu menu-list">
        <div
          class="item header"
          v-for="(title1, index1) in toc"
          :key="index1"
          :class="{
            expand: expandedTitles.indexOf(index1) >= 0 || !title1.title
          }"
        >
          <div
            class="title"
            @click.stop="toggleExpand(index1)"
            v-if="title1.title"
          >
            {{ title1.title }} <i class="caret down icon expand-icon"></i>
          </div>
          <div class="menu">
            <template
              v-for="(title2, index2) in title1.children"
            >
              <router-link
                :to="title2.href"
                class="item"
                :class="{
                  active: index2 === currentTitle2 && index1 === currentTitle1,
                  'with-img': title2.img,
                  hassub: title2.children
                }"
              >
                <img
                  v-if="title2.img && loadImage"
                  :src="$withBase(title2.img)"
                />
                <img
                  v-if="title2.img && !loadImage"
                  class="img-placeholder"
                  src="data:,"
                />
                <link
                  v-if="title2.img && !loadImage"
                  rel="preload"
                  :href="$withBase(title2.img)"
                  as="image"
                />
                <span>{{ title2.title }}</span>
              </router-link>
              <div 
                v-if="title2.children"
                class="submenu"
              >
                <router-link
                  :to="title3.href"
                  class="item"
                  v-for="(title3, index3) in title2.children"
                  :key="index3"
                >
                <span>{{ title3.title }}</span>
                </router-link>
              </div>
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
            </template>
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
    -webkit-overflow-scrolling touch
    min-width 15em
    padding-bottom 5em
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
        .expand-icon
          color #fff
      i.icon
        float right
    .item
      &.hassub
        &::after
          content ""
          position absolute 
          right 2em
      &.active
        background-color #666 !important
        +.submenu
          display block !important
      .menu
        max-height 0
        transition 500ms
        overflow hidden
        .submenu
          display none
          padding 0.2em 1em
          overflow hidden
          background-color #4a4b4c
          background-image linear-gradient(#333, #4a4b4c 5px )
      .expand-icon
        color #999
        transition transform 300ms
        transform rotate3d(0, 0, 1, -90deg)
      &.expand
        .menu
          max-height 800px
        .expand-icon
          transform rotate3d(0, 0, 1, 0)
      .with-img
        .img-placeholder
          opacity 0
        img
          width 32px
          height 32px
          margin-right 4px
        img, span
          vertical-align middle
  .menus
    position fixed
    z-index 90
    display flex
    flex-direction column
    height 100%
    @media screen and (max-width 960px)
      transform translate3d(-100%, 0, 0)
      transition 300ms
      &.show
        transform translate3d(0, 0, 0)
    .ui.menu::after
      height 80px
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
import { TOC } from '../toc'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMenu: false,
      toc: TOC.main,
      expandedTitles: [],
      loadImage: false
    }
  },
  mounted() {
    this.expandedTitles = [this.currentTitle1]
    this.showMenu = this.value
    this.loadImage = true
  },
  computed: {
    currentTitle1() {
      return this.toc.findIndex(
        t => t.children && t.children.find(u => u && u.href === this.$page.path)
      )
    },
    currentTitle2() {
      var title1 = this.toc[this.currentTitle1]
      return (
        title1 &&
        title1.children &&
        title1.children.findIndex(u => u && u.href === this.$page.path)
      )
    }
  },
  methods: {
    toggleExpand(titleIndex) {
      var index = this.expandedTitles.indexOf(titleIndex)
      if (index >= 0) {
        this.expandedTitles.splice(index, 1)
      } else {
        this.expandedTitles.push(titleIndex)
      }
    },
    setExpand(titleIndex, value) {
      var current = this.expandedTitles.indexOf(titleIndex) >= 0
      if (current !== value) {
        this.toggleExpand(titleIndex)
      }
    }
  },
  watch: {
    currentTitle1(val, oldVal) {
      this.setExpand(val, true)
    },
    '$page.path'() {
      this.showMenu = false
    },
    showMenu(value) {
      this.$emit('input', value)
    },
    value(value) {
      this.showMenu = value
    }
  }
}
</script>
