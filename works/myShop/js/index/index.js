/**
 * Created by Administrator on 2016/3/9 0009.
 */
var indexModel = avalon.define("indexModel", function (vm) {
    vm.secondCategoryList = {};
    vm.commodityList = {};
    vm.advertisementList = {}
    vm.imagesUrl="http://localhost:8080";
});

var queryExCategoryByNodeLevel = function () {
    var url = getUri('queryExCategoryByNodeLevel');
    var data = {"nodeLevel": 2};
    var successFun = function (res) {
        if (res.rtnCode = '0000000') {
            indexModel.secondCategoryList = res.bizData.exCategoryList;
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, data, successFun, errorFun, "获取二级目录树");
};

var queryCommodityList = function () {
    var url = getUri("queryCommodityList");
    var data = {};
    var successFun = function (res) {
        if (res.rtnCode = '0000000') {
            indexModel.commodityList = res.bizData.commodityList;
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, data, successFun, errorFun, "查询某个类别下的商品");
};

var queryAdvertisement = function () {
    var url = getUri("queryAdvertisement");
    var data = {};
    var successFun = function (res) {
        if (res.rtnCode = '0000000') {
            indexModel.advertisementList = res.bizData.advertisementList;
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, data, successFun, errorFun, "广告图");
};

$(function () {
    queryExCategoryByNodeLevel();
    queryAdvertisement();
    queryCommodityList();
});
