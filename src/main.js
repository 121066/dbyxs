import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUi from 'mint-ui'
import axios from 'axios'
import Vant from 'vant'
import Ast from 'vue-resource'
import 'vant/lib/index.css'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './assets/globs.css'
Vue.use(Ast)
Vue.use(Vant)
Vue.use(MintUi)
    //axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://bd.free.idcfengye.com'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$axios = axios
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')