<template>
  <div class="ranking_add-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="排行榜设置名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
  
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="排行榜奖品设置" name="2">
            <div class="add_area" v-for="(item, index) in form.activitySetting" :key="index">
              <div class="area">
                <span>{{item.start}}</span>
                <span v-if="item.start != item.end">-</span>
                <span v-if="item.start != item.end">{{item.end}}</span>
                名
              </div>
              <div style="height: 140px;">
                <div class="goods">
                  <i
                    class="el-icon-circle-plus-outline"
                    style="color:#409eff;font-size:30px;cursor:pointer;"
                    @click="select_goods(index)"
                    v-if="!item.goods.id"
                  ></i>
                  <img :src="item.goods.picture" alt v-if="item.goods.picture">
                  <div class="goods_msg" v-if="item.goods.picture">
                    <p class="ellipsis">{{item.goods.name}}</p>
                    <p>原价:{{item.goods.price}}元</p>
                  </div>
                </div>
                <div
                  @click="select_goods(index)"
                  v-if="item.goods.id"
                  style="width:100px;height: 30px;margin-top: 10px;display:flex;align-items:center;border:1px solid #409eff;border-radius: 10px;color:#409eff;cursor:pointer;"
                >
                  <img src="../../img/icon_11.png" alt style="margin-left: 13px;">
                  <span>切换商品</span>
                </div>
              </div>
              <div class="btn">
                <div class="btn1">
                  <el-button @click="add_area(1,index)" v-if="item.isshow3">在其前添加区间</el-button>
                  <el-button @click="add_area(2,index)" v-if="item.isshow4">在其后添加区间</el-button>
                </div>
                <div class="btn2">
                  <el-button v-if="item.isshow1" @click="merge_area(1,index)">合并其前区间</el-button>
                  <el-button v-if="item.isshow2" @click="merge_area(2,index)">合并其后区间</el-button>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="send_ranking_add">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
      <!-- <el-dialog title="添加提醒" :visible.sync="form.dialogVisible1" width="30%" class="tips">
        <div>
          <p>当前有多个启动的抽奖活动，如果添加则以当前活动为主</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="form.dialogVisible1 = false">确 定</el-button>
          <el-button @click="form.dialogVisible1 = false">取消</el-button>
        </span>
      </el-dialog>-->
      <el-dialog title="提示" :visible.sync="form.dialogVisible" width="30%" class="add_dialog">
        <el-form lable-width="110px">
          <el-form-item label="开始名次">
            <el-input type="number" v-model="form.startRanking" @blur="check_value"></el-input>
          </el-form-item>
          <el-form-item label="结束名次">
            <el-input type="number" v-model="form.endRanking" @blur="check_value"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_activity">确 定</el-button>

          <el-button @click="form.dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { goods_detail, add_ranking } from "../../api/getData";

