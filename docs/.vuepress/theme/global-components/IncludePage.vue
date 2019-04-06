<template>
  <div class="included-page">
    <component v-if="currentComponent" :is="currentComponent"></component>
  </div>
</template>

<script>
import { getAsyncComponent } from '@app/util'
import Vue from 'vue'

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
      var page = this.$site.pages.find(p => p.relativePath === this.file)
      if (page) {
        if (!(page.key in Vue.options.components)) {
          Vue.component(page.key, getAsyncComponent(page.key))
        }
        return page.key
      } else {
        return false
      }
    }
  }
}
</script>
