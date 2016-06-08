/**
 * Created by 32 on 2016/3/21.
 */
var userForderModel = avalon.define("userForderModel",function(vm){
    vm.totalNumber = 0;
    vm.totalPrice = 0;
    vm.pageSize=10;
    vm.currentPage=1;
    vm.totalRecord=0;
    vm.totalPage=0;
    vm.orderList={};
});

var queryOrderPage =function(){
    var url = getUri("queryOrderPage");
    var data = {"currentPage":userForderModel.currentPage,"pageSize":userForderModel.pageSize,"userId":window.sessionStorage.getItem("userId")};
    var successFun = function(res){
        if(res.rtnCode=='0000000'){
            userForderModel.orderList=res.bizData.orderList;
            userForderModel.totalRecord=res.bizData.totalRecord;
            userForderModel.totalPrice=res.bizData.totalPrice;
            userForderModel.currentPage=res.bizData.currentPage;
            userForderModel.totalNumber=res.bizData.successOrder;
            userForderModel.totalPage=Math.ceil(userForderModel.totalRecord/userForderModel.pageSize);
        }
    };
    var errorFun=function(){};
    ajaxPostFun(url,data,successFun,errorFun,"查询订单列表");
};

/*首页*/
var homePage = function(){
    if(userForderModel.currentPage>1){
        userForderModel.currentPage=1;
        queryOrderPage();
    }
}
/*下一页*/
var next = function(){
    if(userForderModel.currentPage<userForderModel.totalRecord){
        userForderModel.currentPage++;
        queryOrderPage();
    }
}
/*上一页*/
var prev = function(){
    if(userForderModel.currentPage>1){
        userForderModel.currentPage--;
        queryOrderPage();
    }
}
/*尾页*/
var endPage = function(){
    if(userForderModel.currentPage<userForderModel.totalRecord){
        userForderModel.currentPage=userForderModel.totalRecord;
        queryOrderPage();
    }
}
/*查询某一页*/
var page = function(){
    var pageMun =$("#PageBig1_TxtGoTo").val();
    if(pageMun !=''){
        userForderModel.currentPage =pageMun;
        queryOrderPage();
    }

}


$(function(){
    queryOrderPage();
});