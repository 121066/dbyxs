<template>
  <div class="activitydetail-container">
    <breadcrumb style></breadcrumb>
    <img
      src="../../img/return_icon.png"
      alt
      @click="$router.push('/onePromotion_activitySettings')"
    />
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="活动名称">
                <span>{{name}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团商品定制" name="2">
            <el-form label-width="80px" class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods">
                  <img :src="goodsA.picture" alt />
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsA.name}}</p>
                    <p>原价: {{goodsA.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="失败商品">
                <div class="goods">
                  <img :src="goodsB.picture" alt />
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsB.name}}</p>
                    <p>原价: {{goodsB.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团价格/人数制定" name="3">
            <el-form label-width="100px" class="assemble">
              <el-form-item label="拼团价格">
                <span>{{price}}元</span>
              </el-form-item>
              <el-form-item label="最多购买次数">
                <span style="margin-left:30px;">{{maxBuy}}次</span>
              </el-form-item>
              <el-form-item label="开团人数">
                <span>{{person}}人</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="晒单奖励" name="6">
            <div class="reward_goods" v-for="(item, index) in shareList" :key="index" style="display: flex">
              <el-form label-width="90px" class="assemble" style="width: 160px;">
                <el-form-item label="点赞数量" style="width: 160px;">
                  <span>{{item.helpNumber + '个'}}</span>
                </el-form-item>
              </el-form>
              <el-form class="goods_select" label-width="50px">
                <el-form-item label="送商品" style="width: 310px;">
                  <div class="goods" @click="$router.push('/goodsDetail?id=' + item.goodsId)">
                    <img :src="item.picture" alt />
                    <div class="goods_msg">
                      <p class="ellipsis">{{item.name}}</p>
                      <p class="ellipsis">原价: {{item.price + '元'}}</p>
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
          <!-- <el-collapse-item title="拼团时间限制" name="4">
            <el-form label-width="100px" class="assemble time">
              <el-form-item label="超时时间">
                <span>{{overtimeOne}}分钟</span>
              </el-form-item>

            </el-form>
          </el-collapse-item>-->
        </el-collapse>
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
      activeName: ["1", "2", "3", "4"],
      id: this.$route.query.id,
      name: "",
      price: "",
      maxBuy: "", // 最多购买金额
      person: "",

      overtimeOne: "", // 超时时间
      goodsA: {},
      goodsB: {},
      shareList:[],
    };
  },
  created() {
    this.get_detail();
    this.get_share()
  },
  methods: {
    get_detail() {
      this.$axios
        .post("/web_one_promotion/get_promotion", "id=" + this.id)
        .then(result => {
          if (result.data.status == 0) {
            let data = result.data.data;
            this.name = data.name;
            this.price = data.price;
            this.maxBuy = data.maxBuy;
            this.person = data.person;
            this.goodsA = data.goodsADetail;
            this.goodsB = data.goodsBDetail;
          }
        });
    },
    get_share(){
      var data = 'promotionId=' + this.id
      this.$axios.post('/web_one_promotion/get_share',data).then(res => {
        if(res.data.status == 0 && res.data.data.length != 0){
          this.shareList = res.data.data
        }
      })
    }
  }
};
</script>



<style lang="less">
.activitydetail-container {
  display: flex;
  flex-flow: column;
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
                  }
                }
              }
              .goods_select {
                display: flex;
                flex-wrap: wrap;
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
                  width: 260px;
                  margin-bottom: 20px;
                  .el-form-item__content {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                    color: #000;
                    span {
                      display: block;
                      width: 100%;
                      text-align: left;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
