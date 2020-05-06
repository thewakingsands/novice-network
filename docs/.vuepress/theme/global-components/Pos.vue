<template>
  <span
    class="eorzea-map-trigger"
    :data-map-name="name"
    :data-map-id="id"
    :data-map-x="x"
    :data-map-y="y"
  >
    <i class="xiv link"></i>
    {{ name }}
    <span v-if="x && y"> (X: {{ x }}, Y: {{ y }})</span>
  </span>
</template>

<style lang="stylus" scoped>
.eorzea-map-trigger
  cursor pointer
  color #4183C4
  &:hover
    background #e3f2fd
i.xiv.link
  vertical-align text-top
  color #ffa042
</style>

<script>
export default {
  props: {
    name: String,
    x: {
      type: Number,
      required: false
    },
    y: {
      type: Number,
      required: false
    },
    id: {
      type: Number,
      required: false
    }
  }
}
</script>
