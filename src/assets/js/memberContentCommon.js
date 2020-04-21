//60s倒计时
var wait = 60;//时间
function time(o) {//o为按钮的对象，p为可选，这里是60秒过后，提示文字的改变
    if (wait == 0) {
        o.removeAttr("disabled");
        o.val("点击发送验证码").css({"background":"#268cd8","color":"#fff"});//改变按钮中value的值
        //			p.html("如果您在1分钟内没有收到验证码，请检查您填写的手机号码是否正确或重新发送");
        wait = 60;
    } else {
        o.attr("disabled", true);//倒计时过程中禁止点击按钮
        o.val(wait + "秒后重新获取").css({"background":"#efefef","color":"#999"});//改变按钮中value的值
        wait--;
        setTimeout(function () {
                time(o);//循环调用
            },
            1000)
    }
}

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


//获取 URL
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


//手机号校验
function checkPhone(obj, tipsObj) {
    var reg = /^1(3|4|5|7|8)\d{9}$/;//验证手机正则

    if (obj.val() == "" || obj.val() == "请输入您的手机号") {
        obj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("请输入您的手机号");
    }
    else if (obj.val().length != 11) {
        obj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("手机号长度有误！");
    }
    else if (!reg.test(obj.val())) {
        obj.removeClass("pass").addClass("error");
        tipsObj.html("手机号不存在!");
        tipsObj.css("display", "inline-block");
    } else {
        obj.addClass("pass");
        obj.removeClass("error");
        tipsObj.css("display", "none").html();
        return true;
    }
}

//密码校验
function checkPwd(obj, tipsObj) {
    var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,24}$/;
    if ((obj.val() == "") || ( obj.val() == "请输入6~24位数字、字母或特殊字符，不含空格")) {
        obj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("请输入密码");
        return false;
    }
    else if (!reg.test(obj.val())) {
        obj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("请输入6~24位数字、字母或特殊字符，不含空格");
        return false;
    }
    else {
        obj.removeClass("error");
        tipsObj.empty();
        obj.addClass("pass");
        return true;
    }
}

//确认密码校验
function checkSurePwd(sureObj, obj, tipsObj) {
    //		obj为密码框对象，sureObj为确认密码对象；
    var pwd1 = obj.val();
    var pwd2 = sureObj.val();
    if (sureObj.val() == '请再次输入密码' || sureObj.val() == "") {
        sureObj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("请输入确认密码！");
        return false;
    }
    else if (pwd1 != pwd2) {
        sureObj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("两次密码输入不一致！");
        return false;
    } else {
        sureObj.removeClass("error");
        tipsObj.empty();
        sureObj.addClass("pass");
        return true;
    }
}

//手机验证码校验
function checkVerifyCode(obj, tipsObj) {
    var reg = /^[0-9]{6}$/;

    if (obj.val() == "" || obj.val() == "请输入手机验证码") {
        obj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("请输入手机验证码");
    }
    else if (obj.val().length != 6) {
        obj.removeClass("pass").addClass("error");
        tipsObj.css("display", "inline-block").html("验证码长度有误！");
    }
    else if (!reg.test(obj.val())) {
        obj.removeClass("pass").addClass("error");
        tipsObj.html("验证码格式有误!");
        tipsObj.css("display", "inline-block");
    } else {
        obj.addClass("pass");
        obj.removeClass("error");
        tipsObj.empty();
        return true;
    }
}

//用户名校验
function checkName(obj, tipsObj) {
    obj.blur(function () {
        if (($(this).val() == "") || ($(this).val() == $(this).attr("placeholder"))) {
            var text = $(this).attr("placeholder");
            $(this).removeClass("pass").addClass("error");
            tipsObj.css("display", "inline-block").html(text);
        }
        else {
            $(this).addClass("pass");
            $(this).removeClass("error");
            tipsObj.empty();
            return true;
        }
    })
}

//检查必填字段
function checkMust(obj) {
    //		if(obj.prev().find("i").html() == "*"){(
    ////console.log(obj.val());
    ////console.log(obj.attr("placeholder"))
    if (obj.val()) {
        return true;
    }
    //		}
}


//验证码
window.onload = createCode();
var code;

function createCode() {
    code = "";
    var codeLength = 6; //验证码的长度
    var checkCode = document.getElementById("getCheckCode");
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    if (checkCode) {
        checkCode.className = "code";
        checkCode.value = code;
    }
}

function validateCode() {
    var inputCode = document.getElementById("inputCode").value;
    if (inputCode.length <= 0) {
        $("#inputCode").removeClass("pass").addClass("error");
        $(".tips").css("display", "block").html("请输入验证码！");
        return false;
    }
    else if (inputCode.toUpperCase() != code.toUpperCase()) {
        $("#inputCode").removeClass("pass").addClass("error");
        $(".tips").css("display", "block").html("验证码输入有误！");
        createCode();
        return false;
    }
    else {
        return true;
        $("#inputCode").removeClass("error");
        $(".tips").css("display", "none")
    }
}

