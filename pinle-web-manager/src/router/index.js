import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage')
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const homeSetUp = r => require.ensure([], () => r(require("@/pages/homeSetUp")), 'homeSetUp')
const memberSetUp = r => require.ensure([], () => r(require("@/pages/memberSetUp")), 'memberSetUp')
const goodsManage = r => require.ensure([], () => r(require("@/pages/goodsManage")), 'goodsManage')
const labelManage = r => require.ensure([], () => r(require("@/pages/labelManage")), 'labelManage')
// const labelList = r => require.ensure([], () => r(require("@/components/labelList")), 'labelList')
const goodsManageType = r => require.ensure([], () => r(require("@/pages/goodsManageType")), 'goodsManageType')
const goodsDetail = r => require.ensure([], () => r(require("@/pages/goodsDetail")), 'goodsDetail')
const goodsModify = r => require.ensure([], () => r(require("@/pages/goodsModify")), 'goodsModify')
const bannerDetail = r => require.ensure([], () => r(require("@/pages/bannerDetail")), 'bannerDetail')
const bannerModify = r => require.ensure([], () => r(require("@/pages/bannerModify")), 'bannerModify')
const addBanner = r => require.ensure([], () => r(require("@/pages/addBanner")), 'addBanner')
const addGoods = r => require.ensure([], () => r(require("@/pages/addGoods")), 'addGoods')
const usersManage = r => require.ensure([], () => r(require("@/pages/usersManage")), 'usersManage')
const administratorsManage = r => require.ensure([], () => r(require("@/pages/administratorsManage")), 'administratorsManage')
const usersDetail = r => require.ensure([], () => r(require("@/pages/usersDetail")), 'usersDetail')
const usersModify = r => require.ensure([], () => r(require("@/pages/usersModify")), 'usersModify')
const selectGoods = r => require.ensure([], () => r(require("@/pages/selectGoods")), 'selectGoods')
const orderManage = r => require.ensure([], () => r(require("@/pages/orderManage")), 'orderManage')
const orderModify = r => require.ensure([], () => r(require("@/pages/orderModify")), 'orderModify')
const orderDetail = r => require.ensure([], () => r(require("@/pages/orderDetail")), 'orderDetail')

//  活动管理中的商品选择
	//  包括七折拼团， 五折拼团  9.9拼团  排行榜设置
const selectGoods1 = r => require.ensure([], () => r(require("../components/selectGoods1.vue")), 'selectGoods1')

// 七折拼团
//  商品管理
const goodsManage1 = r => require.ensure([], () => r(require("@/pages/sevenPromotion/goodsManage.vue")), 'goodsManage1')
const blastGoods = r => require.ensure([], () => r(require("@/pages/blast/blastGoods.vue")), 'blastGoods')

//  活动设置
const activitySettings = r => require.ensure([], () => r(require("@/pages/sevenPromotion/activitySettings.vue")), 'activitySettings')
const addActivity = r => require.ensure([], () => r(require("@/pages/sevenPromotion/addActivity.vue")), 'addActivity')
const activityDetail = r => require.ensure([], () => r(require("@/pages/sevenPromotion/activityDetail.vue")), 'activityDetail')
const activityModify = r => require.ensure([], () => r(require("@/pages/sevenPromotion/activityModify.vue")), 'activityModify')
//  拼团查看
const see = r => require.ensure([], () => r(require("@/pages/sevenPromotion/see.vue")), 'see')
//      等待拼团详情
const detail1 = r => require.ensure([], () => r(require("@/pages/sevenPromotion/awaitDetail.vue")), 'detail1')
const help = r => require.ensure([], () => r(require("@/pages/sevenPromotion/help.vue")), 'help')

//      拼团超时详情
const detail2 = r => require.ensure([], () => r(require("@/pages/sevenPromotion/overtimeDetail.vue")), 'detail2')
//      拼团成功详情
const detail3 = r => require.ensure([], () => r(require("@/pages/sevenPromotion/successDetail.vue")), 'detail3')

// 五折拼团
//  商品管理
const fiveGoodsManage = r => require.ensure([], () => r(require("@/pages/fivePromotion/goodsManage.vue")), 'fiveGoodsManage')
//  活动设置
const fiveActivitySettings = r => require.ensure([], () => r(require("@/pages/fivePromotion/activitySettings.vue")), 'fiveActivitySettings')
const fiveAddActivity = r => require.ensure([], () => r(require("@/pages/fivePromotion/addActivity.vue")), 'fiveAddActivity')
const fiveActivityDetail = r => require.ensure([], () => r(require("@/pages/fivePromotion/activityDetail.vue")), 'fiveActivityDetail')
const fiveActivityModify = r => require.ensure([], () => r(require("@/pages/fivePromotion/activityModify.vue")), 'fiveActivityModify')
//  拼团查看
const fiveSee = r => require.ensure([], () => r(require("@/pages/fivePromotion/see.vue")), 'fiveSee')
//      等待拼团详情
const fiveDetail1 = r => require.ensure([], () => r(require("@/pages/fivePromotion/awaitDetail.vue")), 'fiveDetail1')
const fiveHelp = r => require.ensure([], () => r(require("@/pages/fivePromotion/help.vue")), 'fiveHelp')
//      拼团超时详情
const fiveDetail2 = r => require.ensure([], () => r(require("@/pages/fivePromotion/overtimeDetail.vue")), 'fiveDetail2')
//      拼团成功详情
const fiveDetail3 = r => require.ensure([], () => r(require("@/pages/fivePromotion/successDetail.vue")), 'fiveDetail3')


