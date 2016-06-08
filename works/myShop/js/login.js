var loginModule = avalon.define('loginModule', function (vm) {
    vm.account='';
    vm.password='';
});

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
    var params = "account=" + account + "&password=" + password + "&code=" + code;
    //alert(params);
    var url = getUri('login');
    var successFun = function(res){
        if(res.rtnCode == '0000000'){
            var user = res.bizData.user;
            $.cookie("userName",user.name);
            $.cookie("userId",user.id);
            window.localStorage.setItem("userName",user.name);
            window.localStorage.setItem("userId",user.id);
        }
    };
    var errorFun = function(res){};
    ajaxPostFun(url, params,successFun,errorFun,"登录");
    // window.location="/html/index.html";
};

function keyDown(e) {
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        sub();//具体处理函数
    }
}

//点击刷新验证码
var refreshRand = function () {
    //var rand =img.src;
    var rand = document.getElementById("img");
    rand.src = 'rand/code.do?code=' + Math.random();
};

function showDiv(){
    document.getElementById('popDiv').style.display='block';
    document.getElementById('bg').style.display='block';
}

function closeDiv(){
    document.getElementById('popDiv').style.display='none';
    document.getElementById('bg').style.display='none';
}


$(function(){
    document.onkeydown = keyDown;
});