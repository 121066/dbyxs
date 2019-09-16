import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
// //  线上地址
axios.defaults.baseURL = 'http://39.100.50.119:9995'
// axios.defaults.withCredentials = true

//  本地地址
// axios.defaults.baseURL = 'http://192.168.0.11:9995'
//  axios.defaults.baseURL = 'http://192.168.0.120:9995'
//  本地地址祝振华
// axios.defaults.baseURL = 'http://192.168.0.110:9995/'

//  本地地址应兵
// axios.defaults.baseURL = 'http://192.168.0.107:9995'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 发送验证码
export const send_code = (data) => {
    return axios.post('/web_auth/code',data)
} 

//  验证码登陆功能
export const login_1 = (data) => {
    return axios.post('/web_auth/login_2',data)
}

//   使用密码登陆
export const login_2 = (data) => {

    return axios.post('/web_auth/login_1',data)
}

//   添加管理员短信发送接口
export const send_admin_code = (data) => {
    return axios.post('/web_upc/add_send_massage',data)
}

//  添加管理员接口
export const add_admin = data => {
    return axios.post('/web_upc/add',data)
}

//  注销或恢复管理员接口
export const admin_start = data => {
    return axios.post('/web_upc/start_and_stop',data)
}

// 删除管理员接口
export const delete_admin = data => {
    return axios.post('/web_upc/delete',data)
}

// 获取商品的列表
export const goodsList = (data) => {
    return axios.post("/web_goods/list", data)
}

// 获取商品的类型
export const goodsType = () => {
    return axios.post("/web_goods_type/select_box")
}

// 获取商品的详情
export const goods_detail = data => {
    return axios.post('/web_goods/get_one',data)
}

// 获取省的集合
export const province = (father, level) => {
    return  axios.post("web_dict_address/get", "father=" + father + "&level=" + level)
}

//  获取市的集合
export const citys = (id) => {
    return axios.post("web_dict_address/get", "father=" + id + "&level=" + 2)
}

//   获取区的集合
export const areas = (id) => {
    return axios.post("web_dict_address/get", "father=" + id + "&level=" + 3)
}
//   查询商品所在的位置
export const positions = () => {
   return axios.post('/web_goods_pos/list')
}

// 查询优惠券类型列表
export const coupon_type_list = (data) => {
    return axios.post("/web_coupon_type/list",data)
}

// 优惠券类型添加
export const coupon_type_add = (data) => {
    return axios.post("/web_coupon_type/add",data)
}

// 优惠券类型详情
export const coupon_type_detail = (data) => {
    return axios.post("/web_coupon_type/get",data)
}

//  优惠券类型删除
export const coupon_type_delete = (data) => {
    return axios.post("/web_coupon_type/delete",data)
}

//  优惠券类型修改
export const coupon_type_modify = (data) => {
    return axios.post("/web_coupon_type/modify",data)
}

//  优惠券列表
export const coupon_list = (data) => {
    return axios.post('/web_coupon/list',data)
}

// 删除单个优惠券
export const coupon_delete = (data) => {
    return axios.post('/web_coupon/delete',data)
}

// 添加优惠券
export const  coupon_add = (data) => {
    return axios.post('/web_coupon/add',data)
}

// 修改优惠券
export const coupon_modify = (data) => {
    return axios.post('/web_coupon/modify',data)
}

// 优惠券详情
export const coupon_detail = (data) => {
    return axios.post('/web_coupon/get',data)
}

//  红包类型列表
export const red_packet_type_list = (data) => {
    return axios.post('/web_red_packet_type/list',data)
}

//   添加红包类型
export const red_packet_type_add = (data) => {
    return axios.post('/web_red_packet_type/add',data)
}

//   删除红包类型
export const red_packet_type_delete = (data) => {
    return axios.post('/web_red_packet_type/delete',data)
}

//   查看红包类型详情
export const red_packet_type_detail = (data) => {
    return axios.post('/web_red_packet_type/get',data)
}

//   修改红包类型详情
export const red_packet_type_modify = (data) => {
    return axios.post('/web_red_packet_type/modify',data)
}

//   查询红包列表
export const red_packet_list = (data) => {
    return axios.post('/web_red_packet/list',data)
}
// 添加红包
export const red_packet_add = (data) => {
    return axios.post('/web_red_packet/add',data)
}

// 查看红包详情
export const red_packet_detail = (data) => {
    return axios.post('/web_red_packet/get',data)
}

