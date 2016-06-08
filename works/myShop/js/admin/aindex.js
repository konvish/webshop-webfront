	function onoff(){ 
		var show=document.getElementById("switchPoint").title;
		if (show=="关闭左栏"){
			document.getElementById("switchPoint").title="打开左栏";
			document.all("img1").src="/shopping/images/center/main_41_1.gif";
			document.all("frmTitle").style.display="none"; 
			document.all("frmTitle0").style.display="none";
		}else{
			document.getElementById("switchPoint").title="关闭左栏";
			document.all("img1").src="/shopping/images/center/main_41.gif";
			document.all("frmTitle").style.display=""; 
			document.all("frmTitle0").style.display="";
		} 
	} 