// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store' //在main.js中引入store模块
import router from './router'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

window.eventBus = new Vue();//注册全局事件对象




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})

