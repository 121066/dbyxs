
<template>
  <div class="card_detail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />
    <div class="content">
      <el-main>
        <el-collapse v-model="formData.activeName">
          <el-collapse-item title="发放类型" name="1">
            <div label-width="90px" style="display:flex;">
              <div style="margin-right: 100px;">
                <span style="font-weight:bold;font-size: 14px;">卡券名称 :</span>
                <span style="color:#333">{{formData.name}}</span>
              </div>
              <div>
                <span style="font-weight:bold;font-size:14px;">发放类型 :</span>
                <span style="color:#333">{{formData.sendType}}</span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="状态" name="2">
            <el-form label-width="90px" ref="form" style="display:flex;height:30px;">
              <el-form-item label="卡券状态">
                <el-switch v-model="formData.cardStatus" disabled></el-switch>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="发放用户类型" name="3">
            <el-radio-group v-model="formData.radio">
              <el-radio :label="1" disabled>所用用户</el-radio>
              <el-radio :label="2" disabled>vip用户</el-radio>
              <el-radio :label="3" disabled>指定用户</el-radio>
            </el-radio-group>
            <div v-if="formData.radio == 3" class="assign_user">
              <ul>
                <li v-for="item in formData.users" :key="item.id">
                  <img
                    :src="item.picture"
                    alt
                    style="width: 30px;height: 30px;border-radius: 15px;margin-right: 5px;margin-bottom: 10px;"
                  />
                  {{item.username}}
                </li>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item title="活动图片设置" name="4">
            <img :src="formData.picture" alt style="width:130px;height: 130px;" />
          </el-collapse-item>
          <el-collapse-item title="选择卡券类型" name="5">
            <div class="form">
              <div class="form-item">
                <span style="margin-right: 20px;">选择卡券类型</span>
                <el-select v-model="formData.cardType" style="width: 100px;font-size: 12px;">
                  <el-option
                    v-for="item in formData.cardTypeList"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                    disabled
                  ></el-option>
                </el-select>
                <span v-if="formData.cardType == 1 || formData.cardType == 2">{{formData.cardName}}</span>
              </div>
              <div class="form-item" v-if="formData.cardType == 3">
                <span>购物券价值:</span>
                <span>{{formData.virtualValue}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="img" v-if="formData.cardType == 3">
              <img src="../../img/card.png" alt />
              <p
                style="position:absolute;top:18px;color:#fff;font-size: 20px;width:100%;text-align:center;"
                v-if="formData.virtualValue"
              >{{formData.virtualValue + '元'}}</p>
              <p
                style="position:absolute;top:50px;color:#fff;font-size: 20px;width:100%;text-align:center;"
              >购物券</p>
            </div>
            <div class="img" v-if="formData.cardType == 4">
              <img src="../../img/free_1.png" alt />
            </div>
            <div class="img" v-if="formData.cardType == 5">
              <img src="../../img/free_1.png" alt />
            </div>
            <div class="img" v-if="formData.cardType == 2">
              <p
                style="position:absolute;top:24px;color:#ffd8b4;text-align:center;width:100%;font-size: 20px;"
                v-if="formData.virtualValue"
              >{{formData.virtualValue + '￥'}}</p>
              <p
                style="position:absolute;top:18px;color:#fff;left:-18px; margin-top: 65px;text-align:center;width:130%;transform:scale(0.8)"
              >{{formData.virtualType }}</p>
              <p
                style=" position:absolute;top:18px;left:-18px;color:#fff; margin-top:80px;;text-align:center;width:130%;transform:scale(0.8)"
              >{{formData.time}}</p>
              <img src="../../img/red_packet.png" alt />
            </div>
            <div class="img" v-if="formData.cardType == 1">
              <p
                style="position:absolute;top:24px;color:#ffd8b4;text-align:center;width:100%;font-size: 20px;"
                v-if="formData.virtualValue"
              >{{formData.virtualValue + '￥'}}</p>
              <p
                style="position:absolute;top:18px;color:#fff;left:-18px; margin-top: 40px;text-align:center;width:130%;transform:scale(0.8)"
              >{{formData.virtualType }}</p>
              <p
                style=" position:absolute;top:18px;left:-18px;color:#fff; margin-top:65px;;text-align:center;width:130%;transform:scale(0.8)"
              >{{formData.time}}</p>
              <img src="../../img/coupon.png" alt />
            </div>
          </el-collapse-item>
          <el-collapse-item title="领取时间" name="6">
            <div class="block">
              <span>开始时间</span>
              <el-date-picker
                v-model="formData.startTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 200px;"
                disabled
              ></el-date-picker>
            </div>

            <div class="block">
              <span>结束时间</span>
              <el-date-picker
                v-model="formData.endTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="23:59:59"
                style="width: 200px;"
                disabled
              ></el-date-picker>
            </div>
          </el-collapse-item>
          <el-collapse-item title="领取的频度和频率(值为整数)" name="7">
            <el-form>
              <el-form-item>
                <span>每次领取的时间间隔:</span>
                <span style="margin: 0 10px;">{{ formData.intervals}}</span>
                <span>天</span>
              </el-form-item>
              <el-form-item>
                <span>时间间隔内可以领取券的上限:</span>
                <span style="margin: 0 10px;">{{formData.times}}</span>
                <span>次</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="发放数量" name="8">
            <el-radio-group v-model="formData.sendNum">
              <el-radio :label="0" v-if="formData.sendNum == 0">无数量限制</el-radio>
              <el-radio :label="1" v-if="formData.sendNum == 1">有数量限制</el-radio>
            </el-radio-group>
            <div
              style="display:flex;margin-top:20px;padding-left:20px;box-sizing:border-box;"
              v-if="formData.sendNum == 1"
            >
              <span>发放总数量:</span>
              <span>{{formData.cardNum}}</span>
              <span>张</span>
            </div>
          </el-collapse-item>
          <el-collapse-item title="创建时间" name="9">
            <div class="block">
              <span style="margin-right: 23px;">创建时间</span>
              <el-date-picker
                v-model="formData.createTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 200px;"
                disabled
              ></el-date-picker>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import {
  card_detail,
  coupon_type_detail,
  red_packet_type_detail,
  red_packet_detail,
  coupon_detail
} from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      sendTypeList: [
        { key: "1", label: "管理员发放" },
        { key: "2", label: "系统发放" }
      ],
      formData: {
        activeName: ["1", "2", "3"],
        radio: 1,
        sendType: "",
        users: [],
        dialogVisible: false,
        cardType: "",
        cardTypeList: [
          { key: "3", label: "购物券" },
          { key: "4", label: "免邮券" },
          { key: "5", label: "免单券" },
          { key: "2", label: "红包" },
          { key: "1", label: "优惠券" }
        ],
        goodsKind: "", //  用于标记卡券的类型
        startTime: "",
        endTime: "",
        createTime: "",
        cardStatus: "",
        sendNum: "",
        cardName: "",
        name: "",
        cardNum: 0,
        id: this.$route.query.id,
        picture: "",
        intervals: "", // 领取红包的间隔时间，
        times: "", // 在间隔期间可以领取多少 次
        virtualValue: "100", //虚拟商品的价值
        virtualType: "", // 虚拟商品的类型
        time: "" // 虚拟商品是否过期
      },
      types: [
        { id: 1, value: "全场通用" },
        { id: 2, value: "全场通用" },
        { id: 3, value: "全场通用" },
        { id: 4, value: "部分活动商品类型通用" },
        { id: 5, value: "部分商品可用" }
      ],
      type: ""
    };
  },
  created() {
    this.get_cardDetail();
  },
  methods: {
    get_cardDetail() {
      card_detail("vouchersSetId=" + this.formData.id).then(res => {
        if (res.data.status == 0) {
          let data = res.data.data.vouchersSet;
          let data1 = res.data.data.vouchers;
          this.formData.users = res.data.data.vouchersSetUser;
          this.formData.name = data.name;
          if (data.issueType == 1) {
            this.formData.sendType = "管理员发放";
          } else if (data.issueType == 2) {
            this.formData.sendType = "系统发放";
          }
          if (data.status == 0) {
            this.formData.cardStatus = false;
          } else {
            this.formData.cardStatus = true;
          }
          this.formData.radio = parseInt(data.userType);
          this.formData.picture = data.pricture;
          this.formData.startTime = data.startTime;
          this.formData.endTime = data.endTime;
          this.formData.createTime = data.createTime;
          this.formData.intervals = data.intervals;
          this.formData.times = data.times;
          this.formData.sendNum = parseInt(data.limits);
          this.formData.cardNum = data.total;
          this.formData.cardType = data.type;
          if (data1 !== null) {
            this.formData.cardName = data1.name || "";
            this.formData.virtualValue = data1.price;
            this.get_couponDetail(data1.id)
            if (data1.limitKind == 0) {
              this.formData.time = "无时间限制";
            } else if (data1.limitKind == 1) {
              this.formData.time =
                data1.startTime
                  .split(" ")[0]
                  .split("-")
                  .join(".") +
                "-" +
                data1.endTime
                  .split(" ")[0]
                  .split("-")
                  .join(".");
            }
          }
        }
      });
    },
    get_couponDetail(id) {
      let typeId = "";
      let types = [
        { id: 1, value: "全场通用" },
        { id: 2, value: "部分活动通用" },
        { id: 3, value: "部分商品类型通用" },
        { id: 4, value: "部分活动商品类型通用" },
        { id: 5, value: "部分商品可用" }
      ];
      if (this.formData.cardType == 1) {
        coupon_detail("id=" + id).then(result => {
          if (result.data.status == 0) {
            typeId = result.data.data.typeId;
            coupon_type_detail("id=" + typeId).then(result => {
              types.forEach(item => {
                if (item.id == result.data.data.type) {
                  this.formData.virtualType = item.value;
                }
              });
            });
          }
        });
      } else if (this.formData.cardType == 2) {
        red_packet_detail("id=" + id).then(result => {
          if (result.data.status == 0) {
            typeId = result.data.data.typeId;
            red_packet_type_detail("id=" + typeId).then(result => {
              if (result.data.status == 0) {
                types.forEach(item => {
                  if (item.id == result.data.data.type) {
                    this.formData.virtualType = item.value;
                  }
                });
              }
            });
          }
        });
      }
    }
  }
};
</script>



