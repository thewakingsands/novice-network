<template>
  <table class="ui selectable compact grey striped unstackable table">
    <thead>
      <tr>
        <th>符号</th>
        <th>码点</th>
        <th>名称</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(font, char) in icons" :key="char">
        <td>{{ getChar(char) }}</td>
        <td>{{ char }}</td>
        <td
          :class="{
            secondary:
              font[0] === char || !font[1] || `${font[1]}`.indexOf('疑') >= 0
          }"
        >
          {{ font[0] }}
        </td>
        <td
          :class="{
            secondary: `${font[1]}`.indexOf('疑') >= 0
          }"
        >
          {{ font[1] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="stylus" scoped>
.secondary
  color #999
</style>

<script>
import icons from '@thewakingsands/axis-font-icons/characters.json'

export default {
  data() {
    return {
      icons: JSON.parse(JSON.stringify(icons))
    }
  },
  methods: {
    getChar(char) {
      return String.fromCodePoint(parseInt(char, 16))
    }
  }
}
</script>
