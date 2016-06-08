var alterPasswordModel = avalon.define("alterPasswordModel", function (vm) {
    vm.alterPassword = function alterPassword() {

    };
});

var sub = function () {
    var upass = $("#upass").val();
    var newpass = $("#newpass").val();
    var newpass2 = $("#newpass2").val();
    if (upass.length < 6 || upass > 12) {
        $("#upassError").html("<font color='#FF0000'> 您输入的密码长度应该在6~12位之间</font>");
        return false;
    } else {
        $("#upassError").html("");
    }
    if (newpass.length < 6 || newpass.length > 12) {
        $("#newpassError").html("<font color='#FF0000'> 您输入的密码长度应该在6~12位之间</font>");
        return false;
    } else {
        $("#newpassError").html("");
    }
    if (newpass2 != newpass) {
        $("#newpass2Error").html("<font color='#FF0000'>两次密码输入不一致，您重新输入</font>");
        return false;
    } else {
        $("#newpass2Error").html("");
    }
    var url = getUri("alterPassword");
    var data = {"old":upass,"newpass":newpass,"id":window.sessionStorage.getItem("userId")};
    var successFun = function(res){
        if(res.rtnCode=='0000000'){
            alert("修改成功！请重新登录！");
            window.sessionStorage.clear();
            window.location = "/html/uersLogin.html";
        }
    };
    var errorFun = function(res){};
    ajaxPostFun(url,data,successFun,errorFun,"修改密码");
};