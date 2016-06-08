function formartURL(url){
	if(url.indexOf("?")>0){
		return url + "&time" + (new Date()).valueOf();
	}else{
		return url + "?time" + (new Date()).valueOf();
	}
}