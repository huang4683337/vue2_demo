module.exports={
  // 获取地址栏参数
  GetQueryString:(i)=>{
    var j = location.search.match(new RegExp("[?&]" + i + "=([^&]*)(&?)", "i"));
    return j ? j[1] : j
  },
  SIPOPAPI_Base: process.env.NODE_API,

  isEmpty: function (obj) {
    if (obj == null || obj == undefined) {
      return true;
    }
    if (obj instanceof Array) {
      return obj.length == 0 ? true : false;
    } else if (typeof obj == 'string' || obj instanceof String) {
      return obj == '' ? true : false;
    } else if (obj instanceof Object) {
      for (var i in obj) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  },
  //格式化时间
  formatDate: (date, formatStr) => {
    var date = new Date(date);
    /*
     函数：填充0字符
     参数：value-需要填充的字符串, length-总长度
     返回：填充后的字符串
     */
    var zeroize = function (value, length) {
      if (!length) {
        length = 2;
      }
      value = new String(value);
      for (var i = 0, zeros = ''; i < (length - value.length); i++) {
        zeros += '0';
      }
      return zeros + value;
    };

    if (!formatStr) {
      formatStr = 'yyyy-MM-dd';
    }

    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
      switch ($0) {
        case 'd':
          return date.getDate();
        case 'dd':
          return zeroize(date.getDate());
        case 'ddd':
          return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
        case 'dddd':
          return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
        case 'M':
          return date.getMonth() + 1;
        case 'MM':
          return zeroize(date.getMonth() + 1);
        case 'MMM':
          return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
        case 'MMMM':
          return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
        case 'yy':
          return new String(date.getFullYear()).substr(2);
        case 'yyyy':
          return date.getFullYear();
        case 'h':
          return date.getHours() % 12 || 12;
        case 'hh':
          return zeroize(date.getHours() % 12 || 12);
        case 'H':
          return date.getHours();
        case 'HH':
          return zeroize(date.getHours());
        case 'm':
          return date.getMinutes();
        case 'mm':
          return zeroize(date.getMinutes());
        case 's':
          return date.getSeconds();
        case 'ss':
          return zeroize(date.getSeconds());
        case 'l':
          return date.getMilliseconds();
        case 'll':
          return zeroize(date.getMilliseconds());
        case 'tt':
          return date.getHours() < 12 ? 'am' : 'pm';
        case 'TT':
          return date.getHours() < 12 ? 'AM' : 'PM';
      }
    });
  },
  //店铺评分计算
  /*
   50分=1颗星星
   5颗星星=1颗月亮
   5颗月亮=1颗太阳
     每获得一颗太阳，一颗星星的分值增加50分*/
  storeScore: (total) => {
  	var obj={};
  	var n=total/1250;
  	if(n<1){
//		没有太阳
  		var storeScore=parseInt(total/50)
			if(storeScore<5){
			//星星
				obj.starScore=storeScore;
			}else if(5<=storeScore<25){
				//月亮
				obj.moonScore=parseInt(storeScore/5);
			}
  	}else if(n>=1){
//		有太阳
			var sunScore=0;
  		for(var i=1;n>=i;i++){
	 			n=n-i;
	 			sunScore++;
	 		}
  		obj.sunScore=sunScore;
  	}
  	return obj;
  },

}
