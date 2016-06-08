// JavaScript Document
$(document).ready(function(){
		$(".menu").hide();
		$("#first").show();
		$(".type").click(function(){
			$(".menu").animate({height:"hide",opacity:"hide"},500);
			$(this).next().animate({height:"show",opacity:"show"},500);
		});
	});