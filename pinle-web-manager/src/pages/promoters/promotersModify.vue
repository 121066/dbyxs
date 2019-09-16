
<template>
  <div class="promoters_modify-container fillcontain">
    <breadcrumb style="position: absolute;width: 100%;z-index:9;"></breadcrumb>
    <el-main>
      <el-header>修改推广员信息</el-header>
      <el-main>
        <div class="form-container">
          <el-form label-width="85px">
            <el-form-item label="姓名">
              <el-input v-model="form.promoterName"></el-input>
            </el-form-item>
            <el-form-item label="绑定手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="form.wechat"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="110px" style="width: 400px;">
            <el-form-item label="加入时间">
              <div class="block">
                <el-date-picker
                  v-model="form.puttime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  disabled
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="生日">
              <div class="block">
                <el-date-picker
                  v-model="form.promoterBirthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="团队名称">
              <el-select v-model="form.teamName">
                <el-option v-for="(item, index) in teamList" :key="index" :label="item.teamName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
                            <el-select v-model="form.status" disabled="">
                <el-option label="正常" value="1"></el-option>
                <el-option label="注销" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-container">
          <el-button type="primary" @click="updatedUserDetail">确定</el-button>
          <el-button style="color: #409EFF" @click="$router.go(-1)">取消</el-button>
        </div>
      </el-main>
    </el-main>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import { promoters_detail,promoters_modify,promoters_team } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      form: {
        promoterName: "",
        phone: "",
        wechat: "",
        sex: "",
        puttime: "",
        promoterBirthday: "",
        teamName: "",
        status: ""
      },
      teamList:[],
      id: this.$route.query.id
    };
  },
  created() {
    this.promotersTeam()
    this.get_promoters_detail();

  },
  methods: {
    get_promoters_detail() {
      promoters_detail("id=" + this.id).then(res => {
        if (res.data.status == 0) {
          this.form = res.data.data;
        }
      });
    },
    updatedUserDetail() {
      if (!this.form.promoterName) {
        return this.$message({
          type:"warning",
          message:'姓名不能为空'
        });
      }
      if (!this.form.phone) {
        return this.$message({
          type:'warning',
          message:'手机号不能为空'
        });
      }
      if (!this.form.wechat) {
        return this.$message({
          type:"warning",
          message:"微信号不能为空"
        });
      }
      if (!this.form.promoterBirthday) {
        return this.$message({
          type:"warning",
          message:'生日不能为空'
        });
      }
      let data =
        "id=" +
        this.id +
        "&promoterName=" +
        this.form.promoterName +
        "&phone=" +
        this.form.phone +
        "&wechat=" +
        this.form.wechat +
        "&sex=" +
        this.form.sex +
        "&puttime=" +
        this.form.puttime + 
        "&promoterBirthday=" + 
        this.form.promoterBirthday +
        "&teamId=" + this.form.teamName +
        "&status=" + this.form.status
        promoters_modify(data).then(res => {
          if(res.data.status == 0){
            if(res.data.data == 1){
              this.$router.go(-1)
              this.$message({
                type:'success',
                message:'修改成功'
              })
            } else {
              this.$message({
                type:"warning",
                message:'修改失败'
              })
            }
          }
        })
    },
    promotersTeam(){
      promoters_team().then(res => {
        if(res.data.status == 0 && res.data.data.length != 0){
          this.teamList = res.data.data
        }
      })
    }
  }
};
</script>

<style lang="less">
.promoters_modify-container {
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

