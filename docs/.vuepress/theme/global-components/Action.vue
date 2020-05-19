<template>
  <strong :data-ck-action-id="actionId || id" class="action">
    <div class="action-container">
      <div class="cover"></div>
      <img
        :src="iconUrl || 'about:blank'"
        class="no-zoom"
        :class="{ hide: !iconUrl }"
      />
    </div>
    <slot>{{ name }}</slot>
  </strong>
</template>

<style lang="stylus" scoped>
img
  vertical-align middle
  width 1em
  height 1em
  margin-left .2em
  margin-bottom .2em
  cursor pointer!important
  &.hide
    visibility hidden
.action-container
  display inline-block
  position relative
.cover
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  border-radius 15%
  pointer-events none
  background radial-gradient(circle at 50% -430%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 65%)
  box-shadow inset 0px 4px 4px 2px rgba(255,255,255,0.3), inset 0px -2px 4px 2px rgba(255,255,255,0.1)
</style>

<script>
import 'isomorphic-fetch'
import { searchAction } from '../utils/cafeMaker'

const jobList = {
  冒险者: 0,
  剑术师: 1,
  格斗家: 2,
  斧术师: 3,
  枪术师: 4,
  弓箭手: 5,
  幻术师: 6,
  咒术师: 7,
  刻木匠: 8,
  锻铁匠: 9,
  铸甲匠: 10,
  雕金匠: 11,
  制革匠: 12,
  裁衣匠: 13,
  炼金术士: 14,
  烹调师: 15,
  采矿工: 16,
  园艺工: 17,
  捕鱼人: 18,
  骑士: 19,
  武僧: 20,
  战士: 21,
  龙骑士: 22,
  吟游诗人: 23,
  白魔法师: 24,
  黑魔法师: 25,
  秘术师: 26,
  召唤师: 27,
  学者: 28,
  双剑师: 29,
  忍者: 30,
  机工士: 31,
  暗黑骑士: 32,
  占星术士: 33,
  武士: 34,
  赤魔法师: 35,
  青魔法师: 36,
  绝枪战士: 37,
  舞者: 38
}

export default {
  props: {
    name: String,
    id: {
      type: Number,
      default: null
    },
    job: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      actionId: null,
      iconUrl: null,
      timer: null
    }
  },
  mounted() {
    this.updateId()
  },
  methods: {
    async updateId() {
      const result = await searchAction(this.name, this.id, this.jobId)
      if (result) {
        this.actionId = result.ID
        this.iconUrl = 'https://cafemaker.wakingsands.com' + result.Icon
      } else {
        console.warn('failed to get result for', this.name, this.id, this.jobId)
      }
    }
  },
  computed: {
    jobId() {
      if (this.job) {
        return jobList[this.job]
      }
      if (
        this.$page &&
        this.$page.frontmatter &&
        this.$page.frontmatter.jobName
      ) {
        return jobList[this.$page.frontmatter.jobName]
      }
      return null
    }
  }
}
</script>
