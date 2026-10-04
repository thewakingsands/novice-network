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
    <div class="tab-container">
    <div class="mntab">
      <h2>入坑准备</h2>
      <ul>
        <li><router-link to="before/pay.htm">收费方式与福利介绍</router-link></li>
        <li><router-link to="before/char.htm">下载注册与创建角色</router-link></li>
        <li><router-link to="before/job.htm">职业选择</router-link></li>
      </ul>
    </div>
    <div class="mntab">
      <h2>新人基础指南</h2>
      <ul>
        <li>
          <router-link to="before/world.htm">游戏背景介绍</router-link>
        </li>
        <li><router-link to="basic/core.htm">新人必知必会游戏核心</router-link></li>
        <li>
          <router-link to="ui/how.htm">认识界面和设置</router-link>
        </li>
        <li>
          <router-link to="basic/quest.htm">任务分类及重要支线</router-link>
        </li>
        <li><router-link to="basic/map.htm">地图、移动与飞行</router-link></li>
        <li><router-link to="basic/item.htm">道具、背包与市场</router-link></li>
        <li><router-link to="basic/equip.htm">认识装备</router-link></li>
        <li><router-link to="basic/communication.htm">玩家交流</router-link></li>
        <li>
          <router-link to="basic/battle.htm">战斗基础</router-link>
        </li>
      </ul>
    </div>
    <div class="mntab">
      <h2>深入游戏指南</h2>
      <ul>
        <li><router-link to="basic/levelup.htm">练级指南</router-link></li>
        <li>
          <router-link to="basic/config.htm">游戏设置详解</router-link>
        </li>
        <li>
          <router-link to="basic/battle-mech.htm">战斗机制详解</router-link>
        </li>
        <li>
        <router-link to="basic/dummy.htm">木桩木人介绍</router-link>
        </li>
        <li>
          <router-link to="basic/dungeon.htm">副本介绍</router-link>
        </li>
        <li><router-link to="topic/social.htm">社群与社交</router-link></li>
        <li><router-link to="advanced/currency.htm">货币系统（神典石）</router-link></li>
        <li><router-link to="advanced/bis.htm">毕业装备</router-link></li>
        
      </ul>
    </div>
    <div class="mntab">
      <h2>常用工具</h2>
      <ul>
        <li>
          <router-link to="advanced/glossary.htm">黑话缩略语词典</router-link>
        </li>
        <li>
          <router-link to="/duty/">副本攻略</router-link>
        </li>
        <li><router-link to="advanced/macro-intro.htm">宏指南</router-link></li>
        
      </ul>
    </div>
    <div class="mntab">
      <h2>日常休闲</h2>
      <ul>
        <li><router-link to="topic/daily.htm">每日/每周任务</router-link></li>
        <li><router-link to="topic/treasure.htm">休闲赚钱与挖宝</router-link></li>
        <li>
          <router-link to="topic/island.htm">开拓无人岛</router-link>
        </li>
        <li><router-link to="topic/story.htm">剧情任务</router-link></li>
        <li>
          <router-link to="topic/goldsaucer.htm">金碟游乐场</router-link>
        </li>
        <li><router-link to="topic/relax.htm">休闲活动</router-link></li>
      </ul>
    </div>
    <div class="mntab">
      <h2>战斗玩法</h2>
      <ul>
        <li><router-link to="job/bluemage.htm">青魔法师</router-link></li>
        <li><router-link to="topic/hunt.htm">怪物狩猎</router-link></li>
        <li><router-link to="topic/battle.htm">PVE 挑战副本</router-link></li>
        <li><router-link to="topic/pvp.htm">PVP 玩家对战</router-link></li>
        <li><router-link to="topic/variant.htm">多变迷宫/异闻迷宫</router-link></li>
        <li><router-link to="topic/shine.htm">制作成长型发光武器</router-link></li>
      </ul>
    </div>
    <div class="mntab">
      <h2>特殊区域玩法</h2>
      <ul>
        <li><router-link to="topic/dd.htm">深层迷宫（死宫/天宫）</router-link></li>
        <li><router-link to="topic/eureka.htm">禁地优雷卡</router-link></li>
        <li><router-link to="topic/bozjan.htm">南方博兹雅战线</router-link></li>
      </ul>
    </div>
    <div class="mntab">
      <h2>生产采集</h2>
      <ul>
        <li><router-link to="topic/craft.htm">能工巧匠（制作）</router-link></li>
        <li><router-link to="topic/gather.htm">大地使者（采集）</router-link></li>
        <li><router-link to="topic/fisher.htm">钓鱼指南</router-link></li>
      </ul>
    </div>
    <div class="mntab">
      <h2>其他游戏系统</h2>
      <ul>
        <li><router-link to="advanced/retainer.htm">雇员系统</router-link></li>
        <li><router-link to="basic/equip-looking.htm">外观（染色与投影）</router-link></li>
        <li><router-link to="advanced/grandCompany.htm">大国防联军</router-link></li>
        <li><router-link to="advanced/fate.htm">临危受命（FATE）</router-link></li>
      </ul>
    </div>
    <div class="mntab">
      <h2>其他</h2>
      <ul>
        <li><router-link to="topic/other.htm">周边衍生作品</router-link></li>
        <li>
          <router-link to="/basic/international.htm">国际服专题</router-link>
        </li>
      </ul>
    </div>
    <div class="mntab"></div>
    <div class="mntab"></div>
    <div class="mntab">
      <h2>常用综合网站</h2>
      <ul>
        <li><a href="https://ff.web.sdo.com/web8/index.html#/home" target="_blank">最终幻想14国服官网</a></li>
        <li><a href="https://bbs.nga.cn/thread.php?fid=-362960" target="_blank">NGA最终幻想14版</a></li>
        <li><a href="https://www.ffxiv.cn/v2/" target="_blank">素素攻略站</a></li>
        <li><a href="https://ff14.huijiwiki.com/" target="_blank">最终幻想XIV中文维基</a></li>
        <li><a href="https://garlandtools.cn/db/" target="_blank">加兰德数据库(中文版)</a></li>
      </ul>
    </div>
  </div>
  </div>
