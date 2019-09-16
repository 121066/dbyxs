<template>
  <div class="addactivity-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团商品定制" name="2">
            <el-form ref="form" :model="form" label-width="80px" class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods">
                  <img :src="form.goodsA.picture" alt />
                  <div class="goods_msg" v-if="form.goodsA.picture">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="form.goodsA.name"
                      placement="bottom"
                    >
                      <p class="ellipsis">{{form.goodsA.name}}</p>
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="'原价:' + form.goodsA.price + '元'"
                      placement="bottom"
                    >
                      <p class="ellipsis">原价: {{form.goodsA.price + '元'}}</p>
                    </el-tooltip>
                  </div>
                </div>
                <span @click="select_goods(1)">点击选择</span>
              </el-form-item>
              <el-form-item label="失败商品" style="width: 360px;">
                <div class="goods">
                  <img :src="form.goodsB.picture" alt />
                  <div class="goods_msg" v-if="form.goodsB.picture">
                    <p class="ellipsis">{{form.goodsB.name}}</p>
                    <p class="ellipsis">原价: {{form.goodsB.price + '元'}}</p>
                  </div>
                </div>
                <span @click="select_goods(2)">点击选择</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团价格/人数定制" name="3">
            <el-form ref="form" :model="form" label-width="90px" class="assemble">
              <el-form-item label="拼团价格">
                <el-input type="number" v-model="form.price"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="最多购买次数">
                <el-input type="number" v-model="form.maxBuy" style="margin-left: 20px;"></el-input>
                <span>次</span>
              </el-form-item>
              <el-form-item label="开团人数">
                <el-input type="number" v-model="form.person"></el-input>
                <span>人</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="晒单奖励" name="4">
            <div class="reward_goods" v-for="(item,index) in form.rewardList" :key="index">
              <el-form label-width="90px" class="assemble" style="width: 280px;">
                <el-form-item label="点赞数量" style="width: 265px;">
                  <el-input v-model="item.count"></el-input>&nbsp;
                  <span>个</span>
                </el-form-item>
              </el-form>
              <el-form class="goods_select" :model="form" label-width="50px">
                <el-form-item label="送商品" style="width: 310px;">
                  <div class="goods">
                    <img :src="item.picture" alt v-show="item.picture" />
                    <div class="goods_msg" v-show="item.picture">
                      <p class="ellipsis">{{item.goodsName}}</p>
                      <p class="ellipsis">原价{{item.goodsPrice + '元'}}</p>
                    </div>
                  </div>
                  <span @click="select_goods(3,item.id)">点击选择</span>
                </el-form-item>
                <i class="el-tag__close el-icon-close" @click="delete_reward(item.id)"></i>
              </el-form>
            </div>
            <el-button
              type="primary"
              icon="el-icon-plus"
              style="width: 65px;height: 30px;padding:0;"
              @click="add_reward"
            >添加</el-button>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="add_promotion">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { goods_detail } from "../../api/getData";
import { mapActions } from "vuex";

