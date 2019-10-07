<template>
  <div class="home-container">
    <div class="mnheader" @click.prevent="toggle">
      <h1 title="新大陆见闻录">
        《新大陆见闻录》<img
          :src="$withBase('/images/title.png')"
          alt="新大陆见闻录"
          class="no-zoom"
        />
      </h1>
      <div class="desc" :class="{ show: showHeader }">
        <p>
          由于《最终幻想14》游戏内容繁多，新人上手也不够友好，新人经常面临不知道做什么好的迷茫。<br />
          本站<strong>《新大陆见闻录》</strong>希望能给刚进入《最终幻想14》国服的玩家提供入门级别的攻略指引，帮助新玩家更好地游玩这个游戏。
        </p>
        <p>
          新大陆见闻录提供完整的手机布局，确保各位玩家能通过手机、平板访问本站的所有内容。用电脑访问时，工具栏右上角会显示二维码按钮
          <i class="ui icon qrcode"></i>
          ，鼠标悬浮即可显示当前页面二维码，扫码即可在手机上打开当前页面。
        </p>
        <p>
          你可以通过<mark class="hide-small">左侧侧边栏</mark
          ><mark class="hide-large">点击左下角绿色按钮</mark>查看本站的目录。
        </p>
      </div>
    </div>
    <div class="mntab mn-before">
      <h2>入坑准备</h2>
      <ul>
        <li><router-link to="before/pay.html">收费方式及福利</router-link></li>
        <li>
          <router-link to="before/world.html">世界观与游戏版本</router-link>
        </li>
        <li><router-link to="before/char.html">下载选服与捏人</router-link></li>
        <li><router-link to="before/job.html">职业选择</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-guide">
      <h2>新人指南</h2>
      <ul>
        <li><router-link to="basic/core.html">新人必知</router-link></li>
        <li><router-link to="basic/battle.html">战斗基础</router-link></li>
        <li><router-link to="basic/levelup.html">练级指南</router-link></li>
        <li>
          <router-link to="basic/config.html">常用设置及热键</router-link>
        </li>
      </ul>
    </div>
    <div class="mntab mn-qna">
      <h2>常见问题</h2>
      <ul>
        <li>
          <router-link to="basic/quest.html#重要任务">重要支线</router-link>
        </li>
        <li><router-link to="basic/equip.html">装备相关</router-link></li>
        <li><router-link to="basic/map.html">地图移动与飞行</router-link></li>
        <li><router-link to="ui/how.html">界面指南</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-sys">
      <h2>进阶内容</h2>
      <ul>
        <li><router-link to="advanced/glossary.html">黑话缩略语词典</router-link></li>
        <li><router-link to="advanced/dungeonGuide.html">副本攻略</router-link></li>
        <li><router-link to="advanced/currency.html">货币系统</router-link></li>
        <li><router-link to="basic/bis.html">毕业装</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-battle">
      <h2>战斗玩法</h2>
      <ul>
        <li><router-link to="topic/battle.html">休闲战斗</router-link></li>
        <li><router-link to="topic/raid.html">挑战副本</router-link></li>
        <li><router-link to="topic/pvp.html">PVP排位与战场</router-link></li>
        <li><router-link to="topic/shine.html">发光武器</router-link></li>
        <li><router-link to="topic/dd.html">深层迷宫</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-play">
      <h2>日常休闲</h2>
      <ul>
        <li><router-link to="topic/daily.html">每日/每周任务</router-link></li>
        <li><router-link to="topic/story.html">剧情任务</router-link></li>
        <li><router-link to="topic/goldsaucer.html">金碟游乐场</router-link></li>
        <li><router-link to="job/bluemage.html">青魔法师</router-link></li>
        <li><router-link to="topic/relax.html">休闲活动</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-etc">
      <h2>生产采集</h2>
      <ul>
        <li><router-link to="#">能工巧匠（制作）</router-link></li>
        <li><router-link to="#">大地使者（采集）</router-link></li>
      </ul>
      <h2>其他</h2>
      <ul>
        <li><router-link to="topic/other.html">周边衍生</router-link></li>
        <li>
          <router-link to="/basic/international.html">国际服专题</router-link>
        </li>
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
  min-width 20%
  margin 2px
  border-radius 4px
  border 1px solid #fbf3db
  background-position 3px 3px, bottom right
  background-repeat repeat, no-repeat
  overflow hidden
  &.mn-before
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #fbf3db, url('/images/bg/bg-chocobo.png')
    background-size 6px 6px, 84px 120px
  &.mn-guide
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #fbf3db, url('/images/bg/bg-spriggan.png')
    background-size 6px 6px, 107px 118px
  &.mn-qna
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #fbf3db, url('/images/bg/bg-moogle.png')
    background-size 6px 6px, 102px 121px
  &.mn-sys
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #fbf3db, url('/images/bg/bg-otter.png')
    background-size 6px 6px, 126px 110px
  &.mn-battle
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #de5741, url('/images/bg/bg1.jpg')
    background-size 6px 6px, 217px 208px
    h2 
      background rgba(125,38,24,0.3)
    li
      a
        color white
        &:hover
         background rgba(0,0,0,0.1)
  &.mn-play
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #2f357e, url('/images/bg/bg2.jpg')
    background-size 6px 6px, 154px 201px
    h2 
      background rgba(22,23,58,0.3)
    li
      a
        color white
        &:hover
         background rgba(0,0,0,0.1)
  &.mn-etc
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, #5d8d48, url('/images/bg/bg3.jpg')
    background-size 6px 6px, 236px 213px
    h2 
      background rgba(20,51,18,0.3)
    li
      a
        color white
        &:hover
         background rgba(0,0,0,0.1)
  h2
    padding 5px 20px
    margin 0
    background rgba(149, 96, 26, 0.60)
    color white
  ul
    list-style none
    padding 0
    margin 0
  li
    a
      display block
      color #5a411f
      font-size 1.2em
      padding 5px 20px
      &:hover
        background rgba(251, 188, 20, 0.6)
        transition all .3s

@media screen and (max-width 960px)
  /*小屏幕*/
  .mnheader
    cursor pointer
    -webkit-tap-highlight-color transparent
    flex-wrap wrap
    &::after
      content ''
      width 20px
      height 20px
      background gray url('/images/details.svg') center no-repeat
      background-size 70%
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
      top 0
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

<script>
export default {
  data() {
    return { showHeader: false }
  },
  methods: {
    toggle() {
      this.showHeader = !this.showHeader
    }
  }
}
</script>