// 一折拼团
//  商品管理
const oneGoodsManage = r => require.ensure([], () => r(require("@/pages/onePromotion/goodsManage.vue")), 'oneGoodsManage')
//  活动设置
const oneActivitySettings = r => require.ensure([], () => r(require("@/pages/onePromotion/activitySettings.vue")), 'oneActivitySettings')
const oneAddActivity = r => require.ensure([], () => r(require("@/pages/onePromotion/addActivity.vue")), 'oneAddActivity')
const oneActivityDetail = r => require.ensure([], () => r(require("@/pages/onePromotion/activityDetail.vue")), 'oneActivityDetail')
const oneActivityModify = r => require.ensure([], () => r(require("@/pages/onePromotion/activityModify.vue")), 'oneActivityModify')
//  拼团查看
const oneSee = r => require.ensure([], () => r(require("@/pages/onePromotion/see.vue")), 'oneSee')
//      等待拼团详情
const oneDetail1 = r => require.ensure([], () => r(require("@/pages/onePromotion/awaitDetail.vue")), 'oneDetail1')
const oneHelp = r => require.ensure([], () => r(require("@/pages/onePromotion/help.vue")), 'oneHelp')
//      拼团超时详情
const oneDetail2 = r => require.ensure([], () => r(require("@/pages/onePromotion/overtimeDetail.vue")), 'oneDetail2')
//      拼团成功详情
const oneDetail3 = r => require.ensure([], () => r(require("@/pages/onePromotion/successDetail.vue")), 'oneDetail3')
//      开幕中详情
const oneDetail4 = r => require.ensure([], () => r(require("@/pages/onePromotion/opening.vue")), 'oneDetail4')

//积分商城
const goodsList = r => require.ensure([], () => r(require("@/pages/integralMall/goodsList.vue")), 'goodsList')
//互动晒单
const interactive = r => require.ensure([], () => r(require("@/pages/interactive/interactive.vue")), 'interactive')
//  审核拒绝详情
const reviewRefuse = r => require.ensure([], () => r(require("@/pages/interactive/reviewRefuse.vue")), 'reviewRefuse')
//  审核通过详情
const reviewSuccess = r => require.ensure([], () => r(require("@/pages/interactive/reviewSuccess.vue")), 'reviewSuccess')
//	待审核详情
const approvalAwiat = r => require.ensure([], () => r(require("@/pages/interactive/approvalAwait.vue")), 'approvalAwiat')
//  审核
const approval = r => require.ensure([], () => r(require("@/pages/interactive/approval.vue")), 'approval')

//秒杀
const seckillGoodsList = r => require.ensure([], () => r(require("@/pages/seckill/goodsList.vue")), 'seckillGoodsList')
// const seckillSelectGoods = r => require.ensure([], () => r(require("@/pages/seckill/selectGoods.vue")), 'seckillSelectGoods')
const seckillActivityList = r => require.ensure([], () => r(require("@/pages/seckill/activityList.vue")), 'seckillActivityList')
const seckillAddActivity = r => require.ensure([], () => r(require("@/pages/seckill/addActivity.vue")), 'seckillAddActivity')
const seckillActivityDetail = r => require.ensure([], () => r(require("@/pages/seckill/activityDetail.vue")), 'seckillActivityDetail')
const seckillActivityModify = r => require.ensure([], () => r(require("@/pages/seckill/activityModify.vue")), 'seckillActivityModify')

//  排行榜记录
const ranking_records = r => require.ensure([], () => r(require("@/pages/ranking_records/")), 'ranking_records')
const ranking_goods = r => require.ensure([], () => r(require("@/pages/ranking_list/ranking_goods")), 'ranking_goods')
const ranking_list = r => require.ensure([], () => r(require("@/pages/ranking_list/")), 'ranking_list')
const add_ranking = r => require.ensure([], () => r(require("@/pages/ranking_list/add_ranking")), 'add_ranking')
const modify_ranking = r => require.ensure([], () => r(require("@/pages/ranking_list/modify_ranking")), 'modify_ranking')
const ranking_detail = r => require.ensure([], () => r(require("@/pages/ranking_list/ranking_detail")), 'ranking_detail')


//卡券管理
const couponType = r => require.ensure([], () => r(require("@/pages/coupon/couponType.vue")), 'coupouType')
const couponList = r => require.ensure([], () => r(require("@/pages/coupon/couponList.vue")), 'coupouList')
const addCouponType = r => require.ensure([], () => r(require("@/pages/coupon/addCouponType.vue")), 'addCouponType')
const addCoupon = r => require.ensure([], () => r(require("@/pages/coupon/addCoupon.vue")), 'addCoupon')
const couponType_modify = r => require.ensure([], () => r(require("@/pages/coupon/couponTypeModify.vue")), 'couponType_modify')
const couponType_detail = r => require.ensure([], () => r(require("@/pages/coupon/couponTypeDetail.vue")), 'couponType_detail')
const coupon_modify = r => require.ensure([], () => r(require("@/pages/coupon/couponModify.vue")), 'coupon_modify')
const coupon_detail = r => require.ensure([], () => r(require("@/pages/coupon/couponDetail.vue")), 'coupon_detail')
const selectCouponType = r => require.ensure([], () => r(require("@/pages/coupon/selectCouponType.vue")), 'selectCouponType')

