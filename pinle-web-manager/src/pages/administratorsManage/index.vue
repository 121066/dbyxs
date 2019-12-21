<template>
  <div class="adminmanage-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="btn">
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="adminsList" style="width: 100%" height="598">
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="tel" label="绑定手机"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="creator" label="账号创建者"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="createTime" label="最后登陆时间"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.id,scope.row.status)"
                v-if="scope.row.status == '正常' ? true:false"
              >注销</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.id,scope.row.status)"
                v-if="scope.row.status == '注销' ? true:false"
              >启用</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :currentPage="currentPage"
          :page="page"
          :total="total"
          :pageSize="pageSize"
          @change-current="currentChange"
          @change-size="sizeChange"
        ></pagination>
      </div>
      <el-dialog title="添加管理员" :visible.sync="dialogVisible">
        <el-form :model="form" label-width="120px">
          <el-form-item label="管理员名称" label-width="100px">
            <el-input v-model="form.name" placeholder="请输入管理员名称"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机号" label-width="100px">
            <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
            <el-button
              type="primary"
              @click="get_code"
              :disabled="flag == true ? true : false"
            >{{message}}</el-button>
          </el-form-item>
          <el-form-item label="输入验证码" label-width="100px">
            <el-input v-model="form.code" placeholder="请输入验证码" type="number"></el-input>
          </el-form-item>
          <el-form-item label="输入密码" label-width="100px">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="btn">
            <el-button type="primary" @click="addAdmins">确 定</el-button>
            <el-button @click="cancel" style="color: #409eff">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import {
  send_admin_code,
  admin_start,
  delete_admin
} from "../../api/getData.js";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      adminsList: [],
      total: 0,
      page: 1,
      form: {
        name: "",
        tel: "",
        code: "",
        password: ""
      },
      dialogVisible: false,
      pageSize: 10,
      flag: false,
      times: 60,
      message: "发送验证码"
    };
  },
  created() {
    this.get_adminsList();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_goodsList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_goodsList();
    },
    get_code() {
      if (!this.form.tel) {
        return this.$message({
          type:'warning',
          message:'请输入手机号'
        });
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(this.form.tel)) {
          return this.$message({
            type:'warning',
            message:'请输入正确的手机号'
          });
        }
      }
      this.flag = true;
      setTimeout(() => {
        this.message = "发送验证码";
        this.flag = false;
      }, 60000);
      for (var i = 60; i > 0; i--) {
        setTimeout(() => {
          this.times--;
          this.message = "剩余 " + this.times + " 秒";
        }, 60000 - i * 1000);
      }
      send_admin_code("phone=" + this.form.tel).then(result => {
        if (result.data.status == 0) {
          if (result.data.data.code == 1) {
            this.$message({
              type:'success',
              message:'发送成功'
            });
          } else if (result.data.data.code == 0) {
            this.$message({
              type:'warning',
              message:'发送失败'
            });
          } else {
            this.$message({
              type:'warning',
              message:'操作人未登录'
            });
          }
        } 
      });
    },
    addAdmins() {
      if (!this.form.name) {
        return this.$message({
          type:'warning',
          message:'请输入管理员名称'
        });
      }
      if (!this.form.tel) {
        return this.$message({
          type:'warning',
          message:'请输入手机号'
        });
      }
      if (!this.form.code) {
        return this.$message({
          type:'warning',
          message:'请输入验证码'
        });
      } else {
        if (!Number.isInteger(parseInt(this.form.code))) {
          return this.$message({
            type:'warning',
            message:'验证码必须为数字'
          });
        } else if (this.form.code.toString().length != 6) {
          return this.$message({
            type:'warning',
            message:'验证码必须为6位数'
          });
        }
      }
      if (!this.form.password) {
        return this.$message({
          type:'warning',
          message:'密码不能为空'
        });
      } else {
        if (this.form.password.length < 6 || this.form.password.length > 12) {
          return this.$message({
            type:'warning',
            message:'密码不能低于6位数或超过12位数'
          });
        }
      }
      this.$axios
        .post(
          "/web_upc/add",
          "phone=" +
            this.form.tel +
            "&name=" +
            this.form.name +
            "&code=" +
            this.form.code +
            "&password=" +
            this.form.password
        )
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 0) {
              return this.$message({
                type:'warning',
                message:'添加失败'
              });
            } else if (result.data.data == 1) {
              return this.$message({
                type:'success',
                message:'添加成功'
              });
            } else if (result.data.data == 2) {
              return this.$message({
                type:'warning',
                message:'验证码为空'
              });
            } else if (result.data.data == 3) {
              return this.$message({
                type:'warning',
                message:'操作人未登录'
              });
            } else if (resultd.data.data == 4) {
              return this.$message({
                type:'warning',
                message:'添加的用户手机为空'
              });
            } else if (result.data.data == 5) {
              return this.$message({
                type:'warning',
                message:'添加的用户密码为空'
              });
            } else if (result.data.data == 6) {
              return this.$message({
                type:'warning',
                message:'添加的用户名为空'
              });
            } else if (result.data.data == 7) {
              return this.$message({
                type:'warning',
                message:'验证码错误'
              });
            } else if (result.data.data == 8) {
              return this.$message({
                type:'warning',
                message:'手机号码重复'
              });
            } else if (result.data.data == 9) {
              return this.$message({
                type:'warning',
                message:'用户名重复'
              });
            } else if (result.data.data == 10) {
              return this.$message({
                type:'warning',
                message:'没有添加权限'
              });
            }
          } 
        });
    },
    cancel() {
      this.form.tel = "";
      this.form.name = "";
      this.form.code = "";
      this.dialogVisible = false;
    },
    get_adminsList() {
      this.adminsList = [];
      let data = "current=" + this.currentPage + "&size=" + this.pageSize;
      this.$axios.post("/web_upc/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          // this.usersList = result.data.data.records;
          if (result.data.data.records == "") {
            this.total = 0;
            this.page = 0;
          } else {
            result.data.data.records.forEach(item => {
              this.total;
              if (item.status == 0) {
                var status = "注销";
              } else {
                var status = "正常";
              }
              this.adminsList.push({
                id: item.id,
                username: item.name,
                tel: item.phone,
                status,
                creator: "管理员",
                createTime: item.createtime,
                lastLandTime: item.lastLoginTime
              });
            });
          }
        } 
      });
    },
    handleForbidden(id, status) {
      if (status == "注销") {
        status = 0;
      } else {
        status = 1;
      }
      this.$confirm("此操作将修改状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          admin_start("id=" + id + "&status=" + status).then(result => {
            if (result.data.status == 0) {
              if (result.data.data == 1) {
                this.adminsList.forEach(item => {
                  if (item.id == id) {
                    item.status = item.status == "注销" ? "正常" : "注销";
                  }
                });
                if (status == 0) {
                  return this.$message({
                    type:'success',
                    message:'启用成功'
                  });
                } else {
                  return this.$message({
                    type:'success',
                    message:'注销成功'
                  });
                }
              } else {
                this.$message({
                  type:'warning',
                  message:'操作失败'
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delete_admin("id=" + id).then(result => {
            if (result.data.status == 0) {
              if (result.data.data == 1) {
                if(thhis.total % this.pageSize == 1 && this.currentPage != 1){
                  this.currentPage--
                }
                this.get_adminsList()
                return this.$message({
                  type:'success',
                  message:'删除成功'
                });
              } else {
                return this.$message({
                  type:'warning',
                  message:'删除失败'
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>


<style lang="less" >
.adminmanage-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .content {
    .query {
      position: relative;
      .btn {
        position: absolute;
        right: 20px;
        .el-button {
          width: 70px;
        }
      }
    }

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
          padding-top: 0;
          padding-bottom: 0;
          > .el-form {
            width: 430px;
            margin: 0 auto;
            .el-form-item {
              .el-form-item__label {
                color: #409eff;
                font-size: 14px;
              }
              .el-form-item__content {
                .el-input {
                  width: 200px;
                  .el-input__inner {
                    height: 30px;
                  }
                }
                button {
                  width: 100px;
                  height: 30px;
                  padding: 0;
                  margin-left: 10px;
                }
              }
            }
          }
        }
        .el-dialog__footer {
          .btn {
            text-align: center;
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
}
</style>
