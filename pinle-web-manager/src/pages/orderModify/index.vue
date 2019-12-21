<template>
  <div class="ordermodify-container">
    <breadcrumb style="  width: 100%; "></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">
    <el-container>
      <el-header>订单修改</el-header>
      <el-main>
        <div class="container">
          <el-header>
            <span>订单信息</span>
          </el-header>
          <el-main>
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="订单编号">
                <el-input v-model="form.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="发货时间">
                <el-input v-model="form.sendTime" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户编号">
                <el-input v-model="form.userId" disabled></el-input>
              </el-form-item>
              <el-form-item label="收货时间">
                <el-input v-model="form.pickTime" disabled></el-input>
              </el-form-item>
              <el-form-item label="订单金额">
                <el-input v-model="form.amount" disabled></el-input>
              </el-form-item>
              <el-form-item label="完成时间">
                <el-input v-model="form.finishTime" disabled></el-input>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-select v-model="form.status" placeholder disabled>
                  <el-option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单配送类型">
                <el-select v-model="form.sendType" placeholder>
                  <el-option label="快递配送" value="1"></el-option>
                  <el-option label="无快递配送" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单创建时间">
                <el-input v-model="form.createtime" disabled></el-input>
              </el-form-item>
              <el-form-item label="订单类型">
                <el-select v-model="form.orderType" placeholder disabled>
                  <el-option label="新人免单" value="1"></el-option>
                  <el-option label="普通" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="付款时间">
                <el-input v-model="form.payTime" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
        <div class="container">
          <el-header>
            <span>商品信息</span>
          </el-header>
          <el-main>
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="属性">
                <el-input v-model="goodsMsg" disabled></el-input>
              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model="form.goodsNumber" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮费">
                <el-input v-model="form.shipFee" disabled></el-input>
              </el-form-item>
              <el-form-item label="配送状态">
                <el-select v-model="form.sendStatus" placeholder>
                  <el-option label="备货中" value="1"></el-option>
                  <el-option label="缺货" value="2"></el-option>
                  <el-option label="备货完成" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品" style="height: 150px;width: 600px;">
                <div style="display: flex; width: 100%">
                  <div style="width: 91px;height: 89px;">
                    <img :src="form.goodsPictureUrl" alt style="width: 91px;height: 89px;">
                  </div>
                  <div class="goods_msg" style="margin-left: 15px;color:#666;">
                    <div class="goods_title ellipsis">{{form.goodsName}}</div>
                    <div class="goods_price" style="display: flex; justify-content: space-between;">
                      <span>现价：{{form.goodsPrice}}</span>
                      <span>下单时价格： {{form.amount}}</span>
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
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="微信支付">
                <el-input v-model="form.weChatPay" disabled></el-input>
              </el-form-item>
              <el-form-item label="使用优惠券">
                <el-input v-model="form.favourPay" disabled></el-input>
              </el-form-item>
              <el-form-item label="微信账号">
                <el-input v-model="form.weChat" disabled></el-input>
              </el-form-item>
              <el-form-item label="使用红包">
                <el-input v-model="form.redpacketPay" disabled></el-input>
              </el-form-item>
              <el-form-item label="交易号">
                <el-input v-model="form.weChatTransactionNo" disabled></el-input>
              </el-form-item>
              <el-form-item label="使用购物券">
                <el-input v-model="form.couponPay" disabled></el-input>
              </el-form-item>
              <el-form-item label="支付宝支付">
                <el-input v-model="form.alipayPay" disabled></el-input>
              </el-form-item>
              <el-form-item label="使用余额">
                <el-input v-model="form.balancePay" disabled></el-input>
              </el-form-item>
              <el-form-item label="支付宝账号">
                <el-input v-model="form.alipay" disabled></el-input>
              </el-form-item>
              <el-form-item label="使用积分">
                <el-input v-model="form.points" disabled></el-input>
              </el-form-item>
              <el-form-item label="交易号">
                <el-input v-model="form.alipayTransactionNo" disabled></el-input>
              </el-form-item>
              <el-form-item label="是否使用免邮券">
                <el-input v-model="form.isUseFreePostage" disabled></el-input>
              </el-form-item>
              <!-- <el-form-item label="是否使用免单券">
                <el-input v-model="form.isUseFreePostage" disabled></el-input>
              </el-form-item>-->
            </el-form>
          </el-main>
        </div>
        <div class="container">
          <el-header>
            <span>用户信息</span>
          </el-header>
          <el-main>
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="用户昵称">
                <!-- <el-input v-model="form.userName" disabled></el-input> -->
                <img
                  :src="form.userPictureUrl"
                  alt
                  style="width: 20px;height:20px;border-radius:50%;vertical-align:middle"
                >
                <span>{{form.userName}}</span>
              </el-form-item>
              <el-form-item label="会员手机号">
                <el-input v-model="form.userMobile" disabled></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <!-- <el-input v-model="form.userGender" disabled></el-input> -->
                <el-select v-model="form.userGender" placeholder disabled>
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-input v-model="form.userGrade" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-main>
          <el-header>
            <span>售后服务</span>
          </el-header>
          <el-main>
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="退货人姓名">
                <el-input v-model="form.sellerName" disabled></el-input>
              </el-form-item>
              <el-form-item label="退货人电话">
                <el-input v-model="form.sellerPhone" disabled></el-input>
              </el-form-item>
              <el-form-item label="售后状态">
                <el-select v-model="form.postSaleStatus" placeholder>
                  <el-option
                    v-for="item in options2"
                    :key="item.value2"
                    :label="item.label"
                    :value="item.value2"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="售后类型">
                <el-select v-model="form.postSaleType" placeholder disabled>
                  <el-option
                    v-for="item in options3"
                    :key="item.value3"
                    :label="item.label"
                    :value="item.value3"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="退货地址" style="width: 800px;" class="address">
                <el-select v-model="province1" placeholder="请选择省" @change="handleChange1(2)">
                  <el-option
                    v-for="item in provinces2"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="city1" placeholder="请选择市" @change="handleChange2(2)">
                  <el-option
                    v-for="item in citys2"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="area1" placeholder="请选择区">
                  <el-option
                    v-for="item in areas2"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详细地址" style="width: 500px;">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入详细地址"
                  v-model="form.sellerAddress"
                ></el-input>
              </el-form-item>

              <el-form-item label="用户留言" class="box" style="height: 290px;">
                <div class="box-container">
                  <div class="title">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="form.userMessage"
                      disabled
                    ></el-input>
                  </div>
                  <div class="imgs">
                    <img
                      :src="form.userMessagePicture1"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                      v-if="form.userMessagePicture1"
                    >
                    <img
                      :src="form.userMessagePicture2"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                      v-if="form.userMessagePicture2"
                    >
                    <img
                      :src="form.userMessagePicture3"
                      alt
                      style="width: 88px;height:77px;margin-top: 10px;"
                      v-if="form.userMessagePicture3"
                    >
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="卖家留言" style="margin-top: 0px;">
                <div class="box-container">
                  <div class="title">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="form.sellerMessage"
                    ></el-input>
                  </div>
                  <div class="imgs">
                    <el-upload
                      class="avatar-uploader"
                      :action="''"
                      :on-change="changepic1"
                      :auto-upload="false"
                      :auto-false="false"
                    >
                      <i
                        class="el-tag__close el-icon-close"
                        v-if="form.sellerMessagePicture1"
                        @click.stop="handleRemove(1)"
                      ></i>
                      <img
                        v-if="form.sellerMessagePicture1"
                        :src="form.sellerMessagePicture1"
                        class="avatar"
                      >
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-upload
                      class="avatar-uploader"
                      :action="''"
                      :on-change="changepic2"
                      :auto-upload="false"
                      :auto-false="false"
                    >
                      <i
                        class="el-tag__close el-icon-close"
                        v-if="form.sellerMessagePicture2"
                        @click.stop="handleRemove(2)"
                      ></i>
                      <img
                        v-if="form.sellerMessagePicture2"
                        :src="form.sellerMessagePicture2"
                        class="avatar"
                      >
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-upload
                      class="avatar-uploader"
                      :action="''"
                      :on-change="changepic3"
                      :auto-upload="false"
                      :auto-false="false"
                    >
                      <i
                        class="el-tag__close el-icon-close"
                        v-if="form.sellerMessagePicture3"
                        @click.stop="handleRemove(3)"
                      ></i>
                      <img
                        v-if="form.sellerMessagePicture3"
                        :src="form.sellerMessagePicture3"
                        class="avatar"
                      >
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
        <div class="container" style="margin-top: -400px;">
          <el-header>
            <span>快递信息</span>
          </el-header>
          <el-main>
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="快递公司">
                <el-select v-model="form.courierCode" :disabled="this.form.status != 3 && this.form.status != 4">
                  <el-option
                    v-for="item in courierList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="查看物流">
                <el-button
                  style="width: 90px;height:30px;border:1px solid #5d70e9;color:#5d70e9;padding:0;"
                  @click="dialogVisible= true"
                >默认按钮</el-button>
                <logistics :dialogVisible="dialogVisible" v-on:listenToChildEvent="showMsg"></logistics>
              </el-form-item>
              <el-form-item label="快递编号">
                <el-input v-model="form.logisticNo" :disabled="this.form.status != 3 && this.form.status != 4"></el-input>
              </el-form-item>
            </el-form>
          </el-main>
          <el-header>
            <span>收货人</span>
          </el-header>
          <el-main>
            <el-form ref="form" :model="form" label-width="138px">
              <el-form-item label="收件人">
                <el-input v-model="form.recipientName"></el-input>
              </el-form-item>
              <el-form-item label="买家留言">
                <el-input
                  type="textarea"
                  disabled
                  :rows="3"
                  placeholder
                  v-model="form.orderMessage"
                ></el-input>
              </el-form-item>
              <el-form-item label="收货手机号" style="margin-top: -43px">
                <el-input v-model="form.recipientPhone"></el-input>
              </el-form-item>
              <el-form-item label="收货地址" style="width: 600px;" class="address">
                <el-select v-model="province2" placeholder="请选择省" @change="handleChange1(1)">
                  <el-option
                    v-for="item in provinces1"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="city2" placeholder="请选择市" @change="handleChange2(1)">
                  <el-option
                    v-for="item in citys1"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="area2" placeholder="请选择区">
                  <el-option
                    v-for="item in areas1"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详细地址" style="width: 500px;">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入详细地址"
                  v-model="form.userAddress"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
      </el-main>
      <el-footer>
        <el-button type="primary" @click="upadatedOrder">确定</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import logistics from "../../components/logisticsDetail";
