<template>
  <strong class="status" :title="description">
    <img
      :src="iconUrl || 'about:blank'"
      class="no-zoom"
      :class="{ hide: !iconUrl }"
    />
    <slot>{{ name }}</slot>
  </strong>
</template>

<style lang="stylus" scoped>
img
  vertical-align middle
  width 0.75em
  height 1em
  margin-left .2em
  cursor pointer!important
  &.hide
    visibility hidden
</style>

<script>
import 'isomorphic-fetch'

let count = 0

export default {
  props: {
    name: String,
    id: Number
  },
  data: function() {
    return {
      iconUrl: null,
      description: ''
    }
  },
  mounted() {
    count++
    setTimeout(() => this.updateId(), count * 50)
  },
  methods: {
    async updateId() {
      const json = await (await fetch(
        `https://cafemaker.wakingsands.com/Status/${this.id}?columns=Icon,Name,MaxStacks,CanDispel,Description`
      )).json()
      this.iconUrl = 'https://cafemaker.wakingsands.com' + json.Icon
      this.description = json.Description
    }
  },
  beforeDestroy() {
    count--
  }
}
</script>
