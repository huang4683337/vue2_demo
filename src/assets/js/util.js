/**
 *
 * @authors rnn
 * @date    2017-01-22 14:17:06
 * @version 1.0
 * @description util.js
 */
// import Pagination from "jquery.pagination.js";
// var Pagination = require('jquery.twbsPagination.js')
import Store from 'store'
var host = '',
    url = host + url;
export default {
  //下拉框
  Select: function () {header_select();},
  //ajax
  AJAX: function (url, type, data, sucFuc,validation) {
    AJAX(url, type, data, sucFuc,validation);
  },
  // 获取地址栏参数
  getQuery: function (i) {
    var j = location.search.match(new RegExp("[?&]" + i + "=([^&]*)(&?)", "i"));
    return j ? j[1] : j
  },
  optionHtm: function (id,type) {
    var optionHtm = '<option value="-1">请选择</option>';
    for(var i = 0;i < type.length;i++){
      var child = type[i];
      optionHtm += '<option value="'+child.code+'" style="font-weight: bold;">'+child.name+'</option>'
      for(var b = 0;b < child.secondList.length; b++){
        optionHtm += '<option value="'+child.secondList[b].secondCode+'">--'+child.secondList[b].secondName+'</option>'
      }
    }
    $(id).html(optionHtm);
  },
  InitPagination: function(url, type, containerId, contentType, param, callbackFun) {
    InitPagination(url, type, containerId, contentType, param, callbackFun);
  },
  IndexHead:function() {
            //格式化时间
        Date.prototype.pattern=function(fmt) {
        if(+this == 0){
            return "";
        }
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
        };

       function jump() {
           var patentItem = $(".input-group .input-group-btn button").val();
           var patentPut = $("#patentPut").val();
           var patentText = $(".input-group .input-group-btn button").text();
           var searchParme = {
               patentItem: patentItem,
               patentPut: patentPut,
               patentText: patentText
           }
           Store.set("searchParme", searchParme)
           if (patentItem == "list1") {
               if(patentPut!=""){
                   window.location.href = "/gate/search/list.html"+"?form=03"
               }
           } else if (patentItem == "list7") {
               if(patentPut!=""){
                   window.location.href = "/gate/search/fullSearch.html"
               }

           } else {
               window.location.href = "/gate/search/fullSearch.html"
           }
       }

       // 获取下拉框选中内容
       $("#pubSearch").click(function(){
           jump()
       })

       $("#patentPut").keydown(function (event) {
           if(event.keyCode == "13"){
               var keyword = $("#patentPut").val();
               if(keyword){
                   jump()
               }

           }
       })
       var login = Store.get("userInfor");
       //判断会员中心是否登陆
       $(".member").click(function() {
           if (!login) {
               util.confirmLayer('您尚未登录，请先登录！', function() {

                   window.location.href = "/login.html"
               });
           } else {
               var roleTp = Store.get("userInfor").userTp;
               if(roleTp == "01" || roleTp == "04"){
                   window.location.href = "/memberCenter/personal/index.html";
               }else if(roleTp == "02"){
                   window.location.href = "/memberCenter/enterprise/index.html";
               }else if(roleTp == "03"){
                   window.location.href = "/memberCenter/agency/index.html";
               }

           }
       });

       $(".remind").on("click",".js-out",function(){
           util.AJAX("/riUser/logout.do", "GET", "", function (data) {
               Store.remove("userInfor");
               window.href = window.location.href = "/login.html";
           })


       })
       //判断会员中心是否登陆

       if(login){
           var name = Store.get("userInfor").userNm;
           $("#isLogin").show();
           $(".js-name").html(name)
       }else{
           $("#noLogin").show()
       }
     },
  alertLayer:function(msg, cfm_func) {
    alertLayer(msg, cfm_func)
  },
  confirmLayer:function(msg, cfm_func, cancel_func) {
    confirmLayer(msg, cfm_func, cancel_func);
  },
  noContLayer:function(){
    var noContStr = '<div style="margin: 0 auto;width:300px;"><img src="./../../../static/image/null.png" alt="没有内容" style="margin: 50px 0 100px;"/></div>';
    $('.for-page').hide();
    return noContStr;
  },
  layer:function(msg, fun){
    layer(msg, fun);
  }
};
// module.exports = methods;

// 没有内容时的样式
// function noContLayer() {
//   var noContStr = '<div style="margin: 0 auto;width:300px;"><img src="/images/gate/null.png" alt="没有内容" style="margin: 50px 0 100px;"/></div>';
//   $('.for-page').hide();
//   return noContStr;
// }
// 信息提示层
function layer(msg, fun) {
  var str = $('<div id="layer"><div class="layer-bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;background-color:transparent;"></div><div class="my_layer" style="position: fixed;top: 50%;left: 50%;z-index:10000;margin: -50px 0 0 -220px;width: 440px;height: 100px;background: #fff;border: 1px solid #999;text-align: center;"><div style="display: table;padding:0 40px;width:360px;height: 100px;"><p style="display: table-cell;vertical-align: middle;font-size: 16px;color: #666;">' + msg + '</p></div></div></div>');
  $('body').append(str);
  setTimeout(function() {
    $('#layer').remove();
    fun && fun();
  }, 3000);
}

