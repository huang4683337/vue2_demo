api模块是接口调用模块
所有接口都将通过index.js输出，各自子模块需要引入index.js中输出

例如loginAPI.js
export default {

  //    用户登录
  search: function (params) {
    var url = '/patent-interface-search/patentIndex/queryKeywordPage';
    return axios.get(url, params);
  },
  userSignIn: function (params) {
    var url = '/guest/riUser/login.do';
    return axios.post(url, params);
  },
  userSignOut: function (params) {
    var url = '/riUser/logout.do';
    return axios.get(url, params);
  },

};

在index.js中需要这样引入
export default {
  loginAPI: require('./loginAPI').default,

}

使用 import axios from '../api/index';（根据自己路径引用）
    axios.loginAPI.search({
        params:{
          p_keyword:"计算机",
          p_type: "01,02,03",
          p_category: "list1",
          pageSize: 10,
          pageNum: 1
        }

        }).then( (response)=> {
		初次使用建议通过浏览器看一下数据结构
        //console.log(response)
      })
        .catch( (error)=> {
          console.log(error)
        });
