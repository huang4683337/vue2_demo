require('es6-promise').polyfill();
import axios from 'axios';
import Vue from 'vue';
import { Loading ,Message,MessageBox} from 'element-ui';
import Qs from 'qs';

//
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
// let loadingInstance;
// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.paramsSerializer = function (params) {
    return Qs.stringify(params, { arrayFormat: 'indices',allowDots: true })
  };
// axios.defaults.baseURL = 'http://101.201.56.225';
axios.defaults.withCredentials=true;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  axios.defaults.headers.delete['Content-Type'] = 'application/json';
  axios.defaults.headers.patch['Content-Type'] = 'application/json';
  axios.defaults.transformRequest= [function (data,config) {
  // Do whatever you want to transform the data
      if(!config['Content-Type']){
          return JSON.stringify(data);
      }
      switch (config['Content-Type'].toLowerCase()){
          case 'application/json':
              {
                  return JSON.stringify(data);
                }
          case 'multipart/form-data':
          {
              return data;
          }
          default:
          {
              return JSON.stringify(data);
          }
      }
}];
// http request 拦截器
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某事，比如说 设置loading
    replacePathVars(config);
    return config;
  },
  err => {
    //请求错误做哪些事情
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    //对响应数据做些事，比如说把loading动画关掉
    return response;
    // //console.log(response.code)

  },
  error => {
    //请求错误
    if (error.response) {
        if (error.response.status.toString().substr(0,1)=="4" || error.response.status.toString().substr(0,1)=="5") {
            if(error.response.status.toString()=="403"){
                window.location.href = 'index.html#/'
            }else if(error.response.status.toString()=="401"){

            }else if(error.response.status.toString()=="500"){
              if(error.response.data.code=="9802"){
              }else{
                Message({
                  message: "服务器内部错误，请稍后重试",
                  type: 'error',
                  duration: 5 * 1000
                })
              }
            }else{
                Message({
                    message: "服务器内部错误，请稍后重试",
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        }
    }
    return Promise.reject(error.response)
  });

function replacePathVars(config) {
  let params = config.params||{};
  // debugger;
  if (config.data != undefined) {
    params = config.data;
  }
  config.url = config.url.replace(/{([^{}]+)}/g, function (a, b, index, input) {
    let val = params[b];
    if (val != undefined && val != null) {
      delete params[b];
      return val;
    }
    return a;
  });
}

export default axios;
