<template>
  <div class="orderDetail-container">
    <breadcrumb style="  width: 100%; "></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">
    <el-container>
      <el-header>订单详情</el-header>
      <el-main>
        <div class="container">
          <el-header>
            <span>订单信息</span>
          </el-header>
          <el-main>
            <el-form label-width="138px">
              <el-form-item label="订单编号">
                <span>{{id}}</span>
              </el-form-item>
              <el-form-item label="发货时间">
                <span>{{ordermsg.sendTime}}</span>
              </el-form-item>
              <el-form-item label="用户编号">
                <span>{{ordermsg.userId}}</span>
              </el-form-item>
              <el-form-item label="收货时间">
                <span>{{ordermsg.pickTime}}</span>
              </el-form-item>
              <el-form-item label="订单金额">
                <span>{{ordermsg.amount + '元'}}</span>
              </el-form-item>
              <el-form-item label="完成时间">
                <span>{{ordermsg.finishTime}}</span>
              </el-form-item>
              <el-form-item label="订单状态">
                <span>{{status}}</span>
              </el-form-item>
              <el-form-item label="订单配送类型">
                <span>{{sendType}}</span>
              </el-form-item>
              <el-form-item label="订单创建时间">
                <span>{{ordermsg.createtime}}</span>
              </el-form-item>
              <el-form-item label="订单类型">
                <span>{{orderType}}</span>
              </el-form-item>
              <el-form-item label="付款时间">
                <span>{{ordermsg.payTime}}</span>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
        <div class="container">
          <el-header>
            <span>商品信息</span>
          </el-header>
          <el-main>
            <el-form label-width="138px">
              <el-form-item label="属性">
                <span ellipsis>{{goodsDetail}}</span>
              </el-form-item>
              <el-form-item label="邮费">
                <span>{{ordermsg.shipFee + '元'}}</span>
              </el-form-item>
              <el-form-item label="数量">
                <span>{{ordermsg.goodsNumber}}</span>
              </el-form-item>
              <el-form-item label="配送状态">
                <span>{{sendStatus}}</span>
              </el-form-item>
              <el-form-item label="商品" style="height: 150px;width: 600px;">
                <div style="display: flex; width: 100%">
                  <div style="width: 91px;height: 89px;">
                    <img :src="ordermsg.goodsPictureUrl" alt style="width: 91px;height: 89px;">
                  </div>
                  <div class="goods_msg" style="margin-left: 15px;color:#666;">
                    <div class="goods_title">{{ordermsg.goodsName}}</div>
                    <div class="goods_price">
                      <span>现价：{{ordermsg.goodsPrice}}</span>
                      <span>下单时价格： {{ordermsg.amount}}</span>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
        <div class="container">
          <el-header>
            <span>支付方式</span>
          </el-header>
          <el-main>
            <el-form label-width="138px">
              <el-form-item label="微信支付">
                <span>{{ordermsg.weChatPay}}元</span>
              </el-form-item>
              <el-form-item label="使用优惠券">
                <span>{{ordermsg.couponPay || '0'}}元</span>
              </el-form-item>
              <el-form-item label="支付账号">
                <span>{{ordermsg.weChat}}</span>
              </el-form-item>
              <el-form-item label="使用红包">
                <span>{{ordermsg.redpacketPay || '0'}}元</span>
              </el-form-item>
              <el-form-item label="交易号">
                <span>{{ordermsg.weChatTransactionNo}}</span>
              </el-form-item>
              <el-form-item label="使用购物券">
                <span>{{ordermsg.favourPay || '0'}}元</span>
              </el-form-item>
              <el-form-item label="支付宝支付">
                <span>{{ordermsg.alipayPay || '0'}}元</span>
              </el-form-item>
              <el-form-item label="使用余额">
                <span>{{ordermsg.balancePay || '0'}}元</span>
              </el-form-item>
              <el-form-item label="支付账号">
                <span>{{ordermsg.alipay}}</span>
              </el-form-item>
              <el-form-item label="使用积分">
                <span>{{ordermsg.points || '0'}}积分</span>
              </el-form-item>
              <el-form-item label="交易号">
                <span>{{ordermsg.alipayTransactionNo}}</span>
              </el-form-item>
              <el-form-item label="是否使用免邮券">
                <span>是</span>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
        <div class="container">
          <el-header>
            <span>用户信息</span>
          </el-header>
          <el-main>
            <el-form label-width="138px">
              <el-form-item label="用户昵称">
                <img
                  :src="ordermsg.userPictureUrl"
                  alt
                  style="width: 30px;height: 30px;border-radius: 50%"
                >&nbsp;
                <span>{{ordermsg.userName}}</span>
              </el-form-item>
              <el-form-item label="会员手机号">
                <span style="display: inline;width:50%">{{tel1}}</span>
                <a href="javascript:volid(0);" @click="showTel" operationTel>{{operationTel}}</a>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{sex}}</span>
              </el-form-item>
              <el-form-item label="会员等级">
                <span>{{ordermsg.userGrade}}</span>
              </el-form-item>
            </el-form>
          </el-main>
          <el-header>
            <span>售后服务</span>
          </el-header>
          <el-main>
            <el-form label-width="138px">
              <el-form-item label="退货收件人">
                <span>{{ordermsg.sellerName}}</span>
              </el-form-item>
              <el-form-item label="售后状态">
                <span>{{postSaleStatus}}</span>
              </el-form-item>
              <el-form-item label="退货地址" style="width: 100%;">
                <span>{{ordermsg.sellerAddressProvince + ordermsg.sellerAddressRegion + ordermsg.sellerAddressTown + ordermsg.sellerAddress || ''}}</span>
              </el-form-item>
              <el-form-item label="退货人电话" style="width: 100%;">
                <span>{{ordermsg.sellerPhone}}</span>
              </el-form-item>
              <el-form-item label="售后类型">
                <span>{{postSaleType}}</span>
              </el-form-item>

              <el-form-item label="用户留言" class="box">
                <div class="box-container">
                  <div class="title">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="ordermsg.userMessage"
                      disabled
                    ></el-input>
                  </div>
                  <div class="imgs">
                    <img
                      :src="ordermsg.userMessagePicture1"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                    >
                    <img
                      :src="ordermsg.userMessagePicture2"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                    >
                    <img
                      :src="ordermsg.userMessagePicture3"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                    >
                  </div>
                </div>
                <!-- </el-form-item>
                            <el-form-item label="售后类型" style="margin-top: -220px;">
                <span>维修</span>-->
              </el-form-item>
              <el-form-item label="卖家留言" class="box" style="margin-top:-220px;">
                <div class="box-container">
                  <div class="title">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="ordermsg.sellerMessage"
                      disabled
                    ></el-input>
                  </div>
                  <div class="imgs" style="width: 280px;">
                    <img
                      :src="ordermsg.sellerMessagePicture1"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                    >
                    <img
                      :src="ordermsg.sellerMessagePicture2"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                    >
                    <img
                      :src="ordermsg.sellerMessagePicture3"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                    >
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
        <div class="container" style="margin-top: -250px;">
          <el-header>
            <span>快递信息</span>
          </el-header>
          <el-main>
            <el-form label-width="138px">
              <el-form-item label="快递公司">
                <span>{{ordermsg.courier}}</span>
              </el-form-item>
              <el-form-item label="查看物流">
                <el-button
                  style="width: 90px;height:30px;border:1px solid #5d70e9;color:#5d70e9;padding:0;"
                  @click="dialog = true"
                >点击查看</el-button>
                <logistics :dialogVisible="dialog" v-on:listenToChildEvent="showMsg"></logistics>
              </el-form-item>
              <el-form-item label="快递编号">
                <span>{{ordermsg.logisticNo}}</span>
              </el-form-item>
            </el-form>
          </el-main>
          <el-header style="margin-top: 5px;">
            <span>收货人</span>
          </el-header>
          <el-main style="height: 200px;">
            <el-form label-width="138px">
              <el-form-item label="收件人">
                <span>{{ordermsg.recipientName}}</span>
              </el-form-item>

              <el-form-item label="收货手机号">
                <span>{{ordermsg.recipientPhone}}</span>
              </el-form-item>
              <el-form-item label="收货地址" style>
                <!-- <span>{{ordermsg.userAddressProvince + ordermsg.userAddressRegion + ordermsg.userAddressTown + ordermsg.userAddress}}</span> -->
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="sellerAddress"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="买家留言">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="ordermsg.orderMessage"
                  disabled
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import logistics from "../../components/logisticsDetail";

