import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.interceptors.request.use(config => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    //Vue.prototype.$axios = axios
var car = JSON.parse(localStorage.getItem('car') || '[]')
export default new Vuex.Store({
    state: {
        listname: [],
        count: 0,
        car
    },
    mutations: {
        add(state, name) {
            state.listname = name
        },
        addN(state) {
            state.count++
        },
        //添加购物车的数据
        addToCar(state, goodsinfo) {
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //修改商品数量
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //修改商品的选中状态
        updateGoodsSelected(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.selected = !goodsinfo.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removes(state, id) {
            const i = state.car.findIndex(x => x.id == id)
            if (i !== -1) {
                state.car.splice(i, 1)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    actions: {
        getList(context, name) {
            console.log('有没有')
            axios.get('/goods').then(res => {
                // state.listname = res.data.message.name
                let data = []
                    //  console.log(res.data.message)
                res.data.message.forEach(item => {
                    data.push({ id: item.id, name: item.name })
                })
                context.commit('add', data)
            })
        }
    },
    getters: {
        getname(state) {
            return state.listname
        },
        //保存商品数量
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
            console.log(o)
        },
        //传递最新的选中状态
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        //传递总商品的件数
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        //计算总价商品
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    },
    modules: {}
})