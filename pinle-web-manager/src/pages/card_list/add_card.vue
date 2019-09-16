
<template>
  <div class="add_card-container" style="position:relative">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="formData.activeName">
          <el-collapse-item title="发放类型" name="1">
            <div label-width="90px" ref="form" style="display:flex;">
              <div class="form-item" style="display:flex;align-item:center;margin-right:100px;">
                <span style="margin-right: 10px;">卡券名称</span>
                <el-input v-model="formData.name" style="width: 200px;"></el-input>
              </div>
              <div class="form-item" style="display:flex;align-item:center;">
                <span style="margin-right: 10px;">发放类型</span>
                <el-select v-model="formData.sendType" style="width: 120px;font-size: 12px;">
                  <el-option
                    v-for="item in sendTypeList"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="状态" name="2">
            <el-form label-width="90px" ref="form" style="display:flex;height:30px;">
              <el-form-item label="卡券状态">
                <el-switch v-model="formData.cardStatus"></el-switch>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="发放用户类型" name="3">
            <el-radio-group v-model="formData.radio">
              <el-radio :label="1">所用用户</el-radio>
              <el-radio :label="2">vip用户</el-radio>
              <el-radio :label="3">指定用户</el-radio>
            </el-radio-group>
            <div v-if="formData.radio == 3" class="assign_user">
              <ul>
                <li v-for="(item,index) in formData.users" :key="item.id" >
                  <img
                    :src="item.picture"
                    alt
                    style="width: 30px;height: 30px;border-radius: 15px;"
                  />
                  <span class="ellipsis">
                    {{item.username}}
                  </span>
                  <i
                    class="el-icon-circle-close-outline"
                    @click="delete_user(index)"
                  ></i>
                </li>
              </ul>
              <el-button tupe="primary" class="el-icon-plus" @click="select_users">添加用户</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="活动图片设置" name="4">
            <el-upload
              action="''"
              ref="upload"
              list-type="picture-card"
              :file-list="formData.fileList"
              :auto-upload="false"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-collapse-item>
          <el-collapse-item title="选择卡券类型" name="5">
            <div class="form">
              <div class="form-item">
                <span>选择卡券类型</span>
                <el-select
                  v-model="formData.cardType"
                  @change="select_cardType"
                  style="width: 100px;font-size: 12px;"
                >
                  <el-option
                    v-for="item in formData.cardTypeList"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  ></el-option>
                </el-select>
                <span v-if="formData.cardType == 1 || formData.cardType == 2">{{formData.cardName}}</span>
                <el-button
                  tupe="primary"
                  @click="show1 = true"
                  ref="btn"
                  v-if="formData.cardType == 1 || formData.cardType == 2"
                >选择卡券</el-button>
              </div>
              <div class="form-item" v-if="formData.cardType == 3">
                <span>购物券价值</span>

                <el-input v-model="formData.number"></el-input>
              </div>
            </div>
            <div class="img" v-if="formData.cardType == 3">
              <img src="../../img/card.png" alt />
              <p
                style="position:absolute;top:18px;color:#fff;font-size: 20px;width:100%;text-align:center;"
                v-if="formData.number"
              >{{formData.number + '元'}}</p>
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
                @change="verfy_startTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 200px;"
              ></el-date-picker>
            </div>

            <div class="block">
              <span>结束时间</span>
              <el-date-picker
                v-model="formData.endTime"
                @change="verfy_endTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="23:59:59"
                style="width: 200px;"
              ></el-date-picker>
            </div>
          </el-collapse-item>
          <el-collapse-item title="领取的频度和频率(值为整数)" name="7">
            <el-form>
              <el-form-item>
                <span>每次领取的时间间隔:</span>
                <el-input style="width: 50px" v-model="formData.intervals"></el-input>
                <span>天</span>
              </el-form-item>
              <el-form-item>
                <span>时间间隔内可以领取券的上限:</span>
                <el-input style="width: 50px" v-model="formData.times"></el-input>
                <span>次</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="发放数量" name="8">
            <el-radio-group v-model="formData.sendNum">
              <el-radio :label="1">无数量限制</el-radio>
              <el-radio :label="2">有数量限制</el-radio>
            </el-radio-group>
            <div
              style="display:flex;margin-top:20px;padding-left:20px;box-sizing:border-box;"
              v-if="formData.sendNum == 2"
            >
              <span>发放总数量:</span>
              <el-input
                v-model="formData.cardNum"
                style="width:100px;height: 30px;"
                class="card-num"
              ></el-input>
              <span>张</span>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="addCard">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
    <transition name="el-zoom-in-center">
      <card-list
        class="transition-box"
        v-if="show1"
        :type="formData.cardType"
        :show="show1"
        @changeShow="changeShow1"
        @addCardType="addCardType"
        style="position:absolute;z-index:999"
      ></card-list>
    </transition>
    <transition name="el-zoom-in-center">
      <select-users
        class="transition-box"
        v-if="show"
        :show="show"
        :usersInfo="formData.users"
        @addUsers = "addUsers"
        @changeShow="changeShow"
        style="position:absolute;z-index:999"
      ></select-users>
    </transition>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import cardList from "../../components/selectCardList";