function addDays(day) {
    var date = new Date();
    var sum = date.getDate() + day;
    date.setDate(sum);
    return date;
}

function setCookie(key, value, dateTime) {
    var cValue = key + "=" + encodeURIComponent(value);
    if (dateTime) {
        cValue = cValue + ";expires=" + dateTime
    }
    document.cookie = cValue;
}

function getCookie(key) {
    var cValue = document.cookie;
    var arr = cValue.split("; ");
    var keyValue = "";
    for (var i = 0; i < arr.length; i++) {
        var keyName = arr[i].split("=")[0];
        if (keyName == key) {
            keyValue = arr[i].split("=")[1];
            break;
        }
    }
    return decodeURIComponent(keyValue);
}

function delCookie(key) {
    document.cookie = key + "=;expires=" + new Date(0);
}

function checkSpace(obj) {
    if ((obj.val() == "") || (obj.val() == obj.attr("placeholder"))) {
        return true;
    }
}

function getTelCode(telObj,telOk){
    //telObj 为电话号的对象
    if(telObj.val() && telOk){
        $.ajax({
            type: "GET",
            url: "/guest/riUser/sendPhoneValidCode/" +
            telObj.val() + ".do",
            success: function (data, status) {
                ////console.log(data.data)
                time(telObj.parent().next().find(".codebtn")); //倒计时
            }
        })
    }else{

    }

}
function getcompanyName(obj, tips,tipStr) {
    var reg = /^[\S]{1,40}$/;//名字验证规则
    if ((obj.val() == "") || (obj.val() == obj.attr("placeholder"))) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(obj.attr("placeholder"));
        return false;
    }
    if (!reg.test(obj.val())) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(tipStr);
        return false;
    } else if (reg.test(obj.val())) {
        obj.removeClass("error");
        tips.css("display", "none");
        return true
    }

};
function getNameInput(obj, tips,tipStr) {
    var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/;//名字验证规则
    if ((obj.val() == "") || (obj.val() == obj.attr("placeholder"))) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(obj.attr("placeholder"));
        return false;
    }
    if (!reg.test(obj.val())) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(tipStr);
        return false;
    } else if (reg.test(obj.val())) {
        obj.removeClass("error");
        tips.css("display", "none");
        return true
    }

};
function getNameInputOneTime(obj, tips,tipStr) {
    var reg = /^[a-zA-Z0-9]{1,40}$/;//名字验证规则
    if ((obj.val() == "") || (obj.val() == obj.attr("placeholder"))) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(obj.attr("placeholder"));
        return false;
    }
    if (!reg.test(obj.val())) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(tipStr);
        return false;
    } else if (reg.test(obj.val())) {
        obj.removeClass("error");
        tips.css("display", "inline-block").html("提示:用户名一经设置，不能修改");
        return true
    }

};
function getLinkManInput(obj, tips,tipStr) {
    var reg = /^[\u4e00-\u9fa5a-zA-Z]{1,10}$/;//联系人验证规则
    if ((obj.val() == "") || (obj.val() == obj.attr("placeholder"))) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(obj.attr("placeholder"));
        return false;
    }
    if (!reg.test(obj.val())) {
        obj.addClass("error");
        tips.css("display", "inline-block").html(tipStr);
        return false;
    } else if (reg.test(obj.val())) {
        obj.removeClass("error");
        tips.css("display", "none");
        return true
    }
};

//三联地址，获取数据
function setStartParam(elem) {
    if (elem.provinceId) {
        $("#startProvinceId").val(elem.provinceId);
        $("#startProvinceName").val(elem.provinceName);
    } else {
        $("#startProvinceId").val("0");
        $("#startProvinceName").val("");
    }
    if (elem.cityId) {
        $("#startCityId").val(elem.cityId);
        $("#startCityName").val(elem.cityName);
    } else {
        $("#startCityId").val("0");
        $("#startCityName").val("");
    }
    if (elem.countyId) {
        $("#startCountyId").val(elem.countyId);
        $("#startCountyName").val(elem.countyName);
    } else {
        $("#startCountyId").val("0");
        $("#startCountyId").val("");
    }
}

//获取职位---start
jobFirst();
function jobFirst() {
    $.ajax({
        url: "/js/member/jobJson.json",
        type: "GET",
        data: "",
        dataType: "json",
        success: function (data) {
            var dataList = data.data.ri_memb_job.child;
            var jobFirst_html = "<option value=''>请选择</option>";
            for (var i = 0; i < dataList.length; i++) {
                jobFirst_html += "<option value='" + dataList[i].code + "'>" + dataList[i].name + "</option>";
            }
            $("#personVocation").html(jobFirst_html);
        }
    });

    $("#position").on("change", "#personVocation", function () {
        jobSecond($(this).val());
        var a = $(this).children("option:selected").html()
        if (a == "其他") {
            $("#personVocationOther").css("display", "inline-block");
        } else {
            $("#personVocationOther").css("display", "none");
        }
    });
}

