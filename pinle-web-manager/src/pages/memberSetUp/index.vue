<template>
  <div class="membersetup-contianter fillcontain">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="container">
        <el-main>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>会员缴费</span>
            </div>
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="会员费用/月">
                <el-input v-model="form.monthCost"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="会员费用/季">
                <el-input v-model="form.quarterCost"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="会员费用/年">
                <el-input v-model="form.yearCost"></el-input>
                <span>元</span>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>会员等级</span>
            </div>
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="银牌VIP月累计消费">
                <el-input v-model="form.silverMemberConsumption"></el-input>
                <span>元</span>
              </el-form-item>

              <el-form-item label="金牌VIP月累计消费">
                <el-input v-model="form.glodMemberConsumption"></el-input>
                <span>元</span>
              </el-form-item>

              <el-form-item label="钻石VIP月累计消费">
                <el-input v-model="form.diamondMemberConsumption"></el-input>
                <span>元</span>
              </el-form-item>
            </el-form>
            <el-form style="margin-left:50px;" :model="form" label-width="100px">
              <el-form-item label="银牌VIP折扣">
                <el-input v-model="form.silverMemberDiscount"></el-input>
                <span>折</span>
              </el-form-item>
              <el-form-item label="金牌VIP折扣">
                <el-input v-model="form.glodMemberDiscount"></el-input>
                <span>折</span>
              </el-form-item>
              <el-form-item label="钻石VIP折扣">
                <el-input v-model="form.diamondMemberDiscount"></el-input>
                <span>折</span>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>会员返现</span>
            </div>
            <el-form ref="form" :model="form" label-width="110px">
              <el-form-item label="邀请好友返利">
                <el-input v-model="form.inviteFriendRebate"></el-input>
                <span>%</span>
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="130px" style="margin-left: 60px;">
              <el-form-item label="好友邀请好友返利">
                <el-input v-model="form.friInviteFriRebate"></el-input>
                <span>%</span>
              </el-form-item>
            </el-form>
          </el-card>
        </el-main>
        <el-footer>
          <el-button type="primary" @click="modifyMember">确定</el-button>
          <el-button style="color:#409EFF " @click="get_memberMsg">取消</el-button>
        </el-footer>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb },
  data() {
    return {
      form: {
        monthCost: "",
        quarterCost: "",
        yearCost: "",
        silverMemberConsumption: "",
        glodMemberConsumption: "",
        diamondMemberConsumption: "",
        silverMemberDiscount: "",
        glodMemberDiscount: "",
        diamondMemberDiscount: "",
        inviteFriendRebate: "", // 邀请好友
        friInviteFriRebate: "" // 好友邀请好友
      },
      vipLevelName: []
    };
  },
  created() {
    this.get_memberMsg();
  },
  methods: {
    get_memberMsg() {
      this.$axios.post("/web_vip/list").then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.form.monthCost = data.vipCosts[0]["cost"];
          this.form.quarterCost = data.vipCosts[1]["cost"];
          this.form.yearCost = data.vipCosts[2]["cost"];
          this.form.silverMemberConsumption = data.vipLevel[0]["consume"];
          this.form.glodMemberConsumption = data.vipLevel[1]["consume"];
          this.form.diamondMemberConsumption = data.vipLevel[2]["consume"];
          this.form.silverMemberDiscount = data.vipLevel[0]["discount"];
          this.form.glodMemberDiscount = data.vipLevel[1]["discount"];
          this.form.diamondMemberDiscount = data.vipLevel[2]["discount"];
          this.form.inviteFriendRebate = data.vipInvite[0]["cashback"] * 100;
          this.form.friInviteFriRebate = data.vipInvite[0]["recashback"] * 100;
          this.vipLevelName = data.vipLevelName;
        } 
      });
    },
    modifyMember() {
      if(!this.form.monthCost || !this.form.quarterCost || !yearCost){
        return this.$message({
          type:'warning',
          message:'会员缴费不能为空'
        })
      }
      if(!this.form.silverMemberConsumption || !this.form.glodMemberConsumption || !this.form.diamondMemberConsumption || !this.form.silverMemberDiscount || !this.form.glodMemberDiscount || !this.form.diamondMemberDiscount){
        return this.$message({
          type:'warning',
          message:'会员等级消费或者折扣不能为空'
        })
      }
      if(!this.form.inviteFriendRebate || !this.form.friInviteFriRebate){
        return this.$message({
          type:'warning',
          message:'好友邀请好友返利或者邀请好友返利不能为空'
        })
      }
      let vipCosts = [
        { id: 1, type: 1, cost: this.form.monthCost },
        { id: 2, type: 2, cost: this.form.quarterCost },
        { id: 3, type: 3, cost: this.form.yearCost }
      ];
      let vipInvite = [
        {
          id: 1,
          cashback: this.form.inviteFriendRebate / 100,
          recashback: this.form.friInviteFriRebate / 100
        }
      ];
      let vipLevel = [
        {
          id: "1",
          level: "1",
          consume: this.form.silverMemberConsumption,
          discount: this.form.silverMemberDiscount
        },
        {
          id: "2",
          level: "2",
          consume: this.form.glodMemberConsumption,
          discount: this.form.glodMemberDiscount
        },
        {
          id: "3",
          level: "3",
          consume: this.form.diamondMemberConsumption,
          discount: this.form.diamondMemberDiscount
        }
      ];
      let data = {
        vipCosts: vipCosts,
        vipInvite: vipInvite,
        vipLevel: vipLevel,
        vipLevelName: this.vipLevelName
      };
      this.$axios.post("/web_vip/modify", 'vipVo=' + JSON.stringify(data)).then(result => {
        if(result.data.status == 0){
          if(result.data.data == 1){
            this.$router.push('/memberSetUp')
            return this.$message({
              type:'success',
              message:'修改成功'
            })
          }else {
            return this.$message({
              type:'warning',
              message:'修改失败'
            })
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.membersetup-contianter {
  position: relative;
  .el-form-item__label {
    text-align: left;
  }
  .el-input__inner {
    line-height: 30px;
    height: 30px;
    width: 150px;
  }
  .breadcrumb-container {
    position: absolute;
    width: 100%;
  }
  .content {
    .el-card.is-always-shadow {
      box-shadow: none;
    }
    background-color: #eff3f6;
    padding: 60px 20px 20px;
    height: 100%;
    box-sizing: border-box;
    .container {
      background-color: #fff;
      height: 100%;
      .el-main {
        background-color: #fff;
        .box-card {
          border: none;
          .el-card__header {
            line-height: 60px;
            padding: 0;
            border-bottom: none;
            color: #5e70e6;
            font-size: 16px;
          }
          .el-card__body {
            display: flex;
            padding: 0;
            .el-form {
              padding-left: 20px;

              .el-form-item {
                .el-form-item__content {
                  display: flex;
                  .el-input {
                    width: 160px;
                  }
                }
              }
            }
          }
        }
      }
      .el-footer {
        text-align: center;
        button {
          margin: 0 40px;
          height: 30px;
          width: 70px;
          padding: 0;
        }
      }
    }
  }
}
</style>

