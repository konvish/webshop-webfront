/**
 * Created by 32 on 2016/3/16.
 */
var detailGoodModel = avalon.define("detailGoodModel", function (vm) {
    vm.commodity = {};
    vm.pic = {};
    vm.detailPics = {};
    vm.imagesUrl="http://localhost:8080";
});

var queryCommodity = function () {
    var id = getQueryString("id");
    var url = getUri("queryCommodity");
    var data = {"id":id};
    var successFun = function(res){
      if(res.rtnCode=='0000000'){
          detailGoodModel.commodity = res.bizData.commodity;
          detailGoodModel.pic = res.bizData.pic;
          var detail = res.bizData.detailPics;
          if (detail ==''||detail=='undefined'||detail==null)
              detailGoodModel.detailPics = {};
          else
              detailGoodModel.detailPics = detail;
      }
    };
    var errorFun = function(res){};
    ajaxPostFun(url,data,successFun,errorFun,"商品详情");
};

var addShoppingCart = function(){
    var userId = window.sessionStorage.getItem("userId");
    if (userId == ''||userId==null||userId=='undefined') {
        alert("请先去登录！");
        return;
    }
    var commodityId = detailGoodModel.commodity.id;
    var url = getUri("addShoppingCart");
    var data = {"userId":userId,"commodityId":commodityId};
    var successFun = function(res){
        if(res.rtnCode == '0000000'){
            headerModel.number = res.bizData.number;
            window.sessionStorage.setItem("number",res.bizData.number);
        }
    };
    var errorFun = function(){};
    ajaxPostFun(url,data,successFun,errorFun,"加入购物车。");
};

$(function(){
   queryCommodity();
});