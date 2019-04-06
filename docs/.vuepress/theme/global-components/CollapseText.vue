<template>
  <div class="ui segment collaspe-text">
    <div class="summary" @click="expanded = !expanded">
      <i
        class="caret icon expand-icon"
        :class="{ right: !expanded, down: expanded }"
      ></i>
      <span>{{ summary }}</span>
    </div>
    <div class="details" v-show="expanded">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus">
.collaspe-text
  .summary
    cursor pointer
  .details
    margin-top 1em
    font-size 16px
    line-height 1.75
</style>

<script>
export default {
  data() {
    return {
      expanded: false
    }
  },
  props: {
    summary: {
      type: String,
      default: ''
    }
  }
}
</script>
