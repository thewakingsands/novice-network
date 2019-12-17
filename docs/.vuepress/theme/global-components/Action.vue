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

let count = 0
let cache = {}

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
    let useCache = cache[this.id] || cache[`${this.jobId}${this.name}`]
    if (useCache) {
      ;[this.actionId, this.iconUrl] = useCache
    } else {
      count++
      this.timer = setTimeout(async () => {
        count--
        this.timer = null
        useCache = cache[this.id] || cache[`${this.jobId}${this.name}`]
        if (useCache) {
          ;[this.actionId, this.iconUrl] = useCache
        } else {
          await this.updateId()
          this.saveCache()
        }
      }, count * 100)
    }
  },
  methods: {
    async updateId() {
      if (this.id) {
        this.actionId = this.id
        const json = await (await fetch(
          `https://cafemaker.wakingsands.com/Action/${this.actionId}?columns=Icon`
        )).json()
        this.iconUrl = 'https://cafemaker.wakingsands.com' + json.Icon
        return
      }

      let url = `https://cafemaker.wakingsands.com/search?indexes=Action&string=${this.name}&filters=IsPvP=0,ClassJobLevel%3E0`
      if (this.jobId) {
        url = url + ',ClassJobTargetID=' + this.jobId
      }

      const res = await fetch(url)
      const json = await res.json()
      if (json.Results && json.Results[0]) {
        this.actionId = json.Results[0].ID
        this.iconUrl =
          'https://cafemaker.wakingsands.com' + json.Results[0].Icon
      }
    },
    saveCache() {
      if (this.id) {
        cache[this.id] = [this.actionId, this.iconUrl]
      } else {
        cache[`${this.jobId}${this.name}`] = [this.actionId, this.iconUrl]
      }
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
      count--
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
