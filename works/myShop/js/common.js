/**
 * Created by Administrator on 2015/11/10.
 */
//读取配置文件
$.getJSON("../config/config.json", function (data) {
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem("urlConfig", JSON.stringify(data));
    } else {
        Cookie.write("urlConfig", JSON.stringify(data));
    }
});

//获取后端请求地址
var getUri = function (uriKey) {
    return JSON.parse(window.localStorage ? localStorage.getItem("urlConfig") : Cookie.read("urlConfig"))[uriKey];
};

var setLocalValue = function (itemName, itemValue) {
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    } else {
        Cookie.write(itemName, JSON.stringify(itemValue));
    }
}

var getLocalValue = function (item, key) {
    if (key == undefined) {
        return JSON.parse(window.localStorage ? localStorage.getItem(item) : Cookie.read(item));
    } else {
        return JSON.parse(window.localStorage ? localStorage.getItem(item) : Cookie.read(item))[key];
    }
}

//统一的post查询接口
var ajaxPostFun = function (url, data, successFun, errorFun, str) {
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        /*xhrFields: {
         withCredentials: true
         },*/
        data: data || {},
        success: function (res) {
            console.log(str + "返回成功", res);
            if ("0000000" != res.rtnCode) {
                //alert(res.msg);
                //如果返回不是0000000，就不能继续往下走了
                if (errorFun) {
                    errorFun(res)
                }
            }
            else {
                successFun(res)
            }
        },
        error: function (res) {
            console.log(str + "返回失败", res);
            if (errorFun) {
                errorFun(res)
            }
            else {
            }
        }
    })
};

//统一的get查询接口
var ajaxGetFun = function (url, data, successFun, errorFun, str) {
    //处理参数中值为"null"或者"undefined"的情况,直接替换为空
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        /*xhrFields: {
         withCredentials: true
         },*/
        data: data || {},
        success: function (res) {
            console.log(str + "返回成功", res);
            if ("0000000" != res.rtnCode) {
                //alert(res.msg);
                //如果返回不是0000000，就不能继续往下走了
                if (errorFun) {
                    errorFun(res)
                }
            }
            else {
                successFun(res)
            }
        },
        error: function (res) {
            console.log(str + "返回失败", res);
            if (errorFun) {
                errorFun(res)
            }
            else {
                //alert("接口查询返回失败");
            }
        }
    })
};

//获取url地址栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
//时间戳转时间
function formatDate(tm) {
    return new Date(tm).toLocaleString().replace(/\//g, "-").slice(0, 10);
}

//公共底部
var footModel = avalon.define({
    $id: "footer",
    url: "footer"
});

//公共顶部
var headerModel = avalon.define({
    $id: "header",
    url: "header",
    userName: null,
    userId: '',
    categoryList: {},
    number: 0,
    /*顶级类别*/
    menu: function () {
        var url = getUri("queryCategoryList");
        var successFun = function (res) {
            if (res.rtnCode = '0000000') {
                headerModel.categoryList = res.bizData.categoryList;
            }
        };
        var errorFun = function (res) {
        };
        var data = {};
        ajaxPostFun(url, data, successFun, errorFun, "获取一级类别");
    }

});

//退出登录
var logout = function () {
    window.sessionStorage.clear();
    var from = window.location.pathname;
    window.location=from;
};

//登录来源
var fromPath = function(){
    var from = window.location.pathname;
    window.localStorage.setItem("fUrl",from);
};

var search = function(){
    var name = $('#searchName').val();
    if(name == ''){
        alert("请输入你要查询的内容 ！");
        return;
    }
    location.href = 'more.html?content=' + encodeURI(encodeURI(name));
};

$(function () {
    headerModel.menu();
    headerModel.userName = window.sessionStorage.getItem("userName");
    headerModel.userId = window.sessionStorage.getItem("userId");
    headerModel.number = window.sessionStorage.getItem("number")==null?0:window.sessionStorage.getItem("number");
});