//卡券管理
const redPacketsType = r => require.ensure([], () => r(require("@/pages/redPackets/redPacketsType.vue")), 'redPacketsType')
const redPacketsList = r => require.ensure([], () => r(require("@/pages/redPackets/redPacketsList.vue")), 'redPacketsList')
const addRedPacketsType = r => require.ensure([], () => r(require("@/pages/redPackets/addRedPacketsType.vue")), 'addRedPacketsType')
const addRedPackets = r => require.ensure([], () => r(require("@/pages/redPackets/addRedPackets.vue")), 'addRedPackets')
const redPacketsType_modify = r => require.ensure([], () => r(require("@/pages/redPackets/redPacketsTypeModify.vue")), 'redPacketsType_modify')
const redPacketsType_detail = r => require.ensure([], () => r(require("@/pages/redPackets/redPacketsTypeDetail.vue")), 'redPacketsType_detail')
const redPackets_modify = r => require.ensure([], () => r(require("@/pages/redPackets/redPacketsModify.vue")), 'redPackets_modify')
const redPackets_detail = r => require.ensure([], () => r(require("@/pages/redPackets/redPacketsDetail.vue")), 'redPackets_detail')
const selectRedPacType = r => require.ensure([], () => r(require("@/pages/redpackets/selectRedPacType.vue")), 'selectRedPacType')

const card_selectGoods = r => require.ensure([], () => r(require("../components/selectGoods.vue")), 'card_selectGoods')

// 选择卡券
const select_cardList = r => require.ensure([], () => r(require("../components/selectCardList.vue")), 'select_cardList')


// 

//   推广员管理
const promotersManage = r => require.ensure([], () => r(require("@/pages/promoters/promotersManage")), 'promotersManage')
const add_promoters = r => require.ensure([], () => r(require("@/pages/promoters/addPromoters")), 'add_promoters')
const promotersDetail = r => require.ensure([], () => r(require("@/pages/promoters/promotersDetail")), 'promotersDetail')
const promotersModify = r => require.ensure([], () => r(require("@/pages/promoters/promotersModify")), 'promotersModify')

//   团队管理
const teamManage = r => require.ensure([], () => r(require("@/pages/team/teamManage")), 'teamManage')

//   团队业绩
const performance = r => require.ensure([], () => r(require("@/pages/performance")),'performance')
const team_detail = r => require.ensure([], () => r(require("@/pages/performance/teamDetail")),'team_detail')
const invitation_detail = r => require.ensure([], () => r(require("@/pages/performance/invitationDetail")),'invitation_detail')

//   积分抽奖
const points_goodsList = r => require.ensure([], () => r(require("@/pages/pointsLottery/goodsList.vue")), 'pointers_goodsList')
// const pointsSelectGoods = r => require.ensure([], () => r(require("@/pages/pointsLottery/selectGoods.vue")), 'pointsSelectGoods')
const points_activitys = r => require.ensure([], () => r(require("@/pages/pointsLottery/activitys.vue")), 'pointers_activitys')
const points_addActivitys = r => require.ensure([], () => r(require("@/pages/pointsLottery/addActivitys.vue")), 'points_addActivitys')
const points_activitysDetail = r => require.ensure([], () => r(require("@/pages/pointsLottery/activitysDetail.vue")), 'points_activitysDetail')
const points_activitysModify = r => require.ensure([], () => r(require("@/pages/pointsLottery/activitysModify.vue")), 'points_activitysModify')

//财务管理
//   佣金管理
const commission_list= r => require.ensure([], () => r(require("@/pages/commission/")), 'commission_list')
const commission_set= r => require.ensure([], () => r(require("@/pages/commission/commission_set")), 'commission_set')
const commission_detail= r => require.ensure([], () => r(require("@/pages/commission/commission_detail")), 'commission_detail')
const commission_check= r => require.ensure([], () => r(require("@/pages/commission/commission_check")), 'commission_check')
const withdrawal_review= r => require.ensure([], () => r(require("@/pages/commission/withdrawal_review")), 'withdrawal_review')
const refuse_detail= r => require.ensure([], () => r(require("@/pages/commission/refuse_detail")), 'refuse_detail')
const success_detail= r => require.ensure([], () => r(require("@/pages/commission/success_detail")), 'success_detail')
const await_detail= r => require.ensure([], () => r(require("@/pages/commission/await_detail")), 'await_detail')


//  领券中心
const card_list= r => require.ensure([], () => r(require("@/pages/card_list/")), 'card_list')
const add_card= r => require.ensure([], () => r(require("@/pages/card_list/add_card")), 'add_card')
const modify_card= r => require.ensure([], () => r(require("@/pages/card_list/modify_card")), 'modify_card')
const card_detail= r => require.ensure([], () => r(require("@/pages/card_list/card_detail")), 'card_detail')
// const selectUsers= r => require.ensure([], () => r(require("@/pages/card_list/selectUsers")), 'selectUsers')

//   免费抽奖
const free_lottery= r => require.ensure([], () => r(require("@/pages/freeLottery")), 'free_lottery')
const free_lottery_del= r => require.ensure([], () => r(require("@/pages/freeLottery/freeLotteryDel")), 'free_lottery_del')
const free_lottery_set= r => require.ensure([], () => r(require("@/pages/freeLottery/freeLotterySet")), 'free_lottery_set')

//   十单免一
const tenFreeO= r => require.ensure([], () => r(require("@/pages/tenFree/goodsList")), 'tenFreeO')
const tActivity_list= r => require.ensure([], () => r(require("@/pages/tenFree/activityList")), 'tActivity_list')
const tActivity_add= r => require.ensure([], () => r(require("@/pages/tenFree/add_act")), 'tActivity_add')
const tActivity_detail= r => require.ensure([], () => r(require("@/pages/tenFree/act_detail")), 'tActivity_detail')
const tActivity_modify= r => require.ensure([], () => r(require("@/pages/tenFree/act_modify")), 'tActivity_modify')
const tTeams_list= r => require.ensure([], () => r(require("@/pages/tenFree/teamList")), 'tTeams_list')
const tTeams_detail= r => require.ensure([], () => r(require("@/pages/tenFree/teams_detail")), 'tTeams_detail')

