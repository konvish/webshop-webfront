$("document").ready(function(){
		$("#shuju td").addClass("bg1");
		$("#shuju td").mouseover(function(){
			$(this).removeClass("bg1");
			$(this).parent().children().addClass("bg");
		}).mouseout(function(){
			$(this).parent().children().removeClass('bg');
			$(this).parent().children().addClass("bg1");
		}).click(function(){
			$("#shuju td,.click").removeClass("click");
			$(this).parent().children().addClass("click");
		});
		$(".del").click(function(){
			if(confirm("你确定要删除这个订单吗？")){
			 	var fid = $(this).attr("id");
				$(this).parent().remove();
				$(this).attr("href","/shopping/forder.do?status=delForder&fid=" + fid);
			}
		}).mouseover(function(){
			$(this).css("cursor","hand");
		});
		$(".status").change(function (){
			var fid = $(this).attr("id");
			var sid= $(this).val();
			$.get(formartURL("/shopping/forder.do?status=updStatus&fid=" + fid +"&sid=" + sid),null,function(){
			
			});
		});
		$(".selpage").click(function (){
			var currentPage = $("#currentPage").val();
			$(this).attr("href","/shopping/forder.do?status=otherPage&currentPage=" + currentPage);
		});
		$.formValidator.initConfig({formid:"form1",onerror:function(msg){alert(msg)}});
		$("#csny").focus(function(){
				WdatePicker({
					skin:'whyGreen',
					oncleared:function(){$(this).blur();},
					onpicked:function(){$(this).blur();}
				})
		});
});