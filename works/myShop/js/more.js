/**
 * Created by Administrator on 2016/3/14 0014.
 */
var moreModel = avalon.define("moreModel", function (vm) {
    vm.secondCategoryList = {};
    vm.commodityList = {};
    vm.pageSize = 16;
    vm.totalPage=0;
    vm.currentPage = 1;
    vm.totalRecord = 0;
    vm.typeId = "";
    vm.content="";
    vm.imagesUrl="http://localhost:8080";
});

var queryExCategoryByNodeLevel = function () {
    var url = getUri('queryExCategoryByNodeLevel');
    var data = {"nodeLevel": 2};
    var successFun = function (res) {
        if (res.rtnCode = '0000000') {
            moreModel.secondCategoryList = res.bizData.exCategoryList;
        }
    };
    var errorFun = function (res) {
    };
    ajaxPostFun(url, data, successFun, errorFun, "获取二级目录树");
};

var queryCommodityByType = function () {
    var typeId = moreModel.typeId;
    var name = moreModel.content;
    if (name == '' || name == 'undefined' || name == "null")
        name = '';
    if (typeId == '' || typeId == 'undefined' || typeId=="null")
        typeId = '';
    var url = getUri("queryCommodityByType");
    var data = {"typeId": typeId, "name": name,"currentPage":moreModel.currentPage,"pageSize":moreModel.pageSize};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            moreModel.commodityList = res.bizData.commodityList;
            moreModel.currentPage=res.bizData.currentPage;
            moreModel.totalRecord = res.bizData.totalRecord;
            moreModel.totalPage=Math.ceil(moreModel.totalRecord/moreModel.pageSize);
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "获取某类别下的商品");
};

/*首页*/
var homePage = function () {
    if (moreModel.currentPage > 1) {
        moreModel.currentPage = 1;
        queryCommodityByType();
    }
}
/*下一页*/
var next = function () {
    if (moreModel.currentPage < moreModel.totalRecord) {
        moreModel.currentPage++;
        queryCommodityByType();
    }
};
/*上一页*/
var prev = function () {
    if (moreModel.currentPage > 1) {
        moreModel.currentPage--;
        queryCommodityByType();
    }
};
/*尾页*/
var endPage = function () {
    if (moreModel.currentPage < moreModel.totalRecord) {
        moreModel.currentPage = moreModel.totalRecord;
        queryCommodityByType();
    }
};
/*查询某一页*/
var page = function () {
    var pageMun = $("#PageBig1_TxtGoTo").val();
    if (pageMun != '') {
        moreModel.currentPage = pageMun;
        queryCommodityByType();
    }

};

$(function () {
    moreModel.typeId = getQueryString("id");
    var name = getQueryString("content");
    moreModel.content=(decodeURI(decodeURI(name)));
    queryExCategoryByNodeLevel();
    queryCommodityByType();
});
