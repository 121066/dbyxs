import Vue from 'vue'
import App from './App'
import router from './router'
//  导入axios

require('es6-promise').polyfill();
import axios from 'axios'

Vue.prototype.$axios = axios
//  本地地址
// axios.defaults.baseURL = 'http://192.168.0.11:9995'
// axios.defaults.baseURL = 'http://192.168.0.120:9995'
//  线上地址
axios.defaults.baseURL = 'http://39.100.50.119:9995'

//  本地地址祝振华
// axios.defaults.baseURL = 'http://192.168.0.110:9995/'

//  本地地址应兵
// axios.defaults.baseURL = 'http://192.168.0.104:9995'



axios.defaults.withCredentials = true
//   处理兼容性问题
import 'babel-polyfill'

// 导入element-ui
import ElementUI, { TabPane } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式npm i 


// Vue.config.productionTip = false

// 进行登陆拦截
router.beforeEach((to, from, next) => {
  // ...
  NProgress.start();

  //  未了避免，用户回退的时候，没有回退到之前的页面是而产生报错
  let path = localStorage.getItem('path')
  if (path == '"' + from.path + '"') {
  } else {
    if (path != '"' + to.path + '"') {
      localStorage.removeItem('pageMsg')
    }
  }

  // let token = localStorage.getItem('token')
  if (from.path === '/selectGoods' || from.path === '/sevenPromotion_selectGoods' || from.path === '/fivePromotion_selectGoods' || from.path === '/coupon_selectGoods' || from.path === '/fivePromotion_help' || from.path === '/sevenPromotion_help' || from.path == '/select_cardList' || from.path == '/selectUsers') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
    to.meta.isBack = false;
    next();
  }
  let token = localStorage.getItem('token') || '';
  if (to.path == '/login' && !token) {
    next()
  } else {
    // 获取token， 并判断localstorage中是否存在token，如果不存在，则跳转至login页面
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
  if (token && to.path == '/login') {
    next('/manage')
  }
  // 关闭进度条
  NProgress.done()

})


//当路由跳转结束后
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
//  设置请求拦截
axios.interceptors.request.use(
  config => {
    NProgress.start();

    if (localStorage.getItem('token')) {
      // config.headers['X-Token']= localStorage.getItem('token');
      config.headers.Authorization = localStorage.getItem('token')
    }

    return config;
  },
  error => {
    console.log(error)
    if (error.response.status == 401) {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  });




//  设置相应拦截
axios.interceptors.response.use(function (response) {
  if (response.data.status == 401) {
    localStorage.removeItem('token')
    window.location.href = '#/login'
  }
  NProgress.done();

  return response;
}, function (error) {
  // 对响应错误做点什么
});

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.snow.css'

Vue.use(VueQuillEditor)



import store from './store'//引入store
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
