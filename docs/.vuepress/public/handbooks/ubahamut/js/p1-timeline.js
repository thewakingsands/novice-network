//p1-1
var container = document.getElementById('p1.1-timeline-area');

var items = new vis.DataSet([
    {id: 0, content: '死刑', start: moment('00:20', 'HH:mm'), end: moment('00:24', 'HH:mm'), subgroup:1, group: 2},
    {id: 3, content: '垂直下落', start: moment('00:06', 'HH:mm'), subgroup:1, group: 2},
    {id: 4, content: '垂直下落', start: moment('00:27', 'HH:mm'), subgroup:1, group: 2},
    {id: 8, content: '旋风', start: moment('00:10', 'HH:mm'), end: moment('00:12', 'HH:mm'), subgroup:2, group: 2},
    {id: 11, content: '火球', start: moment('00:09', 'HH:mm'), end: moment('00:15', 'HH:mm'),subgroup:3, group: 2}
  ]);



var groups = new vis.DataSet([
	{id: 1, content: ' '},
	{id: 2, content: '双塔<br>尼亚', subgroupOrder: 'subgroup', subgroupStack: {1: true, 2: true, 3:true, 4:true, 5:true, 6:true}}
]);


items.add([
	// {id: 25, content: '圣光幕帘', start: moment('00:00', 'HH:mm'), end: moment('00:15', 'HH:mm'),subgroup:5, group: 1}
]);

function updateTooltips(){
	for (var i in items._data) {
		tempItem = items._data[i];
		if (tempItem.title != undefined)
			continue;
		if (tempItem.end == undefined)
			tempItem.title = tempItem.start._i + "|" + groups._data[tempItem.group].content.replace("<br>","") +  "发动了\""  + tempItem.content + "\"<br>";
		else{
			tempItem.title = tempItem.start._i + "|" + groups._data[tempItem.group].content.replace("<br>","") +  "正在发动\""  + tempItem.content + "\"<br>"
			+ tempItem.end._i + "|" + groups._data[tempItem.group].content.replace("<br>","") +  "发动了\""  + tempItem.content + "\"";
		}
		tempItem.editable = false;
	}
}

function updateItemName(){
	for (var i in items._data) {
		var tempItem = items._data[i];
		var name = tempItem.content;
		var newName = '';
		for (var j = 0; j < name.length-1; j++){
			newName += name[j] + '<br>';
		}
		newName += name[name.length-1];
		items._data[i].content = newName;
	}
}

// updateItemName();

updateTooltips();

  // Configuration for the Timeline