<style lang="less">
.card_detail-container {
  position: relative;
  width: 100%;
  height: 100%;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  //   控制input下拉框中的图标样式
  .el-input__icon {
    line-height: 30px;
  }

  //   时间选择框的宽度
  .el-date-editor .el-input__inner {
    width: 100% !important;
    height: 30px;
  }

  @import "../../style/card.less";
  display: flex;
  flex-flow: column;
  height: 100%;
  .price {
    width: 70px !important;
    .el-input__inner {
      width: 70px !important;
    }
  }
  .el-collapse-item {
    .el-collapse-item__content {
      padding-left: 45px;
      display: flex;
      .el-form {
        width: 310px;
        display: flex;
        flex-direction: column;
        margin-right: 85px;
        .el-form-item {
          margin-bottom: 30px !important;
        }
      }
    }
    &:nth-of-type(1) {
      .el-form {
        width: 260px;
        height: 30px;
        .el-form-item {
          width: 260px !important;
        }
      }
    }
    &:nth-of-type(2) {
      .el-form-item {
        .el-form-item__content {
          display: flex;
          align-items: center;
        }
      }
    }
    &:nth-of-type(3) {
      .el-collapse-item__content {
        display: block;
        .assign_user {
          margin-top: 15px;
          ul {
            padding: 0 50px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 12.5%;
              line-height: 30px;
              color: #333;
              display: flex;
              align-items: center;
            }
          }
          button {
            width: 80px;
            height: 30px;
            margin-top: 20px;
            background-color: #409eff;
            color: #fff;
            border: none;
          }
        }
      }
    }
    &:nth-of-type(5) {
      .el-collapse-item__content {
        display: block;
        .form {
          margin: 15px 0;
          display: flex;
          .form-item {
            display: flex;
            margin-right: 150px;
            align-items: center;
            > span {
              &:nth-of-type(2) {
                margin: 0 10px;
              }
              // width: 120px;
            }
            .el-input__inner {
              width: 200px;
              height: 30px;
            }
            .el-select {
              margin-right: 20px;
              .el-input__inner {
                width: 100px;
              }
            }
            &:nth-of-type(2) {
              width: 420px;
              .el-input {
                width: 200px;
              }
            }
          }
        }

        button {
          background-color: #409eff;
          color: #fff;
          width: 80px;
          height: 30px;
          border: none;
        }
        .img {
          position: relative;
          width: 120px;
          height: 120px;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
    }
    &:nth-of-type(6) {
      .el-input__suffix {
        left: 178px;
      }
      .el-collapse-item__content {
        .block {
          display: flex;
          align-items: center;
          margin-right: 60px;
          span {
            margin-right: 20px;
          }
        }
      }
    }
    &:nth-of-type(7) {
      .el-form {
        .el-form-item {
          display: flex;
          margin-bottom: 15px !important;
          .el-input {
            margin: 0 10px;
            .el-input__inner {
              width: 50px !important;
            }
          }
        }
      }
    }
    &:nth-of-type(8) {
      .el-collapse-item__content {
        display: block;
        span:nth-of-type(2) {
          margin: 0 10px;
        }
      }
    }
    &:nth-fo-type(9) {
      .el-input__suffix {
        left: 178px;
      }
    }
  }
}
</style>
