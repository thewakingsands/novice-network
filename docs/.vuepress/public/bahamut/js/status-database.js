var statusDB = {
	"Burns": {
		"name": "火伤",   
		"src": "img\\status\\Burns.png", 
		"info": "火属性持续伤害，体力逐渐流失(即死)",
		"duration": 30
	},
    "Neurolink": {
		"name": "拘束",   
		"src": "img\\status\\Neurolink.png", 
		"info": "受到拘束，造成的伤害会大幅降低(90%)，同时被“魔力爆散”攻击所受到的伤害会大幅降低"
	},
    "SlashingResistanceDownII": {
		"name": "斩击耐性大幅降低",   
		"src": "img\\status\\SlashingResistanceDownII.png", 
		"info": "斩击耐性大幅降低，增加受到斩击属性攻击的伤害（双塔尼亚普攻造成的伤害变为7w+）",
		"duration": 35
	},
    "ManaHypersensitivity": {
		"name": "魔力过敏",   
		"src": "img\\status\\ManaHypersensitivity.png", 
		"info": "变得对魔力过敏，被“魔力爆散”攻击所受到的伤害会大幅提高",
		"duration": 16
	},
	"Firescorched": {
		"name": "火角",   
		"src": "img\\status\\Firescorched.png", 
		"info": "对火角飞龙的攻击耐性降到最低",
		"duration": "60"
	},
	"Thunderstruck": {
		"name": "雷翼",   
		"src": "img\\status\\Thunderstruck.png", 
		"info": "对雷翼飞龙的攻击耐性降到最低，身上积攒了大量电气，效果结束时会对周围造成雷属性伤害",
		"duration": "5"
	},
	"Icebitten": {
		"name": "冰爪",   
		"src": "img\\status\\Icebitten.png", 
		"info": "对冰爪飞龙的攻击耐性降到最低",
		"duration": "60"
	},
	"Doom": {
		"name": "死亡宣告",   
		"src": "img\\status\\Doom.png", 
		"info": "倒计时为0时会陷入无法战斗状态",
		"duration": "6/10/16"
	},
	"PiercingResistanceDownII": {
		"name": "突刺耐性大幅降低",   
		"src": "img\\status\\PiercingResistanceDownII.png", 
		"info": "对抗突刺属性的耐性有显著降低"
	},
	"EarthResistanceDownII": {
		"name": "土属性耐性大幅降低",   
		"src": "img\\status\\EarthResistanceDownII.png", 
		"info": "对抗土属性的耐性有显著降低",
		"duration": "12"
	},
	"DamageUp": {
		"name": "伤害提高",   
		"src": "img\\status\\DamageUp.png", 
		"info": "攻击所造成的伤害提高",
	}
}

var hoverDB = {
	"map": {
		"src": "img\\hover\\map.png"
	},
	"neurolink": {
		"src": "img\\hover\\neurolink.png"
	},
	"twister": {
		"src": "img\\hover\\twister.png"
	},
	"firetriangle": {
		"src": "img\\hover\\firetriangle.png"
	},
	"manatriangle": {
		"src": "img\\hover\\manatriangle.png"
	},
	"manaball": {
		"src": "img\\hover\\manaball.png"
	},
	"firecircle": {
		"src": "img\\hover\\firecircle.png"
	},
	"plasmaburst":{
		"src": "img\\hover\\plasmaburst.png"
	},
	"skyfall":{
		"src": "img\\hover\\skyfall.png"
	},
	"greenpoint":{
		"src": "img\\hover\\greenpoint.png"
	},
	"hypernova":{
		"src": "img\\hover\\hypernova.png"
	}
}


//preloader img
function preloader() {
	var images = new Array();
	if (document.images) {
		var i = 0;
	    for (var item in hoverDB) {
	        images[i] = new Image();
	        images[i].src = hoverDB[item].src;
	        i++;
	    }
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(preloader);