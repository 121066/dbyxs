
<template>
  <div class="add_promoters-container fillcontain">
    <breadcrumb style="position: absolute;width: 100%;z-index:9;"></breadcrumb>
    <el-main>
      <el-header>添加推广员信息</el-header>
      <el-main>
        <div class="form-container">
          <el-form label-width="85px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="绑定手机号">
              <el-input v-model="form.tel" type="number"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="form.wechart"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="110px" style="width: 400px;">
            <el-form-item label="性别">
              <el-select v-model="form.sex">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="团队名称">
              <el-select v-model="form.teamId">
                <el-option
                  v-for="item in teamList"
                  :key="item.id"
                  :label="item.teamName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-container">
          <el-button type="primary" @click="addPromoters">确定</el-button>
          <el-button style="color: #409EFF" @click="$router.go(-1)">取消</el-button>
        </div>
      </el-main>
    </el-main>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import { mapActions } from "vuex";
import { add_promoters, team_manage,promoters_team } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      form: {
        name: "",
        tel: "",
        wechart: "",
        sex: "",
        joinTime: "",
        birthday: "",
        teamId: "",
        status: ""
      },
      teamList: []
    };
  },
  created() {
    this.promotersTeam();
  },
  methods: {
    addPromoters() {
      //       teamId:团队id
      // promoterName：推广人员名称
      // promoterBirthday：生日
      // sex：性别 1：男，0：女'
      // phone：电话号码
      // wechat：微信号
      // puttime：加入时间
      // status：状态 1：正常，0：异常'
      if(!this.form.teamId){
        return this.$message({
          type:'warning',
          message:'团队名称不能为空'
        })
      }
      if(!this.form.name){
        return this.$message({
          type:'warning',
          message:'姓名不能为空'
        })
      }
      if(!this.form.birthday){
        return this.$message({
          type:'warning',
          message:'生日不能为空'
        })
      }
      if(!this.form.sex){
        return this.$message({
          type:'warning',
          message:'性别不能为空'
        })
      }
      if(!this.form.tel){
        return this.$message({
          type:'warning',
          message:'手机号不能为空'
        })
      }
      if(!this.form.wechart){
        return this.$message({
          type:'warning',
          message:'微信账号不能为空'
        })
      }
      let data =
        "teamId=" +
        this.form.teamId +
        "&promoterName=" +
        this.form.name +
        "&promoterBirthday=" +
        this.form.birthday +
        "&sex=" +
        this.form.sex +
        "&phone=" +
        this.form.tel +
        "&wechat=" +
        this.form.wechart +
        "&status=" + '1'

      add_promoters(data).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$router.go(-1);
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
    },
    promotersTeam() {
      promoters_team().then(res => {
        if (res.data.status == 0 && res.data.data.length != 0) {
          this.teamList = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less">
.add_promoters-container {
  position: relative;
  // 更改图标的样式
  .el-input__icon {
    line-height: 30px;
  }
  > .el-main {
    height: 100%;
    padding: 70px 50px 30px;
    background-color: #eff3f6;
    position: relative;
    .el-header {
      line-height: 50px;
      height: 50px !important;
      text-align: center;
      color: #5d70e9;
      position: absolute;
      width: 100%;
      background-color: #eff3f6;
    }
    > .el-main {
      height: 100%;
      background: #f6f6f6;
      .form-container {
        padding: 0;

        padding-top: 50px;
        display: flex;
        .el-input__inner {
          width: 280px;
          height: 30px;
        }
        .el-form {
          margin-top: 80px;

          width: 365px;
          margin-left: 60px;
          .el-form-item {
            height: 30px;

            .el-form-item__label {
              line-height: 30px;
              text-align: left;
            }
            .el-form-item__content {
              line-height: 30px;
            }
            .el-input {
              width: 280px;
            }
          }
          .address {
            color: #666;
            width: 450px;
            .el-form-item__content {
              margin-left: 0 !important;
            }
            .el-select {
              width: 100px;
              .el-input.el-input--suffix {
                width: 100px;
                .el-input__inner {
                  width: 100px;
                }
              }
            }
          }
          &:last-of-type {
            margin-left: 100px;
          }
        }
        .el-textarea__inner {
          width: 280px;
        }
        .el-textarea {
          width: 280px;
        }
      }
      .btn-container {
        margin-top: 200px;
        text-align: center;
        button {
          margin: 0 70px;
          width: 60px;
          height: 30px;
          padding: 0;
        }
      }
    }
  }
}
</style>

