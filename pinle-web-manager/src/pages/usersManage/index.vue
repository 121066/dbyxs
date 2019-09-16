<template>
  <div class="usersmanage-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          用户昵称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          会员:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
            ></el-option>
          </el-select>
        </div>

        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="value2" style="width: 100px;">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value2"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          用户类型:&nbsp;
          <el-select v-model="value3" style="width: 100px;">
            <el-option
              v-for="item in options3"
              :key="item.value3"
              :label="item.label"
              :value="item.value3"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_usersList(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="usersList" style="width: 100%" height="598">
          <el-table-column prop="accountId" label="账号Id"></el-table-column>
          <el-table-column prop="username" label="账户昵称"></el-table-column>
          <el-table-column prop="tel" label="绑定手机"></el-table-column>
          <el-table-column prop="birthday" label="生日"></el-table-column>
          <el-table-column prop="sex" label="性别" width="50"></el-table-column>
          <el-table-column prop="memberGrade" label="会员等级"></el-table-column>
          <el-table-column prop="lastLandTime" label="最后登录时间"></el-table-column>
          <el-table-column prop="consumption" label="总消费"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="type" label="用户类型"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '冻结' ? true:false"
              >启用</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '正常' ? true:false"
              >冻结</el-button>
              <el-button type="text" size="small" @click="jump_users_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="jump_users_modify(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>

      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from '../../components/page'

export default {
  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      usersList: [],
      total: 0,
      options1: [
        {
          value1: "",
          label: "所有"
        },
        {
          value1: "0",
          label: "非会员"
        },

        {
          value1: "1",
          label: "银牌会员"
        },
        {
          value1: "2",
          label: "金牌会员"
        },
        {
          value1: "3",
          label: "钻石会员"
        }
      ],
      options2: [
        {
          value2: "",
          label: "所有"
        },
        {
          value2: "1",
          label: "正常"
        },
        {
          value2: "0",
          label: "冻结"
        }
      ],
      options3: [
        { value3: "", label: "所有" },
        { value3: "0", label: "机器人" },
        { value3: "1", label: "普通用户" }
      ],

      value: "",
      value1: "",
      value2: "",
      value3: "",
      page: 1
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value = pageMsg.value
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem("pageMsg");
    }
    this.get_usersList();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_usersList();
    },
    currentChange(val) {
      this.currentPage = val
      this.get_usersList();
    },
    get_usersList(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      this.usersList = [];
      var data =
        "name=" +
        this.value +
        "&vipLevel=" +
        this.value1 +
        "&status=" +
        this.value2 +
        "&type=" +
        this.value3 +
        "&current=" +
        this.currentPage +
        "&size=" +
        this.pageSize;
      this.$axios.post("/web_user/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          // this.usersList = result.data.data.records;
          if (result.data.data.records == "") {
            this.total = 0;
            this.page = 0;
          } else {
            result.data.data.records.forEach(item => {
              var accountId = item.id;
              var username = item.name;
              var tel = item.mobile;
              var birthday = item.birthday;
              var sex;
              if (item.gender == 1) {
                sex = "男";
              } else {
                sex = "女";
              }
              var memberGrade = item.vipLevel;
              var lastLandTime = item.lastLogintime;
              var consumption = item.consume;
              var status;
              if (item.status == 0) {
                status = "冻结";
              } else {
                status = "正常";
              }
              let type = "";
              if (item.type == 0) {
                type = "机器人";
              } else {
                type = "普通用户";
              }
              var id = item.id;
              this.usersList.push({
                accountId,
                username,
                tel,
                birthday,
                sex,
                memberGrade,
                lastLandTime,
                consumption,
                status,
                type,
                id
              });
            });
          }
        } 
      });
    },
    handleForbidden(status, id) {
      this.$confirm('此操作将修改状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.$axios.post("/web_user/modify_status", "id=" + id).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            if (status == "冻结") {
              this.$message({
                type:'success',
                message:'启用成功'
              });
            } else {
              this.$message({
                type:'success',
                message:'冻结成功'
              });
            }
            this.usersList.forEach(item => {
              if (item.id == id) {
                item.status = item.status == "冻结" ? "正常" : "冻结";
              }
            });
          } else {
            return this.$message({
              type:'warning',
              message:'修改失败'
            });
          }
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });

    },
    jump_users_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg",JSON.stringify({value: this.value,value1:this.value1,value2:this.value2,value3:this.value3,currentPage:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("/usersModify?id=" + id);
    },
    jump_users_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value: this.value,value1:this.value1,value2:this.value2,value3:this.value3,currentPage:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("/usersDetail?id=" + id);
    }
  }
};
</script>


<style lang="less" >

.usersmanage-container {
  @import "../../style/table.less";
@import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .content {
    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }
  }
}
</style>
