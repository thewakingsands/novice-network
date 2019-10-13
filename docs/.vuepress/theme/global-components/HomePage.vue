<template>
  <div class="home-container">
    <div class="mnheader">
      <h1 title="新大陆见闻录" class="clickable" @click.prevent="toggle">
        《新大陆见闻录》<img
          :src="$withBase('/images/title.png')"
          alt="新大陆见闻录"
          class="no-zoom"
        />
        <span class="view-details"></span>
      </h1>
      <div
        class="desc clickable"
        @click.prevent="toggle"
        :class="{ show: showHeader }"
      >
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
        <li><router-link to="before/pay.htm">收费方式及福利</router-link></li>
        <li>
          <router-link to="before/world.htm">世界观与游戏版本</router-link>
        </li>
        <li><router-link to="before/char.htm">下载选服与捏人</router-link></li>
        <li><router-link to="before/job.htm">职业选择</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-guide">
      <h2>新人指南</h2>
      <ul>
        <li><router-link to="basic/core.htm">新人必知</router-link></li>
        <li>
          <router-link to="basic/battle.htm">战斗基础与副本</router-link>
        </li>
        <li><router-link to="basic/levelup.htm">练级指南</router-link></li>
        <li>
          <router-link to="basic/config.htm">常用设置及热键</router-link>
        </li>
      </ul>
    </div>
    <div class="mntab mn-qna">
      <h2>常见问题</h2>
      <ul>
        <li>
          <router-link to="basic/quest.htm">重要支线</router-link>
        </li>
        <li><router-link to="basic/equip.htm">装备相关</router-link></li>
        <li><router-link to="basic/map.htm">地图移动与飞行</router-link></li>
        <li><router-link to="ui/how.htm">界面指南</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-sys">
      <h2>进阶内容</h2>
      <ul>
        <li>
          <router-link to="advanced/glossary.htm">黑话缩略语词典</router-link>
        </li>
        <li>
          <router-link to="advanced/dungeonGuide.htm">副本攻略</router-link>
        </li>
        <li><router-link to="advanced/currency.htm">货币系统</router-link></li>
        <li><router-link to="basic/bis.htm">毕业装备</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-battle">
      <h2>战斗玩法</h2>
      <ul>
        <li><router-link to="topic/battle.htm">休闲战斗</router-link></li>
        <li><router-link to="topic/raid.htm">挑战副本</router-link></li>
        <li><router-link to="topic/pvp.htm">PVP</router-link></li>
        <li><router-link to="topic/shine.htm">发光武器</router-link></li>
        <li><router-link to="topic/dd.htm">深层迷宫</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-play">
      <h2>日常休闲</h2>
      <ul>
        <li><router-link to="topic/daily.htm">每日/每周任务</router-link></li>
        <li><router-link to="topic/story.htm">剧情任务</router-link></li>
        <li>
          <router-link to="topic/goldsaucer.htm">金碟游乐场</router-link>
        </li>
        <li><router-link to="job/bluemage.htm">青魔法师</router-link></li>
        <li><router-link to="topic/relax.htm">休闲活动</router-link></li>
      </ul>
    </div>
    <div class="mntab mn-etc">
      <h2>生产采集</h2>
      <ul>
        <li><router-link to="/topic/craft.htm">能工巧匠（制作）</router-link></li>
        <li><router-link to="/topic/gather.htm">大地使者（采集）</router-link></li>
      </ul>
      <h2>其他</h2>
      <ul>
        <li><router-link to="topic/other.htm">周边衍生</router-link></li>
        <li>
          <router-link to="/basic/international.htm">国际服专题</router-link>
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
  border 1px solid #b58e2b
  overflow hidden
  &.mn-before
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg-chocobo.png') bottom right no-repeat, #fbf3db
    background-size 6px 6px, 107px 118px
  &.mn-guide
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg-spriggan.png') bottom right no-repeat, #fbf3db
    background-size 6px 6px, 84px 120px
  &.mn-qna
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg-moogle.png') bottom right no-repeat, #fbf3db
    background-size 6px 6px, 102px 121px
  &.mn-sys
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg-otter.png') bottom right no-repeat, #fbf3db
    background-size 6px 6px, 126px 110px
  &.mn-battle
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg1.jpg') bottom right no-repeat, #de5741
    background-size 6px 6px, 217px 208px
    h2
      background rgba(125,38,24,0.3)
    li
      a
        color white
        &:hover
         background rgba(0,0,0,0.1)
  &.mn-play
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg2.jpg') bottom right no-repeat, #2f357e
    background-size 6px 6px, 154px 201px
    h2
      background rgba(22,23,58,0.3)
    li
      a
        color white
        &:hover
         background rgba(0,0,0,0.1)
  &.mn-etc
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 2px, rgba(255, 255, 255, 0.1) 3px) 3px 3px, url('/images/bg/bg3.jpg') bottom right no-repeat, #5d8d48
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
        background rgba(199, 167, 50, 0.3)
        transition all .3s

@media screen and (max-width 960px)
  /*小屏幕*/
  .clickable
    cursor pointer
  .mnheader
    -webkit-tap-highlight-color transparent
    flex-wrap wrap
    .view-details
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
      cursor pointer
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
      z-index -1
      transform translateY(-80px)
      top 0
      &.show
        opacity 1
        z-index 1
        transform translateY(0)

  .mntab
    min-width 40%
    &.mn-before
      background-size 6px 6px, (107px*2/3) (118px*2/3)
    &.mn-guide
      background-size 6px 6px, (84px*2/3) (120px*2/3)
    &.mn-qna
      background-size 6px 6px, (102px*2/3) (121px*2/3)
    &.mn-sys
      background-size 6px 6px, (126px*2/3) (110px*2/3)
    &.mn-battle
      background-size 6px 6px, 95%
      background-position 3px 3px, 300% 100%
    &.mn-play
      background-size 6px 6px, 70%
      background-position 3px 3px, 140% 100%
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
