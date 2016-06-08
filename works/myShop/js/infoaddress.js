/**
 * Created by 32 on 2016/3/15.
 */
var addressInfoModel = avalon.define("addressInfoModel", function (vm) {
    vm.areaList = {};
    vm.secondList = {};
});

var queryAreaByParentId = function (id) {
    var url = getUri("queryAreas");
    var data = {"parentId": id};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            if (id == -1) {
                addressInfoModel.areaList = res.bizData.areasList;
            } else
                addressInfoModel.secondList = res.bizData.areasList;
        }
    };
    var errorFun = function(res){};
    ajaxPostFun(url,data,successFun,errorFun,"获取地区");
};

var onChangeAreasId = function(){
    var parentId = $('#selectp').val();
    queryAreaByParentId(parentId)
};

$(function(){
   queryAreaByParentId(-1);
});