</template>

<style lang="stylus" scoped> 
$c = linear-gradient(90deg, rgba(51, 43, 20, 0.8) 0%, rgba(229, 196, 92, 0.8) 50%, rgba(51, 43, 20, 0.8) 100%);
.tab-container
  display flex
  align-content stretch
  flex-flow column wrap
  height 1015px
  &:before, &:after
    content ""
    flex-basis 100%
    width 0
    order 2
.mnheader
  width 100%
  display flex
  position relative
  align-items center
  h1
    flex auto
    font-size 0
    img
      background-image url('/images/bg.png')
      background-size contain
  .desc
    padding-left 30px
    font-size .8em
    color #666

.mntab
  flex 0 1 auto
  width 32%
  margin 10px
  position relative
  overflow hidden
  border-radius 10px
  box-shadow 0 0 10px #66666630
  background-color white
  transition all .3s
  &:nth-child(3n+1)
    order 1
  &:nth-child(3n+2)
    order 2
  &:nth-child(3n+3)
    order 3
  &:hover,&:active
    box-shadow 0px 0px 30px 10px rgba(102,87,41,0.65), 0px 0px 5px 2px rgba(191,163,76,0.85)
    background-color #ffffffe6
  h2
    padding 10px 20px
    margin 0
    background linear-gradient(0deg, #72727210, #72727200)
    color #33333e
  ul
    list-style none
    padding 0 !important
    margin 0
  li
    position relative
    a
      display block
      position relative
      color #5b480f
      font-size 1em
      padding 5px 20px
      z-index 40
      transition all .3s
      &::after
        content ' '
        display block
        position absolute
        left 20%
        top 0
        width 0
        height 2.15em
        background-image $c
        z-index -1
        transition all .3s
      &:hover
        color white
        &::after
          left 0
          width 100%
        
@media screen and (max-width 960px)
  /*小屏幕*/
  .clickable
    cursor pointer
  .mnheader
    -webkit-tap-highlight-color transparent
    flex-wrap wrap
    z-index 50
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
      padding 5px
      background #efefef
      border 2px solid #ccc
      border-radius 4px
      transition all .5s
      opacity 0
      z-index -1
      transform translateY(-80px)
      top -250px
      &.show
        opacity 1
        z-index 1
        transform translateY(250px)
  .tab-container
    align-content center
    flex-wrap nowrap
    height auto
  .mntab
    width auto
    margin 0 0 10px
    &:nth-child(n)
      order 1
    h2
      font-size 1em
    li
      a
        font-size 1em
        padding 5px 10px
.dark /* 暗色模式 */
  h1
    img
      background-image url('/images/bgdk.png')
  .mntab
    background-color #1c191680
    box-shadow 0 0 10px #00000059
    &:hover,&:active
      box-shadow 0 0 10px #cdbb5b59
      background-color #1c1916
    h2
      color #d9cec1
      background linear-gradient(0deg, #72727233, #72727200)
    li a
      color #e5c45ccc
      &:hover
        color white
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