function jobSecond(jobFirstVal) {
    $.ajax({
        url: "/js/member/jobJson.json",
        type: "GET",
        data: "",
        dataType: "json",
        success: function (data) {
            var dataList = data.data.ri_memb_job.child;
            var jobSecond_html = "<option value=''>请选择</option>";
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].code == jobFirstVal) {
                    if (dataList[i].secondList.length > 0) {
                        $("#personVocationSecond").css("display", "inline-block");
                        for (var j = 0; j < dataList[i].secondList.length; j++) {
                            jobSecond_html += "<option value='" + dataList[i].secondList[j].secondCode + "'>" + dataList[i].secondList[j].secondName + "</option>";
                            if (dataList[i].secondList[j].secondName == "其他") {
                                $("#personVocationOther").css("display", "inline-block");
                            } else {
                                $("#personVocationOther").css("display", "none");
                            }
                        }
                        $("#personVocationSecond").html(jobSecond_html);
                    } else {
                        ////console.log(dataList[i].secondList)
                        $("#personVocationSecond").css("display", "none");
                    }
                }
            }
        }
    });
}

$("#position").on("change", "#personVocationSecond", function () {
    var a = $(this).children("option:selected").html()
    if (a == "其他") {
        $("#personVocationOther").css("display", "inline-block");
    } else {
        $("#personVocationOther").css("display", "none");
    }
});
//获取职位---end

//公开保密的切换
$(".secret").on("click", function () {
    $(this).toggleClass("secretYes");
});

function toReceivedOrder(roleTp){
    if(roleTp == "01" || roleTp == "04"){
        window.location.href = "/memberCenter/personal/receivedOrders.html";
    }else if(roleTp == "02"){
        window.location.href = "/memberCenter/enterprise/receivedOrders.html";
    }else if(roleTp == "03"){
        window.location.href = "/memberCenter/agency/receivedOrders.html";
    }
}

//企业认证
//var compNameReg = /^[\u4e00-\u9fa5A-Za-z0-9\@\!\#\$\%\^\&\*\.\~\_\-]{1,25}$/;  //企业名称
var OrgCodeReg = /^[A-Za-z0-9\@\!\#\$\%\^\&\*\.\~\_\-]{9,10}$/;  //组织机构代码
var compNameReg =/^[\S]{1,50}$/;  //企业名称
var urlReg = /^www\.[A-Za-z0-9\@\!\#\$\%\^\&\*\.\~\_\-]{1,}$/;  //网址
var nameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/;//姓名
var phoneReg = /^1(3|4|5|7|8)\d{9}$/; //手机
var linkmanIdcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //身份证

//
var manNameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;//名字验证规则

function checkInput(obj,reg,tipsTxt){
    //obj--输入框对象；
    if(!obj.val()){
        obj.addClass("error").next().css("display","inline-block").html(obj.attr("placeholder"));
        return false;
    }else if(!reg.test(obj.val())){
        obj.addClass("error").next().css("display","inline-block").html(tipsTxt);
        return false;
    }else if(reg.test(obj.val())){
        obj.removeClass("error").next().css("display","none").html("");
        return true;
    }
}

$(".help").click(function(){
    if($(this).is(".helpYes")){
        $(this).removeClass("helpYes");
    }else{
        $(this).addClass("helpYes");
    }
})
////个人邮箱
//$("#emailHelp").click(function(){
//    if($(this).is(".helpYes")){
//        $("#emailContent").css("display","block");
//    }else{
//        $("#emailContent").css("display","none");
//    }
//})
//个人邮箱
$("#emailHelp").mouseover(function(){
    $("#emailContent").css("display","block");
}).mouseout(function(){
    $("#emailContent").css("display","none");
})

//企业简称
$("#compNickHelp").mouseover(function(){
    $("#compNickContent").css("display","block");
}).mouseout(function(){
    $("#compNickContent").css("display","none");
})
//企业类型
$("#compTypeHelp").mouseover(function(){
    $("#compTypeContent").css("display","block");
}).mouseout(function(){
    $("#compTypeContent").css("display","none");
})
//机构简称
$("#anencyNickHelp").mouseover(function(){
    $("#anencyNickContent").css("display","block");
}).mouseout(function(){
    $("#anencyNickContent").css("display","none");
});

// 网站导航
$(".js-navigation,.navigation").mouseover(function () {
    $(".navigation").show()
})
$(".navigation,.js-navigation").mouseleave(function () {
    $(".navigation").hide()
})

//去除所有空格
function removeAllSpace(str) {
    return str.replace(/\s+/g, "");
}
