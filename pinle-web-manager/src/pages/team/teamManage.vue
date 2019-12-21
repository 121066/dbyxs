
<template >
  <div class="promoters-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="btn">
          <el-button type="primary" icon="el-icon-plus" @click="add_teams">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="teamList" style="width: 100%" height="598">
          <el-table-column prop="teamName" label="团队名称"></el-table-column>
          <el-table-column prop="teamNum" label="人数"></el-table-column>
          <el-table-column prop="applyTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_delete(scope.row.id)">删除</el-button>
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
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
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form label-width="120px">
          <el-form-item label="团队名称" style="width:320px;">
            <el-input v-model="teamName" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit_request">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import {
  team_manage,
  team_manage_add,
  team_manage_modify,
  team_manage_delete
} from "../../api/getData";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      teamList: [],
      flag: 1, // flag用于标记是重新添加，还是团队信息修改
      title: "",
      dialogVisible: false,
      teamName: "",
      id: "" //用于保存团队的id
    };
  },
  created() {
    this.get_team();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_team();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_team();
    },
    jump_modify(id) {
      this.dialogVisible = true;
      this.title = "团队信息修改";
      this.flag = 2;
      this.id = id;
      this.teamList.forEach(item => {
        if (item.id == id) {
          this.teamName = item.teamName;
        }
      });
    },
    jump_delete(id) {
      let data = 'id=' + id
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          team_manage_delete(data).then(res => {
            if(res.data.status == 0){
              if(res.data.data == 1){
                if(thhis.total % this.pageSize == 1 && this.currentPage != 1){
                  this.currentPage--
                }
                this.get_team()
                return this.$message({
                  type:'success',
                  message:'删除成功'
                })
              } else {
                return this.$message({
                  type:'warning',
                  message:'删除失败'
                })
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add_teams() {
      this.title = "团队添加";
      this.flag = 1;
      this.dialogVisible = true;
    },
    submit_request() {
      if (this.flag == 1) {
        this.teamName = "";
        if (!this.teamName) {
          return this.$message({
            type:'warning',
            message:'请输入团队名称'
          });
        }
        team_manage_add("teamName=" + this.teamName).then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 1) {
              this.dialogVisible = false;
              this.get_team();
              return this.$message({
                type:'success',
                message:'添加成功'
              });
            } else {
              return this.$$message({
                type:"warning",
                message:'添加失败'
              });
            }
          }
        });
      } else if (this.flag == 2) {
        let data = "id=" + this.id + "&teamName=" + this.teamName;
        team_manage_modify(data).then(res => {
          if (res.data.status == 0) {
            if (res.data.data == 1) {
              this.dialogVisible = false;
              this.get_team();
              return this.$message({
                type:'success',
                message:'修改成功'
              });
            } else {
              return this.$message({
                type:"warning",
                message:'修改失败'
              });
            }
          }
        });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    get_team() {
      let data = "current=" + this.currentPage + "&size=" + this.pageSize;
      team_manage(data).then(result => {
        if (result.data.status == 0 && result.data.data.records.length != 0) {
          this.total = result.data.data.total
          this.teamList = result.data.data.records;
        }
      });
    }
  }
};
</script>

<style lang="less" >
.promoters-container {
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
        right: 50px;
        .el-button {
          width: 70px;
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog {
        width: 700px !important;
        height: 375px !important;
        .el-dialog__header {
          padding: 0;
          height: 80px;
          text-align: center;
          line-height: 80px;
          font-weight: 600;
          font-size: 16px;
        }
        .el-dialog__body {
          padding: 45px 0;
          .el-form {
            .el-form-item {
              margin: 0 auto;
            }
          }
          .el-form-item__label {
            text-align: left;
          }
        }
        .el-dialog__footer {
          margin-top: 30px;
          text-align: center;
          .dialog-footer {
            .el-button {
              width: 60px;
              height: 30px;
              margin: 0 60px;
              &:nth-of-type(1) {
                color: #409eff;
                border: 1px solid #409eff;
              }
            }
          }
        }
      }
    }
  }
}
</style>

