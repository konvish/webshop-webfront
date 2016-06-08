var showCarModel = avalon.define("showCarModel", function (vm) {
    vm.flag = 0;
    vm.cNumber = 1;
    vm.commodityList = {};
    vm.totalPrice = 0;
});

//数量减一
var downNumber = function (id, price) {
    var num = $('#' + id).val();
    if (num > 1)
        num--;
    $('#' + id).val(num);
    $('#total' + id).val(num * price);
    totalPrice();
};

//数量加一
var addNumber = function (id, price) {
    var num = $('#' + id).val();
    num++;
    $('#' + id).val(num);
    $('#total' + id).val(num * price);
    totalPrice();
};

//总价
var totalPrice = function () {
    showCarModel.totalPrice = 0;
    for (var i = 0; i < showCarModel.commodityList.length; i++) {
        var price = $('#total' + showCarModel.commodityList[i].id).val();
        showCarModel.totalPrice += parseFloat(price);
    }
};

//确认删除
var deleteCom = function (id) {
    var r = confirm("确认删除");
    if (r == true) {
        deleteShoppingCommodity(id);
    }
};

//删除购物车的商品
var deleteShoppingCommodity = function (id) {
    var url = getUri("deleteShoppingCommodity");
    var userId = window.sessionStorage.getItem("userId");
    var data = {"id": id, "userId": userId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            showCarModel.commodityList = res.bizData.shoppingCartList;
            showCarModel.totalPrice = 0;
            for (var i = 0; i < showCarModel.commodityList.length; i++) {
                var price = showCarModel.commodityList[i].price;
                showCarModel.totalPrice += parseFloat(price);
            }
            headerModel.number--;
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "删除购物车商品")
};

//查询购物车的商品列表
var queryShoppingCart = function () {
    var url = getUri("queryShoppingCart");
    var userId = window.sessionStorage.getItem("userId");
    var data = {"userId": userId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            showCarModel.commodityList = res.bizData.shoppingCartList;
            for (var i = 0; i < showCarModel.commodityList.length; i++) {
                var price = showCarModel.commodityList[i].price;
                showCarModel.totalPrice += parseFloat(price);
            }
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, data, successFun, errorFun, "查询购物商品列表");
};

//清空购物车
var deleteShoppingCommodityAll = function () {
    var url = getUri("deleteShoppingCartAll");
    var ss = JSON.stringify(showCarModel.commodityList);
    var data = {"shoppingCarts":ss};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            showCarModel.commodityList = {};
            showCarModel.totalPrice = 0;
            window.sessionStorage.setItem("number",0);
            window.location="/html/user/showCar.html";
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, data, successFun, errorFun, "删除所有商品");
};

//提交结算
var submitShoppingCart = function(){
    if(showCarModel.totalPrice == 0){
        alert("还没有商品，赶紧去选购吧！");
        return;
    }
    var url = getUri("addCommodityList");
    for (var i=0;i<showCarModel.commodityList.length;i++){
        var num = $('#'+showCarModel.commodityList[i].id).val();
        showCarModel.commodityList[i].number = num;
    }
    var commodityList = JSON.stringify(showCarModel.commodityList);
    var data = {"commodityList":commodityList,"totalPrice":showCarModel.totalPrice,"userId":showCarModel.commodityList[0].userId};
    var successFun = function(res){
        if(res.rtnCode=='0000000'){
            var order = res.bizData.order;
            window.location = "/html/user/lastConfirm.html?id="+order.id;
        }
    };
    var errorFun = function(){};
    ajaxPostFun(url,data,successFun,errorFun,"提交商品");
};

$(function () {
    showCarModel.flag = headerModel.number;
    var userId = window.sessionStorage.getItem("userId");
    if (userId == '' || userId == 'undefined' || userId == null) {
        alert("还未登录！请前去登录。");
        window.location = "/html/usersLogin.html";
    } else
        queryShoppingCart();
});