export default {
  components: { breadcrumb, logistics },
  data() {
    return {
      id: this.$route.query.id,
      textarea1:
        "  设置很多商品都可以免费抽奖，限制时间结束。本活动拼团并非下单即可以0元获得物品，需要达到抽奖条件并且被抽中的用户方可获得产品。1.点击分享增加中奖机会，弹出对话框分享至微信/朋友圈/QQ/QQ空间，成功邀请N名用户来参团即可给N个抽奖码。如果被邀请用户未注册，需要注册，当用户注册完成同时被参团成功。2. 开奖时间：管理员设置开奖时间，系统将自动从拼团成功的用户中，随机抽取中奖用户， 本次活动100%中奖。中奖名额数量可由",
      // textarea2:"",
      // textarea3: "",
      dialog: false,
      operationTel: "点击展开",
      ordermsg: {
        userId: "",
        amount: "",
        goodsPrice: "",
        createtime: "",
        payTime: "",
        weChatPay: "",
        weChat: "",
        weChatTransactionNo: "",
        alipayPay: "",
        alipay: "",
        alipayTransactionNo: "",
        courier: "",
        logisticNo: "",
        recipientName: "",
        recipientPhone: "",
        sellerName: "",
        sellerPhone: "",
        goodsNumber: "",
        shipFee: "",
        goodsName: "",
        goodsPictureUrl: "",
        userPictureUrl: "",
        userName: "",
        userMobile: "",
        userMessage: "",
        userMessagePicture1: "",
        userMessagePicture2: "",
        userMessagePicture3: "",
        postSaleStatus: "",
        sellerMessage: "",
        sellerMessagePicture1: "",
        sellerMessagePicture2: "",
        sellerMessagePicture3: "",
        sendTime: "",
        pickTime: "",
        finishTime: "",
        favourPay: "",
        redpacketPay: "",
        couponPay: "",
        balancePay: "",
        points: "",
        orderMessage: "",
        userAddressProvince: "",
        userAddressRegion: "",
        userAddressTown: "",
        userAddress: "",
        sellerAddressProvince: "",
        sellerAddressRegion: "",
        sellerAddressTown: "",
        sellerAddress: ""
      },
      status: "",
      sendType: "",
      orderType: "",
      goodsDetail: "",
      sendStatus: "",
      postSaleStatus: "",
      sellerAddress: "",
      postSaleType: "",
      postSale: "",
      sex: "",
      tel: "",
      tel1: ""
    };
  },
  created() {
    this.get_orderDetail();
  },
  methods: {
    showMsg(data) {
      this.dialog = data;
    },
    hideTel() {
      this.tel1 =
        this.ordermsg.userMobile.slice(0, 3) +
        "*****" +
        this.ordermsg.userMobile.slice(8, 11);
      this.operationTel = "点击展开";
    },
    showTel() {
      if (this.operationTel == "点击展开") {
        this.tel1 = this.ordermsg.userMobile;
        this.operationTel = "点击隐藏";
      } else {
        this.hideTel();
      }
    },
    get_orderDetail() {
      this.$axios.post("web_order/get", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          if (!data.userAddressTown) {
            data.userAddressTown = "";
          }
          this.ordermsg = data;
          this.tel1 =
            data.userMobile.slice(0, 3) +
            "*****" +
            data.userMobile.slice(8, 11);
          this.sellerAddress =
            data.userAddressProvince +
            data.userAddressRegion +
            data.userAddressTown +
            data.userAddress;

          //           { value2: "", label: "全部" },
          // { value2: "1", label: "代付款" },
          // { value2: "2", label: "未填地址" },
          // { value2: "3", label: "代发货" },
          // { value2: "4", label: "待收货" },
          // { value2: "5", label: "待评价" },
          // { value2: "6", label: "已完成" },
          // { value2: "7", label: "待分享" },
          // { value2: "8", label: "待领取" },
          // { value2: "9", label: "拼单未获得" },
          // { value2: "10", label: "拼单未成功，已退款" },
          if (data.status == 1) {
            this.status = "代付款";
          } else if (data.status == 2) {
            this.status = "未填地址";
          } else if (data.status == 3) {
            this.status = "待发货";
          } else if (data.status == 4) {
            this.status = "待收货";
          } else if (data.status == 5) {
            this.status = "待评价";
          } else if (data.status == 6) {
            this.status = "已完成";
          } else if (data.status == 7) {
            this.status = "待分享";
          } else if (data.status == 8) {
            this.status = "待领取";
          }
          if (data.sendType == 1) {
            this.sendType = "快递配送";
          } else {
            this.sendType = "无快递配送";
          }
          if (data.orderType == 1) {
            this.orderType = "新人免单";
          } else {
            this.orderType = "普通";
          }
          if (data.goodsDetail != null) {
            data.goodsDetail.forEach(item => {
              this.goodsDetail =
                this.goodsDetail + item.key + ":" + item.value + " ";
            });
          }
          if (data.userGender == 1) {
            this.sex = "男";
          } else {
            this.sex = "女";
          }
          if (data.sendStatus == 1) {
            this.sendStatus = "备货中";
          } else if (data.sendStatus == 2) {
            this.sendStatus = "缺货";
          } else {
            this.sendStatus = "备货完成";
          }
          if (data.postSale == 0) {
            this.postSale = "未售后";
          } else {
            this.postSale = "申请售后";
          }
          if (data.postSaleStatus == 0) {
            this.postSaleStatus = "未售后";
          } else if (data.postSaleStatus == 1) {
            this.postSaleStatus = "申请维修";
          } else if (data.postSaleStatus == 2) {
            this.postSaleStatus = "申请换货";
          } else if (data.postSaleStatus == 3) {
            this.postSaleStatus = "申请退货";
          } else if (data.postSaleStatus == 4) {
            this.postSaleStatus = "维修中";
          } else if (data.postSaleStatus == 6) {
            this.postSaleStatus = "换货中";
          } else if (data.postSaleStatus == 7) {
            this.postSaleStatus = "完成维修";
          } else if (data.postSaleStatus == 8) {
            this.postSaleStatus = "完成换货";
          } else {
            this.postSaleStatus = "完成退货";
          }
          if (data.postSaleType == 1) {
            this.postSaleType = "维修";
          } else if (data.postSaleType == 2) {
            this.postSaleType = "换货";
          } else if (data.postSaleType == 3) {
            this.postSaleType = "退货";
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.orderDetail-container {
  height: 100%;
  position: relative;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  > .el-container {
    padding: 0;
    > .el-header {
      width: 100%;
      text-align: center;
      line-height: 50px;
      color: #5d70e9;
      font-weight: 600;
      height: 50px !important;
    }
    > .el-main {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 30px;
      .container {
        width: 765px;
        > .el-header {
          width: 740px;
          padding: 0;
          line-height: 30px;
          height: 30px !important;
          border-bottom: 1px solid #ccc;
          span {
            display: inline-block;
            height: 27px;
            border-bottom: 3px solid #6272e5;
            color: #6374e6;
          }
        }
        > .el-main {
          padding: 0;
          //   padding: 20px;
          // padding: 10px 0 0 0;
          .el-form {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 8px;
            .el-form-item {
              width: 330px;
              margin-bottom: 10px;
              .el-form-item__label {
                text-align: left;
                color: #333;
                line-height: 28px;
              }
              .el-form-item__content {
                line-height: 28px;
                height: 28px;
                display: flex;
              }
              span {
                width: 100%;
                color: #666;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              //   商品信息
            }
            .box {
              height: 250px;
              .box-container {
                width: 190px;
                height: 140px;
                .imgs {
                  img {
                    vertical-align: top;
                  }
                }
              }
            }
            .goods_msg {
              width: 100%;
              display: flex;
              height: 90px;
              justify-content: space-between;
              flex-direction: column;
              .goods_price {
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
    }
  }
}
</style>

