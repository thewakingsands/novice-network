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
.collaspe-text.ui.segment
  font-size 1em
  .summary
    cursor pointer
    font-size 1em
  .details
    margin-top 1em
    font-size 0.95em
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
