<template>
  <div class="approvaldetail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="晒单审核信息" name="1">
            <div>
              <i class="el-icon-time"></i>
              <p>待审核</p>
            </div>
            <span>{{applyTime}}</span>
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
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="当前点赞数">
                <!-- <span v-if="gainGoods">{{gainGoods.helpNumber}}</span> -->
                <el-input v-model="helpNumber"></el-input>&nbsp;
                <span>个</span>
              </el-form-item>
              <el-form-item label="获得商品" v-if="gainGoods.goodsName">
                <div class="goods" v-if="gainGoods">
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
        <div class="btn">
          <el-button type="primary" @click="submit_change(1)">审核通过</el-button>
          <el-button @click="dialogVisible = true">审核拒绝</el-button>
        </div>
        <el-dialog title="审核拒绝" :visible.sync="dialogVisible" width="30%">
          <span>拒绝理由</span>
          <textarea v-model="text1"></textarea>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit_change(2)">确 定</el-button>
            <el-button @click=" dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
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
      applyTime: "", //申请时间
      promotionName: "", // 拼团名称
      goalGoods: {},
      winTime: "", // 拼团成功时间
      shareSetGoods: [],
      gainGoods: {}, // 获得的商品
      applyPictureUrls: [],
      dialogVisible: false,
      text1: "", // 用于储存管理员编辑的内容
      dialogVisible1: false,
      bigImg: "",
      helpNumber: "" //帮助拼团个数
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
          this.applyTime = data.applyTime;
          this.promotionName = data.promotionName;
          this.goalGoods = data.goalGoods;
          this.winTime = data.winTime;
          this.shareSetGoods = data.shareSetGoods;
          // this.gainGoods = data.gainGoods;
          this.text = data.applyMessage;
          this.applyPictureUrls = data.applyPictureUrls;
        }
      });
    },
    submit_change(type) {
      let data =
        "id=" + this.id + "&status=" + type 
      if (type == 2) {
        if (!this.text1) {
          return this.$message({
            type: "warning",
            message: "请输入拒绝理由"
          });
        } else {
          data += '&examineMessge=' + this.text1
        }
      } else {
        data += '&helpNumber=' + this.helpNumber	
      }

      this.$axios.post("/web_share/audit", data).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$router.push("/interactive");
            return this.$message({
              type: "success",
              message: "提交成功"
            });
          } else if (result.data.data == 0) {
            return this.$message({
              type: "warning",
              message: "提交失败"
            });
          }
        }
      });
    },
    big_img(url) {
      this.dialogVisible1 = true;
      this.bigImg = url;
    }
  },
  watch: {
    helpNumber: function(val, oldVal) {
      var falg = 0; //
      this.shareSetGoods.forEach((item, index) => {
        if (parseInt(val) >= parseInt(item.helpNumber)) {
          falg = 1;
          this.gainGoods = item;
        } else {
          if (!falg) {
            this.gainGoods = {};
          }
        }
      });
    }
  }
};
</script>



<style lang="less">
.approvaldetail-container {
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
  .el-input {
    width: 80px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: auto;
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
              display: flex;
              > div {
                text-align: center;
                color: #00baff;
                i {
                  font-size: 20px;
                }
              }
              > span {
                line-height: 40px;
                margin-left: 20px;
                color: #000;
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
              > textarea {
                width: 600px;
                background-color: transparent;
                border: 1px solid #ccc;
                resize: none;
                padding: 5px 10px;
                box-sizing: border-box;
                font-weight: 600;
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
                .el-dialog {
                  border: none;
                  background: transparent;
                  box-shadow: none;
                  .el-dialog__body {
                    img {
                      margin: 0 auto;
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
      .btn {
        margin-top: 20px;
        text-align: center;
        .el-button {
          width: 85px;
          height: 30px;
          padding: 0;
          margin: 0 50px;
          &:last-of-type {
            color: #409eff;
          }
        }
      }
      .el-dialog {
        width: 700px !important;
        height: 465px;
        position: relative;
        .el-dialog__header {
          text-align: center;
          font-weight: 600;
          .el-dialog__title {
            font-size: 14px;
          }
        }
        .el-dialog__body {
          margin-top: 40px;
          display: flex;
          span {
            margin-left: 170px;
            color: #5d70e9;
          }
          textarea {
            margin-left: 70px;
            border: 1px solid #ccc;
            width: 210px;
            height: 130px;
            padding: 5px 10px;
            box-sizing: border-box;
            color: #666;
          }
        }
        .el-dialog__footer {
          position: absolute;
          bottom: 110px;
          width: 100%;
          text-align: center;
          .dialog-footer {
            .el-button {
              width: 60px;
              height: 30px;
              padding: 0;
              margin: 0 80px;
              &:last-of-type {
                color: #409eff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