// 修改红包详情
export const red_packet_modify = (data) => {
    return axios.post('/web_red_packet/modify',data)
}

// 删除红包
export const red_packet_delete = (data) => {
    return axios.post('/web_red_packet/delete',data)
}

//  获得虚拟商品类型
export const get_virtual_list = () => {
    return axios.post('/web_virtual/list')
}

//   查询快递公司列表
export const get_courier_list = () => {
    return axios.post('/web_courier/list')
}

//    用于查询推广员列表
export const get_promoters_list = (data) => {
    return axios.post('/web_promoter/list',data)
}

//    推广员添加接口
export const add_promoters = (data) => {
    return axios.post('/web_promoter/add',data)
}

//   推广员修改接口
export const promoters_modify = (data) => {
    return axios.post('/web_promoter/update',data)
}

//   推广员查看详情接口
export const promoters_detail = (data) => {
    return axios.post('/web_promoter/detail',data)
}

//   推官员团队
export const promoters_team = () =>{
    return axios.post('web_team/teamlist')
}

//   推广员状态修改接口
export const promoters_status = (data) => {
    return axios.post('/web_promoter/updateStatus',data)
}

//   团队管理列表接口
export const team_manage = (data) => {
    return axios.post('/web_team/list',data)
}

//   团队管理添加接口
export const team_manage_add = () => {
    return axios.post('/web_team/add',data)
}

//   团队管理删除接口
export const team_manage_delete = (data) => {
    return axios.post('/web_team/delete',data)
} 

//    团队管理修改接口
export const team_manage_modify = (data) => {
    return axios.post('/web_team/updateTeam',data)
}

//    团队业绩
export const team_performance = (data) => {
    return axios.post('/web_team/performancelist',data)
}

//    团队明细
export const team_detail = (data) => {
    return axios.post('/web_team/teamdetail',data)
}

//   团队推广员邀请明细
export const team_inviter = (data) => {
    return axios.post('/web_record/list',data)
}

//    积分抽奖活动列表
export const points_lottery = data => {
    return axios.post('/web_draw/list',data)
}

//   添加积分抽奖活动
export const add_lottery = data  => {
    return axios.post('/web_draw/addDraw',data)
}

//   修改积分抽奖活动
export const lottery_modify = data => {
    return axios.post('/web_draw/updateDraw',data)
}

//    积分抽奖活动详情
export const lottery_detail = data => {
    return axios.post('/web_draw/drawVoDetail',data)
}

//    积分抽奖活动删除
export const lottery_delete = data => {
    return axios.post('/web_draw/deleteDraw',data)
}

//    积分抽奖修改状态
export const lottery_status = data => {
    return axios.post('/web_draw/updateDrawStatus',data)
}

//    排行榜记录表
export const ranking_records_list = data => {
    return axios.post('/web_ranking/record_list',data)
}

//   设置排行榜列表
export const ranking_list = data => {
    return axios.post('/web_ranking/list',data)
}

//   添加排行榜
export const add_ranking = data => {
    return axios.post('/web_ranking/add',data)
}

//   修改排行榜
export const modify_ranking = data => {
    return axios.post('/web_ranking/modify',data)
}

//   查看排行榜详情
export const see_modify_detail =  data => {
    return axios.post('/web_ranking/get',data)
}

//   修改排行榜的状态
export const modify_ranking_status = data => {
    return axios.post('/web_ranking/modify_status',data)
}

//    查看佣金设置
export const commission_set_see = data => {
    return axios.post('vip_invite/list') 
}

//   修改佣金设置
export const commission_set_modify = data => {
    return axios.post('/vip_invite/add_VipInvite',data)
}

//   佣金列表
export const commission_list = data => {
    return axios.post('/web_examine/commission_list',data)
}

//   佣金明细 
export const commission_detail = data => {
    return axios.post('/web_examine/commission_detailed',data)
}

//   佣金审核
export const commission_check = data => {
    return axios.post('/web_examine/apply_list',data)
}

//   佣金审核详情
export const commission_check_detail = data => {
    return axios.post('/web_examine/user_details',data)
}

//  佣金交易审核
export const commission_tac_check = data => {
    return axios.post('/web_examine/admin_approval',data)
}

//   领券中心列表
export const card_list = data => {
    return axios.post('/web_vouchers_set/list',data)
}

//   领券中心删除列表接口
export const card_delete = data => {
    return axios.post('/web_vouchers_set/delete',data)
}

