<template>
  <div class="home-container">
    <div class="mnheader">
      <h1 title="新大陆见闻录">
        《新大陆见闻录》<img src="/images/title.png" alt="新大陆见闻录" />
      </h1>
      <div class="desc">
        <p>
          由于《最终幻想14》游戏内容繁多，新人上手也不够友好，新人经常面临迷茫。
          鉴于此，本站，即《新大陆见闻录》希望能给刚进入《最终幻想14》国服的玩家提供入门级别的攻略指引，帮助新玩家更好地游玩这个游戏。
        </p>
        <p>
          新大陆见闻录提供完整的手机布局，确保各位玩家能通过手机、平板访问本站的所有内容。用电脑访问时，工具栏右上角会显示二维码按钮
          <i class="ui icon qrcode"></i>
          ，鼠标悬浮即可显示当前页面二维码，扫码即可在手机上打开当前页面。
        </p>
        <p>
          你可以通过<mark>左侧侧边栏</mark>（电脑）或
          <mark>左下角绿色按钮</mark>（手机）查看本站的目录。
        </p>
      </div>
    </div>
    <div class="mntab mn-before">
      <h2>入坑准备</h2>
      <ul>
        <li><a href="before/pay.html">试玩/计费/入坑福利</a></li>
        <li><a href="before/world.html">世界观与游戏版本</a></li>
        <li><a href="before/char.html">下载选服与捏人</a></li>
        <li><a href="before/job.html">职业选择</a></li>
      </ul>
    </div>
    <div class="mntab mn-guide">
      <h2>新人指南</h2>
      <ul>
        <li><a href="basic/core.html">新人必知</a></li>
        <li><a href="basic/battle.html">战斗基础</a></li>
        <li><a href="basic/#">练级指南</a></li>
        <li><a href="basic/config.html">常用设置</a></li>
      </ul>
    </div>
    <div class="mntab mn-sys">
      <h2>游戏系统</h2>
      <ul>
        <li><a href="basic/quest.html">推荐任务</a></li>
        <li><a href="basic/equip.html">装备品级提升与幻化</a></li>
        <li><a href="basic/map.html">地图移动与飞行</a></li>
        <li><a href="#">货币系统</a></li>
      </ul>
    </div>
    <div class="mntab mn-battle">
      <h2>战斗玩法</h2>
      <ul>
        <li><a href="#">休闲战斗</a></li>
        <li><a href="#">副本挑战</a></li>
        <li><a href="#">PVP排位与战场</a></li>
        <li><a href="#">发光武器</a></li>
        <li><a href="#">青魔法师</a></li>
      </ul>
    </div>
    <div class="mntab mn-play">
      <h2>日常休闲</h2>
      <ul>
        <li><a href="#">每日/每周任务</a></li>
        <li><a href="#">剧情任务</a></li>
        <li><a href="#">金碟游乐场</a></li>
        <li><a href="#">自娱自乐</a></li>
        <li><a href="#">社交活动</a></li>
      </ul>
    </div>
    <div class="mntab mn-play">
      <h2>生产采集</h2>
      <ul>
        <li><a href="#">能工巧匠（制作）</a></li>
        <li><a href="#">大地使者（采集）</a></li>
      </ul>
      <h2>其他</h2>
      <ul>
        <li><a href="#">周边衍生</a></li>
        <li><a href="/basic/international.html">国际服专题</a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.home-container
  display flex
  flex-wrap wrap

.mnheader
  width 100%
  display flex
  position relative
  align-items center
  h1
    flex auto
    font-size 0
  .desc
    padding-left 30px
    font-size .8em
    color #666

.mntab
  flex 1 1 0
  min-width 30%
  margin 2px
  background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #e6ee9c
  background-size 6px 6px
  border-radius 4px
  border 1px solid #aeea00
  overflow hidden
  h2
    padding 5px 20px
    margin 0
    background rgba(51, 105, 30, 0.6)
    color white
  ul
    list-style none
    padding 0
    margin 0
  li
    a
      display block
      color #33691e
      font-size 1.2em
      padding 5px 20px
      &:hover
        background rgba(131, 197, 57, 0.6)
        transition all .3s

@media screen and (max-width 960px)
  /*小屏幕*/
  .mnheader
    flex-wrap wrap
    &::after
      content ''  /* 这里有个图标，开desc的，toggle class show */
      width 20px
      height 20px
      background gray
      border-radius 100%
      position absolute
      right 0
      top -10px
    h1
      width 100%
      text-align center
    .desc
      position absolute
      opacity 0
      padding 5px
      background #efefef
      border 2px solid #ccc
      border-radius 4px
      transition all .5s
      opacity 0
      transform translateY(-80px)
      &.show
        opacity 1
        transform translateY(0)

  .mntab
    min-width 40%
    h2
      font-size 1em
    li
      a
        font-size 1em
        padding 5px 10px
</style>
