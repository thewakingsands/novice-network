<template>
  <div>
    <div class="wrapper">
      <TOC />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.wrapper
  float right
  background #fff
  padding 0 1em
  margin-left 1em
  max-width 320px
  position relative
  box-shadow 0px 1px 2px 0 rgba(34, 36, 38, 0.15)
  border-radius 0.28571429rem
  border 1px solid rgba(34, 36, 38, 0.15)
  @media screen and (max-width: 375px)
    float none
    padding 0.25em 1em
    margin 0
    max-width unset
</style>

<script>
import TOC from './TOC.vue'
export default {
  components: { TOC }
}
</script>