//    商城
const mall_goods= r => require.ensure([], () => r(require("@/pages/mall/mall_goods")), 'mall_goods')
const mall_bargain= r => require.ensure([], () => r(require("@/pages/mall/mall_bargain")), 'mall_bargain')
const mall_single= r => require.ensure([], () => r(require("@/pages/mall/mall_single")), 'mall_single')
const bar_detail= r => require.ensure([], () => r(require("@/pages/mall/bar_detail")), 'bar_detail')
const sin_detail= r => require.ensure([], () => r(require("@/pages/mall/sin_detail")), 'sin_detail')

//    新人特惠
		//  商品管理
const nComer_favor_goodsManage= r => require.ensure([], () => r(require("@/pages/nComFavor")), 'nComer_favor_goodsManage')
		//  活动设置
const nComer_favor_set= r => require.ensure([], () => r(require("@/pages/nComFavor/set")), 'nComer_favor_set')
		//  活动添加
const nComer_favor_add= r => require.ensure([], () => r(require("@/pages/nComFavor/add")), 'nComer_favor_add')
		//  活动修改
const nComer_favor_modify= r => require.ensure([], () => r(require("@/pages/nComFavor/modify")), 'nComer_favor_modify')
		//  活动详情
const nComer_favor_detail= r => require.ensure([], () => r(require("@/pages/nComFavor/detail")), 'nComer_favor_detail')

const nComer_f_await_detail= r => require.ensure([], () => r(require("@/pages/nComFavor/awaitDetail")), 'nComer_f_await_detail')
const nComer_f_suc_detail= r => require.ensure([], () => r(require("@/pages/nComFavor/successDetail")), 'nComer_f_suc_detail')
const nComer_f_over_detail= r => require.ensure([], () => r(require("@/pages/nComFavor/overtimeDetail")), 'nComer_f_over_detail')

		//   查看拼团列表
const nComer_favor_see= r => require.ensure([], () => r(require("@/pages/nComFavor/see")), 'nComer_favor_see')
	   //    查看拼团详情
// const nComer_favor_teams_detail= r => require.ensure([], () => r(require("@/pages/nComFavor/teamsDetail")), 'nComer_favor_teams_detail')

//    新人免费拿
const nComer_free_goods= r => require.ensure([], () => r(require("@/pages/freeRec")), 'nComer_free_goods')
const nComer_free_set= r => require.ensure([], () => r(require("@/pages/freeRec/set")), 'nComer_free_set')
const nComer_free_add= r => require.ensure([], () => r(require("@/pages/freeRec/add")), 'nComer_free_add')
const nComer_free_modify= r => require.ensure([], () => r(require("@/pages/freeRec/modify")), 'nComer_free_modify')
const nComer_free_detail= r => require.ensure([], () => r(require("@/pages/freeRec/detail")), 'nComer_free_detail')


//   会员赠送
const o_member_send= r => require.ensure([], () => r(require("@/pages/member_send/")), 'o_member_send')



