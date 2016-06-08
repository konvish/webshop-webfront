// JavaScript Document
var i=1;
function lockup(dizhi){
	if(i==1){
		i++;
		var scrolltop = window.pageYOffset  || document.documentElement.scrollTop  || document.body.scrollTop || 0;
		var msgw,msgh,bordercolor;    
   		msgh="50%";//提示窗口的高度
  		bordercolor="#F6F0A1";//提示窗口的边框颜色
		
		var _clientheight=0;
		//ie FF  在有DOCTYPE doctype时各有区别 
   		 _clientheight = Math.min(document.body.clientHeight , document.documentElement.clientHeight);
    	if(_clientheight==0)
     		 _clientheight= Math.max(document.body.clientHeight , document.documentElement.clientHeight);
        var bgwidth= document.documentElement.clientWidth || document.body.clientWidth;
        //整个页面的高度
        var bgheight =  Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
		var msgtop = (scrolltop+(_clientheight-300)/2)+"px";

		var bg=document.createElement("div");
	//<div style="display:block;position:absolute;top: 0%;left: 0%;width:100%;height: 100%;background-color:#777;z-index:-1;filter:alpha(opacity=60);">
		bg.setAttribute("id","bg");
		bg.style.position="absolute";
		bg.style.top=0;
		bg.style.left=0;
		bg.style.width=bgwidth + "px";
		bg.style.height=bgheight + "px";
		bg.style.background="#777";
		bg.style.zIndex="1000";
		bg.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=60)";
		bg.style.opacity="0.6";
		document.body.appendChild(bg);//在body内添加该div对象
	
   		msgw=eval(bgwidth*0.5);//提示窗口的宽度  

		var show=document.createElement("div");
	//<div style="background-color:#FFFFFF;position: absolute;top:25%;left:25%;width:50%;height: 50%;border:1px solid #F6F0A1;"></div>
		show.setAttribute("id","show");
		show.style.background="#FFFFFF";
		show.style.position="absolute";
		show.style.top=msgtop;
		show.style.left="25%";
		show.style.width="50%";
		show.style.height=msgh;
		show.style.border="1px solid " + bordercolor;
		show.style.zIndex="1001";
		document.body.appendChild(show);

var st='<h4 style="padding:8px;">\
      	<span>请填写收货地址:</span>\
      </h4>\
   	  <form action="' + dizhi +'" method="post" onsubmit="return check()" name=form1>\
       		<table border="0" cellspacing="0" cellpadding="0" width="100%" >\
            	<tr>\
                	<td width="88" height="40" align="right">省：<span style="color:#FF0000">*</span></td>\
           	   	  <td width="401">\
  				  <table border="0" cellspacing="0" cellpadding="0" width="100%">\
                    	<tr>\
                          <td width="78">\
   	         		     <select name=selectp id="private">\
                               <option selected value=0>不限--</option></select>\
                          </td>\
                          <td width="28">市：</td>\
                          <td width="71"><select name=selectc id=selectc><option selected value=0>不限--</option></select></td>\
                          <td width="74">邮政编码：<span style="color:#FF0000">*</span></td>\
                          <td><input type="text" size="10" id="upost" name="upost" /></td>\
				    </tr>\
                    </table>\
               	  </td>\
                </tr>\
                <tr>\
                	<td width="88" height="58" align="right" valign="top">街道地址：<span style="color:#FF0000">*</span></td>\
	  				<td>\
                    	<table border="0" cellspacing="0" cellpadding="0" width="100%">\
                        	<tr><td>\
                            	<textarea id="uaddress" name="gxremark" cols="45" rows="3"></textarea>\
                            </td></tr>\
                        </table>\
                    </td>\
                </tr>\
                <tr>\
                	<td height="31" align="right">收货人姓名：<span style="color:#FF0000">*</span></td>\
                  <td><table  border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td><input type="text" name="uname" /></td></tr>\</table></td>\
                </tr>\
                <tr>\
                	<td height="29" align="right">联系电话：&nbsp;&nbsp;</td>\
               	    <td>\
                   	<table  border="0" cellspacing="0" cellpadding="0" width="100%">\
                        	<tr><td><input type="text" name="uphone" /></td></tr>\
                    </table>\
                    </td>\
                </tr>\
                <tr>\
                	<td  height="29" align="right">E-mail：&nbsp;&nbsp;</td>\
                    <td>\
                    	<table border="0" cellspacing="0" cellpadding="0" width="100%">\
                        <tr><td><input type="text" name="uemail" /></td></tr>\
                        </table>\
                    </td>\
                </tr>\
                <tr>\
                	<td height="45"></td>\
                	<td>\
                    	<table border="0" cellspacing="0" cellpadding="0" width="100%">\
                        	<tr>\
                           	  <td width="21%"><input type="submit" name="" value="确定" style="width:100px; height:25px;" /></td>\
                                <td width="79%"><input class="off" type="button" name="" value="关闭" style="width:60px; height:25px;" /></td>\
                            </tr>\
                        </table>\
                    </td>\
                </tr>\
                <tr>\
                	<td colspan="2">红色带 <span style="color:#FF0000"> * </span> 号的信息为必填项<td>\
                <tr>\
        </table>\
      </form>\
        <style type="text/css">\
			*{\
				margin:0px;\
				padding:0px;\
				font-size:12px;\
			}\
			table td{padding-left:5px;}\
		</style>';
	
	//上面的代码是显示的
		$("body").css("overflow-y","hidden" );
		$("#show").html(st);
		first("selectp","selectc","form1",0,0);
		$("#private").change(function(){
			selectcityarea('selectp','selectc','form1');
		});
		$(".off").click(function(){
			
			if(confirm("您若取消本次操作将不会生效")){
				i=1;
				$("body").css("overflow-y","" );
				document.body.removeChild(bg);//删除背景层Div   
	     		document.body.removeChild(show);//删除提示框层
	     	}
     		
		}).mouseover(function(){
			$(this).css("cursor","hand");
		});	
	}
}

function check(){
	
	return true;
}

function checkPrivate(){
	var valp=document.getElementById("private").value;
	var valc=document.getElementById("selectc").value;
	if(valp==0 || valc==0){
		return false;
	}else{
		return true;
	}
}

function checkUpost(){
	var post=document.getElementById("upost").value;
	if(post==""){
		$("#error").html("请填写邮政编码");
		return false;
	}
	if(isNaN(post)){
		$("#error").html("请填写正确的邮政编码");
		return false;
	}
	$("#error").html("");
	return true;
}

function checkUaddress(){
	var address=document.getElementById("uadd").value;
	alert(address);
}

function checkUname(){
	var name=document.getElementById("uname").value;
	alert(name);
}

function checkUphone(){
	var phone1=document.getElementById("uphone1").value;
	var phone2=document.getElementById("uphone2").value;
	if(phone1=="" && phone2==""){
		$("#phoneError").html("电话和手机请至少填一个");
		return false;
	}
	if(!(/^(\d{3,4}|\d{3,4}-?)?[1-9]\d{6,7}$/.test(phone1)) && phone1!=""){
		$("#phoneError").html("请填写正确的电话号码");
		return false;
	}
	if(!(/^1[3,5]\d{9}$/.test(phone2)) && phone2!=""){
		$("#phoneError").html("手机号码错误");
		return false;
	}
	$("#phoneError").html("");
	return true;
}