export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2"],
      form: {
        name: "",
        // radio: "1",
        dialogVisible: false,
        // dialogVisible1: false,
        startRanking: "",
        endRanking: "",
        type: "", //   用于标记是向前添加，还是向后添加
        position: "", //  用于标记该区间位于哪个位置
        flag: false,
        activitySetting: [
          {
            start: "1",
            end: "100",
            goods: { picture: "", price: "", name: "", id: "" },
            isshow1: false,
            isshow2: false,
            isshow3: true,
            isshow4: true
          }
        ],
        positionId: ""
      }
    };
  },
  created() {
    if (localStorage.getItem("id")) {
      var msg = localStorage.getItem("msg") || "";
      localStorage.removeItem("msg");
      this.form = JSON.parse(msg);
      var id = localStorage.getItem("id") || "";
      localStorage.removeItem("id");

      this.get_goods_detail(id);
    }
  },
  methods: {
    change_status() {
      if (this.form.radio == 1) {
        this.form.dialogVisible1 = true;
      }
    },
    add_area(type, position) {
      this.form.dialogVisible = true;
      this.form.type = type;
      this.form.position = position;
      if (type == 1) {
        this.form.endRanking = "";
        this.form.activitySetting.forEach((item, index) => {
          if (index == position) {
            this.form.startRanking = item.start;
          }
        });
      } else if (type == 2) {
        this.form.startRanking = "";
        this.form.activitySetting.forEach((item, index) => {
          if (index == position) {
            this.form.startRanking = parseInt(item.start) + 1;
            this.form.endRanking = item.end;
          }
        });
      }
    },
    add_activity() {
      if (!this.form.flag) {
        return true;
      }
      if (this.form.type == 1) {
        this.form.activitySetting.forEach((item, index) => {
          if (this.form.position == index) {
            if (this.form.position == 0) {
              this.form.activitySetting.splice(index, 0, {
                start: this.form.startRanking,
                end: this.form.endRanking,
                goods: { picture: "", price: "", name: "" },
                isshow1: false,
                isshow2: true,
                isshow3: true,
                isshow4: true
              });
            } else {
              this.form.activitySetting.splice(index, 0, {
                start: this.form.startRanking,
                end: this.form.endRanking,
                goods: { picture: "", price: "", name: "" },
                isshow1: true,
                isshow2: true,
                isshow3: true,
                isshow4: true
              });
            }

            item.start = parseInt(this.form.activitySetting[index].end) + 1;
            if (index == this.form.activitySetting.length - 2) {
              item.isshow2 = false;
            } else {
              item.isshow2 = true;
            }
            item.isshow1 = true;
          }
          this.form.lenth = this.form.activitySetting.length;

        });
      } else if (this.form.type == 2) {
        this.form.activitySetting.forEach((item, index) => {
          if (this.form.position == index) {
            if (this.form.position == this.form.activitySetting.length - 1) {
              this.form.activitySetting.splice(index + 1, 0, {
                start: this.form.startRanking,
                end: this.form.endRanking,
                goods: { picture: "", price: "", name: "" },
                isshow1: true,
                isshow2: false,
                isshow3: true,
                isshow4: true
              });
            } else {
              this.form.activitySetting.splice(index + 1, 0, {
                start: this.form.startRanking,
                end: this.form.endRanking,
                goods: { picture: "", price: "", name: "" },
                isshow1: true,
                isshow2: true,
                isshow3: true,
                isshow4: true
              });
            }

            item.end = parseInt(this.form.activitySetting[index + 1].start) - 1;
            if (this.form.activitySetting.length == 0) {
              item.isshow2 = false;
            } else {
              item.isshow2 = true;
            }
            item.isshow2 = true;
          }
        });
      }
      this.form.activitySetting.forEach(item => {
        if (item.end == item.start) {
          item.isshow3 = false;
          item.isshow4 = false;
        }
      });
      this.form.dialogVisible = false;
    },
    check_value() {
      if (this.form.type == 1) {
        this.form.activitySetting.forEach((item, index) => {
          if (index == this.form.position) {
            if (this.form.startRanking != item.start) {
              this.form.startRanking = item.start;
              this.form.flag = false;

              return this.$message({
                type:'warning',
                message:"开始名次必须为" + item.start
              });
            }
            if (parseInt(this.form.endRanking) >= parseInt(item.end)) {
              this.form.endRanking = "";
              this.form.flag = false;

              return this.$message({
                type:'warning',
                message:"输入的值必须要小于" + item.end
              });
            } else {
              // this.forEach.unshift({
              //   start:this.form.startRanking,
              //   end: this.form.endRanking
              // })
              this.form.flag = true;
              // item.start = this.form.endRanking + 1
            }
            if (
              parseInt(this.form.startRanking) > parseInt(this.form.endRanking)
            ) {
              this.form.flag = false;

              return this.$message({
                type:'warning',
                message:'结束名次不能小于开始名次'
              });
            } else {
              this.form.flag = true;
            }
          }
        });
      } else if (this.form.type == 2) {
        this.form.activitySetting.forEach((item, index) => {
          if (index == this.form.position) {
            if (this.form.endRanking != item.end) {
              this.form.endRanking = item.end;
              this.form.flag = false;

              return this.$message({
                type:'warning',
                message:"结束名次必须为" + item.end
              });
            } else {
              this.form.flag = true;
            }
            if (parseInt(this.form.startRanking) <= parseInt(item.start)) {
              this.form.startRanking = "";
              this.form.flag = false;

              return this.$message({
                type:'warning',
                message:"输入的值必须大于" + item.start
              });
            } else {
              this.form.flag = true;
            }
          }
        });
      }
    },
    merge_area(type, position) {
      if (type == 1) {
        this.form.activitySetting.forEach((item, index) => {
          if (position == index) {
            var start = this.form.activitySetting[index - 1].start;
            this.form.activitySetting.splice(index - 1, 1);
            this.form.activitySetting[index - 1].start = start;
          }
        });
        this.form.activitySetting[0].isshow1 = false;
      } else {
        this.form.activitySetting.forEach((item, index) => {
          if (position == index) {
            var end = this.form.activitySetting[index + 1].end;
            this.form.activitySetting.splice(index + 1, 1);
            this.form.activitySetting[index].end = end;
          }
        });
        this.form.activitySetting[
          this.form.activitySetting.length - 1
        ].isshow2 = false;
      }
    },
    select_goods(index) {
      this.form.positionId = index;
      localStorage.setItem("msg", JSON.stringify(this.form));
      this.$router.push("/ranking_selectGoods?type=" + 13);
    },
    get_goods_detail(id) {
      goods_detail("id=" + id).then(res => {
        if (res.data.status == 0) {
          var data = res.data.data.goods;
          this.form.activitySetting.forEach((item, index) => {
            if (this.form.positionId == index) {
              item.goods.id = data.id;
              item.goods.picture = data.pictureUrl;
              item.goods.price = data.price;
              item.goods.name = data.name;
            }
          });
        }
      });
    },
    send_ranking_add() {
      if (!this.form.name) {
        return this.$message({
          type:'warning',
          message:'活动名称不能为空'
        });
      }
      this.form.activitySetting.forEach(item => {
        if (!item.goods.id) {
          return this.$message({
            type:"warning",
            message:'设置奖品不能为空'
          });
        }
      });
      var formData = new FormData();
      let rankingDetailVo = {};
      formData.append("name", this.form.name);
      rankingDetailVo["name"] = this.form.name;
      let goods = [];
      this.form.activitySetting.forEach(item => {
        // formData.append("goods", JSON.stringify({
        //   id: item.goods.id,
        //   endRanking: item.end,
        //   startRanking: item.start
        // }));
        goods.push({
          id: item.goods.id,
          endRanking: item.end,
          startRanking: item.start
        });
      });
      rankingDetailVo['goods'] = goods
      add_ranking("rankingDetailVo=" + JSON.stringify(rankingDetailVo)).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.$router.push('/ranking_list')
            return this.$message({
              type:'success',
              message:'添加成功'
            });
          } else {
            return this.$message({
              type:'warning',
              message:'添加失败'
            });
          }
        }
      });
    }
  }
};
</script>



