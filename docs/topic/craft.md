# 能工巧匠
<FloatTOC />

能工巧匠是FF14中对所有生产职业的统称，FF14的生产有其独特的玩法，需要在有限的耐久（回合）内，消耗制作力使用技能，来推进制作的进展和品质，如何权衡制作力的消耗，以及获得进度、品质的效率，是各位能工巧匠们钻研的主要课题。

和战斗职业一样，生产职业行会也分布在3个主城各处，需要玩家前往各个主城学习。获得生产主手之后，切换主手工具就可以切换职业。

然而生产职业并不会对战斗职业提供任何属性或者其他加成。生产职业可以为对应的武器、装备进行**修理**（在装备信息最下方显示），修理后的耐久值=原有耐久+100%，也就是说，玩家自行修理的装备耐久可以突破100%的上限达到**199%**。另外工匠也可以给对应的武器装备进行禁忌镶嵌（普通的魔晶石镶嵌可以由NPC完成）。

工匠主要是通过制作收藏品<i class="xiv collectables"></i>来换取各种票据，使用生产票据获得最新版本的生产配方、生产职业使用的魔晶石、特殊外观装备、专属坐骑等等进行交易。

也可以销售直接生产出的装备、料理、爆发药、家具等物品获利。可以说FF14游戏中的各种玩法背后，都有工匠们的身影。

## 生产基础

玩家在任意战斗职业10级之后，就可以在3个主城学习生产职业了：海都有<img src="/images/jobs/blacksmith.png" class="no-zoom sm-icon" width="24"/>锻铁匠、<img src="/images/jobs/armorer.png" class="no-zoom sm-icon" width="24"/>铸甲匠、<img src="/images/jobs/culinarian.png" class="no-zoom sm-icon" width="24"/>烹调师行会；森都有<img src="/images/jobs/carpenter.png" class="no-zoom sm-icon" width="24"/>刻木匠、<img src="/images/jobs/leatherworker.png" class="no-zoom sm-icon" width="24"/>制革匠行会；沙都有<img src="/images/jobs/goldsmith.png" class="no-zoom sm-icon" width="24"/>雕金匠、<img src="/images/jobs/weaver.png" class="no-zoom sm-icon" width="24"/>裁衣匠、<img src="/images/jobs/alchemist.png" class="no-zoom sm-icon" width="24"/>炼金术士行会。跟各个行会的接待人员对话，获得职业主手并装备之后，就可以切换成对应职业的工匠了。

工匠有自己的专属属性：作业精度、加工精度及制作力（CP）。工匠的装备可以为工匠提供这些属性（1级新人可以先去商会回购一下自己出生时的种族套装凑合穿一下，裸奔毕竟不文明）。

准备好装备及主手之后，就可以通过==制作笔记==（默认快捷键`N`）选择配方，并进入制作状态。

;;;.guide .cols2
;;;.guide .col
<img src="./craft.assets/notebook.png" width="350px" />
;;;

;;;.guide .col .grow

在任意生产职业达到10级之后，可以解锁==简易制作==功能。

笔记右上方的数值表示你现有的属性在无Buff状态下使用作业/加工效率100的技能可以推进的工数/加工精度的大小，你会发现你搓不同物品的时候这两个值会变动，不过这就不属于新手工艺学介绍的范畴了。

配方部分可选择一些优质原材料（<i class="xiv hq"></i>），这会使你的要搓的物品的初期品质上升，一类物品会有相同的上限，可以看到我们要搓的这个物品的初期品质上限是75%，而部分物品会是50%。

;;;
;;;

同前面所述，玩家需要在有限的**耐久**（回合）内，消耗**制作力**使用技能，来推进制作的**进展**和**品质**。把进展推倒100%就可以获得物品，而提升品质则可以提升物品的HQ概率，高品质的装备才能卖出高价钱，而NQ的物品的价值则非常有限。~~而根据吉田概率学，只有100%品质才能获得HQ。~~

