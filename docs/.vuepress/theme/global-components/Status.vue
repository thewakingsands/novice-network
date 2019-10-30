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
import { getIconUrl } from '../utils/iconUrl'

let count = 0

export default {
  props: {
    name: String,
    id: Number,
    stack: {
      type: Number,
      default: 0
    }
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
        `https://cafemaker.wakingsands.com/Status/${this.id}?columns=IconID,Name,MaxStacks,CanDispel,Description`
      )).json()
      this.iconUrl = getIconUrl(json.IconID + this.stack)
      this.description = json.Description
    }
  },
  beforeDestroy() {
    count--
  }
}
</script>
