<template>
  <div class="n_favor_detail-container">
    <breadcrumb style></breadcrumb>
    <img
      src="../../img/return_icon.png"
      alt
      @click="$router.go(-1)"
    >
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
            <el-form label-width="120px" class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods" @click="$router.push('/goodsDetail?id=' + goodsA.id)">
                  <img :src="goodsA.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsA.name}}</p>
                    <p>原价: {{goodsA.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="第一轮失败商品" >
                <div class="goods" @click="$router.push('/goodsDetail?id=' + goodsB.id)">
                  <img :src="goodsB.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsB.name}}</p>
                    <p>原价: {{goodsB.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="第三轮失败商品">
                <div class="goods" @click="$router.push('/goodsDetail?id=' + goodsThree.id)">

                  <img :src="goodsThree.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsThree.name}}</p>
                    <p>原价: {{goodsThree.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="朋友邀请失败商品">
                <div class="goods" @click="$router.push('/goodsDetail?id=' + goodsFriend.id)">
                  <img :src="goodsFriend.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsFriend.name}}</p>
                    <p>原价: {{goodsFriend.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="第二轮失败商品">
                <div class="goods" @click="$router.push('/goodsDetail?id=' + goodsTwo.id)">
                  <img :src="goodsTwo.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goodsTwo.name}}</p>
                    <p>原价: {{goodsTwo.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团价格/助力定制" name="3">
            <el-form label-width="160px" class="assemble">
              <el-form-item label="拼团价格">
                <span>{{price + '元'}}</span>
              </el-form-item>
              <el-form-item label="第二轮拼团价格">
                <span>{{moneyOne + '元'}}</span>
              </el-form-item>
              <el-form-item label="第三轮拼团价格">
                <span>{{moneyTwo + '元'}}</span>
              </el-form-item>
              <el-form-item label="好友邀请拼团价格"  style="width:700px;">
                <span>{{invitePrice + '元'}}</span>
              </el-form-item>
              <el-form-item label="好友邀请第二轮助力">

                <span>{{inviteHelpOne + '个'}}</span>
              </el-form-item>

              <el-form-item label="第二轮拼团助力">
                <span>{{helpOne + '个'}}</span>
              </el-form-item>
              <el-form-item label="第三轮拼团助力">
                <span>{{helpTwo + '个'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团时间限制" name="4">
            <el-form label-width="135px" class="assemble time">
              <el-form-item label="第一轮超时时间">
                <span>{{overtimeOne + '分钟'}}</span>
              </el-form-item>
              <el-form-item label="第二轮超时时间">
                <span>{{overtimeTwo + '分钟'}}</span>
              </el-form-item>
              <el-form-item label="第三轮超时时间">
                <span>{{overtimeThree + '分钟'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- <el-collapse-item title="拼团揭幕时间" name="5">
            <el-form label-width="135px" class="assemble time">
              <el-form-item label="揭幕时间">
                <span>{{countDown + '秒'}}</span>
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
import {nc_favor_detail} from '../../api/getData'
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1","2","3","4"],
      id: this.$route.query.id,
      name: "", //活动名称
      price: "", //商品价格
      invitePrice: "", //朋友邀请价格
      moneyOne: "",
      helpOne: "",
      moneyTwo: "",
      helpTwo: "",
      inviteHelpOne: "",
      overtimeOne: "",
      overtimeTwo: "",
      overtimeThree: "",
      countDown: "", //揭幕时间
      goodsA: {},
      goodsB: {},
      goodsTwo: {},
      goodsThree: {},
      goodsFriend: {},
      reward: [],
      blastList: [],
      probability: "" //  商品的爆单的概率
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    get_detail() {

        nc_favor_detail('id=' + this.id).then(result => {
          if (result.data.status == 0) {
            let data = result.data.data;
            this.name = data.name;
            this.price = data.price;
            this.invitePrice = data.invitePrice;
            this.moneyOne = data.moneyOne;
            this.helpOne = data.helpOne;
            this.moneyTwo = data.moneyTwo;
            this.helpTwo = data.helpTwo;
            this.inviteHelpOne = data.inviteHelpOne;
            this.overtimeOne = data.overtimeOne;
            this.overtimeTwo = data.overtimeTwo;
            this.overtimeThree = data.overtimeThree;

            data.goodsDetail.forEach(item => {
              if (data.goodsA == item.id) {
                this.goodsA = item;
              }
              if (data.goodsB == item.id) {
                this.goodsB = item;
              }
              if (data.goodsTwo == item.id) {
                this.goodsTwo = item;
              }
              if (data.goodsThree == item.id) {
                this.goodsThree = item;
              }
              if (data.goodsFriend == item.id) {
                this.goodsFriend = item;
              }
            });



          }
        });
    }
  }
};
</script>



<style lang="less">
.n_favor_detail-container {
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
