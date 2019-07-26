import Vue from "vue";
import App from "./App";
import router from "./router";
import mintui from "mint-ui";

import "mint-ui/lib/style.css";
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";
import "./lib/mui/js/mui.js";
import axios from "axios";
import moment from "moment";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import $ from "jquery";
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.filter("dateFormat", function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});
axios.defaults.baseURL = "http://www.liulongbin.top:3005";
//axios.defaults.baseURL = "";
Vue.prototype.$http = axios;

Vue.use(mintui);
Vue.config.productionTip = false;
let store = new Vuex.Store({
  state: {
    user: "张三"
  },
  mutations: {
    change(state, newVal) {
      console.log(newVal, 222);
      state.user = newVal;
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
