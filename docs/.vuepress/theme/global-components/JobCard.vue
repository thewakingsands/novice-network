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
  @media screen and (max-width: 320px)
    font-size 15px
  @media screen and (min-width: 1000px)
    font-size 18px
  @media screen and (min-width: 795px)
    width 48%
    margin-right 4px
    display inline-block
    max-width 360px
  .card
    width 100%
    p
      line-height 1.3
      font-size 0.95em
    &.dps, &.tank, &.healer
      .header
        color rgba(255, 255, 255, 0.9)
      ul, p
        color rgba(255, 255, 255, 0.85)
    ul
      clear both
      font-size 0.9em
      margin-bottom 0
      margin-top 0
      padding-left 0
      li
        list-style none
        display inline-block
        width 49%
    > .ui.bottom.attached.button
      background rgba(255, 255, 255, 0.2)
      color #fff
      &:hover
        background rgba(255, 255, 255, 0.15)
      &:active
        background rgba(255, 255, 255, 0.1)
    &.dps
      background linear-gradient(45deg, #3f2c2c 0%, #653434 100%)
      box-shadow 0px 1px 3px 0px #3f2c2c, 0px 0px 0px 1px #653434
    &.tank
      background linear-gradient(45deg, #21375e 0%, #354393 100%)
      box-shadow 0px 1px 3px 0px #21375e, 0px 0px 0px 1px #354393
    &.healer
      background linear-gradient(45deg, #263425 0%, #3b6627 100%)
      box-shadow 0px 1px 3px 0px #263425, 0px 0px 0px 1px #3b6627
</style>

<script>
export default {
  props: {
    name: String,
    className: String
  }
}
</script>
