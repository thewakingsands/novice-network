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
              <i
                v-if="title2.folder"
                class="chevron circle right icon expand-icon"
              ></i>
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
        class="ui large circular icon button"
        @click.prevent="showMenu = !showMenu"
      >
        <i class="icon plus"></i>
      </button>
    </div>
    <router-link
      class="ui large circular icon button hide-large"
      to="/search.htm"
    >
      <i class="search icon"></i>
    </router-link>
    <a
      class="ui large circular icon button totop hide-large"
      href="javascript:;"
      @click.prevent="scrollToTop"
    >
      <i class="double up angle icon"></i>
    </a>
    <a
      class="ui large circular icon button copy hide-large"
      @click="copyUrl"
      :data-clipboard-text="url"
    >
      <i class="share square icon"></i>
    </a>
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
      &.has-children
        i
          margin-right 0.4em
        &.active
          padding-bottom 12px
          i
            transform rotate3d(0, 0, 1, 90deg)
        &.active::after
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
      &::before
        content: ''
        display block
        position fixed
        background rgba(0,0,0,0)
        transition all 300ms
      &.show
        transform translate3d(0, 0, 0)
        &::before
          top 0
          bottom 0
          left 0
          right -800px
          background rgba(0,0,0,0.4)
    .ui.menu::after
      height 80px
  .toggle-button
    display none
    button
      margin 0
      background linear-gradient(106deg, #3d4d99 0%, #3689b3 50%, #cc7a29 100%)
      box-shadow 1px 3px 5px 0px rgba(34,36,38,0.3)
      color white
      font-size 20px
    @media screen and (max-width 960px)
      display block
      position fixed
      z-index 500
      bottom 20px
      right 16px
      transition 300ms
      &.menu-show
        &::after
          content ''
          display block
          position fixed
          top 0
          left 81px
          width calc(100vw - 121px)
          height 40px
          pointer-events none
          animation-name menulight
          animation-duration 8s
          animation-iteration-count infinite
          animation-direction alternate
        button
          animation gradient 8s ease-in-out infinite
          background-size 800% 800%
          transform rotateZ(45deg)
          box-shadow 0px 0px 5px 2px #dfb24ec2
        &~a.icon.button
          transform translate(0, -120px)
          &.totop
            transform translate(0, -180px)
          &.copy
            transform translate(0, -60px)
  &>a.icon.button
    display block
    position fixed
    right 21px
    bottom 30px
    margin 0
    z-index 100
    background white
    transition all 300ms
@keyframes gradient
	0%
		background-position: 0% 50%;
	50%
		background-position: 100% 50%;
	100%
		background-position: 0% 50%;
@keyframes menulight 
  0%
    box-shadow inset 0 0 20px 3px #3d4d99cc
  50%
    box-shadow inset 0 0 20px 3px #3689b3cc
  100%
    box-shadow inset 0 0 20px 3px #cc7a29cc

</style>

<script>
import { TOC } from '../toc'
import Clipboard from 'clipboard'

export default {
  inject: ['gotoId'],
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
      loadImage: false,
      url: ''
    }
  },
  mounted() {
    this.expandedTitles = [this.currentTitle1]
    this.showMenu = this.value
    this.loadImage = true
    this.theUrl()
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
    scrollToTop() {
      this.gotoId('')
    },
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
    },
    theUrl() {
      this.url = location.href
    },
    copyUrl() {
      const clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        // 复制成功
        alert('网址已复制到剪贴板，快去分享给你的小伙伴吧！')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        alert(
          '啊哦，我好像无法复制网址。\n麻烦你手工复制一下网址，再发送给小伙伴吧！'
        )
        clipboard.destroy()
      })
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
