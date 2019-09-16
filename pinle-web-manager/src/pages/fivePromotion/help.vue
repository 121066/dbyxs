<template>
  <div class="fivehelp-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="jumpType" style="margin-right: 20px;">
          账号ID:&nbsp;
          <el-input v-model="value1" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="jumpType" style="margin-right: 20px;">
          账号昵称:&nbsp;
          <el-input v-model="value2" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="usersList"
          style="width: 100%"
          height="528"
        >
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" 
                @change="handleSelectChange(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="账号ID"></el-table-column>
          <el-table-column prop="name" label="账号昵称"></el-table-column>
          <el-table-column prop="tel" label="绑定手机"></el-table-column>
          <el-table-column prop="birthday" label="生日"></el-table-column>

          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="grade" label="会员等级"></el-table-column>
          <el-table-column prop="type" label="账号类型"></el-table-column>
        </el-table>
        <pagination
          :currentPage="currentPage"
          :page="page"
          :total="total"
          :pageSize="pageSize"
          @change-current="currentChange"
          @change-size="sizeChange"
        ></pagination>

        <div class="btn">
          <el-button type="primary" @click="help_promotion">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "../../components/page";
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      usersList: [],
      total: 0,
      options1: [{ value1: "", label: "所有" }],
      value1: "",
      value2: "",
      page: 1, //  页数
      pageSize: 10, // 每页多少条
      currentPage: 1, //当前页
      multipleSelection: [], //选中的用户
      num: this.$route.query.num // 已用拼团中的人数
    };
  },
  created() {
    this.get_list();
    let usersId = localStorage.getItem('userId')
    if(usersId){
      this.multipleSelection = JSON.parse(usersId)
      localStorage.removeItem('userId')
    }
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_list();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_list();
    },
    handleSelectChange(val) {
      if (3 - this.num == 1) {
        this.multipleSelection.unshift();
        this.usersList.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id !== val.id) {
            item.checked = false;
          }
        });
        this.multipleSelection=[val];
      } else if (3 - this.num == 2) {
        if (val.checked) {
          if (this.multipleSelection.length == 2) {
            this.usersList.forEach(item => {
              if (item.id == val.id) {
                item.checked = !item.checked;
              }
            });
            return this.$message({
              type:'warning',
              message:'最多只能选择2个人'
            });
          } else {
            this.multipleSelection.push(val);
          }
        } else {
          this.multipleSelection = this.multipleSelection.filter(item => {
            if(item.id != val.id){
              return item
            }
          })
        }
      }
      localStorage.setItem('usersId',JSON.stringify(this.multipleSelection))
    },
    //  获取用户列表
    get_list(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      this.usersList = [];
      let data =
        "type=" +
        "0" +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage +
        "&name=" +
        this.value2;
      this.$axios.post("/web_user/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize)
          result.data.data.records.forEach(item => {
            let id = item.id;
            let name = item.name;
            let tel = item.mobile;
            let birthday = item.birthday;
            let gender = "";
            if (item.gender == "0") {
              gender = "女";
            } else {
              gender = "男";
            }
            let grade = item.vipLevel;
            let type = "";
            if (item.type == 0) {
              type = "机器人";
            }
            this.usersList.push({
              id,
              name,
              tel,
              birthday,
              gender,
              grade,
              type,
              checked: false
            });
            if(this.multipleSelection.length != 0){
              this.usersList.forEach(item => {
                this.multipleSelection.forEach(item1 => {
                  if(item.id == item1.id){
                    item.checked = true
                  }
                })
              })
            }
          });
        }
      });
    },

    // 点击帮助拼团
    help_promotion() {
      if (this.multipleSelection.length == 0) {
        return this.$message({
          type:'warning',
          message:'请选择一个用户进行添加'
        });
      }
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });

      localStorage.setItem('ids',JSON.stringify(ids))
      this.$router.go(-1)
    }
  }
};
</script>


<style lang="less" >
.fivehelp-container {
  .first,
  .last {
    cursor: pointer;
  }
  display: flex;
  flex-flow: column;
  .disabled {
    cursor: not-allowed !important;
  }
  .el-pagination button,
  .el-pagination span:not([class*="suffix"]) {
    min-width: 30px;
  }
  .el-input__inner {
    padding-left: 10px;
    height: 30px;
  }
  thead tr {
    background-color: #e6e9f2 !important;
  }
  .el-table th {
    background-color: transparent;
  }
  .el-breadcrumb {
    height: 100%;
    display: flex;
    align-items: center;
    .el-breadcrumb__item {
      display: block;
      line-height: 19px;
    }
  }
  .el-input--mini .el-input__inner {
    height: 30px;
  }
  .el-pagination .el-select .el-input {
    margin: 0;
  }
  .el-pager li.active {
    background-color: #8b98ed;
    position: relative;
  }
  width: 100%;
  height: 100%;
  th > .cell {
    text-align: center;
    color: #333;
  }
  .el-input__icon {
    line-height: 30px;
  }
  td > .cell {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table tr {
    background-color: tansparent;
  }
  .content {
    background-color: #eff3f6;
    padding: 0px 20px 20px;

    height: 100%;
    flex: 1;
    display: flex;
    flex-flow: column;
    // box-sizing: border-box;
    .query {
      height: 60px;
      font-size: 14px;
      color: #666;
      display: flex;
      align-items: center;
      .status {
        margin-right: 20px;
      }
      .btn {
        .el-button {
          height: 30px;
          width: 70px;
          text-align: center;
          padding: 0;
          border-radius: 5px;
        }
      }
    }
    .table {
      padding: 0 20px;
      padding-top: 15px;
      box-sizing: border-box;
      height: 100%;
      flex: 1;
      overflow: hidden;
      background-color: #fff;
      .block {
        margin-top: 40px;
        .el-pagination {
          text-align: center;
          margin-right: 5px;
          padding: 0;
          button {
            width: 30px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #dadcde;
            color: #666;
            padding: 0;
          }
          .el-pager {
            margin-right: 10px;
            li {
              width: 30px;
              height: 30px;
              border: 1px solid #dadcde;
              color: #666;
              min-width: 0;
              margin-left: 10px;
            }
          }
          .el-pagination__jump {
            margin-left: 10px;
            color: #666;
          }
        }
      }

      .btn {
        margin-top: 70px;
        text-align: center;
        > button {
          height: 30px !important;
          line-height: 30px;
          padding: 0;
          width: 60px;
          margin: 0 70px;
          // box-sizing: content-box;
        }
      }
    }
  }
}
</style>
