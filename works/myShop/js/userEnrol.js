/**
 * Created by Administrator on 2016/3/11 0011.
 */
var userEnrolModel = avalon.define("userEnrolModel", function (vm) {
    vm.niName = '';
    vm.password = '';
    vm.password2 = '';
    vm.phone = '';
    vm.email = '';
});

var randCode = function () {
    var url = getUri("code");
    var data = {};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {

        }
    }
};

//点击刷新验证码
var refreshRand = function () {
    //var rand =img.src;
    var rand = document.getElementById("img");
    rand.src = 'rand/code.do?code=' + Math.random();
};

var sub = function () {
    var niName = $('#niName').val();
    var password = $('#password').val();
    var password2 = $('#password2').val();
    var phone = $('#phone').val();
    var email = $('#email').val();
    if (niName == '' || niName == 'undefined') {
        alert("用户昵称不能为空");
        return;
    }
    if (password == '' || niName == 'undefined' || password.length < 6) {
        alert("密码过短");
        return;
    }
    if (password != password2) {
        alert("密码不一致");
        return;
    }
    if (phone == '' || phone == 'undefined' || email == '' || email == 'undefined') {
        alert("联系方式与电子邮件作为登录用，必填！");
        return;
    }
    if (email.contains("@") && email.contains(".")) {
        var url = getUri("addUser");
        var data = "niName=" + niName + "&password=" + password + "&phone=" + phone + "&email=" + email;
        var successFun = function (res) {
            if (res.rtnCode == '0000000') {
                alert(res.bizData.msg);
                window.location="enrolSuccess.html";
                window.sessionStorage.setItem("userName",res.bizData.user.niName);
                window.sessionStorage.setItem("userId",res.bizData.user.id);
            }
        };
        var errorFun = function () {
        };
        ajaxPostFun(url, data, successFun, errorFun, "注册");
    } else
        alert("邮件格式不对");
};