/**
 * Created by Administrator on 2016/3/6 0006.
 */
var indexModel = avalon.define("indexModel", function (vm) {

});

var contentTopModel = avalon.define("contentTopModel", function (vm) {
    vm.firstCategoryList = {};
    vm.secondCategoryList = {};
    vm.thirdCategoryList = {};
});

//获取所有类别
var queryCategoryAll = function () {
    var url = getUri("getExCategory");
    var params = "id=" + "&parentId=";
    //alert(params);
    var url = getUri('getExCategory');
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            contentTopModel.firstCategoryList = res.bizData.categoryList;
            contentTopModel.secondCategoryList = res.bizData.categoryList.categoryList;
            contentTopModel.thirdCategoryList = res.bizData.categoryList.categoryList.categoryList;
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, params, successFun, errorFun, "获取所有类目");
};

var footerModel = avalon.define("footerModel", function (vm) {

});

var mainModel = avalon.define("mainModel", function (vm) {

});

var mainBottomModel = avalon.define("mainBottomModel", function (vm) {

});

var topModel = avalon.define("topModel", function (vm) {

});

var topMainModel = avalon.define("topMainModel", function (vm) {

});

$(function () {
    queryCategoryAll();
});