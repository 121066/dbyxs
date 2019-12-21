<template>
  <div class="select_users-container">
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
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_usersList(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="usersList" ref="multipleTable" style="width: 100%" height="528">
          <!-- <template slot-scope="scope">
            <el-checkbox  @change="handleSelectionChange(scope)"></el-checkbox>
          </template>-->
          <el-table-column  width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" @change="handleSelectionChange(scope.row.checked,scope.row.id,scope.row.username,scope.row.pictureUrl)"></el-checkbox>
            </template>
          </el-table-column>

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
        </el-table>
        <pagination
          :currentPage="currentPage"
          :page="page"
          :total="total"
          :pageSize="pageSize"
          @change-current="currentChange"
          @change-size="sizeChange"
        ></pagination>
        <div class="btns">
          <el-button type="primary" @click="submit_suers">确 定</el-button>
          <el-button style="color: #409eff" @click="cancel">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";

export default {
  components: { breadcrumb, pagination },
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
      value2: "1",
      //   value3: "",
      page: 1,
      users: [], //   用于保存用户的集合
      show1: null,
      
    };
  },
  created() {
    this.get_usersList();
    this.show1 = this.show
    this.users = this.usersInfo
  },
  props: {
    usersInfo: {
      type: Array,
      default: function() {
        return [];
      }
    },
    show: "",

  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_usersList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_usersList();
    },
    get_usersList(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
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
        1 +
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
              var pictureUrl = item.pictureUrl
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
              var checked = false;
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
                id,
                pictureUrl,
                checked
              });
            });
            if (this.users.length != 0) {
              this.users.forEach(item => {
                this.usersList.forEach(item1 => {
                  if (item1.id == item.id) {
                    item1.checked = true
                  }
                });
              });
            }
          }
        } else if (result.data.status == -1) {
          this.$message("操作失败");
        } else {
          this.$message("网络异常");
        }
      });
    },
    handleSelectionChange(status,id,name,picture) {

      if(status){
        this.users.push({id:id,username:name,pciture:picture})
      }  else {
        this.users = this.users.filter(item => {
          if(status == false && item.id != id){
            return item
          }
        })
      }

    },
    submit_suers() {
      if (this.users.length == 0) {
        return this.$message("选择的用户不能为空");
      }
      let users = [];
      this.users.forEach(item => {
        users.push({
          id: item.id,
          username: item.username,
          picture: item.pictureUrl
        });
      });
      this.show1 = false;
      this.$emit('addUsers',users,this.show1)
    },
    cancel() {
      this.show1 = false;
      this.$emit("changeShow", this.show1);
    }
  }
};
</script>


<style lang="less" >
.select_users-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  width: 100%;
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
  .btns {
    margin-top: 60px;
    text-align: center;
    .el-button {
      width: 65px;
      margin: 0 65px;
    }
  }
}
</style>
