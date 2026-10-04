<template>
  <div class="included-page">
    <component v-if="currentComponent" :is="currentComponent"></component>
  </div>
</template>

<style lang="stylus">
.included-page
  > .content > p:last-child
    margin-bottom 1em
</style>

<script>
import { defineAsyncComponent } from 'vue'

const fragments = import.meta.glob('../../../_includes/**/*.md')
const components = new Map()

export default {
  props: {
    file: String,
    slotKey: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    currentComponent() {
      if (!this.file) return false
      const key = '../../../' + this.file
      if (!fragments[key]) return false
      if (!components.has(key)) components.set(key, defineAsyncComponent(fragments[key]))
      return components.get(key)
    }
  }
}
</script>
