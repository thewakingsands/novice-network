function mousePosition(ev){   
    ev = ev || window.event;   
    if(ev.pageX || ev.pageY){   
        return {x:ev.pageX, y:ev.pageY};   
    }   
    return {   
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,   
        y:ev.clientY + document.body.scrollTop - document.body.clientTop   
    };   
}  
$("#image-frame").hide();
$(".hover-frame").hide();

$(".status-area").mouseenter(
	function(e){
/*	var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    })*/

    var id = $(this).attr("name");
    var status = statusDB[id];
    //load status pic
    $("#status-frame").find("img").attr("src", status.src);
    $(".hover-header-name").text(status.name);
    $(".hover-content-discription-info").text(status.info);
    if (status.duration != undefined){
   		$(".hover-content-discription-duration").html("<a style=\"color:#0AA30E\">持续时间：</a>"+ status.duration + "秒");
   	}
   	else $(".hover-content-discription-duration").text("");

    //load status location
    
    var statusOffset = $(this).offset();
    statusOffset.top += 20;
    offsetRight = $(window).width()-mousePosition(e).x;
    if (offsetRight > 350)
        statusOffset.left = mousePosition(e).x;
    else statusOffset.left = mousePosition(e).x - 300;
	$(".hover-frame").css(statusOffset);
	$(".hover-frame").show();
	}
).mouseleave(function(){
		$(".hover-frame").hide();
	}
);


$(".img-hover-area").mouseenter(
    function(e){
/*  var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    })*/

    var id = $(this).attr("name");
    var hoverImg = hoverDB[id];
    //load status pic
    $("#image-frame").find("img").attr("src", hoverImg.src);

    //load status location
    var imgOffset = $(this).offset();
    imgOffset.top = mousePosition(e).y+20;
    offsetRight = $(window).width()-mousePosition(e).x;
    if (offsetRight > 350)
        imgOffset.left = mousePosition(e).x;
    else imgOffset.left = mousePosition(e).x - 300;
    $("#image-frame").css(imgOffset);
    $("#image-frame").show();
    }
).mouseleave(function(){
        $("#image-frame").hide();
    }
);