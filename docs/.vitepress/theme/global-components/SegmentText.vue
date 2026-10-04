<template>
  <div class="ui segment segment-text" :class="className">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.segment-text.ui.segment
  font-size 1em
  display table /* IE hack */
  display flow-root
  h4
    font-size 1.05em
  h5
    font-size 1.02em
  &+*:last-child
    margin-bottom 0
</style>

<script>
export default {
  props: {
    className: String
  }
}
</script>
