
<template>
  <div class="commission_await-container">
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
                <span>{{examineTime}}</span>
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
                <span>{{onlineType == 2 ? '微信' : '支付宝'	}}</span>
              </el-form-item>
              <el-form-item label="提现账号">
                <span>{{onlineNo}}</span>
              </el-form-item>
              <el-form-item label="交易流水号">
                <span>{{'无'}}</span>
              </el-form-item>
              <el-form-item label="交易状态">
                <span>{{'未交易'}}</span>
              </el-form-item>
            </el-form>
            <el-form label-width="90px" v-else>
              <el-form-item label="余额">
                <span>{{balance+ '元'}}</span>
              </el-form-item>
              <el-form-item label="转入状态">
                <span>{{'未转入'}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { commission_check_detail } from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      applyTime: "2018-02-05 05:20:21",
      type: this.$route.query.type, // 用于标记是转入余额，还是转出到支付宝，或者微信 1：代表转出到余额，2：代表转出到支付宝，或者是微信
      id: this.$route.query.id,
      examineTime:'' ,  // 待审核时间
      applyCommission:'',   // 申请的体现金额
      pictureUrl:'',
      userName:'',
      accountStatus:'',
      onlineType:'',
      onlineNo:'',   //  体现账号
      balance:'',   // 余额
    };
  },
  created() {
    if (this.type == 1) {
      this.$route.meta.title = ['佣金管理', '佣金审核','等待详请（转入余额）'];
    } else if (this.type == 2) {
      this.$route.meta.title = ['佣金管理', '佣金审核','等待详请（提出现金）'];
    }
    this.get_detail()
  },
  methods: {

    get_detail(){
      commission_check_detail('userId=' + this.id).then(res => {
        if(res.data.status == 0){
          let data = res.data.data
          this.examineTime = data.examineTime
          this.applyCommission = data.applyCommission
          this.pictureUrl = data.pictureUrl
          this.userName = data.userName
          this.accountStatus = data.accountStatus
          this.onlineNo = data.onlineNo
          this.transactionNo = data.transactionNo
          this.balance = data.balance
          this.onlineType = data.onlineType	
        }
      })
    }
  }
};
</script>



<style lang="less">
.commission_await-container {
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
