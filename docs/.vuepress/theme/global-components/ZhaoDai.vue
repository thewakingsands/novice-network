<template>
  <mark>{{ this.code }}</mark>
</template>

<script>
const codeList = [
  '018g-0ey9-373r-43s8', // xys
  '056h-k2dq-xbgl-55vj', // fs
  '0171-n15r-r9rl-48v4', // srs
  '018t-uj1a-hr7j-5318' // ab
]

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
