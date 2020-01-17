var container = document.getElementById('p4-timeline-area');

var items = new vis.DataSet([
    {content: ' ', start: moment('11:00', 'HH:mm'), subgroup:1, group: 2},
    {content: ' ', start: moment('15:00', 'HH:mm'), subgroup:1, group: 2},

    {content: '龙神的加护', start: moment('11:57', 'HH:mm'), subgroup:1, group: 2},
    {content: '垂直下落', start: moment('12:06', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体地狱', start: moment('12:10', 'HH:mm'), end: moment('12:14', 'HH:mm'), subgroup:1, group: 2},
    {content: '魔力炼成x3', start: moment('12:15', 'HH:mm'), end: moment('12:18', 'HH:mm'), subgroup:2, group: 2},
    {content: '旋风', start: moment('12:20', 'HH:mm'), end: moment('12:22', 'HH:mm'), subgroup:3, group: 2},
    {content: '旋风', start: moment('12:38', 'HH:mm'), end: moment('12:40', 'HH:mm'), subgroup:3, group: 2},
    {content: '死刑', start: moment('12:55', 'HH:mm'), subgroup:1, group: 2},

    {content: '垂直下落', start: moment('13:03', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体地狱', start: moment('13:12', 'HH:mm'), end: moment('13:17', 'HH:mm'), subgroup:1, group: 2},
    {content: '魔力炼成x3', start: moment('13:18', 'HH:mm'), end: moment('13:21', 'HH:mm'), subgroup:2, group: 2},
    {content: '旋风', start: moment('13:23', 'HH:mm'), end: moment('13:25', 'HH:mm'), subgroup:3, group: 2},
    {content: '旋风', start: moment('13:41', 'HH:mm'), end: moment('13:43', 'HH:mm'), subgroup:3, group: 2},
    {content: '死刑', start: moment('13:51', 'HH:mm'), subgroup:1, group: 2},

    {content: '巴哈姆特之爪', start: moment('12:06', 'HH:mm'), subgroup:2, group: 1},
    {content: '奈尔台词1', start: moment('12:27', 'HH:mm'), end: moment('12:36', 'HH:mm'), subgroup:1, group: 1},
    {content: '百万核爆', start: moment('12:46', 'HH:mm'), end: moment('12:51', 'HH:mm'), subgroup:2, group: 1},
    {content: '凶鸟尖喙', start: moment('12:55', 'HH:mm'), subgroup:1, group: 1},

    {content: '巴哈姆特之爪', start: moment('13:03', 'HH:mm'), subgroup:2, group: 1},
    {content: '奈尔台词2', start: moment('13:30', 'HH:mm'), end: moment('13:39', 'HH:mm'), subgroup:1, group: 1},
    {content: '凶鸟尖喙', start: moment('13:51', 'HH:mm'), subgroup:1, group: 1},
    {content: '百万核爆', start: moment('14:01', 'HH:mm'), end: moment('14:06', 'HH:mm'), subgroup:2, group: 1}
]);


var groups = new vis.DataSet([
    {id: 0, content: ' ', subgroupOrder: 'subgroup', subgroupStack: {1: true, 2: true, 3:true, 4:true, 5:true, 6:true}},
	{id: 1, content: '白银<br>凶鸟', subgroupOrder: 'subgroup', subgroupStack: {1: true, 2: true, 3:true, 4:true, 5:true, 6:true}},
	{id: 2, content: '双塔<br>尼亚', subgroupOrder: 'subgroup', subgroupStack: {1: true, 2: true, 3:true, 4:true, 5:true, 6:true}}
]);


items.add([
	// {id: 25, content: '圣光幕帘', start: moment('00:00', 'HH:mm'), end: moment('00:15', 'HH:mm'),subgroup:5, group: 1}
]);

updateTooltips();

  // Configuration for the Timeline
var options = {
	editable: true,
	min: moment('11:50', 'HH:mm'),
	max: moment('14:13', 'HH:mm'),
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




// 1st rotation

var items = new vis.DataSet([
    {content: ' ', start: moment('11:00', 'HH:mm'), subgroup:1, group: 2},
    {content: ' ', start: moment('15:00', 'HH:mm'), subgroup:1, group: 2},

    {content: '龙神的加护', start: moment('11:57', 'HH:mm'), subgroup:1, group: 2},
    {content: '垂直下落', start: moment('12:06', 'HH:mm'), subgroup:2, group: 2},
    {content: '垂直下落', start: moment('13:03', 'HH:mm'), subgroup:2, group: 2},
    {content: '液体地狱', start: moment('12:10', 'HH:mm'), end: moment('12:14', 'HH:mm'), subgroup:1, group: 2},
    {content: '魔力炼成x3', start: moment('12:15', 'HH:mm'), end: moment('12:18', 'HH:mm'), subgroup:2, group: 2},
    {content: '旋风', start: moment('12:20', 'HH:mm'), end: moment('12:22', 'HH:mm'), subgroup:3, group: 2},
    {content: '旋风', start: moment('12:38', 'HH:mm'), end: moment('12:40', 'HH:mm'), subgroup:3, group: 2},
    {content: '死刑', start: moment('12:55', 'HH:mm'), subgroup:1, group: 2},

    {content: '巴哈姆特之爪', start: moment('12:06', 'HH:mm'), subgroup:2, group: 1},
    {content: '巴哈姆特之爪', start: moment('13:03', 'HH:mm'), subgroup:2, group: 1},
    {content: '奈尔台词1', start: moment('12:27', 'HH:mm'), end: moment('12:36', 'HH:mm'), subgroup:1, group: 1},
    {content: '百万核爆', start: moment('12:46', 'HH:mm'), end: moment('12:51', 'HH:mm'), subgroup:2, group: 1},
    {content: '凶鸟尖喙', start: moment('12:55', 'HH:mm'), subgroup:1, group: 1},
]);

updateTooltips();

var container = document.getElementById('p4.1-timeline-area');
options.min = moment('11:53', 'HH:mm');
options.max = moment('13:10', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

var items = new vis.DataSet([
    {content: ' ', start: moment('11:00', 'HH:mm'), subgroup:1, group: 2},
    {content: ' ', start: moment('15:00', 'HH:mm'), subgroup:1, group: 2},

    {content: '液体地狱', start: moment('13:12', 'HH:mm'), end: moment('13:17', 'HH:mm'), subgroup:1, group: 2},
    {content: '魔力炼成x3', start: moment('13:18', 'HH:mm'), end: moment('13:21', 'HH:mm'), subgroup:2, group: 2},
    {content: '旋风', start: moment('13:23', 'HH:mm'), end: moment('13:25', 'HH:mm'), subgroup:3, group: 2},
    {content: '旋风', start: moment('13:41', 'HH:mm'), end: moment('13:43', 'HH:mm'), subgroup:3, group: 2},
    {content: '死刑', start: moment('13:51', 'HH:mm'), subgroup:1, group: 2},

    {content: '奈尔台词2', start: moment('13:28', 'HH:mm'), end: moment('13:39', 'HH:mm'), subgroup:1, group: 1},
    {content: '凶鸟尖喙', start: moment('13:51', 'HH:mm'), subgroup:1, group: 1},
    {content: '百万核爆', start: moment('14:01', 'HH:mm'), end: moment('14:06', 'HH:mm'), subgroup:2, group: 1}
]);

updateTooltips();

var container = document.getElementById('p4.2-timeline-area');
options.min = moment('13:05', 'HH:mm');
options.max = moment('14:12', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);
