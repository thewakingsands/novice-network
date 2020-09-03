<template>
  <strong class="status" :title="description" :class="dispel ? 'dispel' : '' ">
    <img
      :src="iconUrl || 'about:blank'"
      class="no-zoom"
      :class="{ hide: !iconUrl }"
    />
    <slot>{{ name }}</slot>
  </strong>
</template>

<style lang="stylus" scoped>
.status.dispel:before {
  content ''
  width 20px
  height 3px
  background #dfedff
  position absolute
  margin-left 0.3em
  margin-left calc(0.25em+1px)
  border-radius 2px
  box-shadow 0 0 1px 1px #65c6ff
}
img
  vertical-align middle
  margin-left .2em
  cursor pointer!important
  &.hide
    visibility hidden
</style>

<script>
import 'isomorphic-fetch'
import { getIconUrl } from '../utils/iconUrl'
import { searchStatus } from '../utils/cafeMaker'

let count = 0

export default {
  props: {
    name: String,
    id: Number,
    dispel: Boolean,
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
      const json = await searchStatus(this.id)
      this.iconUrl = getIconUrl(json.IconID + this.stack)
      this.description = json.Description
    }
  },
  beforeDestroy() {
    count--
  }
}
</script>
