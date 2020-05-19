# 忍者
<FloatTOC />

## 综合介绍

忍者是2.4新增的职业，从远东流亡而来的忍者在利姆萨罗敏萨落脚，带来的新职业体系，当年很多躺尸龙迫不得已都练了一个忍者以求顺利通过巴哈姆特大迷宫…

忍者的特点是通过<Action name="天之印">天</Action><Action name="地之印">地</Action><Action name="人之印">人</Action>三种印结印，从而使出6种不同的<Action name="忍术" />(如果加上兔兔和手里剑就是8种…嗯！)。

忍者在保证风遁不断的前提下，使用忍术和普通攻击技能输出，配合忍气进一步加强忍术的使用。每60s一次的<Action name="攻其不备">背刺</Action>是全团都可享受的极强增伤，也是忍者本体的重要爆发技能。

忍者自带的辅助类特性和技能是最为丰富的，比如自带被动移动速度加快，隐身在PVP中可以偷点，<Action name="缩地" />是唯一可以指定落点的位移技能等等。

## 忍者入门

忍者不能作为进入游戏时的初始职业，但只要有任意职业完成10级的职业任务，就可以在海都接任务<quest type="plus" name="如何加入双剑师行会" />，并继续完成任务<quest type="plus" name="悄然声息的双剑师" />获得双剑，就能成为双剑师了。

忍者属于物理近战职业，想要玩忍者的玩家，推荐以==斧术师==进入游戏，完成斧术师10级职业任务获准转职之后，就可以直接去双剑师行会接任务<quest type="plus" name="如何加入双剑师行会" />转职了。

## 练级手法

在忍者的循环中，<Status :id="500" name="风遁之术" />不断是一切的根本，而<Action name="攻其不备">背刺</Action>是单体循环构建的基础，所有的技能安排基本都是围绕<Status :id="2014" name="攻其不备" />buff的15s期间规划的。

养成每次开怪之前结<Action name="风遁之术">风遁</Action>，然后使用<Action name="隐遁" />刷新忍术的习惯会很有帮助。另外对于部分BOSS，可以在风遁之后放一个土遁再隐遁，这样开怪后BOSS能踩到土遁的圈，可以白赚额外伤害。

### 对单体输出

忍者的基本循环分为2套：<Action name="双刃旋" />→<Action name="绝风" />→<Action name="旋风刃" />(背)/<Action :id="3563" name="强甲破点突" />（侧）。这2套循环主要用来输出/续风遁。

在45级之前的忍者，基本上就打<Action name="旋风刃" />连和<Action name="雷遁之术" />输出，另外别忘了定时补<Status :id="508" name="影牙" />dot（忘了…就忘了吧，没风遁的忍者补这个有点费劲）。

忍者在30~45级之间逐渐学会<Action name="天之印">天</Action><Action name="地之印">地</Action><Action name="人之印">人</Action>3种印，配合<Action name="忍术" />需要4个键位（…实际上手速不够的人可能会需要更多键位emmm），在结印→忍术这个过程中，不能使用任何其他技能，否则忍术就会变成<Action :id="2272">通灵术·小兔兔</Action>。按照习得顺序来说，35级之前只有<Action name="天之印" />，使用<Action name="天之印">天</Action>→<Action name="忍术" />放出<Action name="风魔手里剑" />即可（保证忍术CD不断）。接下来习得<Action name="地之印" />，<Action name="天之印">天</Action>→<Action name="地之印">地</Action>→<Action name="忍术" />的<Action name="雷遁之术" />是忍者的主要单体输出忍术之一。

最后45级习得<Action name="人之印" />之后，结印瞬间就复杂了起来（并不），按照习得印的顺序可以记为<Action name="天之印">天</Action>(1)<Action name="地之印">地</Action>(2)<Action name="人之印">人</Action>(3)，那么123是<Action name="水遁之术" />，321是<Action name="风遁之术" />，23是<Action name="冰遁之术" />(具体出现什么忍术其实是以最后一个印来判定的，详细内容可以仔细阅读技能说明)。

从45级开始，忍者循环初见端倪：开怪前结<Action name="风遁之术">风遁</Action>，然后使用<Action name="隐遁" />刷新忍术，开怪后<Action name="双刃旋" />→（<Action name="夺取" />）→<Action name="绝风" />→<Action name="旋风刃" />→<Action name="水遁之术">水遁</Action>→<Action name="攻其不备">背刺</Action>→<Action name="影牙" />→<Action name="雷遁之术" />→<Action name="旋风刃" />连→<Action name="雷遁之术" />………

50级习得的<Action name="生杀予夺" />可以白送一次忍术，并在接下来15s内提升30%忍术伤害，76级之后更是能将火遁与冰遁分别升级为<Action name="劫火灭却之术" />和<Action name="冰晶乱流之术" />（冰晶是目前忍者单发威力最高的技能），在76级之前可以用生杀打<Action name="雷遁之术" />雷遁</Action>，76之后则固定生杀打<Action name="冰晶乱流之术" />冰晶</Action> ~万万不可学某产品经理生杀风遁，虽然大部分忍者都干过这种事…~。

