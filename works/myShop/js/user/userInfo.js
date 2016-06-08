/**
 * Created by Administrator on 2016/3/22 0022.
 */
var userInfoModel = avalon.define("userInfoModel",function(vm){

});

var modifyUser = function(){
    var url = getUri("modifyUser");
    var name = $('#name').val();
    var sex = $('#sex').find("option:selected").val();
    var birthday = $('#birthday').val();
    var nation = $('#nation').val();
    var country = $('#country').val();
    var addressed = $('#private').find("option:selected").text() + $('#selectc').find("option:selected").text() + $('#address').val();
    var data = {"id":window.sessionStorage.getItem("userId")};
    var successFun = function(res){
        if(res.rtnCode=='0000000'){
            alert("编辑成功");
        }
    };
    var errorFun = function(){};
    ajaxPostFun(url,data,successFun,errorFun,"编辑个人资料");
};
