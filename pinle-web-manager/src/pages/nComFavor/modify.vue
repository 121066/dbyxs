<template>
  <div class="nComer_favor_modify-container">
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
              <el-form-item :label="item.label" v-for="(item, index) in form.goods" :key="index">
                <div class="goods">
                  <img :src="item.msg.picture" alt v-show="item.msg.picture" />
                  <div class="goods_msg" v-show="item.msg.picture">
                    <p class="ellipsis">{{item.msg.name}}</p>
                    <p class="ellipsis">原价:{{item.msg.price + '元'}}</p>
                  </div>
                </div>
                <span @click="select_goods(index)">点击选择</span>
              </el-form-item>
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
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="modify_promotion">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { nc_favor_modify, nc_favor_detail } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      form: {
        id: this.$route.query.id,
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

      goodsMsg: null,
      goodsType: "",
      goodsId: ""
    };
  },
  created() {
    if (localStorage.getItem("msg")) {
      this.form = JSON.parse(localStorage.getItem("msg")) || "";
      localStorage.removeItem("msg");
      if (localStorage.getItem("id")) {
        var id = localStorage.getItem("id") || "";
        localStorage.removeItem("id");
        this.goodsDetail(id);
      }
    } else {
      this.get_pro_detail();
    }
  },
  methods: {
    // 添加活动接口
    modify_promotion() {
      if (!this.form.name) {
        return this.$message({
          type: "warning",
          message: "活动名称不能为空"
        });
      }
      if (!this.form.goods[0]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择目标商品"
        });
      }
      if (!this.form.goods[1]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择第一轮失败商品"
        });
      }
      if (!this.form.goods[4]["msg"]["id"]) {
        return this.$message({
          type: "warning",
          message: "请选择第二轮失败商品"
        });
      }
      if (!this.form.goods[2]["msg"]["id"]) {
        return this.$$message({
          type: "warning",
          message: "请选择第三轮失败商品"
        });
      }
      if (!this.form.goods[3]["msg"]["id"]) {
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
      let newPromotionSetVo = {
        id: this.form.id,
        name: this.form.name,
        price: this.form.price,
        invitePrice: this.form.invitePrice,
        status: "1",
        goodsA: this.form.goods[0]["msg"]["id"],
        goodsB: this.form.goods[1]["msg"]["id"],
        goodsTwo: this.form.goods[4]["msg"]["id"],
        goodsThree: this.form.goods[2]["msg"]["id"],
        goodsFriend: this.form.goods[3]["msg"]["id"],
        moneyOne: this.form.moneyOne,
        helpOne: this.form.helpOne,
        moneyTwo: this.form.moneyTwo,
        helpTwo: this.form.helpTwo,
        inviteHelpOne: this.form.inviteHelpOne,
        overtimeOne: this.form.overtimeOne,
        overtimeTwo: this.form.overtimeTwo,
        overtimeThree: this.form.overtimeThree
      };
      nc_favor_modify(
        "newPromotionSetVo=" + JSON.stringify(newPromotionSetVo)
      ).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
              this.$router.push('/nComer_favor_set')
            this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: "修改失败"
            });
          }
        }
      });
    },

    select_goods(index) {
      this.form.index = index;
      localStorage.setItem("msg", JSON.stringify(this.form));
      this.$router.push("/nComer_favor_selectGoods?type=" + "10");
    },

    goodsDetail(id) {
      this.$axios.post("web_goods/get_one", "id=" + id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.goods;

          // this.goodsMsg = {
          //   img: data.pictureUrl,
          //   goodsName: data.name,
          //   goodsPrice: data.price,
          //   id: data.id
          // };
          this.form.goods.forEach((item, index) => {
            if (index == this.form.index) {
              item.msg.picture = data.pictureUrl;
              item.msg.name = data.name;
              item.msg.price = data.price;
              item.msg.id = data.id;
              return;
            }
          });
        }
      });
    },

    get_pro_detail() {
      nc_favor_detail("id=" + this.form.id).then(res => {
        if (res.data.status == 0) {
          var data = res.data.data;
          this.form = data;
          this.form.goods = [
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
          ]
          data.goodsDetail.forEach(item => {
              if(item.id == data.goodsA){
                  this.form.goods[0].msg = item
              } else if(item.id == data.goodsB){
                  this.form.goods[1].msg = item
              } else if(item.id == data.goodsFriend){
                  this.form.goods[3].msg = item
              } else if(item.id == data.goodsTwo){
                  this.form.goods[4].msg = item
              } else if(item.id == data.goodsThree){
                  this.form.goods[2].msg = item
              }
          })
        }
      });
    }
  }
};
</script>



<style lang="less">
.nComer_favor_modify-container {
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
