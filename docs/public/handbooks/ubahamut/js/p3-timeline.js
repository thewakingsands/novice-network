var container = document.getElementById('p3.0-timeline-area');

var items = new vis.DataSet([
    {content: '第七<br>灵灾', start: moment('06:05', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息', start: moment('06:22', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息', start: moment('07:03', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息x3', start: moment('07:54', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息', start: moment('08:41', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息', start: moment('08:55', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息x3', start: moment('09:48', 'HH:mm'), subgroup:1, group: 2},
    {content: '核爆<br>吐息', start: moment('10:54', 'HH:mm'), subgroup:1, group: 2},
    {content: '平击', start: moment('06:30', 'HH:mm'), subgroup:2, group: 2},
    {content: '平击', start: moment('07:11', 'HH:mm'), subgroup:2, group: 2},
    {content: '平击', start: moment('08:49', 'HH:mm'), subgroup:2, group: 2},
    {content: '平击', start: moment('10:50', 'HH:mm'), subgroup:2, group: 2},
    {content: '进军<br>三重奏', start: moment('06:34', 'HH:mm'), end: moment('06:34', 'HH:mm'), subgroup:3, group: 2},
    {content: '黑炎<br>三重奏', start: moment('07:15', 'HH:mm'), end: moment('07:36', 'HH:mm'), subgroup:3, group: 2},
    {content: '灾厄<br>三重奏', start: moment('08:07', 'HH:mm'), end: moment('08:25', 'HH:mm'), subgroup:3, group: 2},
    {content: '天地<br>三重奏', start: moment('09:00', 'HH:mm'), end: moment('09:25', 'HH:mm'), subgroup:3, group: 2},
    {content: '连击<br>三重奏', start: moment('10:01', 'HH:mm'), end: moment('10:28', 'HH:mm'), subgroup:3, group: 2},
    {content: '群龙<br>八重奏', start: moment('10:58', 'HH:mm'), end: moment('11:30', 'HH:mm'), subgroup:3, group: 2},
    {content: '十亿<br>核爆', start: moment('07:38', 'HH:mm'), subgroup:2, group: 2},
    {content: '十亿<br>核爆', start: moment('08:29', 'HH:mm'), subgroup:2, group: 2},
    {content: '十亿<br>核爆', start: moment('09:33', 'HH:mm'), subgroup:2, group: 2},
    {content: '十亿<br>核爆', start: moment('10:33', 'HH:mm'), subgroup:2, group: 2}
  ]);



var groups = new vis.DataSet([
	{id: 1, content: ' '},
	{id: 2, content: '巴哈<br>姆特', subgroupOrder: 'subgroup', subgroupStack: {1: true, 2: true, 3:true, 4:true, 5:true, 6:true}}
]);


items.add([
	// {id: 25, content: '圣光幕帘', start: moment('00:00', 'HH:mm'), end: moment('00:15', 'HH:mm'),subgroup:5, group: 1}
]);

updateTooltips();

  // Configuration for the Timeline
var options = {
	editable: true,
	min: moment('05:50', 'HH:mm'),
	max: moment('12:00', 'HH:mm'),
	showMajorLabels: false,
	minHeight: '10rem',
	zoomMin: 600000,
	stack: false,
	stackSubgroups: true
/*	timeAxis:  {scale: 'minute', step: 5},
	orientation: 'bottom'*/
};

// options.timeAxis = {
// 	scale: 'second',
// 	step: 1
// }

// var options.hiddenDates = ;
// Create a Timeline
var timeline = new vis.Timeline(container, items, groups, options);




// quickmarch
var items = new vis.DataSet([
    {content: '进军<br>三重奏', start: moment('06:34', 'HH:mm'), end: moment('06:38', 'HH:mm'), subgroup:1, group: 2},
    {content: '百万核爆冲', start: moment('06:42', 'HH:mm'), end: moment('06:46', 'HH:mm'), subgroup:1, group: 2},
    {content: '旋风', start: moment('06:46', 'HH:mm'), subgroup:2, group: 2},
    {content: '百万核爆', start: moment('06:49', 'HH:mm'), end: moment('06:54', 'HH:mm'), subgroup:1, group: 2},
    {content: '大地摇动', start: moment('06:57', 'HH:mm'), subgroup:1, group: 2},
    {content: '风暴之翼', start: moment('06:59', 'HH:mm'), subgroup:1, group: 2}
]);

updateTooltips();

var container = document.getElementById('p3.1-timeline-area');
options.min = moment('06:30', 'HH:mm');
options.max = moment('07:00', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// blackfire
var items = new vis.DataSet([
    {content: '黑炎<br>三重奏', start: moment('07:15', 'HH:mm'), end: moment('07:19', 'HH:mm'), subgroup:1, group: 2},
    {content: '百万核爆冲', start: moment('07:24', 'HH:mm'),  subgroup:1, group: 2},
    {content: '液体<br>地狱', start: moment('07:24', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体<br>地狱', start: moment('07:25', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体<br>地狱', start: moment('07:26', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体<br>地狱', start: moment('07:27', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体<br>地狱', start: moment('07:28', 'HH:mm'), subgroup:2, group: 2},
    {content: '超新星', start: moment('07:34', 'HH:mm'), subgroup:2, group: 2},
    {content: '超新星', start: moment('07:35', 'HH:mm'), subgroup:2, group: 2},
    {content: '超新星', start: moment('07:37', 'HH:mm'), subgroup:2, group: 2},
    {content: '超新星', start: moment('07:38', 'HH:mm'), subgroup:2, group: 2},
    {content: '热离子光束', start: moment('07:27', 'HH:mm'),  subgroup:1, group: 2},
    {content: '百万核爆(分摊)', start: moment('07:30', 'HH:mm'), subgroup:1, group: 2},
    {content: '百万核爆(踩塔)', start: moment('07:38', 'HH:mm'), subgroup:1, group: 2}
]);

updateTooltips();

var container = document.getElementById('p3.2-timeline-area');
options.min = moment('07:10', 'HH:mm');
options.max = moment('07:50', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// fellruin
var items = new vis.DataSet([
    {content: '灾厄三重奏', start: moment('08:07', 'HH:mm'), end: moment('08:12', 'HH:mm'), subgroup:1, group: 2},
    {content: '风暴之翼', start: moment('08:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '以太失控', start: moment('08:22', 'HH:mm'), end: moment('08:27', 'HH:mm'), subgroup:3, group: 2},
    {content: '台词2：凶鸟冲+月流电圈', start: moment('08:20', 'HH:mm'), subgroup:1, group: 2},
    {content: '台词1：月流电圈+凶鸟冲', start: moment('08:20', 'HH:mm'), subgroup:2, group: 2},
    {content: '十亿核爆', start: moment('08:30', 'HH:mm'), end: moment('08:36', 'HH:mm'), subgroup:1, group: 2},
    {content: '陨石流', start: moment('08:31', 'HH:mm'), subgroup:2, group: 2}
]);

updateTooltips();

var container = document.getElementById('p3.3-timeline-area');
options.min = moment('08:00', 'HH:mm');
options.max = moment('08:40', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// heavensfall
var items = new vis.DataSet([
    {content: '天地三重奏', start: moment('08:59', 'HH:mm'), end: moment('09:03', 'HH:mm'), subgroup:1, group: 2},
    {content: '百万核爆冲', start: moment('09:08', 'HH:mm'), end: moment('09:12', 'HH:mm'), subgroup:2, group: 2},
    {content: '旋风冲', start: moment('09:08', 'HH:mm'), end: moment('09:12', 'HH:mm'), subgroup:1, group: 2},
    {content: '旋风', start: moment('09:12', 'HH:mm'), subgroup:3, group: 2},
    {content: '天崩地裂', start: moment('09:14', 'HH:mm'), end: moment('09:17', 'HH:mm'), subgroup:1, group: 2},
    {content: '热离子爆发', start: moment('09:24', 'HH:mm'), end: moment('09:32', 'HH:mm'), subgroup:3, group: 2},
    {content: '百万核爆<br>（可视大圈）', start: moment('09:13', 'HH:mm'), subgroup:4, group: 2},
    {content: '百万核爆<br>（踩塔）', start: moment('09:15', 'HH:mm'), subgroup:3, group: 2},
    {content: '超新星', start: moment('09:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '超新星', start: moment('09:27', 'HH:mm'), subgroup:2, group: 2},
    {content: '超新星', start: moment('09:28', 'HH:mm'), subgroup:1, group: 2},
    {content: '十亿核爆', start: moment('09:33', 'HH:mm'), end: moment('09:39', 'HH:mm'), subgroup:1, group: 2},
    {content: '火球', start: moment('09:29', 'HH:mm'), end: moment('09:34', 'HH:mm'), subgroup:2, group: 2}
]);

updateTooltips();

var container = document.getElementById('p3.4-timeline-area');
options.min = moment('08:55', 'HH:mm');
options.max = moment('09:40', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// tenstrike
var items = new vis.DataSet([
    {content: '连击三重奏', start: moment('10:01', 'HH:mm'), end: moment('10:05', 'HH:mm'), subgroup:1, group: 2},
    {content: '大地摇动x4', start: moment('10:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '大地摇动x4', start: moment('10:31', 'HH:mm'), subgroup:1, group: 2},
    {content: '魔力炼成', start: moment('10:08', 'HH:mm'), end: moment('10:12', 'HH:mm'), subgroup:1, group: 2},
    {content: '魔力炼成', start: moment('10:13', 'HH:mm'), end: moment('10:16', 'HH:mm'), subgroup:1, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:13', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:14', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:15', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:16', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:17', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:18', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:19', 'HH:mm'), subgroup:2, group: 2},
    {content: '陨<br>石<br>流', start: moment('10:20', 'HH:mm'), subgroup:2, group: 2},
    {content: '十亿核爆', start: moment('10:33', 'HH:mm'), end: moment('10:39', 'HH:mm'), subgroup:1, group: 2}
]);

updateTooltips();

var container = document.getElementById('p3.5-timeline-area');
options.min = moment('09:55', 'HH:mm');
options.max = moment('10:40', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// grand octet
var items = new vis.DataSet([
    {content: '群龙八重奏', start: moment('10:58', 'HH:mm'), end: moment('11:02', 'HH:mm'), subgroup:1, group: 2},
    {content: '百万核爆（分摊）', start: moment('11:40', 'HH:mm'), subgroup:1, group: 2},
    {content: '百万核爆（踩塔）', start: moment('11:42', 'HH:mm'), subgroup:2, group: 2},
    {content: '旋风', start: moment('11:41', 'HH:mm'), subgroup:3, group: 2},
    {content: '奈尔俯冲', start: moment('11:11', 'HH:mm'), end: moment('11:14', 'HH:mm'), subgroup:1, group: 2},
    {content: '巴哈俯冲', start: moment('11:28', 'HH:mm'), end: moment('11:32', 'HH:mm'), subgroup:3, group: 2},
    {content: '小龙俯冲', start: moment('11:18', 'HH:mm'), end: moment('11:22', 'HH:mm'), subgroup:1, group: 2},
    {content: '小龙俯冲', start: moment('11:20', 'HH:mm'), end: moment('11:24', 'HH:mm'), subgroup:2, group: 2},
    {content: '小龙俯冲', start: moment('11:22', 'HH:mm'), end: moment('11:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '小龙俯冲', start: moment('11:24', 'HH:mm'), end: moment('11:28', 'HH:mm'), subgroup:2, group: 2},
    {content: '小龙俯冲', start: moment('11:26', 'HH:mm'), end: moment('11:30', 'HH:mm'), subgroup:1, group: 2},
    {content: '双塔俯冲', start: moment('11:36', 'HH:mm'), end: moment('11:40', 'HH:mm'), subgroup:3, group: 2},
]);

updateTooltips();

var container = document.getElementById('p3.6-timeline-area');
options.min = moment('10:55', 'HH:mm');
options.max = moment('11:50', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);