
<template>
  <div class="free_set-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="商业模式竞价门槛" name="1">
            <el-form label-width="40px">
              <el-form-item >
                <el-input v-model="floor"></el-input>&nbsp;
                <span>元</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        <el-collapse-item title="商业模式竞价建议区间" name="2">
            <el-form label-width="80px" style="display: flex;width: 100%;">
              <el-form-item label="上区间">
                <el-input v-model="ceil"></el-input>&nbsp;
                <span>元</span>
              </el-form-item>
                <el-form-item label="下区间">
                <el-input v-model="threshold"></el-input>&nbsp;
                <span>元</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="set_free_lottery">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { free_set,free_modify,free_set_detail } from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
        activeName: ['1','2'],
        floor: '',  //  竞价门槛
        ceil: '',   // 建议上区间
        threshold: '',  //  建议下区间
        id: '',  // 记录id， 有后台返回，如果没有，这添加一条
    };
  },
  created() {
      this.get_set_detail()
  },
  methods: {
      set_free_lottery(){
          if(!this.id){
              var data = 'floor=' + this.floor + '&ceil=' + this.ceil + '&threshold=' + this.threshold
              free_set(data).then(res => {
                  if(res.data.status == 0){
                      if(res.data.data == 1){
                          return this.$message({
                              type: 'success',
                              message: '添加成功'
                          })
                      } else {
                          return this.message({
                              type: 'warning',
                              message:'添加失败'
                          })
                      }
                  }
              })
          } else {
              var data = 'floor=' + this.floor + '&ceil=' + this.ceil + '&threshold=' + this.threshold + '&id=' + this.id
                free_modify(data).then(res => {
                  if(res.data.status == 0){
                      if(res.data.data == 1){
                          return this.$message({
                              type: 'success',
                              message: '修改成功'
                          })
                      } else {
                          return this.$message({
                              type: 'warning',
                              message:'修改失败'
                          })
                      }
                  }
              })
          }
      },
      get_set_detail(){
          free_set_detail().then(res => {
              if(res.data.status == 0){
                  var data = res .data.data
                  this.floor = data.floor
                  this.ceil = data.ceil
                  this.id = data.id 
                  this.threshold = data.threshold
              }
          })
      }
  }
};
</script>



<style lang="less">
.free_set-container {
  @import "../../style/card.less";
  display: flex;
  flex-flow: column;
  height: 100%;

  .el-collapse-item{
      .el-collapse-item__content{
          padding-left: 45px;
          display: flex;

      }
  }
}
</style>