var options = {
	editable: true,
	min: moment('00:00', 'HH:mm'),
	max: moment('00:32', 'HH:mm'),
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

// p1-2
var items = new vis.DataSet([
	{id: 1,content: '死刑', start: moment('00:57', 'HH:mm'), end: moment('01:01', 'HH:mm'),  subgroup:1, group: 2},
	{id: 5, content: '垂直下落', start: moment('01:17', 'HH:mm'), subgroup:1, group: 2},
    {id: 9, content: '旋风', start: moment('01:09', 'HH:mm'), end: moment('01:11', 'HH:mm'), subgroup:1, group: 2},
    {id: 12, content: '液体地狱', start: moment('00:38', 'HH:mm'), end: moment('00:43', 'HH:mm'),subgroup:3, group: 2},
	{id: 13, content: '液体地狱', start: moment('00:50', 'HH:mm'), end: moment('00:55', 'HH:mm'),subgroup:3, group: 2},
	{id: 18, content: '魔力炼成', start: moment('00:44', 'HH:mm'), end: moment('00:47', 'HH:mm'),subgroup:3, group: 2},
	{id: 19, content: '魔力炼成', start: moment('01:06', 'HH:mm'), end: moment('01:09', 'HH:mm'),subgroup:3, group: 2}
]);

updateTooltips();

var container = document.getElementById('p1.2-timeline-area');
options.min = moment('00:32', 'HH:mm');
options.max = moment('01:20', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);


/*p1-3*/
var items = new vis.DataSet([
	{id: 2, content: '死刑', start: moment('01:55', 'HH:mm'), end: moment('01:59', 'HH:mm'), subgroup:2, group: 2},
	{id: 6, content: '垂直下落', start: moment('02:02', 'HH:mm'), subgroup:1, group: 2},
    {id: 7, content: '垂直下落', start: moment('02:17', 'HH:mm'), subgroup:1, group: 2},
    {id: 10, content: '旋风', start: moment('02:10', 'HH:mm'), end: moment('02:12', 'HH:mm'), subgroup:2, group:2},
    {id: 23, content: '火球', start: moment('01:44', 'HH:mm'), end: moment('01:50', 'HH:mm'),subgroup:2, group: 2},
    {id: 24, content: '火球', start: moment('02:32', 'HH:mm'), end: moment('02:38', 'HH:mm'),subgroup:2, group: 2},
	{id: 14, content: '液体地狱', start: moment('01:32', 'HH:mm'), end: moment('01:37', 'HH:mm'),subgroup:3, group: 2},
	{id: 15, content: '液体地狱', start: moment('01:43', 'HH:mm'), end: moment('01:48', 'HH:mm'),subgroup:3, group: 2},
	{id: 16, content: '液体地狱', start: moment('02:19', 'HH:mm'), end: moment('02:24', 'HH:mm'),subgroup:3, group: 2},
	{id: 17, content: '液体地狱', start: moment('02:31', 'HH:mm'), end: moment('02:36', 'HH:mm'),subgroup:3, group: 2},
	{id: 20, content: '魔力炼成', start: moment('01:37', 'HH:mm'), end: moment('01:40', 'HH:mm'),subgroup:4, group: 2},
	{id: 21, content: '魔力炼成', start: moment('02:06', 'HH:mm'), end: moment('02:09', 'HH:mm'),subgroup:4, group: 2},
	{id: 22, content: '魔力炼成', start: moment('02:25', 'HH:mm'), end: moment('02:28', 'HH:mm'),subgroup:4, group: 2}
]);

updateTooltips();

var container = document.getElementById('p1.3-timeline-area');
options.min =  moment('01:30', 'HH:mm');
options.max =  moment('03:00', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);


// //p1-full
var items = new vis.DataSet([
    {id: 0, content: '死刑', start: moment('00:20', 'HH:mm'), end: moment('00:24', 'HH:mm'), subgroup:2, group: 2},
    {id: 3, content: '垂直下落', start: moment('00:06', 'HH:mm'), subgroup:1, group: 2},
    {id: 4, content: '垂直下落', start: moment('00:27', 'HH:mm'), subgroup:1, group: 2},
    {id: 8, content: '旋风', start: moment('00:10', 'HH:mm'), end: moment('00:12', 'HH:mm'), subgroup:3, group: 2},
    {id: 11, content: '火球', start: moment('00:09', 'HH:mm'), end: moment('00:15', 'HH:mm'),subgroup:4, group: 2},
    {id: 1,content: '死刑', start: moment('00:57', 'HH:mm'), end: moment('01:01', 'HH:mm'),  subgroup:2, group: 2},
	{id: 5, content: '垂直下落', start: moment('01:17', 'HH:mm'), subgroup:1, group: 2},
    {id: 9, content: '旋风', start: moment('01:09', 'HH:mm'), end: moment('01:11', 'HH:mm'), subgroup:3, group: 2},
    {id: 12, content: '液体地狱', start: moment('00:38', 'HH:mm'), end: moment('00:43', 'HH:mm'),subgroup:4, group: 2},
	{id: 13, content: '液体地狱', start: moment('00:50', 'HH:mm'), end: moment('00:55', 'HH:mm'),subgroup:4, group: 2},
	{id: 18, content: '魔力炼成', start: moment('00:44', 'HH:mm'), end: moment('00:47', 'HH:mm'),subgroup:5, group: 2},
	{id: 19, content: '魔力炼成', start: moment('01:06', 'HH:mm'), end: moment('01:09', 'HH:mm'),subgroup:5, group: 2},
	{id: 2, content: '死刑', start: moment('01:55', 'HH:mm'), end: moment('01:59', 'HH:mm'), subgroup:2, group: 2},
	{id: 6, content: '垂直下落', start: moment('02:02', 'HH:mm'), subgroup:1, group: 2},
    {id: 7, content: '垂直下落', start: moment('02:17', 'HH:mm'), subgroup:1, group: 2},
    {id: 10, content: '旋风', start: moment('02:10', 'HH:mm'), end: moment('02:12', 'HH:mm'), subgroup:3, group:2},
    {id: 23, content: '火球', start: moment('01:44', 'HH:mm'), end: moment('01:50', 'HH:mm'),subgroup:3, group: 2},
    {id: 24, content: '火球', start: moment('02:32', 'HH:mm'), end: moment('02:38', 'HH:mm'),subgroup:3, group: 2},
	{id: 14, content: '液体地狱', start: moment('01:32', 'HH:mm'), end: moment('01:37', 'HH:mm'),subgroup:4, group: 2},
	{id: 15, content: '液体地狱', start: moment('01:43', 'HH:mm'), end: moment('01:48', 'HH:mm'),subgroup:4, group: 2},
	{id: 16, content: '液体地狱', start: moment('02:19', 'HH:mm'), end: moment('02:24', 'HH:mm'),subgroup:4, group: 2},
	{id: 17, content: '液体地狱', start: moment('02:31', 'HH:mm'), end: moment('02:36', 'HH:mm'),subgroup:4, group: 2},
	{id: 20, content: '魔力炼成', start: moment('01:37', 'HH:mm'), end: moment('01:40', 'HH:mm'),subgroup:5, group: 2},
	{id: 21, content: '魔力炼成', start: moment('02:06', 'HH:mm'), end: moment('02:09', 'HH:mm'),subgroup:5, group: 2},
	{id: 22, content: '魔力炼成', start: moment('02:25', 'HH:mm'), end: moment('02:28', 'HH:mm'),subgroup:5, group: 2}
  ]);

updateTooltips();

var container = document.getElementById('p1-timeline-area');
options.min =  moment('00:00', 'HH:mm');
options.max =  moment('03:00', 'HH:mm');
var timeline = new vis.Timeline(container, items, groups, options);