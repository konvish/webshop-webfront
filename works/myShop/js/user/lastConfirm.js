/**
 * Created by Administrator on 2016/3/19 0019.
 */
var lastConfirmModel = avalon.define("lastConfirmModel", function (vm) {
    vm.orderId = '';
    vm.orderPerson = {};
    vm.commodityList = {};
    vm.userArea = {};
    vm.checkedUserArea = {};
    vm.totalPrice = 0;
});

//订购人信息
var queryOrderPerson = function () {
    var url = getUri("queryUser");
    var id = window.sessionStorage.getItem("userId");
    var data = {"id": id};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            lastConfirmModel.orderPerson = res.bizData.user;
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "查询默认订购者");
};

//确认收货地址
var queryUserArea = function () {
    var url = getUri("queryUserArea");
    var id = window.sessionStorage.getItem("userId");
    var data = {"userId": id};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            lastConfirmModel.userArea = res.bizData.userArea;
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "收货地址");
};

//订单信息
var queryOrderCommodityList = function () {
    var url = getUri("orderCommodityList");
    var data = {"orderId": lastConfirmModel.orderId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            lastConfirmModel.commodityList = res.bizData.commodityList;
            lastConfirmModel.totalPrice = 0;
            for (var i = 0; i < lastConfirmModel.commodityList.length; i++) {
                lastConfirmModel.totalPrice += (parseFloat(lastConfirmModel.commodityList[i].number) * parseFloat(lastConfirmModel.commodityList[i].price));
            }
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "查询订单信息");
};

//删除收货地址
var deleteUserArea = function (id) {
    var url = getUri("deleteUserArea");
    var userId = window.sessionStorage.getItem("userId");
    var data = {"id": id, "userId": userId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            lastConfirmModel.userArea = res.bizData.userArea;
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "删除收货地址");
};

//选中地址
var checkedUser = function (id) {
    var checked='';
    for (var i = 0; i < lastConfirmModel.userArea.length; i++) {
        if (lastConfirmModel.userArea[i].id == id)
             checked = lastConfirmModel.userArea[i];
    }
    lastConfirmModel.checkedUserArea = checked;
};

//提交订单
var submitOrder = function () {
    var url = getUri("addOrder");
    var checked = lastConfirmModel.checkedUserArea;
    var userArea = JSON.stringify(checked);
    if(userArea.length==2){
        if (lastConfirmModel.userArea.length > 0)
            checked = lastConfirmModel.userArea[0];
        else {
            alert("还没有收货地址，赶紧去添加吧。");
            return;
        }
    }
    var final = JSON.stringify(checked);
    var message = $('#fremark').val();
    var data = {"userArea": final, "message": message, "orderId": lastConfirmModel.orderId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            window.sessionStorage.removeItem("number");
            window.location = "/html/user/onlinePay.html";
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "删除收货地址");
};

function showDiv() {
    document.getElementById('popDiv').style.display = 'block';
    document.getElementById('bg').style.display = 'block';
}

function closeDiv() {
    document.getElementById('popDiv').style.display = 'none';
    document.getElementById('bg').style.display = 'none';
}

var checkData = function () {
    var valp = document.getElementById("private").value;
    var valc = document.getElementById("selectc").value;
    if (valp == 0 || valc == 0) {
        alert("选择地址");
        return;
    }
    var post = document.getElementById("upost").value;
    if (post == "") {
        alert("请填写邮政编码");
        return false;
    }
    if (isNaN(post)) {
        alert("请填写正确的邮政编码");
        return false;
    }
    var address = document.getElementById("uaddress").value;
    if (address == "") {
        alert("请填写地址");
        return false;
    }
    var name = document.getElementById("uname").value;
    if (name == "") {
        alert("请填写收件人");
        return false;
    }
    var phone = document.getElementById("uphone").value;
    if (phone == "") {
        alert("手机不能为空");
        return false;
    }
    if (!(/^1[3,5,7,8]\d{9}$/.test(phone)) && phone != "") {
        alert("手机号码错误");
        return false;
    }
    var addressed = $('#private').find("option:selected").text() + $('#selectc').find("option:selected").text() + address;
    var id = window.sessionStorage.getItem("userId");
    var url = getUri("addUserArea");
    var data = {"name": name, "address": addressed, "post": post, "phone": phone, "userId": id};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            lastConfirmModel.userArea = res.bizData.userArea;
            closeDiv();
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "新增收件人");
};


$(function () {
    var userId = window.sessionStorage.getItem("userId");
    lastConfirmModel.orderId = getQueryString("id");
    if (userId == '' || userId == null || userId == 'undefined') {
        alert("还未登录，跳转登录页面");
        window.location = "/html/usersLogin.html"
    } else {
        queryOrderPerson();
        queryUserArea();
        queryOrderCommodityList();
    }
});