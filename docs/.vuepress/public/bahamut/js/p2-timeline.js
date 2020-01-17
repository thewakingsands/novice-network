var container = document.getElementById('p2.2-timeline-area');

var items = new vis.DataSet([
    {content: '龙神的加护', start: moment('03:07', 'HH:mm'), end: moment('03:10', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:20', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:22', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:24', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('03:29', 'HH:mm'), subgroup:2, group: 2},
    {content: '冰爪', start: moment('03:35', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:37', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:39', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:41', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('03:44', 'HH:mm'), subgroup:2, group: 2},
    {content: '冰爪', start: moment('04:01', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:03', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:05', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:07', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('04:10', 'HH:mm'), subgroup:2, group: 2},
    {content: '冰爪', start: moment('04:22', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:24', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:28', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('04:31', 'HH:mm'), subgroup:2, group: 2},
    {content: '冰爪', start: moment('04:35', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:36', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:37', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:38', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:39', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:40', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:41', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:42', 'HH:mm'), subgroup:1, group: 2}
  ]);



var groups = new vis.DataSet([
	{id: 1, content: ' '},
	{id: 2, content: '白银<br>凶鸟', subgroupOrder: 'subgroup', subgroupStack: {1: true, 2: true, 3:true, 4:true, 5:true, 6:true}}
]);


items.add([
	// {id: 25, content: '圣光幕帘', start: moment('00:00', 'HH:mm'), end: moment('00:15', 'HH:mm'),subgroup:5, group: 1}
]);

updateTooltips();

  // Configuration for the Timeline
var options = {
	editable: true,
	min: moment('03:00', 'HH:mm'),
	max: moment('04:50', 'HH:mm'),
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

// p2-2
var items = new vis.DataSet([
	{content: '龙神的加护', start: moment('03:07', 'HH:mm'), end: moment('03:10', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:20', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:22', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:24', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('03:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('03:29', 'HH:mm'), subgroup:1, group: 2},
    {content: '雷翼', start: moment('03:17', 'HH:mm'), subgroup:1, group: 2},
    {content: '死亡宣告', start: moment('03:28', 'HH:mm'), subgroup:2, group: 2},
    {content: '救世之翼', start: moment('03:30', 'HH:mm'), subgroup:2, group: 2},
    {content: '救世之翼', start: moment('03:33', 'HH:mm'), subgroup:2, group: 2},
    {content: '月流电圈', start: moment('03:23', 'HH:mm'), subgroup:4, group: 2},
    {content: '钢铁战车/<br>热离子光束', start: moment('03:26', 'HH:mm'), subgroup:4, group: 2},
    {content: '巴哈姆特之爪', start: moment('03:37', 'HH:mm'), end: moment('03:41', 'HH:mm'), subgroup:1, group: 2}
]);

updateTooltips();

var container = document.getElementById('p2.3-timeline-area');
options.min = moment('03:03', 'HH:mm');
options.max = moment('03:45', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// p2-4
var items = new vis.DataSet([
	{content: '第二句台词出现', start: moment('03:45', 'HH:mm'), end: moment('03:49', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:01', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:03', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:05', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:07', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('04:10', 'HH:mm'), subgroup:1, group: 2},
    {content: '雷翼', start: moment('04:01', 'HH:mm'), subgroup:2, group: 2},
    {content: '死亡宣告', start: moment('03:57', 'HH:mm'), subgroup:2, group: 2},
    {content: '救世之翼', start: moment('03:59', 'HH:mm'), subgroup:3, group: 2},
    {content: '救世之翼', start: moment('04:02', 'HH:mm'), subgroup:3, group: 2},
    {content: '救世之翼', start: moment('04:05', 'HH:mm'), subgroup:3, group: 2},
    {content: '热离子<br>光束', start: moment('03:51', 'HH:mm'), subgroup:1, group: 2},
    {content: '钢铁战车/<br>月流电圈', start: moment('03:54', 'HH:mm'), subgroup:1, group: 2},
    {content: '巴哈姆特之爪', start: moment('04:12', 'HH:mm'), end: moment('04:16', 'HH:mm'), subgroup:1, group: 2}
]);

updateTooltips();

var container = document.getElementById('p2.4-timeline-area');
options.min = moment('03:40', 'HH:mm');
options.max = moment('04:20', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);

// p2-5
var items = new vis.DataSet([
	{content: '第三句台词出现', start: moment('04:17', 'HH:mm'), end: moment('04:21', 'HH:mm'), subgroup:3, group: 2},
    {content: '冰爪', start: moment('04:22', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:24', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:26', 'HH:mm'), subgroup:1, group: 2},
    {content: '冰爪', start: moment('04:28', 'HH:mm'), subgroup:1, group: 2},
    {content: '火角', start: moment('04:31', 'HH:mm'), subgroup:1, group: 2},
    {content: '雷翼', start: moment('04:29', 'HH:mm'), subgroup:2, group: 2},
    {content: '死亡宣告', start: moment('04:33', 'HH:mm'), subgroup:2, group: 2},
    {content: '救世之翼', start: moment('04:36', 'HH:mm'), subgroup:2, group: 2},
    {content: '救世之翼', start: moment('04:39', 'HH:mm'), subgroup:2, group: 2},
    {content: '救世之翼', start: moment('04:42', 'HH:mm'), subgroup:2, group: 2},
    {content: '凶鸟冲', start: moment('04:23', 'HH:mm'), subgroup:2, group: 2},
    {content: '钢铁战车/<br>月流电圈', start: moment('04:26', 'HH:mm'), subgroup:2, group: 2},
    {content: '凶鸟尖喙', start: moment('04:47', 'HH:mm'), end: moment('04:51', 'HH:mm'), subgroup:1, group: 2}
 
]);

updateTooltips();

var container = document.getElementById('p2.5-timeline-area');
options.min = moment('04:15', 'HH:mm');
options.max = moment('04:55', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);