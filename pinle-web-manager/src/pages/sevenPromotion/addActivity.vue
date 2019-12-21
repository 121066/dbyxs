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
            <el-form label-width="120px" class="goods_select">
              <el-form-item :label="item.label" v-for="(item, index) in goods" :key="index">
                <div class="goods">
                  <img :src="item.msg.picture" alt v-show="item.msg.picture" />
                  <div class="goods_msg" v-show="item.msg.picture">
                    <p class="ellipsis">{{item.msg.goodsName}}</p>
                    <p class="ellipsis">原价:{{item.msg.goodsPrice + '元'}}</p>
                  </div>
                </div>
                <span @click="select_goods(item.id)">点击选择</span>
              </el-form-item>
              <!-- <el-form-item label="第一轮失败商品">
                <div class="goods">
                  <img src="" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">中国移动100元话费快充</p>
                    <p>原价： 100元</p>
                  </div>
                </div>
                <span>点击选择</span>
              </el-form-item>
              <el-form-item label="第三轮失败商品">
                <div class="goods">
                  <img src="../../img/20190429153524.png" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">中国移动100元话费快充</p>
                    <p>原价： 100元</p>
                  </div>
                </div>
                <span>点击选择</span>
              </el-form-item>
              <el-form-item label="朋友邀请失败商品">
                <div class="goods">
                  <img src="../../img/20190429153524.png" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">中国移动100元话费快充</p>
                    <p>原价： 100元</p>
                  </div>
                </div>
                <span>点击选择</span>
              </el-form-item>
              <el-form-item label="第二轮失败商品">
                <div class="goods">
                  <img src="../../img/20190429153524.png" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">中国移动100元话费快充</p>
                    <p>原价： 100元</p>
                  </div>
                </div>
                <span>点击选择</span>
              </el-form-item>-->
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团价格/助力定制" name="3">
            <el-form ref="form" :model="form" label-width="135px" class="assemble">
              <el-form-item label="拼团价格">
                <el-input v-model="form.price"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="第二轮拼团价格">
                <el-input v-model="form.moneyOne"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="第三轮拼团价格">
                <el-input v-model="form.moneyTwo"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="好友邀请拼团价格">
                <el-input v-model="form.invitePrice"></el-input>
                <span>元</span>
              </el-form-item>

              <el-form-item label="第二轮拼团助力">
                <el-input v-model="form.helpOne"></el-input>
                <span>个</span>
              </el-form-item>
              <el-form-item label="第三轮拼团助力">
                <el-input v-model="form.helpTwo"></el-input>
                <span>个</span>
              </el-form-item>
              <el-form-item label="好友邀请第二轮助力">
                <el-input v-model="form.inviteHelpOne"></el-input>
                <span>个</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团时间限制" name="4">
            <el-form ref="form" :model="form" label-width="135px" class="assemble time">
              <el-form-item label="第一轮超时时间">
                <el-input v-model="form.overtimeOne"></el-input>
                <span>分钟</span>
              </el-form-item>
              <el-form-item label="第二轮超时时间">
                <el-input v-model="form.overtimeTwo"></el-input>
                <span>分钟</span>
              </el-form-item>
              <el-form-item label="第三轮超时时间">
                <el-input v-model="form.overtimeThree"></el-input>
                <span>分钟</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- <el-collapse-item title="拼团揭幕时间" name="5">
            <el-form ref="form" :model="form" label-width="135px" class="assemble time">
              <el-form-item label="拼团揭幕时间">
                <el-input v-model="form.countDown"></el-input>
                <span>秒</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>-->
          <el-collapse-item title="晒单奖励" name="6">
            <div class="reward_goods" v-for="(item,index) in rewardList" :key="index">
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
                  <span @click="select_goods(item.id)">点击选择</span>
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
          <el-collapse-item title="爆单奖励" name="7">
            <div>（拼团胜利的用户有一定的概率获得爆单机会，爆单后会从以下爆单商品列表中随机分配一个商品赠送给用户）</div>
            <div>
              <div class="reward_goods" style="display:block">
                <el-form
                  class="goods_select"
                  :model="form"
                  label-width="100px"
                  v-for="(item,index) in blastList"
                  :key="index"
                >
                  <el-form-item label="爆单商品" style="width: 350px;">
                    <div class="goods">
                      <img :src="item.picture" alt v-show="item.picture" />
                      <div class="goods_msg" v-show="item.picture">
                        <p class="ellipsis">{{item.goodsName}}</p>
                        <p class="ellipsis">原价{{item.goodsPrice + '元'}}</p>
                      </div>
                    </div>
                    <span @click="select_blast_goods(item.id)">点击选择</span>
                    <i
                      class="el-tag__close el-icon-close"
                      @click="delete_blast(item.id)"
                      style="position:absolute;right:-20px;"
                    ></i>
                  </el-form-item>
                </el-form>

                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  style="width: 65px;height: 30px;padding:0;"
                  @click="add_blast"
                >添加</el-button>
              </div>
              <el-form
                class="goods_select"
                :model="form"
                label-width="70px"
                style="margin-left: 180px;"
              >
                <el-form-item label="爆单概率" style="width: 170px;">
                  <el-input v-model="form.probability" style="width:100px;" @blur="check_value"></el-input>&nbsp;
                  <span>%</span>
                </el-form-item>
              </el-form>
            </div>
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
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: "1",
      form: {
        name: "",
        price: "",
        moneyOne: "",
        invitePrice: "",
        helpOne: "",
        moneyTwo: "",
        helpTwo: "",
        inviteHelpOne: "",
        overtimeOne: "",
        overtimeTwo: "",
        overtimeThree: "",
        countDown: "0",
        probability: ""
      },
      goods: [
        {
          label: "目标商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 1
        },
        {
          label: "第一轮失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 2
        },
        {
          label: "第三轮失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 3
        },
        {
          label: "朋友邀请失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 4
        },
        {
          label: "第二轮失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 5
        }
      ],
      goodsMsg: null,
      goodsType: "",
      rewardList: [
        // {id:6,count: '',img:'',goodsName:'',goodsPrice:""}
      ],
      goodsId: "",
      blastList: []
    };
  },
  methods: {
    check_value() {
      if (this.form.probability > 100) {
        this.form.probability = 100;
        return this.$message({
          type: "warning",
          message: "爆单概率必须小于100"
        });
      }
    },
    // 添加活动接口
    add_promotion() {
      if (!this.form.name) {
        return this.$message({
          type: "warning",
          message: "活动名称不能为空"
        });
      }
      if (!this.goods[0]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择目标商品"
        });
      }
      if (!this.goods[1]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择第一轮失败商品"
        });
      }
      if (!this.goods[4]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择第二轮失败商品"
        });
      }
      if (!this.goods[2]["msg"]["id"]) {
        return this.$$message({
          type: "warning",
          message: "请选择第三轮失败商品"
        });
      }
      if (!this.goods[3]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择朋友邀请失败商品"
        });
      }
      if (!this.form.price) {
        return this.$message({
          type: "warning",
          message: "请输入拼团价格"
        });
      }
      if (!this.form.moneyOne) {
        return this.$message({
          type: "warning",
          message: "请输入第一轮失败加钱"
        });
      }
      if (!this.form.invitePrice) {
        return this.$message({
          type: "warning",
          message: "好友邀请拼团价格不能为空"
        });
      }
      if (!this.form.moneyTwo) {
        return this.$message({
          type: "warning",
          message: "第二轮失败加钱不能为空"
        });
      }
      if (!this.form.helpOne) {
        return this.$message({
          type: "warning",
          message: "第一轮失败助力不能为空"
        });
      }
      if (!this.form.helpTwo) {
        return this.$message({
          type: "warning",
          message: "第二轮失败助力不能为空"
        });
      }
      if (!this.form.inviteHelpOne) {
        return this.$message({
          type: "warning",
          message: "好友邀请第一轮失败助力不能为空"
        });
      }
      if (!this.form.overtimeOne) {
        return this.$message({
          type: "warning",
          message: "第一轮超时时间不能为空"
        });
      }
      if (!this.form.overtimeTwo) {
        return this.$message({
          type: "warning",
          message: "第二轮超时时间不能为空"
        });
      }
      if (!this.form.overtimeThree) {
        return this.$message({
          type: "warning",
          message: "第三轮超时时间不能为空"
        });
      }
      let shareNums = [];
      let shareGoodsIds = [];
      let sevenReward = [];
      this.blastList.forEach(item => {
        sevenReward.push({ goodsId: item.goodsId });
      });
      this.rewardList.forEach(item => {
        if (item.goodsId) {
          shareNums.push(item.count);
          shareGoodsIds.push(item.goodsId);
        }
      });
      let sevenPromotionSetVo = {
        name: this.form.name,
        price: this.form.price,
        invitePrice: this.form.invitePrice,
        status: "1",
        goodsA: this.goods[0]["msg"]["id"],
        goodsB: this.goods[1]["msg"]["id"],
        goodsTwo: this.goods[4]["msg"]["id"],
        goodsThree: this.goods[2]["msg"]["id"],
        goodsFriend: this.goods[3]["msg"]["id"],
        moneyOne: this.form.moneyOne,
        helpOne: this.form.helpOne,
        moneyTwo: this.form.moneyTwo,
        helpTwo: this.form.helpTwo,
        countDown: this.form.countDown,
        inviteHelpOne: this.form.inviteHelpOne,
        overtimeOne: this.form.overtimeOne,
        overtimeTwo: this.form.overtimeTwo,
        overtimeThree: this.form.overtimeThree,
        lucky: this.form.probability,
        shareNums,
        shareGoodsIds,
        sevenReward
      };
      this.$axios
        .post(
          "/web_seven_promotion/add_promotion",
          "sevenPromotionSetVo=" + JSON.stringify(sevenPromotionSetVo)
        )
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 1) {
              this.$router.push("sevenPromotion_activitySettings");
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
    add_reward() {
      this.rewardList.push({
        count: "",
        picture: "",
        goodsName: "",
        goodsPrice: "",
        id: this.rewardList.length
          ? this.rewardList[this.rewardList.length - 1]["id"] + 1
          : 6,
        goodsId: ""
      });
    },
    add_blast() {
      // if (this.blastList.length == 0) {
      //   let id = 1;
      //   this.blastList.push({
      //     id,
      //     picture: "",
      //     goodsName: "",
      //     goodsPrice: "",
      //     goodsId: ""
      //   });
      // } else {
      //   this.blastList.push({
      //     picture: "",
      //     goodsName: "",
      //     goodsPrice: "",
      //     id: this.blastList[this.blastList.length - 1]["id"] + 1,
      //     goodsId: ""
      //   });
      // }
      this.blastList.push({
        picture: "",
        goodsName: "",
        goodsPrice: "",
        id: this.blastList.length
          ? this.blastList[this.blastList.length - 1]["id"] + 1
          : 1,
        goodsId: ""
      });
    },
    delete_reward(id) {
      this.rewardList = this.rewardList.filter(item => {
        if (item.id != id) {
          return item;
        }
      });
    },
    delete_blast(id) {
      this.blastList = this.blastList.filter(item => {
        if (item.id != id) {
          return item;
        }
      });
    },
    select_goods(goodsType) {
      this.goodsType = goodsType;
      if (this.goodsType <= 5) {
        this.$router.push("/sevenPromotion_selectGoods?type=" + "2");
      } else {
        this.$router.push("/selectGoods");
      }
    },
    select_blast_goods(goodsId) {
      this.goodsId = goodsId;
      this.$router.push("/sevenPromotion_selectGoods?type=" + "9");
    },
    goodsDetail(goodsId) {
      this.$axios.post("web_goods/get_one", "id=" + goodsId).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.goods;
          if (this.goodsType && this.goodsId == "") {
            setTimeout(() => {
              if (this.goodsType >= 6) {
                var flag = this.rewardList.some(
                  item => item.goodsId == goodsId
                );
                if (flag) {
                  return this.$message({
                    type: "warning",
                    message: "不能选择相同的商品"
                  });
                }
                this.rewardList.forEach(item => {
                  if (this.goodsType == item.id) {
                    item.picture = data.pictureUrl;
                    item.goodsId = data.id;
                    item.goodsName =  data.name;
                    item.goodsPrice = data.price;
                  }
                });
              } else {
                var flag = this.goods.some(item => item.msg.id == goodsId);
                if (flag) {
                  return this.$message({
                    type: "warning",
                    message: "不能选择相同的商品"
                  });
                }
                this.goods.forEach(item => {
                  if (this.goodsType == item.id) {
                    item.msg.picture = data.pictureUrl;
                    item.msg.goodsName = data.name;
                    item.msg.goodsPrice = data.price;
                    item.msg.id =  data.id;
                  }
                });
              }
            }, 100);
          } else {
            setTimeout(() => {
              var flag = this.blastList.some(item => item.goodsId == goodsId);
              if (flag) {
                return this.$message({
                  type: "warning",
                  message: "不能选择相同的商品"
                });
              }
              this.blastList.forEach(item => {
                if (this.goodsId == item.id) {
                  item.picture = data.pictureUrl;
                  item.goodsId = data.id;
                  item.goodsName = data.name;
                  item.goodsPrice = data.price;
                  return (this.goodsId = "");
                }
              });
            }, 100);
          }

        }
      });
    }
  },
  activated() {
    if (this.$route.meta.isBack) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      this.rewardList = []; // ajax获取数据方法
      this.blastList = [];
      this.goodsType = "";
      this.goodsId = "";
      this.form = {
        name: "",
        price: "",
        moneyOne: "",
        invitePrice: "",
        helpOne: "",
        moneyTwo: "",
        helpTwo: "",
        inviteHelpOne: "",
        overtimeOne: "",
        overtimeTwo: "",
        overtimeThree: "",
        countDown: "0",
        probability: ""
      };
      this.goods = [
        {
          label: "目标商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 1
        },
        {
          label: "第一轮失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 2
        },
        {
          label: "第三轮失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 3
        },
        {
          label: "朋友邀请失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 4
        },
        {
          label: "第二轮失败商品",
          msg: { picture: "", goodsName: "", goodsPrice: "", id: "" },
          id: 5
        }
      ];
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = true;

    var goodsId = localStorage.getItem("id") || "";
    localStorage.removeItem("id");

     if (goodsId) {
      this.goodsDetail(goodsId)
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
    overflow: auto;
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
                position: relative;
                .el-form-item {
                  width: 375px;
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
    .el-collapse-item:nth-of-type(6) {
      .el-collapse-item__content {
        div {
          &:nth-of-type(2) {
            margin-top: 30px;
            display: flex;
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
