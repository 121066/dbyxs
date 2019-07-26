import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
var Store= new Vuex.Store({
  state: {
    user: "张三"
  },
  mutations: {
    change(state, newVal) {
      console.log(newVal, 666);
      state.user = newVal;
    }
  },
  actions: {}
});
export default Store
