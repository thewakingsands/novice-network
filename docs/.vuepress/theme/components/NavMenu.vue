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
            <router-link
              :to="title2.href"
              class="item"
              :class="{
                active: isActive(index1, index2),
                'with-img': title2.img,
                'indent-1': title2.indent === 1,
                'has-children': title2.folder,
                visible: isVisible(index1, index2)
              }"
              v-for="(title2, index2) in title1.children"
              :key="index2"
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
#app .nav-container
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
  .ui.vertical.menu.menu-list
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
      &.active.has-children
        padding-bottom 12px
        &::after
          content ' '
          display block
          height 5px
          width 100%
          position absolute
          left 0
          bottom 0
          z-index 1
          background-image linear-gradient(rgb(40, 40, 41,0.2), rgba(40, 40, 41,0.5) 5px)
      &.active
        background-color #666
      &.indent-1
        background-color #4a4b4c
        border-left 1em solid transparent
        display none
        &.visible
          display block
        &.active
          background-color lighten(#4a4b4c, 7%)
          border-left-color transparent
      .menu
        display none
        overflow hidden
      .expand-icon
        color #999
        transition transform 300ms
        transform rotate3d(0, 0, 1, -90deg)
      &.expand
        .menu
          display block
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
    },
    isActive(index1, index2) {
      if (index1 !== this.currentTitle1) return false
      const page = this.toc[index1] && this.toc[index1].children[index2]
      const currentPage =
        this.toc[index1] && this.toc[index1].children[this.currentTitle2]
      if (!page) return false
      if (!currentPage) return false
      if (page.href === this.$page.path) return true
      if (page.folder && page.folder === currentPage.belongsTo) return true
      return false
    },
    isVisible(index1, index2) {
      if (index1 !== this.currentTitle1) return false
      const page = this.toc[index1] && this.toc[index1].children[index2]
      if (!page.belongsTo) return true
      const currentPage =
        this.toc[index1] && this.toc[index1].children[this.currentTitle2]
      if (!page) return false
      if (!currentPage) return false
      if (
        page.belongsTo === currentPage.belongsTo ||
        page.belongsTo === currentPage.folder
      )
        return true
      return false
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