而<Action name="梦幻三段" /> → <Action name="断绝" />是一套能力技连击，用来插入在普通GCD技能之间（增加操作量）。

整体来说，60级之前的忍者，在15s<Status :id="2014" name="攻其不备" />期间，需要打<Action name="影牙" />，生杀<Action name="冰晶乱流之术" />冰晶</Action>（76以下是<Action name="雷遁之术" />雷遁</Action>），若干个<Action name="雷遁之术" />雷遁</Action>（打完所有忍术）。其他时间则是打<Action name="旋风刃" />连，并注意保持风遁（54级之后可使用<Action :id="3563" name="强甲破点突" />续风遁），直到下一次<Action name="攻其不备">背刺</Action>。

忍者从62级开始可以获得==忍气==，除了80级大招<del>影</del><Action name="分身之术" />，它还可以用来使用<Action name="六道轮回" />（AOE技能为<Action name="通灵之术·大虾蟆" />），需要把六道放在背刺爆发期中使用，配合<Action name="夺取" />（66级之后）赠送的40忍气，在一次背刺中最多可以放出3次六道。通常来说忍气需要在背刺中使用，但如果忍气即将溢出，记得用六道消耗掉它。

70级习得的<Action name="天地人" />机制比较复杂，新人可以简单地理解为，在对单体输出的时候，使用<Action name="天地人" />→<Action name="天之印">天</Action>→<Action name="地之印">地</Action>→<Action name="人之印">人</Action>就可以了（使用这些技能的时候不能移动，否则<Status :id="1186" name="天地人" />会立刻解除）这样实际上会按顺序放出<Action name="风魔手里剑" />→<Action name="雷遁之术" />→<Action name="水遁之术" />，之后则应该使用<Action name="攻其不备" />或<Action name="命水" />把<Status :id="507" name="水遁之术" />打掉（AOE打法见AOE篇）。

<Action name="飞刀" />作为一个早期习得的远程投掷类技能，在后期的副本战斗中完全可以被<Action name="风魔手里剑" />（25m）或<Action name="雷遁之术" />（15m）所取代，除了在无敌但可命中的目标身上蹭忍气，基本上没别的用。

### 群体AOE

忍者AOE技能是<Action :id="2254" name="血雨飞花" />→<Action name="八卦无刃杀" />，忍术方面有<Action name="火遁之术" />（<Action name="人之印">人</Action>→<Action name="天之印">天</Action>）和<Action name="土遁之术" />（<Action name="人之印">人</Action>→<Action name="天之印">天</Action>→<Action name="地之印">地</Action>），<Action name="生杀予夺">生杀</Action>可以强化火遁，变为<Action name="劫火灭却之术" />。另外消耗忍气可以使用<Action name="通灵之术·大虾蟆" />。

一套标准的AOE用<Action name="天地人" />顺序是<Action name="天地人" />→<Action name="人之印">人</Action>→<Action name="天之印">天</Action>→<Action name="地之印">地</Action>。这样实际上会按顺序放出<Action name="风魔手里剑" />→<Action name="火遁之术" />→<Action name="土遁之术" />。76级习得<Action name="命水" />之后则应该以水遁结束（即天→地→人），用命水换50忍气打大虾蟆。

二者综合起来就是忍者的AOE体系：用<Action :id="2254" name="血雨飞花" />→<Action name="八卦无刃杀" />打循环，早期没学会生杀和天地人的时候，优先放<Action name="土遁之术" />。习得<Action name="生杀予夺">生杀</Action>之后可以<Action name="土遁之术" />→<Action name="生杀予夺">生杀</Action>→<Action name="火遁之术" />火遁</Action>/<Action name="劫火灭却之术" />；习得<Action name="天地人" />之后，则是先放两个火遁（<Action name="火遁之术" />火遁</Action>→<Action name="生杀予夺">生杀</Action>→<Action name="劫火灭却之术" />），然后利用天地人AOE循环放土遁（75级之后则应该先放土遁→劫火灭却→天地人→命水）。

当只有2个小怪的时候，可以放<Action name="通灵之术·大虾蟆" />，但不需要打<Action name="八卦无刃杀" />连，使用对单体的<Action name="旋风刃" />连即可。

**在AOE场合也不要忘记开怪前续/补风遁！**，<Action name="八卦无刃杀" />技能本身也可以帮助续风遁。

### 辅助与应急

以前的忍者辅助功能性极强，随着版本的更新，忍者的辅助性功能一点点被删掉了（）。目前忍者最强的辅助仍然是<Action name="攻其不备">背刺</Action>。

在遇到特殊情况的时候<Action name="缩地" />几乎都能帮我们快速脱身，而且自带下落受伤减轻特性的忍者，并不怕从高处掉落（然后被怪舔一口）。

在自身残血或可能遇到大伤害时，使用<Action name="残影" />可以获得一个超厚的大盾，为治疗争取时间，也可以使用<Action name="内丹" />和<Action name="浴血" />回血。

## 满级手法

* [5.X忍者进阶攻略](https://bbs.nga.cn/read.php?tid=17771833)