<style lang="less">
.ranking_add-container {
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
            }
          }
          &:nth-of-type(1) {
            .el-collapse-item__content {
              .el-form {
                .el-form-item {
                  margin-right: 200px;
                }
              }
            }
          }
          &:nth-of-type(2) {
            .el-collapse-item__content {
              padding-left: 66px;
            }
            .add_area {
              display: flex;
              .area {
                margin-right: 10px;
                width: 70px;
              }
              .goods {
                width: 180px;
                height: 90px;
                border: 1px solid #ccc;
                display: flex;
                align-items: center;
                padding-left: 10px;
                box-sizing: border-box;
                i {
                  margin-left: 65px;
                }

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
                    width: 90px;
                  }
                }
              }
              .btn {
                width: 350px;
                display: flex;

                .btn1 {
                  .el-button {
                    background-color: #409eff;
                    border: 1px solid #409eff;
                    color: #fff;
                  }
                }
                .btn2 {
                  .el-buttom {
                    color: #409eff;
                    border: 1px solid #409eff;
                  }
                }
                .el-button {
                  width: 132px;
                  display: block;
                  height: 34px;
                  line-height: 34px;
                  margin-left: 25px;
                  margin-bottom: 20px;
                  border-radius: 10px;
                  // &:nth-of-type(1) {
                  //   background-color: #409eff;
                  //   border: 1px solid #409eff;
                  //   color: #fff;
                  // }
                  // &:nth-of-type(2) {
                  //   color: #409eff;
                  //   border: 1px solid #409eff;
                  // }
                  // &:nth-of-type(3) {
                  //   background-color: #409eff;
                  //   border: 1px solid #409eff;
                  //   color: #fff;
                  // }
                  // &:nth-of-type(4) {
                  //   color: #409eff;
                  //   border: 1px solid #409eff;
                  // }
                }
              }
            }
          }
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
  .add_dialog {
    .el-dialog {
      width: 695px !important;
      height: 380px !important;
      .el-dialog__header {
        line-height: 77px;
        padding: 0;
        text-align: center;
        line-height: 77px;
      }
      .el-dialog__body {
        .el-form {
          width: 310px;
          margin-left: 110px;
          .el-form-item {
            display: flex;
            text-align: center;
            .el-form-item__label {
              width: 110px;
              text-align: left;
            }
            .el-input {
              .el-input__inner {
                width: 200px;
                height: 30px;
              }
            }
          }
        }
      }
      .el-dialog__footer {
        text-align: center;
        .el-button {
          width: 60px;
          height: 30px;
          margin: 0 60px;
        }
      }
    }
  }
  .el-footer {
    margin-top: 100px;
    text-align: center;
    .el-button {
      width: 65px;
      margin: 0 60px;
    }
  }
}
</style>