//   领券中心状态修改
export const card_modify_status = data => {
    return axios.post('/web_vouchers_set/modify_status',data)
}

//   领券中心详情
export const card_detail = data => {
    return axios.post('/web_vouchers_set/detail',data)
}

//   领券中心修改
export const card_modify = data => {
    return axios.post('/web_vouchers_set/modify',data)
}

//   领券中心添加
export const card_add = data => {
    return axios.post('/web_vouchers_set/add',data)
}

//    免费抽奖列表
export const free_lottery = data => {
    return axios.post('/web_free_lucky/list',data)
}

//   免费抽奖修改状态
export const free_lottery_status = data => {
    return axios.post('/web_free_lucky/start_and_stop',data)
}

//   免费抽奖详情
export const free_lottery_del = data => {
     return axios.post('/web_free_lucky/detail',data)
}

//   免费抽奖设置
export const free_set = data => {
    return axios.post('/web_free_lucky/add_conf',data)
}
//   免费抽奖设置修改
export const free_modify = data => {
    return axios.post('/web_free_lucky/modify_conf',data)
}

//   免费抽奖设置详情
export const  free_set_detail = data => {
    return axios.post('/web_free_lucky/show_conf',data)
}

//   审核拒绝理由
export const free_check = data => {
    return axios.post('/web_free_lucky/audit',data)
}

//   十单免一
export const tFreeO_act = data => {
    return axios.post('/web_activity/query_list',data);
}

//   十单免一活动添加接口
export const tFreeO_add = data => {
    return axios.post('/web_activity/add',data)
}

//   十单免一活动详情接口
export const tFreeO_detail = data => {
    return axios.post('/web_activity/query_one', data)
}

//   十单免一活动状态修改
export const tFreeO_status = data => {
    return axios.post('/web_activity/update_status',data)
}

//   十单免一活动修改
export const tFreeO_modify = data => {
    return axios.post('/web_activity/update',data)
}

//   拼团团队列表
export const tTeams_list = data => {
    return axios.post('/web_activityTeam/query_list',data)
}

//   拼团团队详情
export const tTeams_detail = data => {
    return axios.post('/web_activityTeam/query_one',data)
}

//   新人免费拿添加接口
export const nC_free_add = data => {
    return axios.post('/web_free/add',data)
}

//   新人免费拿活动列表
export const nc_free_list = data => {
    return axios.post('web_free/query_list',data)
}

//   新人免费拿修改活动状态
export const nc_free_status = data => {
    return axios.post('web_free/update_status',data)
}

//   新人免费拿活动详情
export const nc_free_detail = data => {
    return axios.post('web_free/query_one',data)
}

//   新人免费拿活动修改
export const nc_free_modify = data => {
    return axios.post('web_free/update',data)
}

//  新人特惠活动设置
export const nc_favor_set = data => {
    return axios.post('web_new_promotion/promotion_list',data)
}

//  新人特惠活动添加
export const nc_favor_add = data => {
    return axios.post('/web_new_promotion/add_promotion',data)
}

//   新人特惠活动状态修改
export const nc_favor_status = data => {
    return axios.post('/web_new_promotion/modify_promotion_status',data)
}

//   新人特惠活动详情
export const nc_favor_detail = data => {
    return axios.post('/web_new_promotion/get_promotion',data)
}

//   新人特惠活动修改
export const nc_favor_modify = data => {
    return axios.post('/web_new_promotion/modify_promotion',data)
}


//   新人特惠拼团团队
export const nc_favor_teams = data => {
    return axios.post('/web_new_promotion/list', data)
}

//   添加商品标签
export const add_label = data => {
    return axios.post('/web_label/add',data)
}

//    获取标签列表
export const label_list = data => {
    return axios.post('/web_label/list',data)
}

//    查询标签详情
export const label_detail = data => {
    return axios.post('web_label/one',data)
}

//    修改标签详情
export const label_modify = data => {
    return axios.post('/web_label/update',data)
}

//    商品砍价列表
export const bargain_list = data => {
    return axios.post('/web_bargain/list',data)
}

//    获取砍价的列表详情
export const bargain_detail = data => {
    return axios.post('/web_bargain/get_detail',data)
}

//    获取拼单购买列表
export const purchase_list = data => {
    return axios.post('/web_group_purchase/list',data)
}

//    获取拼单详情
export const purchase_detail = data => {
    return axios.post('/web_group_purchase/detail',data)
}