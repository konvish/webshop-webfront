/**
 * Created by Administrator on 2016/3/22 0022.
 */
var leftModel = avalon.define("leftModel",function(vm){
    vm.userName ="";
    vm.user={};
});
var queryUser=function(){
    var url=getUri("queryUser");
    var data= {"id":window.sessionStorage.getItem("userId")};
    var successFun = function(res){
        if(res.rtnCode=='0000000'){
            leftModel.user=res.bizData.user;
        }
    };
    var errorFun =function(){};
    ajaxPostFun(url,data,successFun,errorFun,"查询用户信息");
};

$(function(){
    queryUser();
    leftModel.userName=window.sessionStorage.getItem("userName");
})