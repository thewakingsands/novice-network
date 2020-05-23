<template>
  <img
    :src="$withBase('/images/jobs/' + name + '.png')"
    class="no-zoom sm-icon" height="20"
  />
</template>
<script>
export default {
  props: {
    name: String
  }
}
</script>