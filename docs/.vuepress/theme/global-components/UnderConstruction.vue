<template>
  <div class="ui violet segment ucontainer">
    <div class="img">
      <img src="/images/bg/hint.png" />
    </div>
    <div class="text">
      此处内容仍在施工中，将会在近日有大量内容更新，敬请期待~
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ucontainer
  display flex
  align-items center
  width 75%
  min-width 25em
  margin 30px auto
  @media screen and (max-width: 375px)
    min-width auto
  .img
    position absolute
    width 15%
    min-width 70px
    text-align center
  .text
    flex 1
    text-align center
    margin-left 5em
    font-size 1.3em
    line-height 1.5
</style>