import selectUsers from "./selectUsers";

import {
  coupon_type_detail,
  red_packet_type_detail,
  red_packet_detail,
  coupon_detail,
  card_add
} from "../../api/getData.js";
export default {
  components: { breadcrumb, cardList, selectUsers },
  data() {
    return {
      sendTypeList: [{ key: "1", label: "管理员发放" }],
      type: "",
      show1: false,
      show: false,
    
      formData: {
        activeName: ["1", "2", "3"],
        radio: 1,
        sendType: "1",
        dialogImageUrl: "",
        users:[],
        fileList: [],
        dialogVisible: false,
        cardType: "1",
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
        cardName: "",
        sendNum: 1,
        cardNum: 0, //卡券的数量
        cardStatus: true,
        virtualValue: "",
        virtualType: "",
        time: "",
        name: "",
        intervals: "",
        times: "",
        vouchersId: ""
      }
    };
  },
  created() {},
  methods: {
    changeShow1(show) {
      this.show1 = show;
    },
    changeShow(show) {
      this.show = show
    },
    addCardType(msg, show) {
      this.show1 = show;
      if (msg) {
        if (!this.formData.name) {
          this.formData.name = msg.name;
        }
        if (msg.limitKind == "无时间限制") {
          this.formData.time = msg.limitKind;
        } else {
          this.formData.time =
            msg.startTime
              .split(" ")[0]
              .split("-")
              .join(".") +
            "-" +
            msg.endTime
              .split(" ")[0]
              .split("-")
              .join(".");
        }
        this.formData.virtualValue = msg.price;
        this.formData.vouchersId = msg.id;
        this.file1 = "";
        this.get_couponDetail(msg.id);
      }
    },
    select_users() {
      this.show = true
    },
    addUsers(users,show) {
      this.formData.users = users
      this.show = show
    },

    handleRemove(file, fileList) {
      this.formData.fileList = [];
      document.querySelector(
        ".el-upload.el-upload--picture-card"
      ).style.display = "block";
    },
    handleChange(file, fileList) {
      this.formData.fileList = fileList;
      if ((this.formData.fileList.length = 1)) {
        document.querySelector(
          ".el-upload.el-upload--picture-card"
        ).style.display = "none";
      }
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
    },
    delete_user(id) {
      this.formData.users = this.formData.users.filter(
        (item, index) => index != id
      );
    },
    select_cardType() {
      this.formData.virtualValue = "";
      this.formData.virtualType = "";
      this.formData.cardName = "";
      this.formData.time = "";
    },
    addCard() {
      if (!this.formData.name) {
        return this.$message({
          type: "warning",
          message: "卡券名称不能为空"
        });
      }
      if (this.formData.fileList.length == 0) {
        return this.$message({
          type: "warning",
          message: "活动图片不能为空"
        });
      }
      if (this.formData.cardType == 3) {
        if (!this.formData.number) {
          return this.$message({
            type: "warning",
            message: "请输入购物券价值"
          });
        }
      }
      if (this.formData.cardType == 1 || this.formData.cardType == 2) {
        if (!this.formData.vouchersId) {
          return this.$message({
            type: "warning",
            message: "请选择红包或优惠券"
          });
        }
      }
      if (!this.formData.startTime || !this.formData.endTime) {
        return this.$message({
          type: "warning",
          message: "领取时间的开始时间或结束时间不能为空"
        });
      }
      if (!this.formData.intervals) {
        return this.$message({
          type: "warning",
          message: "每次领取的时间间隔不能为空"
        });
      }
      if (!this.formData.times) {
        return this.$message({
          type: "warning",
          message: "时间间隔内可以领取券的上限不能为空"
        });
      }
      if (this.formData.sendNum == 2) {
        if (!this.formData.cardNum) {
          return this.$message({
            type: "warning",
            message: "发放总数量不能为空"
          });
        }
      }
      if (this.formData.radio == 3) {
        if (this.formData.users.length == 0) {
          this.$message({
            type: "warning",
            message: "指定的用户不能为空"
          });
        }
      }

      let formData = new FormData();
      let userIds = [];
      formData.append("file", this.formData.fileList[0].raw);
      if (this.formData.radio == 3) {
        this.formData.users.forEach(item => {
          // userIds.push(item.id);
          formData.append("userIds", item.id);
        });
        // formData.append("userIds", JSON.stringify(userIds));
      }
      var vouchersSet = {};
      vouchersSet["name"] = this.formData.name;
      vouchersSet["endTime"] = this.formData.endTime;
      vouchersSet["intervals"] = this.formData.intervals;
      vouchersSet["issueType"] = this.formData.sendType;
      vouchersSet["limits"] = this.formData.sendNum - 1 + "";
      if (
        this.formData.cardType == 3 ||
        this.formData.cardType == 4 ||
        this.formData.cardType == 5
      ) {
        if (this.formData.cardType == 3) {
          vouchersSet["number"] = this.formData.number;
        } else {
          vouchersSet["number"] = 1;
        }
      } else {
        vouchersSet["number"] = "";
      }
      if (this.formData.cardStatus) {
        this.formData.cardStatus = 1 + "";
      } else {
        this.formData.cardStatus = 0 + "";
      }
      vouchersSet["startTime"] = this.formData.startTime;
      vouchersSet["status"] = this.formData.cardStatus;
      vouchersSet["times"] = this.formData.times;
      if (this.formData.sendNum == 2) {
        vouchersSet["total"] = this.formData.cardNum + "";
      }
      vouchersSet["type"] = this.formData.cardType;
      vouchersSet["userType"] = this.formData.radio + "";
      if (this.formData.cardType == 1 || this.formData.cardType == 2) {
        vouchersSet["vouchersId"] = this.formData.vouchersId;
      }
      // formData.append("vouchersSet", JSON.stringify(vouchersSet));

      for (var i in vouchersSet) {
        formData.append(i, vouchersSet[i]);
      }
      card_add(formData).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.$router.push("/card_list");
            return this.$message({
              type: "success",
              message: "添加成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "添加失败"
            });
          }
        }
      });
    },
    //   校验开始时间
    verfy_startTime() {
      if (this.formData.startTime == null) {
        this.formData.startTime = "";
      }
      if (this.formData.endTime) {
        this.timeCompare(1);
      }
    },
    //   校验结束时间
    verfy_endTime() {
      if (this.formData.endTime == null) {
        this.form.endTime = "";
      }

      if (!this.formData.startTime) {
        this.formData.endTime = "";
        return this.$message({
          type: "warning",
          message: "请先输入领取开始时间"
        });
      } else {
        this.timeCompare(2);
      }
    },
    //   结束时间与开始时间进行比较
    timeCompare(flag) {
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if (
        new Date(this.formData.startTime).getTime() >=
        new Date(this.formData.endTime).getTime()
      ) {
        if (flag == 1) {
          this.formData.startTime = "";
        } else {
          this.formData.endTime = "";
        }
        return this.$message({
          type: "warning",
          message: "领取'开始时间'必须小于'结束时间'"
        });
      }
    }
  }
};
</script>




<style lang="less">
.add_card-container {
  @import "../../style/scroll.less";
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
      .form-item {
        width: 280px !important;
        height: 30px;
        .el-input {
          height: 30px !important;
          .el-input__inner {
            height: 30px;
          }
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
              width: 10.5%;
              line-height: 35px;
              color: #333;
              text-align: center;
              position: relative;
              font-size: 16px;
              display: flex;
              align-items: center;
              margin-right: 2%;
              margin-bottom: 15px;
              span {
                width:60%;
              }
              i {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                color: #409eff;
                display: none;
                font-size: 16px;
              }
              &:hover > i {
                display: block;
              }
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
            > span {
              margin-right: 20px;
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
      }
      .card-num {
        margin: 0 10px;
        .el-input__inner {
          height: 30px;
        }
      }
    }
  }
}
</style>
