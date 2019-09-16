import Vue from 'vue'
import Vuex from 'vuex'
import { positions, goodsType ,get_virtual_list} from '../api/getData.js'

Vue.use(Vuex)

const state = {
        // 存储token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        adminIfo: '',    //  用于保存用户的信息
        addressDetail: '',  // 用于保存省市区三级联动的信息
        position: '',    //  用于保存商品的位置信息
        goodsType: '',    //   用于保存商品的类型
        virtualMsg: [],   //  用于保存虚拟商品的信息
    }
const getters = {

    }
const mutations = {
        // 当修改token时，将token存入到localStorage中
        save_token(state, token) {
            console.log(token)
            state.token = token
        },
        save_adminInfo(state, adminIfo) {
            state.adminIfo = adminIfo
        },
        save_address(state, addressDetail) {
            state.addressDetail = addressDetail
        },
        sava_position(state, position) {
            state.position = position
        },
        sava_goodsType(state,goodsType){
            state.goodsType = goodsType
        },
        sava_virtual(state,virtualMsg){
            state.virtualMsg = virtualMsg
        },

    }
const actions = {
        // 用于获取用户的信息
        save_usersInfo({ commit }, usersInfo) {
            console.log(usersInfo)
            commit('save_token', usersInfo.token)
            localStorage.setItem('token',usersInfo.token)
            commit('save_adminInfo', usersInfo.user)
        },
        // 用于省市区三级联动的传值
        save_address({ commit }, addressDetail) {
            commit('save_address', addressDetail)
        },
        // 获取商品所在的位置
        sava_goods_position({ commit }) {
            positions().then(result => {
                if (result.data.status == 0) {
                    commit('sava_position', result.data.data)
                }
            })
        },
        // 获取商品类型
        sava_goods_type({ commit }) {
            goodsType().then(result => {
                if (result.data.status == 0) {
                    let goodsType = []
                    result.data.data.forEach(item => {
                        goodsType.push({ id: item.id, label: item.name })
                    })
                    commit('sava_goodsType', goodsType)
                }
            })
        },
        // 保存页码信息
        // 获取虚拟商品的信息
        sava_virtual({commit}){
            let virtualMsg = []
            get_virtual_list().then(result => {
                if(result.data.status == 0){
                    virtualMsg = result.data.data
                }
                console.log(virtualMsg)
                commit('sava_virtual',virtualMsg)
            })
        },


    }

export default new Vuex.Store({
    state,
    actions,
    mutations,
})