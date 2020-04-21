import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//申请人 专利中心
import login from '@/pages/login/login.vue'
import a from '@/pages/noRender/a.vue'
import zujian from '@/pages/zuJian/a.vue'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/a',
      name: 'aaa',
      component: a,
    },
    {
      path: '/zujian',
      name: 'zujian',
      component: zujian,
    },

  ]
})
