<template>
  <div class="commission_check-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          申请用户:&nbsp;
          <el-input v-model="username" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          提现类型:&nbsp;
          <el-select v-model="withdrawal_type" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="status" style="width: 100px;">
            <el-option
              v-for="item in options2"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="start_time margin_right_20">
          申请时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="aplication_time1"
              @change="verfy_startTime"
              placeholder="选择日期时间"
              style="width:200px"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="end_time margin_right_20">
          申请时间-结束:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              style="width:200px"
              default-time="23:59:59"
              v-model="aplication_time2"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_commission_check_list(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="commissionCheckList" style="width: 100%" height="598">
          <el-table-column prop="userName" label="申请用户"></el-table-column>
          <el-table-column prop="applyCommission" label="申请佣金(元)"></el-table-column>
          <el-table-column label="提现类型">
            <template slot-scope="scope">
              <div class="cell" v-if="scope.row.examineType == 1">{{'转入余额'}}</div>
              <div class="cell" v-else>{{'提出现金'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column prop="examineTime" label="审核时间"></el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <div class="cell" style="color:#45cd68" v-if="scope.row.examineStatus == '0'">
                <i class="el-icon-circle-close-outline"></i>
                &nbsp;{{"待审核"}}
              </div>
              <div class="cell" style="color:#45cd68" v-if="scope.row.examineStatus == '1'">
                <i class="el-icon-circle-check-outline"></i>
                &nbsp;{{'审核通过'}}
              </div>
              <div class="cell" style="color:#12bfff" v-if="scope.row.examineStatus == '2'">
                <i class="el-icon-time"></i>
                &nbsp;{{'审核拒绝'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handlecheck(scope.row.id,scope.row.examineType)"
                v-if="scope.row.examineStatus == 0"
              >审核</el-button>
              <el-button
                type="text"
                size="small"
                @click="handledetail(scope.row.id,scope.row.examineType,scope.row.examineStatus)"
              >详情</el-button>
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
import { commission_check } from "../../api/getData";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      page: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      username: "",
      withdrawal_type: "",
      status: "",
      aplication_time1: "",
      aplication_time2: "",
      options1: [
        { key: "", label: "全部" },
        { key: "1", label: "转入余额" },
        { key: "2", label: "提取现金" }
      ],
      options2: [
        { key: "", label: "全部" },
        { key: "2", label: "审核拒绝" },
        { key: "1", label: "审核通过" },
        { key: "0", label: "待审核" }
      ],
      commissionCheckList: []
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      var pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.pageSize = pageMsg.pageSize;
      this.currentPage = pageMsg.currentPage;
      this.aplication_time1 = pageMsg.aplication_time1;
      this.aplication_time2 = pageMsg.aplication_time2;
      this.status = pageMsg.status;
      this.withdrawal_type = pageMsg.withdrawal_type;
      this.username = pageMsg.username;
      localStorage.removeItem("pageMsg");
    }
    this.get_commission_check_list();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_commission_check_list();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_commission_check_list();
    },
    handledetail(id, type, status) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          username: this.username,
          aplication_time1: this.aplication_time1,
          aplication_time2: this.aplication_time2,
          status: this.status,
          withdrawal_type: this.withdrawal_type
        })
      );

      if (status == 2) {
        this.$router.push(
          "/commission_refuse_detail?id=" + id + "&type=" + type
        );
      } else if (status == 1) {
        this.$router.push(
          "/commission_success_detail?id=" + id + "&type=" + type
        );
      } else if (status == 0) {
        this.$router.push(
          "/commission_await_detail?id=" + id + "&type=" + type
        );
      }
    },
    handlecheck(id, type) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          username: this.username,
          aplication_time1: this.aplication_time1,
          aplication_time2: this.aplication_time2,
          status: this.status,
          withdrawal_type: this.withdrawal_type
        })
      );
      this.$router.push(
        "/commission_withdrawal_review?id=" + id + "&type=" + type
      );
    },
    get_commission_check_list(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      if (this.aplication_time1 == null) {
        this.aplication_time1 = "";
      }
      if (this.aplication_time2 == null) {
        this.aplication_time2 = "";
      }
      this.commissionCheckList = [];
      // let data = 'size=' + this.pageSize + '&current=' + this.currentPage
      let data =
        "endApplyTime=" +
        this.aplication_time2 +
        "&stratApplyTime=" +
        this.aplication_time1 +
        "&examineStatus=" +
        this.status +
        "&examineType=" +
        this.withdrawal_type +
        "&userName=" +
        this.username +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      commission_check(data).then(res => {
        if (res.data.status == 0 && res.data.data.records.length != 0) {
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
          this.commissionCheckList = res.data.data.records;
        }
      });
    },
    verfy_startTime() {
      if (this.aplication_time2 && this.aplication_time1) {
        this.timeCompare(1);
      }
      if (this.aplication_time1 == null) {
        this.aplication_time1 = "";
      }
    },
    //   校验结束时间
    verfy_endtime() {
      if (this.aplication_time1 && this.aplication_time2) {
        this.timeCompare(2);
      }
      if (this.aplication_time2 == null) {
        this.aplication_time2 = "";
      }
    },

    timeCompare(flag) {
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if (
        new Date(this.aplication_time1).getTime() >=
        new Date(this.aplication_time2).getTime()
      ) {
        if (flag == 1) {
          this.aplication_time1 = "";
        } else {
          this.aplication_time2 = "";
        }
        return this.$message({
          type: "warning",
          message: "'申请时间-开始'必须小于'申请时间-结束'"
        });
      }
    }
  }
};
</script>


<style lang="less" >
.commission_check-container {
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
      .start_time {
        display: flex;
        align-items: center;
      }
      .end_time {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