function confirmLayer(msg, cfm_func, cancel_func) {
  var str = $('<div id = "confirm_layer" style = "position: fixed;top: 50%;left: 50%;z-index:10000;margin-top:-120px;margin-left:-280px;width: 500px;height: 200px; background: #fff;-webkit-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);-moz-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);-ms-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2); -o-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);"><div style="width: 100%;height: 36px;background-color: #eee;"><span style="color: #999;margin-left:10px;margin-right:175px;font-size:14px">弹窗提示</span><span style="display:inline-block;width:19px;height:19px;vertical-align:bottom;margin-top:8px;margin-right:216px"></span><span id="close_popup" style="display:inline-block;width:14px;height:14px;"></span></div><div style = "width: 100%;height: 94px;text-align: center; line-height:94px;font-size:18px;color: #333;">' + msg + '</div><div style = "width: 100%;height: 30px;text-align:center;"><button id = "common_sure" style = "width: 100px;height: 30px;text-align: center;line-height: 30px;font-size: 14px;color: #fff;margin-right: 40px;background: #333;border: none;cursor: pointer;">确定</button><button   id = "common_cancel" style = "width: 100px;height:30px;text-align: center;line-height: 30px;font-size: 14px;color: #fff;background: #999;border: none;cursor: pointer;">取消</button></div></div>');
  $('body').append(str);
  $("#confirm_layer #common_sure").hover(function() {
    $(this).css("backgroundColor", "#111")
  }, function() {
    $(this).css("backgroundColor", "#333")
  });
  $("#confirm_layer #common_cancel").hover(function() {
    $(this).css("backgroundColor", "#666")
  }, function() {
    $(this).css("backgroundColor", "#999")
  });

  $("#confirm_layer #common_sure").click(function() {
    $("#confirm_layer").remove();
    cfm_func && cfm_func();
  })
  $("#confirm_layer #common_cancel").click(function() {
    $("#confirm_layer").remove();
    cancel_func && cancel_func();
  })
  $("#confirm_layer #close_popup").click(function() {
    $("#confirm_layer").remove();
    cancel_func && cancel_func();
  })
  // return false;
}

function alertLayer(msg, cfm_func) {
  var str = $('<div id = "confirm_layer" ><div style = "position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;background-color: rgba(51,51,51,.7);"></div> ' +
    '<div id = "tips_layer" style = "position: fixed;top: 50%;left: 50%;z-index:10000;margin-top:-120px;margin-left:-280px;width: 560px;height: 240px; ' +
    'background: #fff;-webkit-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);-moz-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);-ms-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2); ' +
    '-o-box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);box-shadow:1px 1px 20px rgba(0, 0, 0, 0.2);"><div style = "width: 100%;height: 144px;text-align: center; ' +
    'line-height:144px;font-size:18px;color: #333;">' + msg + '</div><div style = "width: 100%;height: 36px;text-align:center;"><button id = "common_sure" ' +
    'style = "width: 120px;height: 36px;text-align: center;line-height: 36px;font-size: 14px;color: #fff;background: #333;">确定</button></div></div></div>');
  $('body').append(str);
  $("#confirm_layer #common_sure").hover(function() {
    $(this).css("backgroundColor", "#111")
  }, function() {
    $(this).css("backgroundColor", "#333")
  });
  $("#confirm_layer #common_sure").click(function() {
    $("#confirm_layer").remove();
    cfm_func && cfm_func();
  })
}




//下拉框
function header_select() {
  $(".input-group-btn").click(function(event) {
    event.stopPropagation();
    $(this).find(".dropdown-menu").toggle();
    $(this).parent().siblings().find(".dropdown-menu").hide();
  });
  $(".dropdown-menu li").click(function () {
    $(this).children('a').addClass('pubhead_choice');
    $(this).siblings().each(function (index, el) {
      // alert($(this).hasClass('active'));
      if ($(this).find('a').hasClass('pubhead_choice')) {
        $(this).find('a').removeClass('pubhead_choice');
      }
    });
  });
  $(document).click(function (event) {
    var eo = $(event.target);
    if ($(".input-group-btn").is(":visible") && eo.attr("class") != "option" && !eo.parent(".dropdown-menu").length)
      $('.dropdown-menu').hide();
  });
  $(".dropdown-menu a").click(function () {
    var value = $(this).text();
    var id = $(this).attr("id");
    $(".btn").val(id);
    var caret = '<span class="caret">' + '</span>';
    $(".btn").html(value + caret);
  });
}
//ajax调用
function AJAX(url, type, data, sucFuc,validation) {
  url = host + url;
  $.ajax({
    url: url,
    type: type,
    dataType: 'json',
    data: data,
    cache: false,
    success: function (data) {
      if (validation) {
        sucFuc(data);
      } else {
        if (data.code == 2000) {
          confirmLayer('您尚未登录，请先登录！', function () {
            window.location.href = '/login.html?backurl=' + window.location.href;
            Store.remove("userInfor");
          });
        }
        else if (data.code == 3000) {
          confirmLayer('您没有权限！', function () {
            window.location.href = '/unauthorized.html';
          });
        } else {

          sucFuc(data);

        }
      }


    },
  })
};

function InitPagination(url, type, containerId, contentType, param, callbackFun) {
  if (!url) {
    console.log("尚未传入请求url！");
    return;
  }
  var MaxSize = param.pageSize;
  if (!MaxSize) {
    MaxSize = 10;
  }
  if (!param.pageNum) {
    param.pageNum = 1;
  }
  url = host + url;
  $.ajax({
    type: type, //用GET方式传输
    dataType: "json",
    url: url,
    contentType: contentType,
    data: param,
    cache: false,
    success: function(jsonData) {

        if (jsonData.code == 2000) {
          confirmLayer('您尚未登录，请先登录！', function() {
            window.location.href = '/login.html?backurl=' + window.location.href;
          });
        }else if(jsonData.code == 3000 ){
          confirmLayer('您没有权限！', function() {
            window.location.href = '/unauthorized.html';
          });
        }
        if(jsonData.code == 1100){
          callbackFun(jsonData);
          return
        }
        if (callbackFun) {
          callbackFun(jsonData);
        }

    },
  });
}
