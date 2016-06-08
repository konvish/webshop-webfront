/**
 * Created by 32 on 2016/3/16.
 */
var confirmModel = avalon.define("confirmModel", function (vm) {
    vm.commodityList = {};
    vm.total = 0;
});

var queryShoppingCartCommodity = function () {
    var userId = window.sessionStorage.getItem("userId");
    if (userId == '' || userId == null || userId == 'undefined') {
        alert("还未登录!请前去登录");
        window.location = "../../usersLogin.html";
        return;
    }
    var url = getUri("queryShoppingCartCommodity");
    var data = {"userId": userId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            confirmModel.commodityList = res.bizData.commodityList;
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "查询用户的购物车商品");
};

var addOrder = function(){
    var name = $('#uname').val();
    var phone = $('#uphone').val();
    var address = $('#uaddress').val();
    var post = $('#upost').val();
    var message = $('#fremark').val();
    var userId = window.sessionStorage.getItem("userId");
    var url = getUri("addOrder");
    var data = {"userId":userId,"name":name,"phone":phone,"address":address,"post":post,"message":message,"commodityList":confirmModel.commodityList};
    var successFun = function(res){
        if(res.rtnCode=='0000000'){
            window.location = "/html/user/confirmPay.html";
        }
    };
    var errorFun = function(){};
    ajaxPostFun(url,data,successFun,errorFun,"提交订单");
};

$(function () {
    queryShoppingCartCommodity();
});