/**
 * Created by Administrator on 2016/3/12 0012.
 */
var userLoginModel = avalon.define("userLoginModel",function(vm){
   vm.fUrl = '';
});

//点击刷新验证码
var refreshRand = function () {
    //var rand =img.src;
    var rand = document.getElementById("img");
    rand.src = '/rand/code.do?code=' + Math.random();
};

//提交
var sub = function () {
    var account = $("#account").val();
    var password = $("#password").val();
    var code = $('#randCode').val();
    if (account == "") {
        alert("请输入账号");
        return false;
    } else if (password == "") {
        alert("请输入密码");
        return false;
    } else if (code == "") {
        alert("验证码错误");
        return false;
    }
    var params = {"account":account,"password":password,"code":code};
    //alert(params);
    var url = getUri('login');
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            if (res.bizData.flag == '0')
                alert(res.bizData.msg);
            else {
                alert(res.bizData.msg);
                var user = res.bizData.user;
                window.sessionStorage.setItem("userName", user.niName);
                window.sessionStorage.setItem("userId", user.id);
                window.sessionStorage.setItem("number", res.bizData.count);
                userLoginModel.fUrl=window.localStorage.getItem("fUrl");
                window.location=userLoginModel.fUrl;
            }
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, params, successFun, errorFun, "登录");
    // window.location="/html/index.html";
};
