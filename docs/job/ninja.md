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

**由于忍者在5.1版本中会经历重大变化，我并不推荐新人现在过多地钻研忍者的技巧，国服大约会在2020年春节后的一两个月内迎来5.1版本的更新。**

### 对单体输出

忍者的基本循环分为3套：<Action name="双刃旋" />→<Action name="绝风" />→<Action name="旋风刃" />(背)/<Action name="强甲破点突" />（侧）；<Action name="双刃旋" />→<Action name="影牙" />。这3套循环主要用来输出/续风遁/续<Status :id="508" name="影牙" />

忍者在30~45级之间逐渐学会<Action name="天之印">天</Action><Action name="地之印">地</Action><Action name="人之印">人</Action>3种印，配合<Action name="忍术" />需要4个键位（…实际上手速不够的人可能会需要更多键位emmm），在结印→忍术这个过程中，不能使用任何其他技能，否则忍术就会变成通灵术·小兔兔…。按照习得顺序来说，35级之前只有<Action name="天之印" />，使用<Action name="天之印">天</Action>→<Action name="忍术" />放出<Action name="风魔手里剑" />即可（保证忍术CD不断）。接下来习得<Action name="地之印" />，<Action name="天之印">天</Action>→<Action name="地之印">地</Action>→<Action name="忍术" />的<Action name="雷遁之术" />是忍者的主要单体输出忍术之一。

最后45级习得<Action name="人之印" />之后，结印瞬间就复杂了起来（并不），按照习得印的顺序可以记为<Action name="天之印">天</Action>(1)<Action name="地之印">地</Action>(2)<Action name="人之印">人</Action>(3)，那么123是<Action name="水遁之术" />，321是<Action name="风遁之术" />，21是<Action name="冰遁之术" />(具体出现什么忍术其实是以最后一个印来判定的，详细内容可以仔细阅读技能说明)

从45级开始，忍者循环初见端倪：开怪前结<Action name="风遁之术">风遁</Action>并全程保持（54级之前需要重新结风遁，54级之后使用<Action name="强甲破点突" />续<Status :id="500" name="风遁之术" />），然后<Action name="影牙" />→<Action name="旋风刃" />→………<Status :id="500" name="风遁之术" />不断、<Status :id="508" name="影牙" />不断，忍术好了就放。

忍者还有2个与忍术有关的技能：<Action name="生杀予夺" />可以重置忍术CD，并且为下一次忍术威力增加30%，76级之后更是能将<Action name="火遁之术" />与<Action name="冰遁之术" />分别升级为<Action name="劫火灭却之术" />和<Action name="冰晶乱流之术" />（冰晶是目前忍者单发威力最高的技能）。<Action name="天地人" />机制比较复杂，新人可以简单地理解为，在对单体输出的时候，使用<Action name="天地人" />→<Action name="人之印">人</Action>→<Action name="忍术" />→<Action name="地之印">地</Action>→<Action name="忍术" />→<Action name="天之印">天</Action>→<Action name="忍术" />就可以了（这样会按顺序放出<Action name="风魔手里剑" />→<Action name="雷遁之术" />→<Action name="水遁之术" />），之后则应该使用<Action name="攻其不备" />或<Action name="命水" />把<Status :id="507" name="水遁之术" />打掉（满级循环中也会根据实际情况改变忍术使用顺序，具体操作请看满级攻略）。

随着版本更新，<Action name="梦幻三段" /> → <Action name="断绝" />是一套能力技连击，用来插入在普通GCD技能之间（增加操作量）。

忍者从62级开始可以获得==忍气==，除了80级大招~影~<Action name="分身之术" />，它还可以用来使用<Action name="六道轮回" />。

最后是所有人都喜爱的神奇的<Action name="攻其不备">背刺</Action>，刚学会它的时候，唯一能触发它的方式是<Action name="隐遁" />，但是隐遁并不能在战斗中使用……基本上受限极大。但是45级学会所有印之后就不一样了，<Status :id="507" name="水遁之术" />同样可以触发背刺，因此45~76级开怪标准剧情应该是：开怪前结<Action name="风遁之术">风遁</Action>→使用<Action name="隐遁" />刷新忍术CD→开怪后结<Action name="水遁之术">水遁</Action>→<Action name="影牙" />连→<Action name="攻其不备">背刺</Action>→爆发全开→正常循环……背刺在高难度副本中，对团队整体贡献极大，可以说全团的爆发都等着背刺呢…在练级期间努力保证背刺好了就放，算是一种很好的练习。

<Action name="飞刀" />作为一个早期习得的远程投掷类技能，在后期的副本战斗中完全可以被<Action name="风魔手里剑" />或<Action name="雷遁之术" />所取代，使用的意义非常小。

### 群体AOE

忍者AOE技能是<Action name="血雨飞花" />→<Action name="八卦无刃杀" />，忍术方面有<Action name="火遁之术" />（<Action name="人之印">人</Action>→<Action name="天之印">天</Action>）和<Action name="土遁之术" />（<Action name="人之印">人</Action>→<Action name="天之印">天</Action>→<Action name="地之印">地</Action>），<Action name="生杀予夺">生杀</Action>可以强化火遁，变为<Action name="劫火灭却之术" />。另外消耗忍气可以使用<Action name="通灵之术·大虾蟆" />。

一套标准的AOE用<Action name="天地人" />顺序是<Action name="天地人" />→<Action name="人之印">人</Action>→<Action name="忍术" />→<Action name="天之印">天</Action>→<Action name="忍术" />→<Action name="地之印">地</Action>→<Action name="忍术" />。

综合起来就是忍者的AOE体系：用<Action name="血雨飞花" />→<Action name="八卦无刃杀" />打循环，早期没学会<Action name="生杀予夺">生杀</Action>和<Action name="天地人" />的时候，优先放<Action name="土遁之术" />。习得<Action name="生杀予夺">生杀</Action>之后可以<Action name="土遁之术" />→<Action name="劫火灭却之术" />，习得<Action name="天地人" />之后，则是先放两个火遁，然后利用天地人AOE循环放土遁。

如果目标不足3只，挨个挂<Action name="影牙" />。

### 辅助与应急

以前的忍者辅助功能性极强，随着版本的更新，忍者的辅助性功能一点点被删掉了（）。目前忍者最强的辅助仍然是<Action name="攻其不备">背刺</Action>。

在遇到特殊情况的时候<Action name="缩地" />几乎都能帮我们快速脱身，而且自带下落受伤减轻特性的忍者，并不怕从高处掉落（然后被怪舔一口）。掉血之后使用<Action name="内丹" />和<Action name="浴血" />可以回血。

## 满级手法

* [5.X忍者进阶攻略](https://bbs.nga.cn/read.php?tid=17771833)