export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      form: {
        name: "",
        price: "",
        status: "1",
        maxBuy: "", //最大购买金额
        // unveilTime: "", //倒计时揭幕时间,单位：秒
        person: "", //开团人数
        overTime: "", //开团超时时间,单位：分
        goodsA: { picture: "", name: "", price: "", id: "" },
        goodsB: { picture: "", name: "", price: "", id: "" },
        flag: 1, //flag 1代表的是目标商品  2代表的是失败商品  3: 代表晒单奖励商品
        rewardList: [],
        rewardPosition: 0 //  记录位置id
      }
    };
  },
  created() {
    this.sava_goods_type();
    let msg = localStorage.getItem("msg") || "";

    if (msg) {
      localStorage.removeItem("msg");
      this.form = JSON.parse(msg);
      localStorage.removeItem("goods");
    }
    let id = localStorage.getItem("id") || "";

    if (id) {
      localStorage.removeItem("id");
      this.goodsDetail(id);
    }
  },
  methods: {
    ...mapActions(["sava_goods_type"]),

    //  添加活动
    add_promotion() {
      if (!this.form.name) {
        return this.$message({
          type: "warning",
          message: "活动名称不能为空"
        });
      }
      if (!this.form.goodsA.id) {
        return this.message({
          type: "warning",
          message: "目标商品不能为空"
        });
      }
      if (!this.form.goodsB.id) {
        return this.$message({
          type: "warning",
          message: "失败商品不能为空"
        });
      }
      if (!this.form.price) {
        return this.$message({
          type: "warning",
          message: "商品价格不能为空"
        });
      }
      if (!this.form.maxBuy) {
        return this.$message({
          type: "warning",
          message: "商品最大购买金额不能为空"
        });
      }
      if (!this.form.person) {
        return this.$message({
          type: "warning",
          message: "活动开团人数不能为空"
        });
      }
      // if(!this.form.overTime){
      //   return this.$message({
      //     type: 'warning',
      //     message: '拼团超时时间不能为空'
      //   })
      // }
      var data =
        "&name=" +
        this.form.name +
        "&price=" +
        this.form.price +
        "&status=" +
        "1" +
        "&goodsA=" +
        this.form.goodsA.id +
        "&goodsB=" +
        this.form.goodsB.id +
        "&maxBuy=" +
        this.form.maxBuy +
        "&person=" +
        this.form.person;
      this.$axios
        .post("/web_one_promotion/add_promotion", data)
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data.result == 1) {
              var id = result.data.data.id;
              var data1 = [];
              this.form.rewardList.forEach(item => {
                data1.push({
                  goodsId: item.goodsId,
                  helpNumber: item.count,
                });
              });
              this.$axios
                .post("/web_one_promotion/add_share", {shares:data1,promotionId: id })
                .then(res => {
                  if (res.data.status == 0) {
                    if (res.data.data == 1) {
                      this.$router.push("/onePromotion_activitySettings");

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
            } else {
              return this.$message({
                type: "warning",
                message: "添加失败"
              });
            }
          }
        });
    },
    //  选择商品
    select_goods(flag, id) {
      this.form.flag = flag;
      if (flag == 3) {
        this.form.rewardPosition = id;
        localStorage.setItem("msg", JSON.stringify(this.form));

        return this.$router.push("/selectGoods");
      }
      localStorage.setItem("msg", JSON.stringify(this.form));

      this.$router.push("/onePromotion_selectGoods?type=" + "4");
    },
    //  获取商品详情
    goodsDetail(id) {
      goods_detail("id=" + id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.goods;
          if (this.form.flag == 1) {
            this.form.goodsA.picture = data.pictureUrl;
            this.form.goodsA.name = data.name;
            this.form.goodsA.price = data.price;
            this.form.goodsA.id = data.id;
          } else if (this.form.flag == 2) {
            this.form.goodsB.picture = data.pictureUrl;
            this.form.goodsB.name = data.name;
            this.form.goodsB.price = data.price;
            this.form.goodsB.id = data.id;
          } else if (this.form.flag == 3) {
            this.form.rewardList.forEach(item => {
              if (item.id == this.form.rewardPosition) {
                item.goodsName = data.name;
                item.goodsPrice = data.price;
                item.picture = data.pictureUrl;
                item.goodsId = data.id;
              }
            });
          }
        }
      });
    },
    add_reward() {
      this.form.rewardList.push({
        count: "",
        picture: "",
        goodsName: "",
        goodsPrice: "",
        id: this.form.rewardList.length
          ? this.form.rewardList[this.form.rewardList.length - 1]["id"] + 1
          : 1,
        goodsId: ""
      });
    },
    delete_reward(index) {
      this.form.rewardList = this.form.rewardList.filter(
        item => item.id != index
      );
    }
  },
  computed: {
    goodsType() {
      let goodsType = this.$store.state.goodsType;
      return goodsType;
    }
  }
};
</script>



<style lang="less">
.addactivity-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  .el-tag__close.el-icon-close:hover {
    background-color: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: hidden;
    .el-main {
      background-color: #fff;
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            border-bottom: 1px solid #e4e5e7;
            .el-collapse-item__arrow {
              margin: 0;
              margin-left: 10px;
            }
          }
          .el-collapse-item__wrap {
            margin-top: 20px;
            border: none;
            .el-collapse-item__content {
              padding: 0;
              padding-left: 15px;
              .el-form {
                display: flex;

                .el-form-item {
                  margin: 0;
                  width: 250px;
                  .el-form-item__label {
                    height: 30px;
                    line-height: 30px;
                    text-align: left;
                    color: #000;
                    font-weight: 600;
                    padding: 0;
                  }
                  .el-form-item__content {
                    line-height: 30px;
                    .el-input {
                      .el-input__inner {
                        height: 30px;
                        line-height: 30px;
                      }
                    }
                  }
                }
              }
              .goods_select {
                display: flex;
                flex-wrap: wrap;
                .el-form-item {
                  width: 360px;
                  margin-right: 38px;
                  margin-bottom: 15px;
                  .el-form-item__content {
                    display: flex;
                    justify-content: space-between;
                    .goods {
                      width: 180px;
                      height: 70px;
                      padding: 5px;
                      box-sizing: border-box;
                      border: 1px solid #bbbfc2;
                      display: flex;
                      justify-content: space-around;
                      img {
                        width: 70px;
                        height: 60px;
                      }
                      .goods_msg {
                        width: 95px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        p {
                          width: 100%;
                        }
                      }
                    }
                    span {
                      cursor: pointer;
                      height: 20px;
                      color: #0066ff;
                    }
                  }
                }
              }
              .assemble {
                flex-wrap: wrap;
                .el-form-item {
                  width: 320px;
                  margin-right: 40px;
                  margin-bottom: 20px;
                  .el-form-item__content {
                    display: flex;
                    justify-content: space-between;
                    .el-input {
                      width: 150px;
                    }
                  }
                }
              }
              .time {
                .el-form-item {
                  width: 330px;
                }
              }
              .reward_goods {
                display: flex;
                .el-form:last-of-type {
                  position: relative;
                  i {
                    position: absolute;
                    top: 0;
                    right: 20px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
    .el-footer {
      margin-top: 70px;
      text-align: center;
      > button {
        height: 30px !important;
        line-height: 30px;
        padding: 0;
        width: 60px;
        margin: 0 70px;
        // box-sizing: content-box;
      }
    }
  }
}
</style>
