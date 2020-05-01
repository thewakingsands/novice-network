<template>
  <mark>{{ this.code }}</mark>
</template>

<script>
const codeList = ['019w-e5xe-rodk-7344', '018g-0ey9-373r-43s8']

export default {
  data() {
    return {
      code: codeList[0]
    }
  },
  mounted() {
    this.code = codeList[Math.floor(Math.random() * codeList.length)]
  }
}
</script>
