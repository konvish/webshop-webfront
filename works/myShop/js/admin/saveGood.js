$(document).ready(function (){
	$("#uploadify").uploadify({
		'uploader'       : '/shopping/plugin/uploadify/js/uploadify.swf',  
		'script'         : '/shopping/goodsAction_saveGoods.action',						 
		'cancelImg'      : '/shopping/plugin/uploadify/image/cancel.png', 
		'queueID'        : 'Filedata',
		'auto'           : true,
		'multi'          : true,
		'scriptData'     : {'status':'uplodyFile'},
		'fileDesc'		 :'支持格式:jpg,gif',
		'fileExt'		 :'*.jpg;*.gif',
		'queueSizeLimit' :'5',
		'width'			 :'82',
		'hight'			 :'25',
		'buttonImg'  	 :"/shopping/plugin/uploadify/image/upfile.jpg",
		'onError'		 :function (event,queueID,fileObject){alert("文件上传失败");}		
	});
});