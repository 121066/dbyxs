<template>
  <div class="add_lottery_activity-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="form.activeName">
          <el-collapse-item title="积分抽奖活动名称" name="1">
            <el-form label-width="60px">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动状态" name="2">
            <el-form label-width="105px">
              <el-form-item>
                <el-radio v-model="form.radio" :label="1">禁用</el-radio>
                <el-radio v-model="form.radio" :label="2" @change="change_status">启用</el-radio>
              </el-form-item>
              <el-form-item label="本次抽奖积分">
                <el-input v-model="form.points"></el-input>&nbsp;
                <span>积分</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动抽奖设置" name="3">
            <p style="color:#666;">
              <i class="el-icon-warning" style="color:#409eff"></i>
              <span style="color:#409eff">说明</span>
              ：中奖概率数值为大于0的整数，且数值越大，抽中对应奖品概率越大
            </p>
            <div class="circle">
              <ul>
                <li v-for="item in form.prizeList" :key="item.id">
                  <img src="@/img/button.png" alt v-if="item.id == 5">
                  <div
                    v-if="item.id != 5 && !item.flag"
                    class="add_type"
                    @click="selectGoods(item.id)"
                  >
                    <i class="el-icon-circle-plus-outline"></i>
                    <span>添加</span>
                  </div>
                  <div class="prize_goods" v-if="item.flag == 2">
                    <img :src="item.picture" alt>
                    <span @click="selectGoods(item.id,item.flag,item)">修改</span>
                    <p class="ellipsis">{{item.goodsName}}</p>
                    <p>中奖概率:{{item.probibality}}</p>
                  </div>
                  <div class="prize_points" v-if="item.flag == 1">
                    <img src="@/img/icon_points.png" alt>
                    <span @click="selectGoods(item.id,item.flag,item)">修改</span>
                    <p class="ellipsis">{{item.points}}积分</p>
                    <p>中奖概率:{{item.probibality}}</p>
                  </div>
                  <div class="no_prize" v-if="item.flag == 3">
                    <span @click="selectGoods(item.id,item.flag,item)">修改</span>
                    <p class="ellipsis">{{item.thanks}}</p>
                    <p>中奖概率:{{item.probibality}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="btn">
          <el-button type="primary" @click="add_activity">确 定</el-button>
          <el-button @click="$router.push('/points_activitys')">取 消</el-button>
        </div>
        <el-dialog title="添加商品" :visible.sync="form.dialogVisible">
          <el-form label-width="70px">
            <el-form-item label="奖品类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in form.prizeType"
                  :key="item.id"
                  :label="item.key"
                  :value="item.id"
                  @change="change_lottery_status"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="积分" v-if="form.type== 1">
              <el-input v-model="form.prizePoints"></el-input>
            </el-form-item>
            <el-form-item label="选择商品" v-if="form.type== 2" class="select_goods">
              <div class="goods">
                <img :src="form.goods.picture" alt>
                <div class="goods_msg" v-if="form.goods.picture">
                  <p class="ellipsis">{{form.goods.goodsName}}</p>
                  <p>原价:{{form.goods.goodsPrice}}元</p>
                </div>
              </div>
              <el-button type="primary" @click="jump_goods">选择商品</el-button>
            </el-form-item>
            <el-form-item label="感谢语" v-if="form.type== 3">
              <el-input v-model="form.thanks" disabled></el-input>
            </el-form-item>
            <el-form-item label="中奖概率">
              <el-input v-model="form.prizeProbability"></el-input>&nbsp;
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit_goods">确 定</el-button>
            <el-button @click="form.dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <el-dialog title="添加提醒" :visible.sync="form.dialogVisible1" width="30%" class="tips">
          <div>
            <p>当前有多个启动的抽奖活动，如果添加则以当前活动为主</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="form.dialogVisible1 = false">确 定</el-button>
            <el-button @click="cancel_rewards = false">取消</el-button>
          </span>
        </el-dialog>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import {add_lottery} from '../../api/getData'
export default {
  components: { breadcrumb },
  data() {
    return {
      form: {
        activeName: ["1", "2", "3"],
        prizeId: "", //   用于是那个位置的奖励,
        name: "",
        points: "",
        createTime: "2018-02-12 05:20:20",
        modifyTime: "2018-05-12 05:20:20",
        prizePoints: "",
        prizeProbability: "", // 中奖概率
        pointsGoods: "", //中奖商品
        thanks: "谢谢惠顾",
        radio: 1,
        prizeList: [
          { id: 1, flag: "" },
          { id: 2, flag: "" },
          { id: 3, flag: "" },
          { id: 4, flag: "" },
          { id: 5, flag: "1" },
          { id: 6, flag: "" },
          { id: 7, flag: "" },
          { id: 8, flag: "" },
          { id: 9, flag: "" }
        ],
        prizeType: [
          { id: "1", key: "积分" },
          { id: "2", key: "商品" },
          { id: "3", key: "没有中奖" }
        ],
        type: "1", // 用于标记奖品类型
        isPic: "", //  用于标记中间的一个为抽奖的按钮
        dialogVisible: false,
        dialogVisible1: false,
        goods: { picture: "", goodsName: "", goodsPrice: "", id: "" }
      }
    };
  },
  created() {
    if (localStorage.getItem("msg")) {
      this.form = JSON.parse(localStorage.getItem("msg"));
      this.form.dialogVisible = true;
      let id = localStorage.getItem("id");
      localStorage.removeItem("id");
      localStorage.removeItem("msg");
      this.get_goodsDetail(id);
    }
  },
  methods: {

        //   当用户取消商品的时候，需要进行清空
    cancel_rewards(){
            this.form.type = 1 + "";
      this.form.prizePoints = "";
      this.form.prizeProbability = "";
      this.form.thanks = "";
      this.form.goods = { picture: "", goodsName: "", goodsPrice: "" };
    },
    selectGoods(id, type, prizeMsg) {
      if (!type) {
        this.form.type = 1 + "";
        this.form.prizePoints = "";
        this.form.prizeProbability = "";
        this.form.goods = { picture: "", goodsName: "", goodsPrice: "" };
      }
      if (type == 1) {
        this.form.type = type + "";
        this.form.prizePoints = prizeMsg.points;
        this.form.prizeProbability = prizeMsg.probibality;
      } else if (type == 2) {
        this.form.type = type + "";
                       this.form.goods['picture'] = prizeMsg.picture
                this.form.goods['goodsName'] = prizeMsg.goodsName
                this.form.goods['goodsPrice'] = prizeMsg.goodsPrice
                this.form.goods['id'] = prizeMsg.goodsId
        this.form.prizeProbability = prizeMsg.probibality;
      } else if (type == 3) {
        this.form.type = type + "";
        this.form.thanks = prizeMsg.thanks;
        this.form.prizeProbability = prizeMsg.probibality;
      }
      this.form.prizeId = id;

      this.form.dialogVisible = true;
    },
    submit_goods() {
      this.form.prizeList.forEach(item => {
        if (item.id == this.form.prizeId) {
          if (this.form.type == 1) {
            item.flag = 1;
            item["points"] = this.form.prizePoints;
            item["probibality"] = this.form.prizeProbability;
          } else if (this.form.type == 2) {
            item.flag = 2;
            item["picture"] = this.form.goods.picture;
            item["goodsId"] = this.form.goods.id;
            item["goodsName"] = this.form.goods.goodsName;
            item["goodsPrice"] = this.form.goods.goodsPrice;
            item["probibality"] = this.form.prizeProbability;

          } else if (this.form.type == 3) {
            item.flag = 3;
            item["thanks"] = this.form.thanks;
            item["probibality"] = this.form.prizeProbability;
          }
        }
      });
      if (!this.form.prizeProbability) {
        return this.$message({
          type:'warning',
          message:'请输入中奖概率'
        });
      }
      if (this.form.type == 1) {
        if (!this.form.prizePoints) {
          return this.$message({
            type:'warning',
            message:'请输入积分'
          });
        }
      }

      if (this.form.type == 2) {
        if (!this.form.goods.id) {
          return this.$message({
            type:"warning",
            message:'请选择商品'
          });
        }
      }
      if (this.form.type == 3) {
        if (!this.form.thanks) {
          return this.$message({
            type:'warning',
            message:'请输入感谢语'
          });
        }
      }
      this.form.type = 1 + "";
      this.form.prizePoints = "";
      this.form.prizeProbability = "";
      this.form.goods = { picture: "", goodsName: "", goodsPrice: "" };
      this.form.dialogVisible = false;
    },
    jump_goods() {
      localStorage.setItem("msg", JSON.stringify(this.form));
      this.form.dialogVisible = false;
      this.$router.push("/points_selectGoods?type=7");
    },
    get_goodsDetail(id) {
      this.$axios.post("web_goods/get_one", "id=" + id).then(result => {

        if (result.data.status == 0) {
          let data = result.data.data.goods;
          this.form.goods = {
            picture: data.pictureUrl,
            goodsName: data.name,
            goodsPrice: data.price,
            id: data.id
          };
        }
      });
    },
    change_lottery_status() {
      this.form.prizePoints = "";
      this.form.prizeProbability = "";
      this.form.goods = { picture: "", goodsName: "", goodsPrice: "" };
      this.form.dialogVisible = false;
    },
    add_activity() {
      if (!this.form.name) {
        return this.$message({
          type:'warning',
          message:'活动名称不能为空'
        });
      }
      if (!this.form.radio) {
        return this.$message({
          type:'warning',
          message:'活动状态不能为空'
        });
      }
      if (!this.form.points) {
        return this.$message({
          type:'warning',
          message:'本次抽奖积分不能为空'
        });
      }
      this.form.prizeList.forEach(item => {
        if (!item.flag) {
          return this.$message({
            type:"warning",
            message:'存在没有添加的商品'
          });
        }
      });
      let drawItemVo = [];
      this.form.prizeList.forEach((item,index) => {
        if (item.id != 5) {
            if(index >= 5){
              index--
            }
          if (item.flag == 1) {
            drawItemVo.push({
              drawType: 2 + '',
              drawcore: item.points,
              drawWeight: item.probibality,
              drawNo: index + 1 + ''

            });
          } else if (item.flag == 2) {
            drawItemVo.push({
              drawType: 1 + '',
              drawGoodId: item.goodsId,
              drawWeight: item.probibality,
              drawNo: index + 1 + ''
            });
          } else {
            drawItemVo.push({ drawType: 3 + '', drawWeight: item.probibality,drawNo:index + 1 + ''});
          }
        }
      });
      let drawVo = {};
      drawVo["drawItemVo"] = drawItemVo;
      drawVo["drawName"] = this.form.name;
      drawVo["drawScore"] = this.form.points;
      drawVo["drawStatus"] = this.form.radio - 1 + '';

      add_lottery('drawVo='+JSON.stringify(drawVo)).then(res => {
        if(res.data.status == 0){
          if(res.data.data == 1){
            this.$router.push('/points_activitys')
            return this.$message({
              type:'success',
              message:'添加成功'
            })
          } else {
            return this.$$message({
              type:'warning',
              message:'添加失败'
            })
          }
        }
      })
      
    },
    change_status() {
      if (this.form.radio == 2) {
        this.form.dialogVisible1 = true;
      }
    }
  }
};
</script>



<style lang="less">
.add_lottery_activity-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  position: relative;
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
              padding-left: 45px;
              display: flex;
              background-color: #eff3f6;
              .el-form {
                width: 100%;
                .el-form-item {
                  margin-bottom: 0;
                  .el-form-item__label {
                    text-align: left;
                    font-weight: bold;
                    color: #000;
                  }
                  .el-form-item__content {
                    .el-input {
                      width: 150px;
                      .el-input__inner {
                        height: 30px;
                      }
                    }
                  }
                }
              }
            }
          }
          &:nth-of-type(2) {
            .el-form {
              display: flex;
              .el-form-item {
                width: 230px;
                &:nth-of-type(1) {
                  .el-form-item__header {
                    width: 0px !important;
                  }
                  .el-form-item__content {
                    margin-left: 0 !important;
                  }
                }
                &:nth-of-type(2) {
                  width: 400px;
                }
              }
            }
          }
          &:nth-of-type(3) {
            .el-collapse-item__content {
              display: block;
              p {
                line-height: 32px;
              }
            }
            .circle {
              width: 380px;
              height: 380px;
              background-color: #e4e4e4;
              border-radius: 15px;
              box-sizing: border-box;
              padding: 30px;
              ul {
                display: flex;
                flex-wrap: wrap;
                li {
                  width: 100px;
                  height: 100px;
                  background-color: #fff;
                  border-radius: 5px;
                  &:nth-of-type(3n-1) {
                    margin: 0 10px;
                  }
                  &:nth-of-type(-n + 6) {
                    margin-bottom: 10px;
                  }
                  &:nth-of-type(5) {
                    text-align: center;
                    box-sizing: border-box;
                    padding-top: 11px;
                    background-color: transparent;
                  }
                }
              }
              .add_type {
                height: 100%;
                text-align: center;
                cursor: pointer;
                i {
                  font-size: 30px;
                  display: inline-block;
                  width: 100%;
                  color: #dbdbdb;
                  margin-top: 25px;
                  margin-bottom: 5px;
                }
                span {
                  font-size: 14px;
                  color: #0066ff;
                }
              }
              .prize_goods {
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 10px;
                img {
                  width: 40px;
                  height: 45px;
                  vertical-align: top;
                }
                span {
                  vertical-align: top;
                  display: inline-block;
                  height: 50px;
                  margin-left: 10px;
                  line-height: 50px;
                  color: #409eff;
                  cursor: pointer;
                }
                p {
                  line-height: 16px;
                  font-size: 12px;
                  color: #666;
                }
              }
              .prize_points {
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 16px;
                span {
                  vertical-align: top;
                  display: inline-block;
                  height: 28px;
                  margin-left: 10px;
                  line-height: 28px;
                  color: #409eff;
                  cursor: pointer;
                }
                p {
                  line-height: 18px;
                  font-size: 12px;
                  color: #666;
                }
              }
              .no_prize {
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 20px;
                span {
                  vertical-align: top;
                  display: inline-block;
                  height: 20px;
                  line-height: 20px;
                  color: #409eff;
                  cursor: pointer;
                }
                p {
                  line-height: 22px;
                  font-size: 12px;
                  color: #666;
                }
              }
            }
          }
        }
      }
      .btn {
        text-align: center;
        .el-button {
          width: 60px;
          height: 30px;
          margin: 0 70px;
        }
      }
    }
    .el-dialog {
      width: 695px !important;
      height: 465px;
      .el-dialog__header {
        padding: 0;
        line-height: 80px;
        text-align: center;
        font-size: 14px;
      }
      .el-dialog__body {
        padding: 0;
        .el-form {
          .el-form-item {
            margin: 0 auto;
            margin-bottom: 25px;
            width: 320px;
            .el-form-item__content {
              width: 200px;
              margin-left: 120px !important;
            }
            &:nth-of-type(3) {
              margin-left: 186px !important;
              width: 340px;
              .el-form-item__content {
                display: flex;
                width: 220px !important;
              }
            }
          }
        }

        .el-input {
          width: 200px;
          //   height: 30px;
          .el-input__inner {
            height: 30px;
          }
        }
        .select_goods {
          width: 500px !important;
          margin-left: 185px !important;
          .el-form-item__content {
            width: 350px !important;
            display: flex;
            .el-button {
              width: 85px;
              height: 30px;
              margin-left: 10px;
            }
          }
        }
        .goods {
          width: 200px;
          height: 90px;
          border: 1px solid #ccc;
          display: flex;
          box-sizing: border-box;
          padding: 10px;
          img {
            width: 70px;
            height: 60px;
            display: block;
          }
          .goods_msg {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-left: 10px;
            p {
              height: 30px;
              line-height: 30px;
              width: 100px;
            }
          }
        }
      }
      .el-dialog__footer {
        text-align: center;
        margin-top: 100px;
      }
      .dialog-footer {
        .el-button {
          width: 60px;
          height: 30px;
          margin: 0 70px;
          &:nth-of-type(2) {
            color: #409eff;
            border: 1px solid #409eff;
          }
        }
      }
    }
    .tips {
      .el-dialog {
        width: 555px !important;
        height: 340px !important;
        .el-dialog__header {
          line-height: 75px;
          text-align: center;
          padding: 0;
          .el-dialog__title {
            font-size: 16px;
          }
        }
        .el-dialog__body {
          padding: 0;
          margin-top: 30px;
          > div {
            p {
              line-height: 30px;
              text-align: center;
              color: #fe000c;
            }
          }
        }
        .el-dialog__footer {
          margin-top: 60px;
          text-align: center;
          .el-button {
            width: 60px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
