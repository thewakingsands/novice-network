<template>
  <div class="job-card">
    <div class="ui card">
      <div class="content">
        <img
          :src="$withBase('/images/jobs/' + name + '.png')"
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
</style>

<script>
export default {
  props: {
    name: String
  }
}
</script>
