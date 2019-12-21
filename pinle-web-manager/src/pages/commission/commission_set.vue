
<template>
  <div class="set_commission-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="佣金设置" name="1">
            <el-form label-width="120px">
              <el-form-item label="一级团队消费返利">
                <el-input v-model="buyCashback"></el-input>&nbsp;
                <span>%</span>
              </el-form-item>
              <el-form-item label="二级团队消费返利">
                <el-input v-model="buyRecashback"></el-input>&nbsp;
                <span>%</span>
              </el-form-item>
            </el-form>
            <el-form label-width="140px">
              <el-form-item label="一级团队充值vip返利">
                <el-input v-model="cashback"></el-input>&nbsp;
                <span>%</span>
              </el-form-item>
              <el-form-item label="二级团队充值vip返利">
                <el-input v-model="recashback"></el-input>&nbsp;
                <span>%</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="set_commission">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { commission_set_see ,commission_set_modify} from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1"],
      buyCashback:'',   // 一级团队消费返利
      buyRecashback:'',  //  二级团队消费返利
      cashback:'',   // vip邀请返利
      recashback:''  //  二级团队vip充值返利
    };
  },
  created() {
    this.get_commissiong_detail()
  },
  methods: {
    set_commission() {
      let data = 'buyCashback=' + this.buyCashback / 100 + '&buyRecashback=' + this.buyRecashback / 100 + '&cashback=' + this.cashback / 100 + '&recashback=' + this.recashback / 100
      commission_set_modify(data).then(res => {
        if(res.data.status == 0){
          if(res.data.data == 1){
            return this.$message(
              {type:'success',message:'修改成功'}
            )
          } else{
            return this.$message({
              type:'warning',
              message:'修改失败'
            })
          }
        }
      })
    },
    get_commissiong_detail(){
      commission_set_see().then(res => {
        if(res.data.status == 0){
          var data = res.data.data
            this.buyCashback = data.buyCashback * 100
            this.buyRecashback = data.buyRecashback * 100
            this.cashback = data.cashback * 100
            this.recashback = data.recashback * 100
        }
      })
    }
  }
};
</script>



<style lang="less">
.set_commission-container {
  @import "../../style/card.less";
  display: flex;
  flex-flow: column;
  height: 100%;
  .price {
    width: 70px !important;
    .el-input__inner {
      width: 70px !important;
    }
  }
  .el-collapse-item{
      .el-collapse-item__content{
          padding-left: 45px;
          display: flex;
          .el-form{
              width: 310px;
              display: flex;
              flex-direction: column;
              margin-right: 85px;
              .el-form-item{
                  margin-bottom: 30px!important;
              }
          }
      }
  }
}
</style>
