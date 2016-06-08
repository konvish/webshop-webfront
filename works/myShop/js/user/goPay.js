/**
 * Created by 32 on 2016/3/14.
 */
var goPayModel = avalon.define("goPayModel", function (vm) {
    vm.order = {};
    vm.payLogo = "alipay";
    vm.logo = ["ABC","BCCB","BOC","BOCO","CCB","CIB","CMBC","CMBCHINA","CZCB","ECITIC","GDB","GNXS","ICBC","POST","SDB","SDE","SHRCB","SPDB"];
    vm.bankName = ["中国农业银行","北京银行","中国银行","交通银行","中国建设银行","兴业银行","中国民生银行","招商银行","广州市商业银行","中信贰业银行","广东发展银行","广州市农村信用合作社","中国工商银行","中国邮政","深圳发展银行","顺德信用社","上海农村商业银行","上海浦东发展银行"];
    vm.payWay = '';
    vm.id=-1;
});

var queryOrderOne = function(){
    var url = getUri("getOrder");
    var userId = window.sessionStorage.getItem("userId");
    var data = {"userId":userId};
    var successFun = function (res) {
        if (res.rtnCode == '0000000') {
            goPayModel.order= res.bizData.order;
            goPayModel.payWay = res.bizData.order.payway;
            var id = -1;
            if(goPayModel.bankName.contains(goPayModel.payWay)){
                id = goPayModel.bankName.indexOf(goPayModel.payWay);
                goPayModel.payLogo=goPayModel.logo[id];
                goPayModel.id=id;
            }
        }
    };
    var errorFun = function () {
    };
    ajaxPostFun(url, data, successFun, errorFun, "查询刚提交的订单");
};

$(function () {
    queryOrderOne();
});