游戏中会技能的下一步预测，也可以使用[生产模拟器](#参考工具)进行模拟，推荐有事没事多玩玩模拟器。

> - [工匠技能说明](/topic/craft-action.md)
> - [练级指南](/topic/craft-levelup.md)

<!--专家-->

## 生产游戏内容

工匠们除了日常的制作交易之外，游戏中也有相应的针对工匠的个人游戏内容。

### 商会、收藏品及票据

玩家50级之后，可以在<pos name="伊修加德基础层" :x="10.2" :y="10.5" />接任务<quest name="一流工匠的新工作" type="plus" />开启收藏品（<i class="xiv collectables"></i>）功能，然后完成后续任务<quest name="打开新世界的大门" type="plus" />就可以开启罗薇娜商会。之后在神拳、水晶都也都有对应的商会开启任务。

玩家可以在制作手册的其他分类中找到收藏品分类，向商会提交收藏品可以获得大量经验和专用的工匠票据，票据可用于兑换秘籍、魔晶石等等道具。具体兑换列表可查看[巧手白票](https://ff14.huijiwiki.com/wiki/%E5%B7%A7%E6%89%8B%E7%99%BD%E7%A5%A8)，[巧手紫票](https://ff14.huijiwiki.com/wiki/%E5%B7%A7%E6%89%8B%E7%B4%AB%E7%A5%A8)。（白票推荐最优先兑换各个级别的秘籍，秘籍可以解锁各个等级的特殊配方）。

制作收藏品<i class="xiv collectables"></i>和制作高品质<i class="xiv hq"></i>的方法类似，只不过制作时的品质会折算为收藏价值，商会的奖励则是根据物品的收藏价值进行折换。通常不需要将品质推到最高就可以获得第一档的收益，制作难度相对较低。

### 重建伊修加德

;;;.guide .cols2
;;;.guide .col
<img src="./craft.assets/rebuild_reward.jpg" width="350px" />

重建伊修加德奖励外观
;;;

;;;.guide .col .grow

完成主线任务<quest name="绝命怒嚎" type="main"/>之后，在<pos name="伊修加德基础层" :x="9.7" :y="11.6" />接任务<quest name="仰望天穹之街" type="plus" />，就可以开启伊修加德重建。

重建伊修加德只需要20级的工匠职业就可以参与，非常适合练级玩家（材料也适合练级的采集玩家收集）。提交收藏品之后可以获得天穹街振兴票，并用振兴票兑换外观、动作、坐骑、宠物等等道具。具体奖励兑换列表可以查看[天穹街振兴票](https://ff14.huijiwiki.com/wiki/%E5%A4%A9%E7%A9%B9%E8%A1%97%E6%8C%AF%E5%85%B4%E7%A5%A8)。

虽然现在伊修加德已经竣工了，但仍然可以交纳**第四期重建用的〇〇**获取经验和振兴票（注意：一二三期的素材、成品均已没用了，切勿买到错误的材料）。

;;;
;;;

#### 天穹同庆

由于现在伊修加德已经重建完毕，因此不再开放联合重建工程，而是每2小时举办一次天穹同庆活动（天穹同庆活动有准备期和举办期，只有在举办期内才会举办活动）。

只要有1级的生产或采集职业就可以参加天穹同庆活动，参加活动可以获得<item name="庆典礼物箱" />和天穹街振兴票，搓累了就时候过来玩玩吧~

### 老主顾

开启收藏品之后，跟随主线进度，会开启各个地区的老主顾。

::: segment green 
各地区老主顾开启方式：
- <quest name="打开新世界的大门" type="plus" />→<quest name="熙洛·阿里亚珀的老主顾" type="plus" />。
- <quest name="红莲之狂潮" type="main" />+<quest name="熙洛·阿里亚珀的老主顾" type="plus" />+<quest name="阿答儿金部的继承者" />→<quest name="亚德基拉的老主顾" type="plus" />。
- <quest name="英雄归来" type="main" />+<quest name="生意兴隆" />→<quest name="梅·娜格的老主顾" type="plus" />。
- <quest name="梅·娜格的老主顾" type="plus" />+<quest name="紫水宫的异变" type="plus" />及其后续支线→<quest name="红的老主顾" type="plus" />。
- <quest name="迈向未来" type="main" />+<quest name="诚信为本——莫雯卓越商会" />→<quest name="凯·希尔的老主顾" type="plus" />。
- <quest name="打开新世界的大门" type="plus" />+<quest name="缔造新篇龙诗之翼" type="plus" />（苍穹街相关任务，起点为<quest name="仰望天穹之街" type="plus" />）→<quest name="艾尔·图的老主顾" type="plus" />
- <quest name="打开新世界的大门" type="plus" />+<quest name="吹进云雾街的变革之风" type="plus" />+<quest name="天穹之下露出笑容" type="plus" />（苍穹街相关任务，起点为<quest name="仰望天穹之街" type="plus" />）→<quest name="狄兰达尔伯爵的老主顾" type="plus" />
- <quest name="打开新世界的大门" type="plus" />+<quest name="晓月之终途" type="main" />→<quest name="阿梅莉安丝的老主顾" type="plus" />
- <quest name="打开新世界的大门" type="plus" />+<quest name="晓月之终途" type="main" />→<quest name="安登的老主顾" type="plus" />
:::

向各位老主顾提交指定收藏品可以获得工票和经验，另外随着与老主顾好感度的提升，还可以为老主顾换装（仅限部分主顾）。老主顾好感度满格之后，会出现==报酬增加==的项目。非常适合练级，以及大量获取工票。

每周向老主顾上交的收藏品数量限制为单人6件，总和12件（与采集提交数合计）。当周的收藏品列表可以在任务情报菜单中查询，每周二<i class="xiv local-time-chs"></i>16:00更新。

### 友好部族/蛮族

在各个地区分布着专精于生产或采集的友好部族，完成他们的声望任务需要有对应的生产采集职业，提升声望之后可以获得友好部族专属坐骑，并开启专属商店。

* 鸟人族需要完成41级主线<quest name="石卫塔霸主" type="main" />，然后就可以在森都接任务<quest name="雷雨将至" type="plus" />开启。<br>鸟人族任务需要同时拥有生产及采集职业才能完成。虽然做任务需求等级不高，但配方难度较高，需要使用专属装备才能开buff，不推荐用于练级。
* 莫古力族需要完成55级主线<quest name="狩猎邪龙" type="main" />及支线<quest name="目标入团" type="plus" />及其后续十几个任务之后开启，达到誓约声望后可购买坐骑<item name="孢云棉花糖种子" />。
* 鲶鱼精族需要完成66级主线<quest name="红色的祈愿" type="main" />及支线<quest name="黑鼻" type="plus" />、<quest name="痴迷赏花" type="plus" />各自后续之后开启，达到血誓声望后可购买坐骑<item name="巨鲶鱼神轿笛" />。

详细任务奖励信息、声望商店列表请参看：[鸟人长风空力团](https://ff14.huijiwiki.com/wiki/%E9%95%BF%E9%A3%8E%E7%A9%BA%E5%8A%9B%E5%9B%A2)，[莫古力修复团](https://ff14.huijiwiki.com/wiki/%E8%8E%AB%E5%8F%A4%E5%8A%9B%E4%BF%AE%E5%A4%8D%E5%9B%A2)，[鲶鱼精大鲶大祭执行委员会](https://ff14.huijiwiki.com/wiki/%E5%A4%A7%E9%B2%B6%E5%A4%A7%E7%A5%AD%E6%89%A7%E8%A1%8C%E5%A7%94%E5%91%98%E4%BC%9A)。

## 参考工具

- [生产模拟器](http://ffxiv.tk/crafter/#/simulator) 
- [配方计算器](http://5p.nbbjack.com/#/cal)
- [Teamcraft](https://ffxivteamcraft.com/search)（需要科学上网）