import { get_courier_list } from "../../api/getData";
export default {
  components: { breadcrumb, logistics },
  data() {
    return {
      form: {
        id: "", //订单编号
        sendTime: "", // 发货时间
        userId: "", // 用户编号
        pickTime: "", // 收货时间
        amount: "", // 订单金额
        finishTime: "", // 完成时间
        status: "", // 订单状态
        sendType: "", // 订单配送类型
        createtime: "", // 订单创建时间
        orderType: "", // 点单类型
        payTime: "",
        goodsNumber: "",
        goodsPictureUrl: "",
        shipFee: "", // 邮费
        sendStatus: "", //  配送状态
        weChatPay: "",
        favourPay: "", // 使用 优惠券
        weChat: "", // 微信支付账号
        redpacketPay: "", // 是否使用红包
        weChatTransactionNo: "", // 微信交易号
        couponPay: "", // 使用购物券
        alipayPay: "",
        balancePay: "", // 是否使用余额
        alipay: "", // 支付宝账号
        points: "", // 积分
        alipayTransactionNo: "",
        isUseFreePostage: "", // 是否免邮为空展示
        username: "",
        userMobile: "",
        userGender: "",
        userGrade: "",
        sellerName: "", // 退货人姓名
        sellerPhone: "",
        postSaleStatus: "",
        postSaleType: "",
        goodsPrice: "",
        goodsName: "",
        userMessage: "",
        userMessagePicture1: "",
        userMessagePicture2: "",
        userMessagePicture1: "",
        sellerMessage: "",
        sellerMessagePicture1: "",
        sellerMessagePicture2: "",
        sellerMessagePicture3: "",
        courier: "", // 快递公司
        logisticNo: "", // 快递编号，
        recipientName: "", // 收件人
        recipientPhone: "",
        orderMessage: "", // 买家留言
        sellerAddress: "",
        userAddress: "",
        courierCode: "" // 快递公司编号
      },

      id: this.$route.query.id,
      dialogVisible: false,
      goodsMsg: "", // 商品属性
      provinces1: [],
      citys1: [],
      areas1: [],
      provinces2: [],
      citys2: [],
      areas2: [],
      province1: "",
      province2: "",
      city1: "",
      city2: "",
      area1: "",
      area2: "",
      // 用于记录卖家原图片地址
      sellerMessageOldPicture1: "",
      sellerMessageOldPicture2: "",
      sellerMessageOldPicture3: "",
      //订单状态
      options1: [
        { value1: "1", label: "待付款" },
        { value1: "2", label: "未填地址" },
        { value1: "3", label: "待发货" },
        { value1: "4", label: "待收货" },
        { value1: "5", label: "待评价" },
        { value1: "6", label: "已完成" },
        { value1: "7", label: "待分享" },
        { value1: "8", label: "待领取" }
      ],
      options2: [
        { value2: "0", label: "未售后" },
        { value2: "1", label: "申请维修" },
        { value2: "2", label: "申请换货" },
        { value2: "3", label: "申请退货" },
        { value2: "4", label: "维修中" },
        { value2: "5", label: "换货中" },
        { value2: "6", label: "退货中" },
        { value2: "7", label: "完成维修" },
        { value2: "8", label: "完成换货" },
        { value2: "9", label: "完成退货" }
      ],
      options3: [
        { value3: "1", label: "维修" },
        { value3: "2", label: "换货" },
        { value3: "3", label: "退款" }
      ],
      file1: "",
      file2: "",
      file3: "",
      isFlag: true,
      courierList: [] //  快递公司集合
    };
  },
  created() {
    // 查询快递公司
    this.get_courierList();
    this.get_orderDetail();
    this.handleChange();
  },
  methods: {
    showMsg(data) {
      this.dialogVisible = data;
    },
    get_orderDetail() {
      this.$axios.post("/web_order/get", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.form = data;
          this.form.amount = this.form.amount + "元";
          this.form.weChatPay = this.form.weChatPay + "元";
          this.form.alipayPay = this.form.alipayPay + "元";
          this.form.points = this.form.points + "积分";
          this.form.balancePay = this.form.balancePay + "元";
          this.form.favourPay = this.form.favourPay + "元";
          this.form.redpacketPay = this.form.redpacketPay + "元";
          this.form.couponPay = this.form.couponPay + "元";
          this.form.shipFee = this.form.shipFee + '元'
          this.form.courierCode = data.courierCode || this.courierList[0].code;
          this.province1 = data.sellerAddressProvince;
          this.province2 = data.userAddressProvince;
          this.city1 = data.sellerAddressRegion;
          this.city2 = data.userAddressRegion;
          this.area1 = data.sellerAddressTown;
          this.area2 = data.userAddressTown;
          if (data.freePostage == 1) {
            this.form.isUseFreePostage = "使用";
          } else {
            this.form.isUseFreePostage = "不使用";
          }
          this.sellerMessageOldPicture1 = data.sellerMessagePicture1;
          this.sellerMessageOldPicture2 = data.sellerMessagePicture2;
          this.sellerMessageOldPicture3 = data.sellerMessagePicture3;
          if (data.goodsDetail != null)
            data.goodsDetail.forEach(item => {
              this.goodsMsg = this.goodsMsg + item.key + ":" + item.value + "";
            });
          this.get_city_area(1);
          this.get_city_area(2);
        }
      });
    },
    upadatedOrder() {
      let formData = new FormData();
      this.courierList.forEach(item => {
        if (item.code == this.form.courierCode) {
          this.form.courier = item.name;
        }
      });
      if (!this.form.logisticNo) {
        return this.$message({
          type: "warning",
          message: "快递编号不能为空"
        });
      }
      if (this.form.status != 2) {
        if (!this.form.recipientName) {
          return this.$message({
            type: "warning",
            message: "收件人姓名不能为空"
          });
        }
        if (!this.form.recipientPhone) {
          return this.$message({
            type: "warning",
            message: "收货手机号不能为空"
          });
        }
        if (!this.province2 || !this.city2 || !this.form.userAddress) {
          return this.$message({
            type: "warning",
            message: "收货地址不能为空"
          });
        }
      }

      formData.append("id", this.id);
      formData.append("status", this.form.status);
      formData.append("postSaleStatus", this.form.postSaleStatus);
      formData.append("recipientName", this.form.recipientName);
      formData.append("recipientPhone", this.form.recipientPhone);
      formData.append("sellerName", this.form.sellerName);
      formData.append("sellerPhone", this.form.sellerPhone);
      formData.append("userAddressProvince", this.province2);
      formData.append("userAddressRegion", this.city2);
      formData.append("userAddressTown", this.area2);
      formData.append("userAddress", this.form.userAddress);
      formData.append("sendStatus", this.form.sendStatus);
      formData.append("sendType", this.form.sendType);
      formData.append("sellerMessage", this.form.sellerMessage);
      formData.append("courierCode", this.form.courierCode);
      formData.append("courier", this.form.courier);
      formData.append("logisticNo", this.form.logisticNo);
      formData.append("sellerMessagePicture1", this.sellerMessageOldPicture1);
      formData.append("sellerMessagePicture2", this.sellerMessageOldPicture2);
      formData.append("sellerMessagePicture3", this.sellerMessageOldPicture3);
      formData.append("sellerAddressProvince", this.province1);
      formData.append("sellerAddressRegion", this.city1);
      formData.append("sellerAddressTown", this.area1);
      formData.append("sellerAddress", this.form.sellerAddress);
      formData.append("files", this.file1);
      formData.append("files", this.file2);
      formData.append("files", this.file3);

      this.$axios.post("/web_order/modify", formData).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$router.push("/ordermanage");
            return this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "修改失败"
            });
          }
        }
      });
    },
    changepic1(file) {
      this.file1 = file.raw;

      this.get_imgFile(1);
    },
    changepic2(file) {
      this.file2 = file.raw;

      this.get_imgFile(2);
    },
    changepic3(file) {
      this.file3 = file.raw;

      this.get_imgFile(3);
    },
    get_imgFile(type) {
      // type : 用于判断是第几张图片
      if (this.isFlag == true) {
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = e => {
          if (type == 1) {
            this.form.sellerMessagePicture1 = e.target.result; //将图片路径赋值给src
          } else if (type == 2) {
            this.form.sellerMessagePicture2 = e.target.result; //将图片路径赋值给src
          } else {
            this.form.sellerMessagePicture3 = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    handleRemove(type) {
      //  type 用于判断是第几张图片
      if (type == 1) {
        (this.form.sellerMessagePicture1 = ""),
          (this.sellerMessageOldPicture1 = "");
        this.file1 = "";
      } else if (type == 2) {
        this.form.sellerMessagePicture2 = "";
        this.sellerMessageOldPicture2 = "";
        this.file2 = "";
      } else {
        this.form.sellerMessagePicture3 = "";
        this.sellerMessageOldPicture3 = "";
        this.file3 = "";
      }
    },
    handleChange(father = -1, level = 1) {
      this.$axios
        .post("web_dict_address/get", "father=" + father + "&level=" + level)
        .then(result => {
          if (result.data.status == 0) {
            result.data.data.forEach(item => {
              this.provinces1.push({
                label: item.name,
                id: item.id
              });
              this.provinces2.push({
                label: item.name,
                id: item.id
              });
            });
          }
        });
    },
    get_city_area(type) {
      let id = "";
      let city = "";
      if (type == 1) {
        let province = this.province1;
        city = this.city1;
        this.provinces1.forEach(item => {
          if (item.label == province) {
            id = item.id;
          }
        });
      } else {
        let province = this.province2;
        city = this.city2;

        this.provinces2.forEach(item => {
          if (item.label == province) {
            id = item.id;
          }
        });
      }

      this.$axios
        .post("web_dict_address/get", "father=" + id + "&level=" + 2)
        .then(result => {
          if (result.data.status == 0) {
            result.data.data.forEach(item1 => {
              if (type == 2) {
                this.citys1.push({ label: item1.name, id: item1.id });
              } else {
                this.citys2.push({ label: item1.name, id: item1.id });
              }
              if (item1.name == city) {
                let id = item1.id;
                this.$axios
                  .post("web_dict_address/get", "father=" + id + "&level=" + 3)
                  .then(result => {
                    if (result.data.status == 0) {
                      result.data.data.forEach(item2 => {
                        if (type == 2) {
                          this.areas1.push({
                            label: item2.name,
                            id: item2.id
                          });
                        } else {
                          this.areas2.push({
                            label: item2.name,
                            id: item2.id
                          });
                        }
                      });
                    }
                  });
              }
            });
          }
        });
    },
    handleChange1(type) {
      // type 用来判断是收货信息中的地址， 还是售后中的地址'
      let id = "";
      if (type == 1) {
        this.city2 = "";
        this.area2 = "";
        this.citys1 = [];
        this.areas1 = [];

        this.provinces1.forEach(item => {
          if (item.label == this.province2) {
            id = item.id;
          }
        });
      } else {
        this.city1 = "";
        this.area1 = "";
        this.citys2 = [];
        this.areas2 = [];
        this.provinces2.forEach(item => {
          if (item.label == this.province1) {
            id = item.id;
          }
        });
      }

      this.$axios
        .post("web_dict_address/get", "father=" + id + "&level=" + 2)
        .then(result => {
          if (result.data.status == 0) {
            result.data.data.forEach(item => {
              if (type == 1) {
                this.citys1.push({ label: item.name, id: item.id });
              } else {
                this.citys2.push({ label: item.name, id: item.id });
              }
            });
          }
        });
    },
    handleChange2(type) {
      let id = "";
      if (type == 1) {
        this.areas1 = [];
        this.area2 = "";
        this.citys1.forEach(item => {
          if (item.label == this.city2) {
            id = item.id;
          }
        });
      } else {
        this.areas2 = [];
        this.area1 = "";
        this.citys2.forEach(item => {
          if (item.label == this.city1) {
            id = item.id;
          }
        });
      }
      this.$axios
        .post("web_dict_address/get", "father=" + id + "&level=" + 3)
        .then(result => {
          if (result.data.status == 0) {
            result.data.data.forEach(item => {
              if (type == 1) {
                this.areas1.push({ label: item.name, id: item.id });
              } else {
                this.areas2.push({ label: item.name, id: item.id });
              }
            });
          }
        });
    },
    get_courierList() {
      get_courier_list().then(result => {
        if (result.data.status == 0) {
          this.courierList = result.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less">
.ordermodify-container {
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
          padding: 10px 0 10px 0;
          .el-form {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 8px;
            .el-form-item {
              width: 330px;
              margin-bottom: 10px;
              .el-form-item__label {
                line-height: 28px;
                text-align: left;
              }
              .el-form-item__content {
                line-height: 28px;
                .el-input {
                  .el-input__inner {
                    height: 28px;
                    line-height: 28px;
                  }
                }
              }
              //   下拉框图标
              .el-input__icon {
                line-height: 30px;
              }
              //   商品信息
              .goods {
                width: 190px;
                height: 150px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
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

              &:last-of-type {
                margin-bottom: 0;
              }
            }
            // 省市区三级联动
            .address {
              color: #666;
              width: 450px;
              .el-form-item__content {
                margin-left: 0 !important;
              }
              .el-select {
                width: 125px;
                .el-input.el-input--suffix {
                  width: 125px;
                  .el-input__inner {
                    width: 125px;
                  }
                }
              }
            }
            // 买家留言
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
          }
        }
      }
    }
    .el-footer {
      height: 80px !important;
      // display: flex;
      // align-items: center;
      line-height: 80px;
      text-align: center;
      > button {
        height: 30px !important;
        line-height: 30px;
        padding: 0;
        width: 60px;
        margin: 0 20px;
        // box-sizing: content-box;
      }
    }
  }

  // 图片上传的样式
  .avatar-uploader {
    width: 88px;
    margin-top: 10px;
    display: inline-block;
    margin-right: 5px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right: 20px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 77px;
    line-height: 77px;
    text-align: center;
  }
  .avatar {
    width: 88px;
    height: 77px;
    display: block;
  }
  .avatar-uploader img {
    width: 88px;
    height: 77px;
  }
  i.el-tag__close {
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    z-index: 999;
  }
  .el-upload-list__item-name {
    display: none;
  }
}
</style>

