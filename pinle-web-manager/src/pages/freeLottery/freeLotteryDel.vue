<template>
  <div class="free_del-container">
    <breadcrumb></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="发起者昵称及抽奖模式" name="1">
            <el-form>
              <el-form-item>
                <img :src="usersImg" alt />

                <span>{{username}}</span>
              </el-form-item>
              <el-form-item label="抽奖模式 :" style="margin-left: 200px;">
                <span>{{pattern == 1 ? '个人模式' : '商业模式'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <el-collapse-item title="活动状态" name="2">
            <el-form>
              <el-form-item v-if="status == 1 && pattern == 1">
                <div>
                  <span style="color:#000;font-weight:bold">状态:</span>
                  <span>进行中</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动开始时间:</span>
                  <span>{{startTime}}</span>
                </div>
                <!-- <div><span style="color:#000;font-weight:bold">活动开奖时间: </span><span>{{endTime}}</span></div> -->
              </el-form-item>
              <el-form-item v-if="status == 1 && pattern == 2" class="success">
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
                    <p>审核通过(进行中)</p>
                  </div>
                  <div>
                    <span>审核者: {{auditUserName}}</span>
                    <span>{{auditTime}}</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item v-if="status == 2 && pattern == 1">
                <div>
                  <span style="color:#000;font-weight:bold">状态:</span>
                  <span>已完成</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动开始时间:</span>
                  <span>{{startTime}}</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动结束时间:</span>
                  <span>{{endTime}}</span>
                </div>
              </el-form-item>
              <el-form-item v-if="status == 2 && pattern == 2">
                <div>
                  <span style="color:#000;font-weight:bold">状态:</span>
                  <span>已完成</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动开始时间(审核通过时间):</span>
                  <span>{{auditTime}}</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动结束时间:</span>
                  <span>{{endTime}}</span>
                </div>
              </el-form-item>
              <el-form-item v-if="status == 3 && pattern == 1">
                <div>
                  <span style="color:#000;font-weight:bold">状态:</span>
                  <span>已关闭</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动开始时间:</span>
                  <span>{{createtime}}</span>
                </div>
                <!-- <div><span style="color:#000;font-weight:bold">活动开奖时间: </span><span>{{endTime}}</span></div> -->
              </el-form-item>
              <el-form-item v-if="status == 3 && pattern == 2">
                <div>
                  <span style="color:#000;font-weight:bold">状态:</span>
                  <span>已关闭</span>
                </div>
                <div>
                  <span style="color:#000;font-weight:bold">活动开始时间:</span>
                  <span>{{auditTime}}</span>
                </div>
                <!-- <div><span style="color:#000;font-weight:bold">活动开奖时间: </span><span>{{endTime}}</span></div> -->
              </el-form-item>
              <el-form-item v-if="status == 4">

               <div class="pending_review" style="text-align:center;display: flex;align-items:center;">
                  <div>
                    <i class="el-icon-time"></i>
                    <p>待审核</p>
                  </div>
                  <span style="font-size: 12px;margin-left: 15px;">{{applyTime || '2018-02-15 08:20:20'}}</span>
                </div>
              </el-form-item>
              <el-form-item v-if="status == 5" class="success">
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
                    <i class="el-icon-circle-close-outline"></i>
                    <p>审核拒绝</p>
                  </div>
                  <div>
                    <span>审核者: {{auditUserName}}</span>
                    <span>拒绝理由: {{auditNote}}</span>
                    <span>{{auditTime}}</span>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="竞价" name="3">
            <el-form>
              <el-form-item>
                <span>{{ price + ' 元'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="开奖方式" name="4">
            <el-form>
              <el-form-item label="开奖类型 :">
                <!-- <span>{{lotteryType[type].label}}</span> -->
                <span v-if="type == 1">{{'按时间自动开奖'}}</span>
                <span v-if="type == 2">{{'按人数自动开奖'}}</span>
                <span v-if="type == 3">{{'手动开奖'}}</span>
              </el-form-item>
              <el-form-item label="开奖时间" v-if="type == 1">
                <span>{{endTime}}</span>
              </el-form-item>
              <el-form-item label="开奖人数" v-if="type == 2">
                <span>{{number}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="中奖规则设置" name="5">
            <el-form>
              <el-form-item label="指定中奖性别 :">
                <span>{{gender}}</span>
              </el-form-item>
              <el-form-item label="指定抽奖参与方式 :">
                <span>{{joinType}}</span>
              </el-form-item>
              <el-form-item label="指定中奖地区限制 :">
                <span>省: {{province}}</span>
                <span>市: {{city}}</span>
                <span>区: {{area}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <el-collapse-item title="奖品设置" name="6">
            <el-form>
              <el-form-item
                :label="item.level + ':'"
                v-for="(item, index) in freeLuckyGoods"
                :key="index"
              >
                <img :src="item.pricture" alt />
                <span>{{item.name}}</span>
              </el-form-item>
              <!-- <el-form-item label="二等奖 :">
                <img
                  src="http://192.168.0.11:8080/imgs/goods/e3916f19-3e43-4c79-8324-0bdb841cc6f4"
                  alt
                >
                <span>{{'笔记本'}}</span>
              </el-form-item>
              <el-form-item label="三等奖 :">
                <img
                  src="http://192.168.0.11:8080/imgs/goods/e3916f19-3e43-4c79-8324-0bdb841cc6f4"
                  alt
                >
                <span>{{'笔记本'}}</span>
              </el-form-item>-->
            </el-form>
          </el-collapse-item>
          <!-- <el-collapse-item title="状态" name="6"> 
            <el-form>
              <el-form-item label="状态">{{'启用'}}</el-form-item>
            </el-form>
          </el-collapse-item>-->
          <el-collapse-item title="备注" name="7">
            <el-form>
              <el-form-item>
                <el-input type="textarea" v-model="note"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer v-if="flag == 2">
          <el-button type="primary" style="width: 85px;" @click="success_check">审核通过</el-button>
          <el-button
            style="color: #409eff;border:1px solid #409eff; width:85px"
            @click="refuse_check"
          >审核拒绝</el-button>
        </el-footer>

        <el-dialog title="审核拒绝" :visible.sync="dialogVisible" width="30%">
          <el-form label-width="80px">
            <el-form-item label="拒绝理由">
              <el-input type="textarea" placeholder="请输入内容" v-model="refuse_content"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sure_refuse">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { free_lottery_del, free_check } from "../../api/getData";
import { join } from "path";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4", "5", "6"],
      desc: "",
      id: this.$route.query.id,
      flag: this.$route.query.flag, //    标记是详情页面还是审核页面 当 flag = 2时，为审核页面
      username: "", // 发起者昵称
      usersImg: "", //  发起者图片
      pattern: 2, //  商业模式
      status: "", //  活动状态
      statusList: [
        { key: "1", label: "进行中" },
        { key: "2", label: "已结束" },
        { key: "3", label: "已关闭" },
        { key: "4", label: "待审核" },
        { key: "5", label: "审核拒绝" }
      ], // 活动的所有状态
      lotteryType: [
        { key: "", label: "" },
        { key: "1", label: "按时间自动开奖" },
        { key: "2", label: "按人数自动开奖" },
        { key: "3", label: "手动开奖" }
      ],
      number: "", //  开奖人
      gender: "", //  指定中奖用户性别
      joinType: "", //  拼团抽奖参与方式
      province: "", //  限制区
      city: "", //  限制市
      area: "", //   限制区
      note: "", //   抽奖区,
      freeLuckyGoods: "", //中奖商品集合
      price: "", //  竞价
      dialogVisible: false,
      refuse_content: "", //  审核拒绝的内容
      applyTime: "", //  申请时间、
      endTime: "", //   活动结束时间
      startTime: "", //  个人模式开团时间
      auditTime: "", //  审核通过时间
      auditUserName: "", //  申请者昵称
      auditNote: '',  //  审核不通过的原因
      type: this.$route.query.type //   抽奖的类型
    };
  },
  created() {
    this.get_fre_lottery_del();
  },
  methods: {
    get_fre_lottery_del() {
      free_lottery_del("id=" + this.id).then(res => {
        if (res.data.status == 0) {
          var data = res.data.data;
          this.username = data.username;
          this.usersImg = data.pricture;
          this.pattern = data.freeLuckySet.pattern;
          this.status = data.freeLuckySet.status;

          //  开奖人数
          this.number = data.freeLuckySet.number;

          //  指定中奖用户性别
          if (data.freeLuckySet.gender == 1) {
            this.gender = "男";
          } else if (data.freeLuckySet.gender == 2) {
            this.gender = "不指定";
          } else {
            this.gender = "女";
          }
          //  指定参与抽奖方式
          if (data.freeLuckySet.joinType == 1) {
            this.joinType = "个人参与";
          } else if (data.freeLuckySet.joinType == 2) {
            this.joinType = "拼团参与";
          }
          //  限制中奖地区省
          this.province = data.freeLuckySet.province;
          //  限制中奖地区市
          this.city = data.freeLuckySet.region;
          //  限制中奖地区区
          this.area = data.freeLuckySet.town;
          //  抽奖说明
          this.note = data.freeLuckySet.note;
          //  中奖商品集合
          this.freeLuckyGoods = data.freeLuckyGoods;
          this.freeLuckyGoods.forEach(item => {
            if (item.level == 1) {
              item.level = "一等奖";
            } else if (item.level == 2) {
              item.level = "二等奖";
            } else if (item.level == 3) {
              item.level = "三等奖";
            }
          });
          //   竞价
          if (data.freeLuckySet.price == null) {
            data.freeLuckySet.price = 0;
          }
          this.price = data.freeLuckySet.price;
          //  当在个人模式情况下
          this.endTime = data.freeLuckySet.endTime   //  活动的结束时间
          if (this.pattern == 1) {
            console.log('------------------------')
            this.startTime = data.freeLuckySet.createtime; //  活动的创建时间，及开始时间
          }
          //  在商业模式下
          else if (this.pattern == 2) {
            // this.applyTime = data.freeLuckySet.createTime; //  活动的申请时间
            this.auditUserName = data.auditUserName; //  申请者昵称
            this.applyTime = data.freeLuckySet.createtime;  //  申请时间
            this.auditNote = data.freeLuckySet.auditNote  //  审核不通过的原因
            this.auditTime = data.freeLuckySet.auditTime  //  活动的审核时间
          }
        }
      });
    },
    //  审核拒绝
    refuse_check() {
      this.dialogVisible = true;
    },
    sure_refuse() {
      var data =
        "auditNote=" + this.refuse_content + "&id=" + this.id + "&status=" + 5;
      free_check(data).then(res => {
        if (res.data.status == 0) {
          if (res.data.data === 1) {
            this.$router.go(-1)
            return this.$message({
              type: "success",
              message: "操作成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "操作失败"
            });
          }
        }
      });
    },
    //   审核通过
    success_check() {
      var data = "id=" + this.id + "&status=" + 1;
      this.$confirm(
        "此操作是对商业模式下的免费抽奖进行审核通过, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          free_check(data).then(res => {
            if (res.data.status == 0) {
              if (res.data.data == 1) {
                 this.$router.go(-1)
                return this.$message({
                  type: "success",
                  message: "操作成功"
                });
              } else {
                return this.$message({
                  type: "warning",
                  message: "操作失败"
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>



<style lang="less">
.free_del-container {
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
                    text-align: center;
                    font-weight: bold;
                    color: #000;
                  }
                }
              }
            }
          }
          &:nth-of-type(1) {
            .el-form {
              display: flex;
            }
            .el-form-item__content {
              display: flex;
              img {
                vertical-align: middle;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
              }
            }
          }
          &:nth-of-type(2) {
            .el-form-item__content {
              display: flex;
              line-height: 25px;
              div:nth-of-type(2) {
                margin: 0 100px;
              }
            }
            .success {
              .el-form-item__content {

                //   给所有的p标签一个行高
  
                div:nth-of-type(2) {
                margin: 0;
              }
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
          }
          &:nth-of-type(6) {
            .el-form-item__label {
              line-height: 30px;
            }
            .el-form-item__content {
              line-height: 30px;
            }
          }
          &:nth-of-type(4) {
            .el-collapse-item__content {
              .el-form {
                display: flex;
                .el-form-item {
                  width: 200px;
                  .el-form-item__label {
                    line-height: 30px;
                  }
                  .el-form-item__content {
                    line-height: 30px;
                  }
                  &:nth-of-type(2) {
                    width: 300px;
                    margin-left: 50px;
                  }
                }
              }
            }
          }
          &:nth-of-type(6) {
            .el-form-item {
              height: 100px;
              margin-top: 15px;
              .el-form-item__label {
                line-height: 100px;
              }
              img {
                width: 100px;
                height: 100px;
                vertical-align: middle;
              }
              &:nth-fo-type(1) {
                margin-top: 0px;
              }
            }
          }
          &:nth-of-type(7) {
            .el-textarea {
              width: 600px;
              textarea {
                height: 100px;
              }
            }
          }
        }
      }
    }
  }

  .el-footer {
    line-height: 100px;
    text-align: center;
    margin-bottom: 50px;
    .el-button {
      margin: 0 70px;
    }
  }

  .el-dialog {
    width: 660px !important;
    height: 445px;
    .el-dialog__header {
      padding: 0;
      line-height: 85px;
      font-size: 14px;
      text-align: center;
    }
    .el-dialog__body {
      .el-form {
        width: 380px;
        margin: 0 auto;
        height: 135px;
        .el-form-item {
          .el-form-item__label {
            text-align: left;
          }
          .el-form-item__content {
            width: 290px;
            .el-textarea {
              .el-textarea__inner {
                height: 135px !important;
              }
            }
          }
        }
      }
    }
    .el-dialog__footer {
      margin-top: 60px;
      text-align: center;
      .el-button {
        width: 65px;
        height: 30px;
        margin: 0 60px;
      }
    }
  }
}
</style>
