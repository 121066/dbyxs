
<template>
  <div class="success_detail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="佣金审核状态" name="1">
           <div class="pending_review">
              <div>
                <i class="el-icon-time"></i>
                <p>待审核</p>
              </div>
              <span>{{applyTime}}</span>
            </div>
            <img src="../../img/icon1.png" alt>
            <div class="review_refuse">
              <div>
                <i class="el-icon-circle-check-outline"></i>
                <p>审核通过</p>
              </div>
              <div>
                <span>审核者: {{adminName}}</span>
                <!-- <span>拒绝理由: {{'cunzaizuojiaxianyi'}}</span> -->
                <span>{{examineTime}}</span>
              </div>
            </div>
          </el-collapse-item>
                    <el-collapse-item title="佣金审核信息" name="2">
            <el-form label-width="90px">
                <el-form-item :label="type == 2 ? '提现金额' : '转入金额'"><span>{{applyCommission}}</span>元</el-form-item>
                <el-form-item label="提现类型"><span>{{type == 2 ? '提取现金' : '转入余额'}}</span></el-form-item>
            </el-form>
          </el-collapse-item>
                              <el-collapse-item title="用户信息" name="3">
            <el-form label-width="90px" >
                <el-form-item>
                    <img :src="pictureUrl" alt=""> <span>{{userName}}</span>
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
                                    <span>{{transactionNo}}</span>
                </el-form-item>
                                                <el-form-item label="交易状态">
                                    <span>{{'转入成功'}}</span>
                </el-form-item>
            </el-form>
                       <el-form label-width="90px" v-else>
                <el-form-item label="余额">
           <span>{{balance + '元'}}</span>
                </el-form-item>
                                <el-form-item label="转入状态">
                                    <span>{{'转入成功'}}</span>
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
      activeName: ["1",'2','3','4'],
      applyTime:'2018-02-05 05:20:21',
      dialogVisible:false,
        id:this.$route.query.id,
      type:this.$route.query.type, // 用于标记是转入余额，还是转出到支付宝，或者微信 1：代表转出到余额，2：代表转出到支付宝，或者是微信  
      applyTime:'', //  申请时间
      adminName:'',  
      examineTime: '',  // 审核时间
      applyCommission:'',  // 提现金额
      pictureUrl:'' ,  //用户图片
      userName:'',  // 申请者
      accountStatus:'',  // 账户状态
      balance:'',  // 账户余额
      transactionStatus: '',  // 交易状态
      onlineType: '',  // 收款平台
      onlineNo:'', // 提取现金账号
      transactionNo: '', //  交易流水号
    };
  },
  created() {
      if(this.type == 1){

          this.$route.meta.title = ['佣金管理', '佣金审核','通过详请（转入余额）']
      } else {

          this.$route.meta.title = ['佣金管理', '佣金审核','通过详请（提取现金）']

      }
      this.get_detail()
  },
  methods: {
    get_detail(){
      commission_check_detail('userId=' + this.id).then(res => {
        if(res.data.status == 0 ){
          let data = res.data.data
          this.applyTime = data.applyTime
          this.adminName = data.adminName
          this.examineTime = data.examineTime
          this.applyCommission = data.applyCommission
          this.pictureUrl =data.pictureUrl
          this.userName =data.userName
          this.accountStatus = data.accountStatus
          this.balance = data.balance
          this.transactionStatus = data.transactionStatus
          this.onlineType = data.onlineType
          this.onlineNo = data.onlineNo
          this.transactionNo = data.transactionNo
        }
      })
    }
  }
};
</script>



<style lang="less">
.success_detail-container {
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
  .el-collapse-item{
      .el-collapse-item__content{
          padding-left: 45px!important;
      }
      &:nth-of-type(1){
          .el-collapse-item__wrap{
              height: 60px;
          }
            .el-collapse-item__content {
                display: flex;
              .pending_review {
                margin-top: 7px;
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
                margin-top: 19.5px;
              }
              .review_refuse {
                display: flex;

                div:first-of-type {
                  text-align: center;
                  color: #fd4740;
                  margin-top: 7px;
                  i {
                    font-size: 20px;
                  }
                }
                div:last-of-type {
                  display: flex;
                  flex-direction: column;
                  height: 60px;
                  margin-left: 10px;
                  justify-content: space-between;
                  span {
                    height: 20px;
                    line-height: 20px;
                    width: 300px;
                  }
                }
              }
            }
      }
      &:nth-of-type(3){
        .el-collapse-item__wrap{
            margin-top: 10px!important;
        }
          .el-collapse-item__content{
              height:60px;
          }
          .el-form{
              height: 100%;
              .el-form-item{
                  height:100%;
                  display:flex;
                  align-items: center;
             
                        .el-form-item__content{
                  display: flex;
                          align-items: center;
                          margin-left:0!important;

                            height:100%!important;
                        }
                    
                  &:nth-of-type(1){
                      .el-form-item__content{
                          
        
                          img{
                              width: 48px;
                              height: 48px;
                              border-radius: 50%;
                          }
                          span{
                              margin-left: 15px;
                          }
                      }
                  }
              }
          }
      }
  }

}
</style>
