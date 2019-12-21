<template>
  <div class="logistics-container">
    <el-dialog title="查看物流" :visible.sync="dialogVisible" :before-close="handleClose">
      <div style="height:210px; overflow:auto;">
        <el-steps direction="vertical" :active="4">
          <el-step description="2019-4-17 周三19:31:07商品已经下单"></el-step>
          <el-step description="2019-04-18 周四14:42:01 [洛阳市]的瑜伽[15538852712]已揽收"></el-step>
          <el-step description="14:44:49 [洛阳市] 快件已从洛阳发出， 准备发往武汉中转部"></el-step>
          <el-step description="14:44:49 [洛阳市] 快件已从洛阳发出， 准备发往武汉中转部"></el-step>
          <el-step description="14:44:49 [洛阳市] 快件已从洛阳发出， 准备发往武汉中转部"></el-step>
          <el-step description="14:44:49 [洛阳市] 快件已从洛阳发出， 准备发往武汉中转部"></el-step>
          <el-step description="14:44:49 [洛阳市] 快件已从洛阳发出， 准备发往武汉中转部"></el-step>
          <el-step description="14:44:49 [洛阳市] 快件已从洛阳发出， 准备发往武汉中转部"></el-step>
        </el-steps>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="btn">
          <el-button type="primary" @click="sendMsgToParent">确 定</el-button>
          <el-button style="color: #409eff" @click="sendMsgToParent">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return { 

        }
    },
    props: ['dialogVisible'],
    methods:{
        sendMsgToParent(){
            // this.dialogVisible = false 
            this.$emit('listenToChildEvent',false)
        },
              handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.sendMsgToParent()
          })
          .catch(_ => {});
      }
    }
}
</script>


<style lang="less">
.logistics-container {
  .el-dialog__wrapper {
    .el-dialog {
      width: 695px;
      height: 465px;
      margin-top: 0 !important;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      .el-dialog__header {
        text-align: center;
        margin-bottom: 30px;
      }
      .el-dialog__body {
        .el-steps {
          margin: 0 auto;
          width: 65%;
          .el-step_header {
            height: 30px!important;
            flex-basis: 0 !important;

            .el-step__description.is-wait {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .el-dialog__footer {
        position: absolute;
        bottom: 40px;
        width: 100%;
        text-align: center;
        .btn {
          button {
            width: 60px;
            height: 30px;
            margin: 0 70px;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
