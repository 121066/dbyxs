<template >
  <div class="interactive-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          用户昵称:&nbsp;
          <el-input v-model="value4" placeholder="请输入" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          拼团名称:&nbsp;
          <el-input v-model="value5" placeholder="请输入" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
            ></el-option>
          </el-select>
        </div>
        <!-- <div class="margin_right_20">
          活动类型:&nbsp;
          <el-select v-model="positionId" style="width: 100px;">
            <el-option
              v-for="item in position"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>-->
        <div class="start_time margin_right_20">
          申请时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="value2"
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
              v-model="value3"
              @change="verfy_endtime"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_interactive(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="interactiveList" style="width: 100%" height="598">
          <el-table-column prop="userName" label="用户昵称"></el-table-column>
          <el-table-column prop="promotionName" label="拼团名称"></el-table-column>
          <el-table-column prop="goalGoodsName" label="拼得商品"></el-table-column>
          <el-table-column prop="helpNumber" label="点赞数(个)"></el-table-column>
          <el-table-column prop="gainGoodsName" label="奖励商品"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div class="cell" style="color:#45cd68" v-if="scope.row.status == '审核拒绝'">
                <i class="el-icon-circle-close-outline"></i>
                &nbsp;{{scope.row.status}}
              </div>
              <div class="cell" style="color:#45cd68" v-if="scope.row.status == '审核通过'">
                <i class="el-icon-circle-check-outline"></i>
                &nbsp;{{scope.row.status}}
              </div>
              <div class="cell" style="color:#12bfff" v-if="scope.row.status == '待审核'">
                <i class="el-icon-time"></i>
                &nbsp;{{scope.row.status}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间" width="200"></el-table-column>
          <el-table-column prop="examineTime" label="审核时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="jump_detail(scope.row.id,scope.row.status)"
              >详情</el-button>
              <el-button
                type="text"
                size="small"
                @click="jump_approval(scope.row.id,scope.row.status)"
                v-if="scope.row.status == '待审核'"
              >审批</el-button>
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

export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      options1: [
        {
          value1: "",
          label: "所有"
        },
        {
          value1: "0",
          label: "待审核"
        },
        {
          value1: "1",
          label: "审核通过"
        },
        {
          value1: "2",
          label: "审核拒绝"
        }
      ],
      position: [
        { id: 2, label: "七折拼团" },
        { id: 3, label: "七折拼团" },
        { id: 2, label: "七折拼团" }
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      interactiveList: [],
      page: 1,
      total: 0
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value1 = pageMsg.value1;
      this.value2 = pageMsg.value2;
      this.value3 = pageMsg.value3;
      this.value4 = pageMsg.value4;
      this.value5 = pageMsg.value5;
      this.currentPage = pageMsg.currentPage;
      this.pageSize = pageMsg.pageSize;
      localStorage.removeItem("pageMsg");
    }
    this.get_interactive();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_interactive();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_interactive();
    },
    jump_detail(id, status) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          value1: this.value1,
          value2: this.value2,
          value3: this.value3,
          value4: this.value4,
          value5: this.value5,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      );
      if (status == "审核拒绝") {
        this.$router.push("/interactive_reviewRefuse?id=" + id);
      } else if (status == "审核通过") {
        this.$router.push("/interactive_reviewSuccess?id=" + id);
      } else {
        this.$router.push("/interactive_reviewAwait?id=" + id);
      }
    },
    jump_approval(id, status) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          value1: this.value1,
          value2: this.value2,
          value3: this.value3,
          value4: this.value4,
          value5: this.value5,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      );
      this.$router.push("/interactive_approval?id=" + id);
    },
    get_interactive(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      let data =
        "promotionName=" +
        this.value4 +
        "&userName=" +
        this.value5 +
        "&status=" +
        this.value1 +
        "&startTime=" +
        this.value2 +
        "&endTime=" +
        this.value3 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      this.$axios.post("/web_share/list", data).then(result => {
        if (result.data.status == 0) {
          var data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!data.length || data == null) {
            this.total = 0;
            this.page = 0;
          } else {
            data.forEach(item => {
              item.helpNumber = item.helpNumber != null ? item.helpNumber : "------"
              item.gainGoodsName = item.gainGoodsName ? item.gainGoodsName : "------";
              item.examineTime = item.examineTime != null ? item.examineTime : "------";
            });
            console.log(data)
            this.interactiveList = data;
            this.interactiveList.forEach(item => {
              this.options1.forEach(item1 => {
                if (item.status == item1.value1) {
                  return (item.status = item1.label);
                }
              });
            });
          }
        }
      });
    },
    verfy_startTime() {
      if (this.value3) {
        this.timeCompare(1);
      }
      if (this.value2 == null) {
        this.value2 = "";
      }
    },
    //   校验结束时间
    verfy_endtime() {
      if (this.value2) {
        this.timeCompare(2);
      }
      if (this.value3 == null) {
        this.value3 = "";
      }
    },

    timeCompare(flag) {
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if (new Date(this.value2).getTime() >= new Date(this.value3).getTime()) {
        if (flag == 1) {
          this.value2 = "";
        } else {
          this.value3 = "";
        }
        return this.$message({
          type: "warning",
          message: "'晒单申请时间-开始'必须小于'晒单申请时间-结束'"
        });
      }
    }
  }
};
</script>

<style lang="less" >
.interactive-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .content {
    .query {
      .start_time {
        display: flex;
        align-items: center;
      }
      .end_time {
        display: flex;
        align-items: center;
      }
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }
  }
}
</style>

