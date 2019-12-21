<template>
  <div class="reviewrefuse-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="晒单审核信息" name="1">
            <div class="pending_review">
              <div>
                <i class="el-icon-time"></i>
                <p>待审核</p>
              </div>
              <span>{{applyTime}}</span>
            </div>
            <img src="../../img/icon1.png" alt />
            <div class="review_refuse">
              <div>
                <i class="el-icon-circle-check-outline"></i>
                <p>审核通过</p>
              </div>
              <div>
                <span>审核者: {{examineName}}</span>
                <span>{{examineTime}}</span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="拼团信息" name="2">
            <el-form label-width="100px">
              <el-form-item label="拼团名称">
                <span>{{promotionName}}</span>
              </el-form-item>
              <el-form-item label="拼得商品">
                <div class="goods">
                  <img :src="goalGoods.goodsPictureUrl" alt />
                  <div class="msg">
                    <p class="ellipsis goodsname">{{goalGoods.goodsName}}</p>
                    <p class="ellipsis">原价: {{goalGoods.goodsPrice}}元</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="拼团成功时间">
                <span>{{winTime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="晒单奖励" name="3">
            <el-form label-width="100px">
              <el-form-item label="点赞数量达" v-for="(item, index) in shareSetGoods" :key="index">
                <span>{{item.helpNumber}}个 送商品</span>
                <div class="goods">
                  <img :src="item.goodsPictureUrl" alt />
                  <div class="msg">
                    <p class="ellipsis goodsname">{{item.goodsName}}</p>
                    <p class="ellipsis">原价: {{item.goodsPrice}}元</p>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="点赞数量达">
                <span>{{28}}个 送商品</span>
                <div class="goods">
                  <img src="../../img/20190429153524.png" alt>
                  <div class="msg">
                    <p class="ellipsis goodsname">中国移动200元话费快充</p>
                    <p class="ellipsis">原价: 200元</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="点赞数量达">
                <span>{{28}}个 送商品</span>
                <div class="goods">
                  <img src="../../img/20190429153524.png" alt>
                  <div class="msg">
                    <p class="ellipsis goodsname">中国移动200元话费快充</p>
                    <p class="ellipsis">原价: 200元</p>
                  </div>
                </div>
              </el-form-item>-->
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="当前点赞数">
                <span>{{gainGoods.helpNumber}}</span>
              </el-form-item>
              <el-form-item label="获得商品">
                <div class="goods" v-if="gainGoods.goodsPictureUrl">
                  <img :src="gainGoods.goodsPictureUrl" alt />
                  <div class="msg">
                    <p class="ellipsis goodsname">{{gainGoods.goodsName}}</p>
                    <p class="ellipsis">原价: {{gainGoods.goodsPrice}}元</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="晒单分享" name="4">
            <textarea rows="4" v-model="text"></textarea>
            <div class="imgs">
              <ul>
                <li v-for="(item,index) in applyPictureUrls" :key="index">
                  <img :src="item" alt @dblclick="big_img(item)" />
                </li>
              </ul>
              <el-dialog :visible.sync="dialogVisible1" width="30%" class="big_img">
                <img :src="bigImg" alt style="width: 360px;" />
              </el-dialog>
            </div>
          </el-collapse-item>
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
      activeName: ["1", "2", "3"],
      id: this.$route.query.id,
      text: "", // 用于保存晒单分享的内容
      examineName: "", // 审核人
      applyTime: "", //申请时间
      examineTime: "", // 审核时间
      promotionName: "", // 拼团名称
      goalGoods: {},
      winTime: "", // 拼团成功时间
      shareSetGoods: [],
      gainGoods: {}, // 获得的商品
      applyPictureUrls: [],
      dialogVisible1: false,
      bigImg: ""
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    get_detail() {
      this.$axios.post("/web_share/get", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.examineName = data.examineName;
          this.applyTime = data.applyTime;
          this.examineTime = data.examineTime;
          this.promotionName = data.promotionName;
          this.goalGoods = data.goalGoods;
          this.winTime = data.winTime;
          this.shareSetGoods = data.shareSetGoods;
          if (data.gainGoods != null) {
            this.gainGoods = data.gainGoods;
          }
          this.text = data.applyMessage;
          this.applyPictureUrls = data.applyPictureUrls;
        }
      });
    },
    big_img(url) {
      this.dialogVisible1 = true;
      this.bigImg = this.url;
    }
  }
};
</script>



<style lang="less">
.reviewrefuse-container {
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
    .el-main {
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            font-weight: 600;
            border-bottom: 1px solid #e4e5e7;
            background-color: #eff3f6;

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
              display: flex;
              background-color: #eff3f6;
            }
          }
          &:nth-of-type(1) {
            .el-collapse-item__content {
              .pending_review {
                display: flex;
                > div {
                  text-align: center;
                  color: #00baff;
                  i {
                    font-size: 20px;
                  }
                }
                > span {
                  line-height: 46px;
                  margin-left: 20px;
                  color: #000;
                }
              }
              > img {
                height: 21px;
                margin: 0 40px;
                margin-top: 12.5px;
              }
              .review_refuse {
                display: flex;

                div:first-of-type {
                  text-align: center;
                  color: #fd4740;
                  i {
                    font-size: 20px;
                  }
                }
                div:last-of-type {
                  display: flex;
                  flex-direction: column;
                  margin-left: 10px;
                  span {
                    height: 20px;
                    line-height: 20px;
                    width: 300px;
                  }
                }
              }
            }
          }
          &:nth-of-type(2) {
            .el-collapse-item__content {
              .el-form-item {
                margin-right: 40px;
                .el-form-item__content {
                  // color:#000;
                  // font-weight: 600;
                  height: 60px;
                }
              }
            }
          }
          &:nth-of-type(3) {
            .el-collapse-item__content {
              .el-form {
                display: flex;
                flex-direction: column;
                .el-form-item {
                  margin-right: 40px;
                  margin-bottom: 40px;
                  .el-form-item__content {
                    // color:#000;
                    // font-weight: 600;
                    display: flex;
                    height: 60px;
                    span {
                      margin-right: 20px;
                      color: #000;
                      font-weight: 600;
                    }
                  }
                  &:last-of-type {
                    margin-bottom: 0;
                  }
                }
                &:last-of-type {
                  margin-left: 80px;
                }
              }
            }
          }
          &:nth-of-type(4) {
            .el-collapse-item__content {
              flex-direction: column;
              textarea {
                width: 600px;
                background-color: transparent;
                border: 1px solid #ccc;
                resize: none;
              }
              .imgs {
                margin-top: 20px;
                ul {
                  display: flex;
                  li {
                    height: 100px;
                    margin-right: 10px;
                    text-align: center;
                    img {
                      height: 100px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .el-form {
        display: flex;
        .el-form-item {
          margin-bottom: 0;

          .el-form-item__label {
            text-align: left;
            color: #000;
            font-weight: 600;
          }
        }
      }
      .goods {
        display: flex;
        height: 60px;
        img {
          width: 70px;
          height: 60px;
          display: block;
        }
        .msg {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          margin-left: 10px;
          p {
            height: 30px;
            line-height: 30px;
            width: 120px;
          }
        }
      }
    }
    .big_img {
      .el-dialog {
        border: none;
        background: transparent;
        box-shadow: none;
        .el-dialog__body {
          text-align: center;
        }
      }
    }
  }
}
</style>
