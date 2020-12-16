<template>
  <div>
    <div class="tag-list" v-for="fg in filterGroups" :key="fg.title">
      <div class="tag-title">{{ fg.title }}</div>
      <div
        class="tag"
        v-for="tag in fg.tags"
        :key="tag.title"
        :class="{ selected: tag.selected }"
        @click="toggleTag(fg, tag)"
      >
        {{ tag.title }}
      </div>
    </div>
    <ul class="duty-list" v-if="duty.length > 0">
      <li v-for="item in duty" :key="item.index">
        <router-link :to="dutyUrl(item.index)" v-if="dutyUrl(item.index)">
          [{{ item.level }}] {{ item.name }}
        </router-link>
        <span class="grayout" :data-id="item.index" v-else>
          [{{ item.level }}] {{ item.name }} (暂无攻略)
        </span>
      </li>
    </ul>
    <div v-else>
      <ul class="duty-list">
        <li>
          没有符合条件的副本，请
          <a href="javascript:;" @click="clearFilters">清空筛选条件</a>
          后再试一次。
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.tag-title, .tag
  display inline-block
  padding 4px 10px
  user-select none
.tag-title
  width 6em
  color #999
.tag
  background #fff
  border 1px solid #ccc
  margin 2px 5px
  cursor pointer
  &:hover
    border-color #ffa726
  &.selected
    border-color #ef6c00
    background #ffa726
    color #fff
.duty-list .grayout
  color #888
@media screen and (max-width: 720px)
  .tag-title
    display block
    width auto
    font-size 0.95em
</style>

<script>
import duty from '../duty'

export default {
  data() {
    return {
      filterGroups: [
        {
          title: '等级',
          tags: [
            { title: '1~49', filter: x => x.level < 50, selected: false },
            { title: '50', filter: x => x.level === 50, selected: false },
            {
              title: '51~60',
              filter: x => x.level > 50 && x.level <= 60,
              selected: false
            },
            {
              title: '61~70',
              filter: x => x.level > 60 && x.level <= 70,
              selected: false
            },
            {
              title: '71~80',
              filter: x => x.level > 70 && x.level <= 80,
              selected: false
            }
          ]
        },
        {
          title: '参加人数',
          tags: [
            { title: '4人', filter: x => x.partySize === 4, selected: false },
            { title: '8人', filter: x => x.partySize === 8, selected: false },
            { title: '24人', filter: x => x.partySize === 24, selected: false }
          ]
        },
        {
          title: '类型',
          radio: true,
          tags: [
            {
              title: '迷宫挑战',
              filter: x => x.type === '迷宫挑战',
              selected: false
            },
            {
              title: '讨伐歼灭',
              filter: x =>
                x.type === '讨伐歼灭战' &&
                !x.name.match(
                  /梦幻|歼殛|诗魂|上位|幽夜|幻想|传奇|究极神兵破坏|孤念|狂想|绝境|追忆|幻耀/
                ),
              selected: false
            },
            {
              title: '极神',
              filter: x =>
                x.type === '讨伐歼灭战' &&
                x.name.match(
                  /梦幻|歼殛|诗魂|上位|幽夜|幻想|传奇|究极神兵破坏|孤念|狂想|追忆|幻耀/
                ),
              selected: false
            },
            {
              title: '普通 Raid',
              filter: x =>
                x.type === '大型任务' &&
                x.partySize === 8 &&
                x.name.match(/[12345]$/) &&
                !x.name.match(/零式/),
              selected: false
            },
            {
              title: '零式 Raid',
              filter: x => x.type === '大型任务' && x.name.match(/零式/),
              selected: false
            },
            {
              title: '绝境战',
              filter: x => x.type === '绝境战',
              selected: false
            },
            {
              title: '团队任务',
              filter: x => x.type === '大型任务' && x.partySize === 24,
              selected: false
            }
          ]
        }
      ],
      duty: [...duty]
    }
  },
  methods: {
    updateDuty() {
      const filters = this.filterGroups.map(g =>
        g.tags.filter(t => t.selected).map(t => t.filter)
      )

      const dutyList = duty.filter(
        item => !filters.find(fl => fl.find(f => !f(item)))
      )
      this.duty = dutyList
    },
    toggleTag(filterGroup, tag) {
      const nowSelected = tag.selected
      if (nowSelected) {
        tag.selected = false
      } else {
        for (const t of filterGroup.tags) {
          t.selected = false
        }
        tag.selected = true
      }

      this.updateDuty()
    },
    clearFilters() {
      for (const filterGroup of this.filterGroups) {
        for (const t of filterGroup.tags) {
          t.selected = false
        }
      }

      this.updateDuty()
    },
    dutyUrl(index) {
      const relativePath = `duty/${index}.md`
      const page = this.$site.pages.find(x => x.relativePath === relativePath)
      if (page && page.frontmatter && page.frontmatter.underConstruction) {
        return false
      }
      return page && page.path
    }
  }
}
</script>