const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: login },
	{
		path: '/manage', component: manage,
		children: [
			{ path: '', component: home, meta: [] },
			{ path: '/homeSetUp', component: homeSetUp, meta: { title: ['基本设置', '首页设置'], keepAlive: false } },
			{ path: '/memberSetUp', component: memberSetUp, meta: { title: ['基本设置', '会员设置'], keppAlive: false } },
			{ path: '/bannerDetail', component: bannerDetail, meta: { title: ['基本设置', '首页设置', 'banner详情'], keepAlive: false } },
			{ path: '/bannerModify', component: bannerModify, meta: { title: ['基本设置', '首页设置', 'banner修改'], keepAlive: false } },
			{ path: '/addBanner', component: addBanner, meta: { title: ['基本设置', '首页设置', 'banner添加'], keepAlive: false } },
			{ path: '/goodsManage', component: goodsManage, meta: { title: ['商品管理', '商品管理'], keepAlive: false } },
			{ path: '/labelManage', component: labelManage, meta: { title: ['商品管理', '标签管理'], keepAlive: false } },
			// { path: '/labelList', component: labelList, meta: { title: ['商品管理', '标签管理'], keepAlive: false } },
			{ path: '/goodsManageType', component: goodsManageType, meta: { title: ['商品管理', '商品类型管理'], keepAlive: false } },
			{ path: '/goodsDetail', component: goodsDetail, meta: { title: ['商品管理', '商品管理', '商品详情'], keepAlive: false } },
			{ path: '/goodsModify', component: goodsModify, meta: { title: ['商品管理', '商品管理', '修改'], keepAlive: false } },
			{ path: '/addGoods', component: addGoods, meta: { title: ['商品管理', '商品管理', '商品添加'], keepAlive:false} },
			{ path: '/usersManage', component: usersManage, meta: { title: ['人员管理', '用户管理'], keepAlive: false } },
			{ path: '/administratorsManage', component: administratorsManage, meta: { title: ['人员管理', '管理员管理'], keepAlive: false } },
			{ path: '/usersDetail', component: usersDetail, meta: { title: ['人员管理', '用户管理', '详情'], keepAlive: false } },
			{ path: '/usersModify', component: usersModify, meta: { title: ['人员管理', '用户管理', '修改'], keepAlive: false } },
			{ path: '/selectGoods', component: selectGoods, meta: { title: ['商品管理', '选择商品'], keepAlive: false } },
			{ path: '/orderManage', component: orderManage, meta: { title: ['订单管理', '订单列表'], keepAlive: false } },
			{ path: '/orderModify', component: orderModify, meta: { title: ['订单管理', '订单列表', '订单修改'], keepAlive: false } },
			{ path: '/orderDetail', component: orderDetail, meta: { title: ['订单管理', '订单列表', '订单详情'], keepAlive: false } },

			// 推广员 管理
			{ path: '/promotersManage', component: promotersManage, meta: { title: ['人员管理', '推广员管理'], keepAlive: false } },
			{ path: '/add_promoters', component: add_promoters, meta: { title: ['人员管理', '推广员管理','添加'], keepAlive: false } },
			{ path: '/promotersDetail', component: promotersDetail, meta: { title: ['人员管理', '推广员管理', '详情'], keepAlive: false } },
			{ path: '/promotersModify', component: promotersModify, meta: { title: ['人员管理', '推广员管理', '修改'], keepAlive: false } },
			
			// 团队管理
			{ path: '/teamManage', component: teamManage, meta: { title: ['人员管理', '团队管理'], keepAlive: false } },

			// 团队业绩
			{ path: '/performance', component: performance, meta: { title: ['人员管理', '团队业绩'], keepAlive: false } },
			{ path: '/performance_team_detail', component: team_detail, meta: { title: ['人员管理', '团队业绩','团队明细'], keepAlive: false } },
			{ path: '/performance_invitation_detail', component: invitation_detail, meta: { title: ['人员管理', '团队业绩','团队明细', '邀请明细'], keepAlive: false } },


			//  七折拼团
			{ path: '/sevenPromotion_goodsManage', component: goodsManage1, meta: { title: ['活动管理', '七折拼团', '活动商品列表'], keepAlive: false } },
			{ path: '/sevenPromotion_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '七折拼团', '商品管理', '添加'], keepAlive: false } },
			{ path: '/sevenPromotion_activitySettings', component: activitySettings, meta: { title: ['活动管理', '七折拼团', '活动设置'], keepAlive: false } },
			{ path: '/sevenPromotion_addActivity', component: addActivity, meta: { title: ['活动管理', '七折拼团', '活动设置', '添加'], keepAlive: true, isBack: true } },
			{ path: '/sevenPromotion_activityDetail', component: activityDetail, meta: { title: ['活动管理', '七折拼团', '活动设置', '详情'], keepAlive: false } },
			{ path: '/sevenPromotion_activityModify', component: activityModify, meta: { title: ['活动管理', '七折拼团', '活动设置', '修改'], keepAlive: true, isBack: true } },
			{ path: '/sevenPromotion_see', component: see, meta: { title: ['活动管理', '七折拼团', '拼团查看'], keepAlive: false } },
			{ path: '/sevenPromotion_help', component: help, meta: { title: ['活动管理', '七折拼团', '拼团查看', '帮助拼团'], keepAlive: false } },
			{ path: '/sevenPromotion_awaitDetail', component: detail1, meta: { title: ['活动管理', '七折拼团', '拼团查看', '等待拼团详情'], keepAlive: true, isBack: true } },
			{ path: '/sevenPromotion_overtimeDetail', component: detail2, meta: { title: ['活动管理', '七折拼团', '拼团查看', '拼团超时详情'], keepAlive: false } },
			{ path: '/sevenPromotion_successDetail', component: detail3, meta: { title: ['活动管理', '七折拼团', '拼团查看', '拼团成功详情'], keepAlive: false } },

			//  五折拼团
			{ path: '/fivePromotion_goodsManage', component: fiveGoodsManage, meta: { title: ['活动管理', '五折拼团', '商品管理'], keepAlive: false } },
			{ path: '/fivePromotion_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '五折拼团', '商品管理', '添加'], keepAlive: false } },
			{ path: '/fivePromotion_activitySettings', component: fiveActivitySettings, meta: { title: ['活动管理', '五折拼团', '活动设置'], keepAlive: false } },
			{ path: '/fivePromotion_addActivity', component: fiveAddActivity, meta: { title: ['活动管理', '五折拼团', '活动设置', '添加'], keepAlive: true, isBack: true } },
			{ path: '/fivePromotion_activityDetail', component: fiveActivityDetail, meta: { title: ['活动管理', '五折拼团', '活动设置', '详情'], keepAlive: false } },
			{ path: '/fivePromotion_activityModify', component: fiveActivityModify, meta: { title: ['活动管理', '五折拼团', '活动设置', '修改'], keepAlive: true, isBack: true } },
			{ path: '/fivePromotion_see', component: fiveSee, meta: { title: ['活动管理', '五折拼团', '拼团查看'], keepAlive: false } },
			{ path: '/fivePromotion_help', component: fiveHelp, meta: { title: ['活动管理', '五折拼团', '拼团查看', '帮助拼团'] } },
			{ path: '/fivePromotion_awaitDetail', component: fiveDetail1, meta: { title: ['活动管理', '五折拼团', '拼团查看', '等待拼团详情'], keepAlive:false ,} },
			{ path: '/fivePromotion_overtimeDetail', component: fiveDetail2, meta: { title: ['活动管理', '五折拼团', '拼团查看', '拼团超时详情'], keepAlive: false } },
			{ path: '/fivePromotion_successDetail', component: fiveDetail3, meta: { title: ['活动管理', '五折拼团', '拼团查看', '拼团成功详情'], keepAlive: false } },

			//  一折拼团
			{ path: '/onePromotion_goodsManage', component: oneGoodsManage, meta: { title: ['活动管理', '9.9拼团', '商品管理'], keepAlive: false } },
			{ path: '/onePromotion_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '9.9拼团', '商品管理', '添加'], keepAlive: false } },
			{ path: '/onePromotion_activitySettings', component: oneActivitySettings, meta: { title: ['活动管理', '9.9拼团', '活动设置'], keepAlive: false } },
			{ path: '/onePromotion_addActivity', component: oneAddActivity, meta: { title: ['活动管理', '9.9拼团', '活动设置', '添加'], keepAlive: false } },
			{ path: '/onePromotion_activityDetail', component: oneActivityDetail, meta: { title: ['活动管理', '9.9拼团', '活动设置', '详情'], keepAlive: false } },
			{ path: '/onePromotion_activityModify', component: oneActivityModify, meta: { title: ['活动管理', '9.9拼团', '活动设置', '修改'], keepAlive: false } },
			{ path: '/onePromotion_team', component: oneSee, meta: { title: ['活动管理', '9.9拼团', '拼团团队'], keepAlive: false } },
			{ path: '/onePromotion_help', component: oneHelp, meta: { title: ['活动管理', '9.9拼团', '拼团团队', '帮助拼团'] } },
			{ path: '/onePromotion_awaitDetail', component: oneDetail1, meta: { title: ['活动管理', '9.9拼团', '拼团团队', '等待拼团详情'] , keepAlive: false } },
			{ path: '/onePromotion_overtimeDetail', component: oneDetail2, meta: { title: ['活动管理', '9.9拼团', '拼团团队', '拼团超时详情'] , keepAlive: false } },
			{ path: '/onePromotion_successDetail', component: oneDetail3, meta: { title: ['活动管理', '9.9拼团', '拼团团队', '拼团成功详情'], keepAlive: false  } },
			{ path: '/onePromotion_openingDetail', component: oneDetail4, meta: { title: ['活动管理', '9.9拼团', '拼团团队', '开幕中详情'] , keepAlive: false } },

			//  积分商城
			{ path: '/integralMall_goodsList', component: goodsList, meta: { title: ['活动管理', '积分商城', '商城列表'] , keepAlive: false } },

			// 互动晒单
			{ path: '/interactive', component: interactive, meta: { title: ['活动管理', '互动晒单'] , keepAlive: false } },
			{ path: '/interactive_reviewAwait', component: approvalAwiat, meta: { title: ['活动管理', '互动晒单', '待审核详情'] , keepAlive: false } },
			{ path: '/interactive_reviewRefuse', component: reviewRefuse, meta: { title: ['活动管理', '互动晒单', '审核拒绝详情'], keepAlive: false  } },
			{ path: '/interactive_reviewSuccess', component: reviewSuccess, meta: { title: ['活动管理', '互动晒单', '审核通过详情'], keepAlive: false  } },
			{ path: '/interactive_approval', component: approval, meta: { title: ['活动管理', '互动晒单', '审核'] , keepAlive: false } },


			// 往期抽奖排行榜记录
			{ path: '/ranking_records', component: ranking_records, meta: { title: ['活动管理', '往期排行榜记录' ] , keepAlive: false } },
			{ path: '/ranking_goods', component: ranking_goods, meta: { title: ['活动管理', '排行榜','商品列表' ] , keepAlive: false } },
			{ path: '/ranking_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '排行榜','添加'], keepAlive: false  } },
			{ path: '/ranking_list', component: ranking_list, meta: { title: ['活动管理', '排行榜设置列表' ], keepAlive: false  } },
			{ path: '/add_ranking', component: add_ranking, meta: { title: ['活动管理', '排行榜设置列表','添加' ] , keepAlive: false } },
			{ path: '/modify_ranking', component: modify_ranking, meta: { title: ['活动管理', '排行榜设置列表','修改' ], keepAlive: false  } },
			{ path: '/ranking_detail', component: ranking_detail, meta: { title: ['活动管理', '排行榜设置列表','详情' ] , keepAlive: false } },


			// 秒杀
			{ path: '/seckill_goodsList', component: seckillGoodsList, meta: { title: ['活动管理', '秒杀', '商品列表'] , keepAlive: false } },
			{ path: '/seckill_activityList', component: seckillActivityList, meta: { title: ['活动管理', '秒杀', '活动列表'] , keepAlive: false } },
			{ path: '/seckill_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '秒杀', '活动列表', '添加'] , keepAlive: false } },
			{ path: '/seckill_addActivity', component: seckillAddActivity, meta: { title: ['活动管理', '秒杀', '活动列表', '活动添加'] , keepAlive: false } },
			{ path: '/seckill_activityDetail', component: seckillActivityDetail, meta: { title: ['活动管理', '秒杀', '活动列表', '详情'] , keepAlive: false } },
			{ path: '/seckill_activityModify', component: seckillActivityModify, meta: { title: ['活动管理', '秒杀', '活动列表', '未开始修改'], keepAlive: false  } },

			//优惠券
			{ path: '/couponType', component: couponType, meta: { title: ['卡券管理', '优惠券', '优惠券类型列表'] , keepAlive: false } },
			{ path: '/couponList', component: couponList, meta: { title: ['卡券管理', '优惠券', '优惠券列表'] , keepAlive: false } },
			{ path: '/addCouponType', component: addCouponType, meta: { title: ['卡券管理', '优惠券', '优惠券类型列表', '添加'], keepAlive: true, isBack: true } },
			{ path: '/couponType_modify', component: couponType_modify, meta: { title: ['卡券管理', '优惠券', '优惠券类型列表', '修改'], keepAlive: true, isBack: true } },
			{ path: '/couponType_detail', component: couponType_detail, meta: { title: ['卡券管理', '优惠券', '优惠券类型列表', '详情'], keepAlive: false } },
			{ path: '/coupon_selectGoods', component: card_selectGoods, meta: { title: ['卡券管理', '优惠券', '优惠券类型列表', '商品列表'], } },
			{ path: '/addCoupon', component: addCoupon, meta: { title: ['卡券管理', '优惠券', '优惠券列表', '添加'], keepAlive: false } },
			{ path: '/coupon_modify', component: coupon_modify, meta: { title: ['卡券管理', '优惠券', '优惠券列表', '修改'], keepAlive: false } },
			{ path: '/coupon_detail', component: coupon_detail, meta: { title: ['卡券管理', '优惠券', '优惠券列表', '详情'], keepAlive: false } },
			{ path: '/selectCouponType', component: selectCouponType, meta: { title: ['卡券管理', '优惠券', '优惠券列表', '选择优惠券类型'], keepAlive: false } },

			//红包
			{ path: '/redPacketsType', component: redPacketsType, meta: { title: ['卡券管理', '红包', '红包类型列表'] , keepAlive: false } },
			{ path: '/redPacketsList', component: redPacketsList, meta: { title: ['卡券管理', '红包', '红包列表'] , keepAlive: false } },
			{ path: '/addRedPacketsType', component: addRedPacketsType, meta: { title: ['卡券管理', '红包', '红包类型列表', '添加'], keepAlive: true, isBack: true } },
			{ path: '/redPacketsType_modify', component: redPacketsType_modify, meta: { title: ['卡券管理', '红包', '红包类型列表', '修改'], keepAlive: true, isBack: true } },
			{ path: '/redPacketsType_detail', component: redPacketsType_detail, meta: { title: ['卡券管理', '红包', '红包类型列表', '详情'], keepAlive: false } },
			{ path: '/addRedPackets', component: addRedPackets, meta: { title: ['卡券管理', '红包', '红包列表', '添加'], keepAlive: false } },
			{ path: '/redPackets_selectGoods', component: card_selectGoods, meta: { title: ['卡券管理', '红包', '红包类型列表', '商品列表'], } },
			{ path: '/redPackets_modify', component: redPackets_modify, meta: { title: ['卡券管理', '红包', '优红包列表', '修改'], keepAlive: false } },
			{ path: '/redPackets_detail', component: redPackets_detail, meta: { title: ['卡券管理', '红包', '红包列表', '详情'], keepAlive: false } },
			{ path: '/selectRedPacType', component: selectRedPacType, meta: { title: ['卡券管理', '红包', '红包列表', '选择红包类型'], keepAlive: false } },

			
			//   积分抽奖
			{path: '/points_goodsList', component: points_goodsList, meta: { title: ['商品管理', '积分抽奖', '商品管理' ], keepAlive: false }},
			{path: '/points_activitys', component: points_activitys, meta: { title: ['商品管理', '积分抽奖', '活动管理' ], keepAlive: false }},
			{ path: '/points_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '积分抽奖' ,'添加'], keepAlive: false  } },

			{path: '/points_addActivitys', component: points_addActivitys, meta: { title: ['商品管理', '积分抽奖', '活动管理', '活动添加' ], keepAlive: false }},
			{path: '/points_activitysDetail', component: points_activitysDetail, meta: { title: ['商品管理', '积分抽奖', '活动管理','活动详情' ], keepAlive: false }},
			{path: '/points_activitysModify', component: points_activitysModify, meta: { title: ['商品管理', '积分抽奖', '活动管理','活动修改' ], keepAlive: false }},
			
			{path: '/select_cardList', component: select_cardList, meta: { title: ['卡券管理',  '优惠券列表' ], keepAlive: false }},

			
			//   佣金管理

			{path: '/commission_list', component: commission_list, meta: { title: ['佣金管理', '佣金列表' ], keepAlive: false }},
			{path: '/commission_detail', component: commission_detail, meta: { title: ['佣金管理', '佣金列表','佣金明细' ], keepAlive: false }},
			{path: '/commission_set', component: commission_set, meta: { title: ['佣金管理', '佣金设置' ], keepAlive: false }},
			{path: '/commission_check', component: commission_check, meta: { title: ['佣金管理', '佣金审核' ], keepAlive: false }},
			{path: '/commission_withdrawal_review', component: withdrawal_review, meta: { title: ['佣金管理', '佣金审核','提取现金审核' ], keepAlive: false }},
			{path: '/commission_refuse_detail', component: refuse_detail, meta: { title: ['佣金管理', '佣金审核','拒绝详请（转入余额）' ], keepAlive: false }},
			{path: '/commission_success_detail', component: success_detail, meta: { title: ['佣金管理', '佣金审核','通过详请（转入余额）' ], keepAlive: false }},
			{path: '/commission_await_detail', component: await_detail, meta: { title: ['佣金管理', '佣金审核','等待详请（转入余额）'], keepAlive: false }},

			// 爆单商品列表
			{ path: '/blastGoods', component: blastGoods, meta: { title: ['活动管理',  '爆单商品列表'], keepAlive: false } },


			// 领券中心
			{path: '/card_list', component: card_list, meta: { title: ['领券中心','卡券列表' ], keepAlive: false }},
			{path: '/add_card', component: add_card, meta: { title: ['领券中心','卡券列表' ,'添加' ], keppAlive: false}},
			{path: '/modify_card', component: modify_card, meta: { title: ['领券中心','卡券列表' ,'修改' ], keepAlive:false}},
			{path: '/card_detail', component: card_detail, meta: { title: ['领券中心','卡券列表' ,'详情' ], keepAlive: false }},
			// {path: '/selectUsers', component: selectUsers, meta: { title: ['领券中心','卡券列表' ,'选择用户' ], keepAlive: false }},


			//  免费抽奖
			{path: '/free_lottery', component: free_lottery, meta: { title: ['活动管理','免费抽奖' ], keepAlive: false }},
			{path: '/free_lottery_del', component: free_lottery_del, meta: { title: ['活动管理','免费抽奖','抽奖列表' ], keepAlive: false }},
			{path: '/free_lottery_set', component: free_lottery_set, meta: { title: ['活动管理','免费抽奖', '抽奖设置' ], keepAlive: false }},

			//   十单免一

			{path: '/tenFreeO', component: tenFreeO, meta: { title: ['活动管理','十单免一','商品列表' ], keepAlive: false }},
			{path: '/tActivity_list', component: tActivity_list, meta: { title: ['活动管理','十单免一','活动列表' ], keepAlive: false }},
			{path: '/tActivity_add', component: tActivity_add, meta: { title: ['活动管理','十单免一','活动列表', '添加' ], keepAlive: false }},
			{path: '/tActivity_detail', component: tActivity_detail, meta: { title: ['活动管理','十单免一','活动列表', '详情' ], keepAlive: false }},
			{path: '/tActivity_modify', component: tActivity_modify, meta: { title: ['活动管理','十单免一','活动列表', '修改' ], keepAlive: false }},
			{path: '/tActivity_select', component: selectGoods1, meta: { title: ['活动管理','十单免一','活动列表', '商品选择' ], keepAlive: false }},
			{path: '/tTeams_list', component: tTeams_list, meta: { title: ['活动管理','十单免一','拼团团队列表',  ], keepAlive: false }},
			{path: '/tTeams_detail', component: tTeams_detail, meta: { title: ['活动管理','十单免一','拼团团队列表', '详情'  ], keepAlive: false }},

			//   商城
			{path: '/mall_goods', component: mall_goods, meta: { title: ['活动管理','商城','商品管理' ], keepAlive: false }},
			{path: '/mall_single', component: mall_single, meta: { title: ['活动管理','商城','拼单购买' ], keepAlive: false }},
			{path: '/mall_bargain', component: mall_bargain, meta: { title: ['活动管理','商城','发起砍价' ], keepAlive: false }},
			{path: '/bar_detail', component: bar_detail, meta: { title: ['活动管理','商城','发起砍价','砍价详情'], keepAlive: false }},
			{path: '/sin_detail', component: sin_detail, meta: { title: ['活动管理','商城','拼单购买','拼单详情'], keepAlive: false }},

			//  新人特惠
					//  商品管理
			{path: '/nComer_favor_goodsManage', component: nComer_favor_goodsManage, meta: { title: ['活动管理','新人特惠','商品管理'], keepAlive: false }},
					//  活动设置
			{path: '/nComer_favor_set', component: nComer_favor_set, meta: { title: ['活动管理','新人特惠','活动设置'], keepAlive: false }},
					//  活动添加
			{path: '/nComer_favor_add', component: nComer_favor_add, meta: { title: ['活动管理','新人特惠','活动设置','活动添加'], keepAlive: false }},
			{path: '/nComer_favor_modify', component: nComer_favor_modify, meta: { title: ['活动管理','新人特惠','活动设置','活动修改'], keepAlive: false }},
			{path: '/nComer_favor_detail', component: nComer_favor_detail, meta: { title: ['活动管理','新人特惠','活动设置','活动详情'], keepAlive: false }},
					//  商品添加
			{ path: '/nComer_favor_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '新人特惠', '活动设置', '活动添加', '商品添加'], keepAlive: false } },
					// 拼团列表查看
			{ path: '/nComer_favor_see', component: nComer_favor_see, meta: { title: ['活动管理', '新人特惠', '拼团查看'], keepAlive: false } },
					// 查看所有拼团团队的详情
			{ path: '/nComer_favor_await_detail', component: nComer_f_await_detail, meta: { title: ['活动管理', '新人特惠', '拼团查看','等待拼团详情'], keepAlive: true,isBack:true } },
			{ path: '/nComer_favor_success_detail', component: nComer_f_suc_detail, meta: { title: ['活动管理', '新人特惠', '拼团查看','拼团成功详情'], keepAlive: false } },
			{ path: '/nComer_favor_over_detail', component: nComer_f_over_detail, meta: { title: ['活动管理', '新人特惠', '拼团查看','拼团超时详情'], keepAlive: false } },
			
			//  新人免费拿
			{path: '/nComer_free_goods', component: nComer_free_goods, meta: { title: ['活动管理','新人免费拿','商品管理'], keepAlive: false }},
			{path: '/nComer_free_set', component: nComer_free_set, meta: { title: ['活动管理','新人免费拿','活动设置列表'], keepAlive: false }},
			{path: '/nComer_free_add', component: nComer_free_add, meta: { title: ['活动管理','新人免费拿','活动设置列表', '添加'], keepAlive: false }},
			{ path: '/nComer_free_selectGoods', component: selectGoods1, meta: { title: ['活动管理', '新人免费拿', '活动设置', '添加', '商品添加'], keepAlive: false } },
			{path: '/nComer_free_modify', component: nComer_free_modify, meta: { title: ['活动管理','新人免费拿','活动设置列表', '修改'], keepAlive: false }},
			{path: '/nComer_free_detail', component: nComer_free_detail, meta: { title: ['活动管理','新人免费拿','活动设置列表', '详情'], keepAlive: false }},



			//  开通会员赠送
			{path: '/o_member_send', component: o_member_send, meta: { title: ['活动管理','开通会员赠送'], keepAlive: false }},
			
		]
	}
]

export default new Router({
	routes,
})