﻿var $body = $("body");

var bindTabsEvents = function (tabId) {

    $(tabId + " .tab div").click( function (event) {
    	var i=event.target;
    	if(event.target.tagName=="SPAN"){
    		i=event.target.parentNode;
    	}
    	var tabLength = $(i).index();
    	$(tabId + " .tab div").removeClass("curr");
		$(i).addClass("curr");
		$(tabId + " .tabcon").hide();
		$(tabId + " .tabcon").eq(tabLength).show();
 	});

};

function preview(img){
	$("#preview .jqzoom img").attr("src",$(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"));
	$(img).parent().parent().find("li img").removeClass("selected");
	$(img).addClass("selected");
}

$(function(){
	var tempLength = 0;
	var viewNum = 4;
	var moveNum = 2;
	var moveTime = 300;
	var scrollDiv = $(".spec-scroll .items ul");
	var scrollItems = $(".spec-scroll .items ul li");
	var moveLength = scrollItems.eq(0).width() * moveNum;
	var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width();

	$(".spec-scroll .next").bind("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	$(".spec-scroll .prev").bind("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});
});

var calculatePrice = function(objId){

	 function FloatAdd(arg1,arg2){  
	   var r1,r2,m;  
	   try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
	   try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
	   m=Math.pow(10,Math.max(r1,r2));
	   return (arg1*m+arg2*m)/m;
	 }

	 function FloatSub(arg1,arg2){  
		var r1,r2,m,n;  
		try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
		try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
		m=Math.pow(10,Math.max(r1,r2));  
		n=(r1>=r2)?r1:r2;
		return ((arg1*m-arg2*m)/m).toFixed(2);  
	 }

	var price = parseFloat($("#primary-product").attr("wmeprice"));
	var mPrice = parseFloat($("#primary-product").attr("wmaprice"));

	$(objId + " .checkbox").click( function (event) {
		var objPrice = parseFloat($(event.target).attr("wmeprice"));
		var objmPrice = parseFloat($(event.target).attr("wmaprice"));
		if( $(this).is(':checked') ){
	    	price = FloatAdd(price,objPrice);
	    	mPrice = FloatAdd(mPrice,objmPrice);
	    }else{
			price = FloatSub(price,objPrice);
			mPrice = FloatSub(mPrice,objmPrice);
	    }
	    $('#calculatePrice').html("&yen;"+Number(price).toFixed(2));
        $('#martPrice').html("&yen;"+Number(mPrice).toFixed(2));
        $('#savePrice').html("&yen;"+Number(mPrice-price).toFixed(2));

	});
    
    $('#calculatePrice').html("&yen;"+price.toFixed(2));
    $('#martPrice').html("&yen;"+mPrice.toFixed(2));
	$('#savePrice').html("&yen;"+(mPrice-price).toFixed(2));
};

var leftmenu = function(){
	$(".leftColm > div h4").click(function () {
        $(this).toggleClass("ui-state-active").next().toggle();
        if($(this).parent().find("li").size()>0){
        	return false;
        }else{
        	return true;
        } 	
    });
};

var toggleMenu = function (event, callBack) {
	$(".nav-close").click( function () { 
		toggleMenu(); 
	});
    $('html').toggleClass("menu-active");
};


var togglePlistMenu = function (event, callBack) {
	$(".leftColm .nav-close").click( function () { 
		togglePlistMenu(); 
	});
    $('html').toggleClass("plist-menu-active");
};

var quantityCount = function(dcycleId){
 	var cycleId = dcycleId;
 	var checkboxNumber = $(".cycle-data-list .cycle").find('.radiobox');
 	var quantityValue = parseInt($(".quantity-text").val());
 	var checkboxNumberSize = checkboxNumber.size();
 	var checkboxselected = $(".cycle-data-list .cycle.selected").find('.radiobox');
 	if(isNaN(quantityValue)){
 		quantityValue = 1;
 	}else if(checkboxNumberSize > 0){
 		$(".summary-list .selected-info").show();
 	};

	var q = function(quantityValue){
		checkboxNumber.each(function(i,domEle){
			var lprice = parseFloat($(domEle).attr("lprice"));
			var mprice = parseFloat($(domEle).attr("mprice"));
			var shipunit = $(domEle).attr("shipunit");
			lprice = lprice*quantityValue;
			mprice = mprice*quantityValue;
			shipunit = shipunit*quantityValue;
			$("#l-price-"+i).html("&yen;"+lprice.toFixed(2));
			$("#m-price-"+i).html("&yen;"+mprice.toFixed(2));
			$("#s-price-"+i).html("&yen;"+(mprice-lprice).toFixed(2));
			$("#shipunit-"+i).html(shipunit);
		})
		var shipnumber = parseInt(checkboxselected.attr("shipnumber"));
		shipnumber = shipnumber*quantityValue;
		$("#shipnumber").html(shipnumber);
	};
	
	if(checkboxNumberSize>0){
		q(quantityValue);
	};
	
 	$(".increment").click(function(){
 		quantityValue += 1;
 		$(".quantity-text").val(quantityValue);
 		if(checkboxNumberSize>0){
			q(quantityValue);
		};
 	});
 	$(".decrement").click(function(){
 		if(quantityValue>1){
 			quantityValue -= 1;
 			$(".quantity-text").val(quantityValue);
 			if(checkboxNumberSize>0){
				q(quantityValue);
			};
 		};
 	});

 	// $(".quantity-text").bind('input propertychange', function() {
 	// 	alert("d");
 	// 	quantityValue = parseInt($(".quantity-text").val());
 	// 	if(quantityValue<1 || isNaN(quantityValue)){
 	// 		quantityValue = 1;
 	// 		$(".quantity-text").val(quantityValue);
 	// 	}else{
 	// 		$(".quantity-text").val(quantityValue);
 	// 	};
 	// 	q(quantityValue);
 	// });

};

var cycleSelection = function(objId){
 	var objAllId = $(objId + " .cycle");
 	objAllId.click(function(){
 		var thisId = $(this).index();
 		$(this).addClass("selected");
 		objAllId.each(function(i){
	 		if(i!=thisId){
	 			$(this).removeClass("selected");
	 		}
 		});
 		
 		//ADD by Bonnie - START
        var checkbox =  $(this).find('.radiobox');
        var optionURL = checkbox.attr("optionURL");
        window.location.href=optionURL;
        //ADD by Bonnie - END
 		quantityCount(thisId);
 	});
 	quantityCount(0);
}

var objSelection = function(objId,className){
 	$(objId).click(function(){
 		//some action
 	});
}

var objControlHeight = function(objId){
 	$(objId).toggle(
 		function(){
 			$(this).text("收起");
 			var ControlId = $(this).parent().prev(".option-area").find(".option-list");
 			ControlId.addClass("showMore");
 		},
 		function(){
 			$(this).text("更多");
 			var ControlId = $(this).parent().prev(".option-area").find(".option-list");
 			ControlId.removeClass("showMore");
		}
	);
}

var toggleCollection = function (event, callBack) {
    $('html').toggleClass("collection-button-active");
};

var placeholderSupport = function(){
    return 'placeholder' in document.createElement('input');
}

$(function(){

	if ($(".jqzoom").length > 0) {
        $(".jqzoom").jqueryzoom({xzoom:380,yzoom:410});
		bindTabsEvents('#comment');
		calculatePrice('#group-purchase');
		cycleSelection('.cycle-data-list');
    }
	if ($(".navColm").length > 0) {
		bindTabsEvents('#hotSales');
		leftmenu();
		objControlHeight('.btn-more-arrow')
	}
	if ($("#prolistSet").length > 0) {
		bindTabsEvents('#prolistSet');
	}
	if ($("#deliveryTab").length > 0) {
		bindTabsEvents('#deliveryTab');
	}
	
	if ($("#navMenu").length <= 0) {
		$(".header-items .menu-link").hide();
	}
	
	if ($(".jcarousel-wrapper").length > 0) {
		$(".header .category").addClass("show");
	}else{
		$(".header .category").removeClass("show");
	}
	
	if ($("#modify-address").length > 0) {
		initStoreAddrInfo();
	}
	
	$(".header-items .menu-link").bind("click", function(){toggleMenu();});
	$(".product-menu-link").bind("click", function(){togglePlistMenu();});
	$(".yCmsContentSlot .collection_button").bind("click", function(){toggleCollection();});

	if(!placeholderSupport()){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }else if(input.attr("type") == "password"){
                input.prev('b').remove();
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                if(input.attr("type") == "password"){
                	input.before("<b class='pw'>"+input.attr('placeholder')+"</b>");
                }else{
                    input.val(input.attr('placeholder'));
                }
            }
        }).blur();
        $('.password-div b.pw').live("click", function(){
            $(this).next("#j_password").focus();
            $(this).remove();
        });
    };
	
});

$(function(){
	$(".title > a").click(function () {
		$(this).parent().next().toggle();
		if($(this).text() == "收起"){
			$(this).text("展开");
		}else{
			$(this).text("收起");
		}
		return false;
	});
	
	
//	$("#integralShop").click(function(){
//		$.colorbox({opacity:"0.3",top:"10%",width:"1000px",height:"266px",scrolling:false,
//			html:'<div><img src="/_ui/desktop/mengniuo2o/images/credits_waiting_banner.png" /></div>'
//				});
//	});
	
});
