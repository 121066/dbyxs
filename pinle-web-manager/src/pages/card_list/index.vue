<template>
  <div class="card_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query" style="height:35px;margin-top:10px;">
        <ul style="display:flex;">
          <li
            v-for="(item, index) in cardTypeList"
            :key="index"
            :class="cardType == item.key ? 'current' : ''"
            @click="switchCard(item.key)"
          >{{item.label}}</li>
        </ul>
      </div>
      <div class="query">
        <div class="margin_right_10">
          卡券名称:&nbsp;
          <el-input v-model="cardname" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_10">
          用户类型:&nbsp;
          <el-select v-model="userType" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in userList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_10">
          状态:&nbsp;
          <el-select v-model="status1" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in statusList1"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_10">
          时间状态:&nbsp;
          <el-select v-model="status" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_10">
          发放类型:&nbsp;
          <el-select v-model="sendType" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in sendTypeList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="start_time margin_right_10">
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="createTime"
              @change="verfy_startTime"
              placeholder="选择日期时间"
              style="width:200px"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="end_time margin_right_10">
          创建时间-结束:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              style="width:200px"
              v-model="endTime"
              @change="verfy_endtime"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>

        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_cardList(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('/add_card')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="cardList" style="width: 100%" height="563">
          <el-table-column prop="name" label="卡券名称" width="150"></el-table-column>
          <el-table-column label="发放类型" width="150">
            <template slot-scope="scope">
              <div class="cell">{{scope.row.issueType == 1 ? '管理员发放': "系统发放"}}</div>
            </template>
          </el-table-column>

          <el-table-column label="指定用户类型" width="150">
            <template slot-scope="scope">
              <div class="cell">
                <span v-if="scope.row.userType == 1">所用用户</span>
                <span v-if="scope.row.userType == 2">vip用户</span>
                <span v-if="scope.row.userType == 3">指定用户</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cardType" label="卡券类型" width="150">
            <template>
              <div class="cell">
                <span v-if="cardType == 1">优惠券</span>
                <span v-if="cardType == 2">红包</span>
                <span v-if="cardType == 3">购物券</span>
                <span v-if="cardType == 4">免邮券</span>
                <span v-if="cardType == 5">免单券</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="intervals" label="领券时间间隔（天）" width="200"></el-table-column>
          <el-table-column prop="times" label="间隔时间领取的次数(次)" width="200"></el-table-column>
          <el-table-column prop="type" label="发放限制" width="150">
            <template slot-scope="scope">
              <div class="cell">{{scope.row.timeStatus === 0 ? '无发放总数限制' : '有发放数量限制'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="发放总数量（张）" width="150"></el-table-column>
          <el-table-column prop="remain" label="剩余数量（张）" width="150"></el-table-column>
          <el-table-column prop="status" label="状态" width="150">
            <template slot-scope="scope">
              <div class="cell">{{scope.row.status == 1 ? '启用' : '禁用'}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="startTime" label="开始时间" width="200"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="200"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>

          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleStatus(scope.row.id,scope.row.status)"
              >{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
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
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import { card_list, card_delete, card_modify_status } from "../../api/getData";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      page: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,

      cardList: [],
      userList: [
        { key: "", label: "全部" },
        { key: "1", label: "所用用户" },
        { key: "2", label: "vip用户" },
        { key: "3", label: "指定用户" }
      ],
      statusList1: [
        { key: "", label: "全部" },
        { key: "1", label: "启用" },
        { key: "0", label: "禁用" }
      ],
      statusList: [
        { key: "", label: "全部" },
        { key: "1", label: "已过期" },
        { key: "2", label: "活动中" },
        { key: "3", label: "未开始" }
      ],
      sendTypeList: [
        { key: "", label: "全部" },
        { key: "1", label: "管理员发放" },
        { key: "2", label: "系统发放" }
      ],
      cardTypeList: [
        { key: "1", label: "优惠券列表" },
        { key: "2", label: "红包列表" },
        { key: "4", label: "免邮券列表" },
        { key: "5", label: "免单券列表" },
        { key: "3", label: "购物券列表" }
      ],
      cardType: 1,
      sendType: "",
      userType: "",
      status1: "",
      status: "",
      createTime: "",
      endTime: "",
      cardname: ""
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      var pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.cardname = pageMsg.cardname;
      this.cardType = pageMsg.cardType;
      this.userType = pageMsg.userType;
      this.status = pageMsg.status;
      this.createTime = pageMsg.createTime;
      this.endTime = pageMsg.endTime;
      this.sendType = pageMsg.sendType;
      this.status1 = pageMsg.status1;
      this.pageSize = pageMsg.pageSize
      this.currentPage = pageMsg.currentPage
      localStorage.removeItem("pageMsg");
    } 
      this.get_cardList();
    
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_cardList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_cardList();
    },
    jump_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          cardname: this.cardname,
          userType: this.userType,
          cardType: this.cardType,
          status: status,
          createTime: this.createTime,
          endTime: this.endTime,
          sendType: this.sendType,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          status1: this.status1,

        })
      );

      this.$router.push("/card_detail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          cardname: this.cardname,
          userType: this.userType,
          cardType: this.cardType,
          status: status,
          createTime: this.createTime,
          endTime: this.endTime,
          sendType: this.sendType,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          status1: this.status1
        })
      );
      this.$router.push("/modify_card?id=" + id);
    },
    switchCard(id) {
      this.cardType = id;
      this.cardname = "";
      this.userType = "";
      this.status = "";
      this.createTime = "";
      this.endTime = "";
      this.sendType = "";
      this.status1 = "";
      this.get_cardList();
    },
    get_cardList(currentPage) {
      this.cardList = [];
      if (currentPage) {
        this.currentPage = currentPage;
      }
      if(this.createTime == null){
        this.createTime = ''
      }
      if(this.endTime == null){
        this.endTime = ''
      }
      let data =
        "name=" +
        this.cardname +
        "&issueType=" +
        this.sendType +
        "&userType=" +
        this.userType +
        "&type=" +
        this.cardType +
        "&timeStatus=" +
        this.status +
        "&status=" +
        this.status1 +
        "&startTime=" +
        this.createTime +
        "&endTime=" +
        this.endTime +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      card_list(data).then(res => {
        if (res.data.status == 0 && res.data.data.records.length != 0) {
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
          this.cardList = res.data.data.records;
          // let data = res.data.data;
          this.cardList.forEach(item => {
            if(!item.total){
              item.total = '------'
              item.remain = '------'
            }
          })
        }
      });
    },
    handleStatus(id,status) {
      this.$confirm("此操作将修改卡券的状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => { 
          // if(status == 0){
          //   status = 1
          // } else {
          //   status = 0
          // }
          let data = 'vouchersSetId=' + id + '&status=' + status 
          card_modify_status(data).then(res => {
            if(res.data.status == 0){
              if(res.data.data == 1){
                this.get_cardList()
                return this.$message({
                  type:'success',
                  message:'修改成功'
                })
              } else {
                return this.$message({
                  type:'warning',
                  message:'修改失败'
                })
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleDelete(id) {

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          card_delete("vouchersSetId=" + id).then(res => {
            if (res.data.status == 0) {
              if (res.data.data == 1) {
                this.get_cardList();
                return this.$message({
                  type: "success",
                  message: "删除成功"
                });
              } else {
                return this.$message({
                  type: "warning",
                  message: "删除失败"
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
    },
    verfy_startTime(){

      if(this.endTime && this.createTime){
        this.timeCompare(1)
      }
      if(this.createTime == null){
        this.createTime = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.createTime && this.endTime){
        this.timeCompare(2)
      }
      if(this.endTime == null){
        this.endTime = ''
      }

    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.createTime)).getTime() >= (new Date(this.endTime)).getTime()){
        if(flag == 1){
          this.createTime = ''
        } else {
          this.endTime = ''
        }
        return this.$message({
          type: 'warning',
          message: "'卡券创建时间-开始'必须小于'卡券创建时间-结束'"
        })
      }
    }
  }
};
</script>


<style lang="less" >
.card_list-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .content {
    .query {
      .start_time,
      .end_time {
        display: flex;
        align-items: center;
      }
      .btn {
        .el-button {
          width: 70px;
        }
      }
      .margin_right_10 {
        margin-right: 8px;
      }
    }
    .query {
      ul {
        height: 100%;
        li {
          width: 100px;
          height: 100%;
          background-color: #dfe2eb;
          text-align: center;
          line-height: 35px;
          margin-right: 15px;
          cursor: pointer;
        }
      }
    }
  }

  //更改行高
  .el-table__row td {
    height: 50px;
    padding: 0;
  }
  .current {
    background-color: #5d70e9 !important;
    color: #fff;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  // ::-webkit-scrollbar
  // {
  //     width: 100%;
  //     height: 15px;
  //     background-color: transparent;
  // }
}
</style>
