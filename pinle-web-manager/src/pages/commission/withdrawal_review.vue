
<template>
  <div class="com_withdrawal-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="佣金审核状态" name="1">
            <el-form>
              <el-form-item>
                <div>
                  <i class="el-icon-time" style="font-size: 23px;"></i>
                  <span>待审核</span>
                </div>
                <span>{{applyTime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="佣金审核状态" name="2">
            <el-form label-width="90px">
              <el-form-item :label="type == 2 ? '提现金额' : '转入金额'">
                <span>{{applyCommission}}</span>元
              </el-form-item>
              <el-form-item label="提现类型">
                <span>{{type == 2 ? '提取现金' : '转入余额'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="用户信息" name="3">
            <el-form label-width="90px">
              <el-form-item>
                <img :src="pictureUrl" alt>
                <span>{{userName}}</span>
              </el-form-item>
              <el-form-item label="会员等级">
                <span>金牌会员</span>
              </el-form-item>
              <el-form-item label="账户状态">
                <span>{{accountStatus == 1 ? '正常' : '异常'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="账户信息" name="4">
            <el-form label-width="90px" v-if="type == 2">
              <el-form-item label="收款平台">
                <span>{{onlineType == 2 ? '微信' : '支付宝'}}</span>
              </el-form-item>
              <el-form-item label="提现账号">
                <span>{{onlineNo}}</span>
              </el-form-item>
              <el-form-item label="交易流水号">
                <span>{{'无'}}</span>
              </el-form-item>
              <el-form-item label="交易状态">
                <span>{{"未提现"}}</span>
              </el-form-item>
            </el-form>
            <el-form label-width="90px" v-else>
              <el-form-item label="余额">
                <span>{{balance + '元'}}</span>
              </el-form-item>
              <el-form-item label="转入状态">
                <span>{{'未转入'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="check_through" style="width: 85px;">审核通过</el-button>
          <el-button
            style="color: #409eff;border:1px solid #409eff; width:85px"
            @click="check_refuse"
          >审核拒绝</el-button>
        </el-footer>
      </el-main>
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
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { coupon_add } from "../../api/getData.js";
import {
  commission_check_detail,
  commission_tac_check
} from "../../api/getData";

export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      applyTime: "2018-02-05 05:20:21",
      dialogVisible: false,
      id: this.$route.query.id,
      type: this.$route.query.type, // 用于标记是转入余额，还是转出到支付宝，或者微信 1：代表转出到余额，2：代表转出到支付宝，或者是微信
      refuse_content: "",
      applyTime: "", //  申请时间
      applyCommission: "", // 提现金额
      pictureUrl: "", //用户图片
      userName: "", // 申请者
      accountStatus: "", // 账户状态
      balance: "", // 账户余额
      onlineType: "", // 收款平台
      onlineNo: "", // 提取现金账号
      transactionNo: "", //  交易流水号
      commissionExamineVo: {} //   用于返回
    };
  },
  created() {
    if (this.type == 2) {
      this.$route.meta.title = ["佣金管理", "佣金审核", "转入余额审核"];
    } else if (this.type == 1) {
      this.$route.meta.title = ["佣金管理", "佣金审核", "提出现金审核"];
    }
    this.get_detail();
  },
  methods: {
    check_through() {
      this.$confirm("此操作将会提取现金, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = "";
          this.commissionExamineVo.examineStatus = 1;

          for (var item in this.commissionExamineVo) {
            if (this.commissionExamineVo[item] != null) {
              if (!data) {
                data += item + "=" + this.commissionExamineVo[item];
              } else {
                data += "&" + item + "=" + this.commissionExamineVo[item];
              }
            }
          }

          commission_tac_check(data).then(res => {
            if (res.data.status == 0) {
              if (res.data.data == 1) {
                this.$router.push("/commission_check");

                return this.$message({
                  type:'success',
                  message:'审核通过成功'
                });
              } else {
                this.$message({
                  type:'warning',
                  message:'审核通过失败'
                });
              }
            }
          });
          // return this.$message("操作成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    check_refuse() {
      this.dialogVisible = true;
    },
    sure_refuse() {
      if (!this.refuse_content) {
        return this.$message({
          type:'warning',
          message:'拒绝理由不能为空'
        });
      }
      let data = ''
          this.commissionExamineVo.examineStatus = 2;
          this.commissionExamineVo.examineMessge = this.refuse_content

      for (var item in this.commissionExamineVo) {
        if (this.commissionExamineVo[item] != null) {
          if (!data) {
            data += item + "=" + this.commissionExamineVo[item];
          } else {
            data += "&" + item + "=" + this.commissionExamineVo[item];
          }
        }
      }
      // let data =
      //   "examineStatus=" +
      //   2 +
      //   "&transactionMessage=" +
      //   this.refuse_content +
      //   "&id=" +
      //   this.id;
      commission_tac_check(data).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.$router.push("/commission_check");
            return this.$message({
              type:'success',
              message:'审核拒绝成功'
            });
          } else {
            return this.$message({
              type:'warning',
              message:'审核拒绝失败'
            });
          }
        }
      });
    },
    get_detail() {
      commission_check_detail("userId=" + this.id).then(res => {
        if (res.data.status == 0) {
          let data = res.data.data;
          this.applyTime = data.applyTime;
          this.applyCommission = data.applyCommission;
          this.pictureUrl = data.pictureUrl;
          this.userName = data.userName;
          this.accountStatus = data.accountStatus;
          this.balance = data.balance;
          this.onlineType = data.onlineType;
          this.onlineNo = data.onlineNo;
          this.commissionExamineVo = data;
        }
      });
    }
  }
};
</script>



<style lang="less">
.com_withdrawal-container {
  @import "../../style/card.less";
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
  .price {
    width: 70px !important;
    .el-input__inner {
      width: 70px !important;
    }
  }
  .el-collapse-item {
    .el-collapse-item__content {
      padding-left: 45px !important;
    }
    &:nth-of-type(1) {
      .el-collapse-item__wrap {
        height: 60px;
      }
      .el-collapse-item__content {
        height: 60px;
        padding-left: 55px !important;
        padding-bottom: 0;
        .el-form {
          height: 100%;
          .el-form-item {
            .el-form-item__content {
              height: 100% !important;
              display: flex !important;
              > div {
                text-align: center;
                display: flex;
                flex-direction: column;
                i {
                  color: #06bcff;
                }
                span {
                  color: #06bcff;
                }
              }
              > span {
                margin-left: 25px;
                color: #333 !important;
              }
            }
          }
        }
      }
    }
    &:nth-of-type(3) {
      .el-collapse-item__wrap {
        margin-top: 10px !important;
      }
      .el-collapse-item__content {
        height: 60px;
      }
      .el-form {
        height: 100%;
        .el-form-item {
          height: 100%;
          display: flex;
          align-items: center;

          .el-form-item__content {
            display: flex;
            align-items: center;
            margin-left: 0 !important;

            height: 100% !important;
          }

          &:nth-of-type(1) {
            .el-form-item__content {
              img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
              }
              span {
                margin-left: 15px;
              }
            }
          }
        }
      }
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
