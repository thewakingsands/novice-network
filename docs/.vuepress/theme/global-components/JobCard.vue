<template>
  <div class="job-card">
    <div class="ui card" :class="className">
      <div class="content">
        <img
          :src="$withBase('/images/jobs/singlecolor/' + name + '.png')"
          class="no-zoom right floated tiny ui image"
        />
        <slot />
      </div>
      <div class="ui bottom attached button">
        <i class="angle right icon"></i>
        <span>查看详情</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.job-card
  margin-bottom 1em
  font-size 16px
  @media screen and (min-width: 720px)
    font-size 18px
  @media screen and (min-width: 720px)
    width 48%
    margin-right 4px
    display inline-block
    max-width 380px
  .card
    width 100%
    p
      line-height 1.35
    &.dps, &.tank, &.healer
      .header
        color rgba(255, 255, 255, 0.9)
      ul, p
        font-size 0.95em
        line-height 1.3
        color rgba(255, 255, 255, 0.85)
    ul
      margin-bottom 0
      margin-top 0
      padding-left 0
      li
        list-style none
    > .ui.bottom.attached.button
      background rgba(255, 255, 255, 0.3)
      color #fff
    &.dps
      background linear-gradient(45deg, #3f2c2c 0%,#653434 100%)
    &.tank
      background linear-gradient(45deg, #21375e 0%,#354393 100%)
    &.healer
      background linear-gradient(45deg, #263425 0%,#3b6627 100%)
</style>

<script>
export default {
  props: {
    name: String,
    className: String
  }
}
</script>
