<template>
  <div class="free_lottery-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          发起者昵称:&nbsp;
          <el-input v-model="username" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          模式:&nbsp;
          <el-select v-model="pattern" style="width: 100px;font-size: 12px;" @change="changeStatus">
            <el-option
              v-for="item in patternList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20" v-if="this.pattern">
          状态:&nbsp;
          <el-select v-model="status" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>

        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_lottery_list(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="freeLottery" style="width: 100%" height="598">
          <el-table-column label="发起者昵称">
            <template slot-scope="scope">
              <div class="cell">
                <img :src="scope.row.userPricture" alt style="border-radius: 50%" />
                <span>{{scope.row.username}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="开奖模式">
            <template slot-scope="scope">
              <span>{{scope.row.pattern == 1 ? '个人模式' : '商业模式'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="开奖方式">
            <template slot-scope="scope">
              <div class="cell">
                <span v-if="scope.row.type == 1">按时间自动开奖</span>
                <span v-if="scope.row.type == 2">按人数自动开奖</span>
                <span v-if="scope.row.type == 3">手动开奖</span>
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="createtime" label="发起时间"></el-table-column>
          <el-table-column prop="time" label="开奖时间"></el-table-column>-->
          <!-- <el-table-column prop="number" label="开奖人数"></el-table-column> -->
          <el-table-column label="一等奖">
            <template slot-scope="scope">
              <img :src="scope.row.firstPrizePricture" alt />
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.firstPrizeName"
                placement="bottom"
              >
                <span>{{scope.row.firstPrizeName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="二等奖">
            <template slot-scope="scope">
              <img v-if="scope.row.secondPrizePricture" :src="scope.row.secondPrizePricture" alt/>
              <el-tooltip
                v-if="scope.row.secondPrizeName"
                class="item"
                effect="dark"
                :content="scope.row.secondPrizeName"
                placement="bottom"
              >
                <span>{{scope.row.secondPrizeName}}</span>
              </el-tooltip>
              <span v-if="!scope.row.secondPrizeName" >--------</span>
            </template>
          </el-table-column>
          <el-table-column label="三等奖">
            <template slot-scope="scope">
              <img v-if="scope.row.thirdPrizePricture" :src="scope.row.thirdPrizePricture" alt />
              <el-tooltip
                class="item"
                effect="dark"
                v-if="scope.row.thirdPrizeName"
                :content="scope.row.thirdPrizeName"
                placement="bottom"
              >
                <span>{{scope.row.thirdPrizeName}}</span>
              </el-tooltip>
              <span v-if="!scope.row.thirdPrizeName">--------</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1 ? statusList2[scope.row.status].label : statusList1[scope.row.status].label}}</span>
              <!-- <span>{{scope.row.status - 1}}</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column prop="auditTime" label="审核时间/开始时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_detail(scope.row.id,scope.row.type,1)">详情</el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status == 1"
                @click="handleStatus(scope.row.id,scope.row.status)"
              >关闭</el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status == 3"
                @click="handleStatus(scope.row.id,scope.row.status)"
              >开启</el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status == 4"
                @click="jump_detail(scope.row.id,scope.row.type,2)"
              >审核</el-button>
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
import { free_lottery, free_lottery_status } from "../../api/getData";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      page: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      username: "",
      status: "",
      pattern: "",
      patternList: [
        { key: "", label: "全部" },
        { key: "2", label: "商业模式" },
        { key: "1", label: "个人模式" }
      ],
      statusList: [],
      statusList1: [
        { key: "", label: "全部" },
        { key: "1", label: "进行中" },
        { key: "2", label: "已结束" },
        { key: "3", label: "已关闭" },
        { key: "4", label: "待审核" },
        { key: "5", label: "审核拒绝" }
      ], // 商业模式状态列表
      statusList2: [
        { key: "", label: "全部" },
        { key: "1", label: "进行中" },
        { key: "2", label: "已结束" },
        { key: "3", label: "已关闭" }
      ], // 个人模式状态列表
      freeLottery: []
    };
  },
  created() {
    this.get_lottery_list();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_lottery_list();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_lottery_list();
    },
    get_lottery_list(currentPage) {
      if (currentPage == 1) {
        this.currentPage = currentPage;
      }

      var data =
        "size=" +
        this.pageSize +
        "&current=" +
        this.currentPage +
        "&username=" +
        this.username +
        "&status=" +
        this.status + 
        "&pattern=" +
        this.pattern

      free_lottery(data).then(res => {
        if (res.data.status == 0) {
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
          res.data.data.records.forEach(item => {
            if (item.time == null) {
              item.time = "------";
            }
            if (item.number == null) {
              item.number = "------";
            }

            if (item.applyTime == null) {
              item.applyTime = "------";
            }
            if(item.auditTime == null){
              item.auditTime = '------'
            }
            if(item.secondPrizeName == null || item.secondPrizePricture == null){
              item.secondPrizeName = ''
              item.secondPrizePricture = ''
            }
            if(item.thirdPrizeName == null || item.thirdPrizePricture == null){
              item.thirdPrizeName = ''
              item.thirdPrizePricture = ''
            }
          });
          // res.data.data.records.push({
          //   applyTime: null,
          //   auditTime: "2019-07-03 19:09:19.0",
          //   firstPrizeName: null,
          //   firstPrizePricture: null,
          //   id: "3",
          //   pattern: "2",
          //   secondPrizeName: null,
          //   secondPrizePricture: null,
          //   status: "3",
          //   thirdPrizeName: null,
          //   thirdPrizePricture: null,
          //   type: "1",
          //   userPricture:
          //     "http://192.168.0.11:8080/imgs/user/5bc94acd-9612-464c-8631-6632342412fe",
          //   username: "太狼"
          // });
          // res.data.data.records.push({
          //   applyTime: null,
          //   auditTime: "2019-07-03 19:09:19.0",
          //   firstPrizeName: null,
          //   firstPrizePricture: null,
          //   id: "3",
          //   pattern: "2",
          //   secondPrizeName: null,
          //   secondPrizePricture: null,
          //   status: "4",
          //   thirdPrizeName: null,
          //   thirdPrizePricture: null,
          //   type: "1",
          //   userPricture:
          //     "http://192.168.0.11:8080/imgs/user/5bc94acd-9612-464c-8631-6632342412fe",
          //   username: "太狼"
          // });

          this.freeLottery = res.data.data.records;

        }
      });
    },
    jump_detail(id, type, flag) {
      //   type为2，代表需要进行审核
      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          pageSize: this.pageSize,
          current: this.currentPage,
          username: this.username,
          status: this.saatus,
          createTime: this.createTime,
          endTime: this.endTime
        })
      );
      this.$router.push("/free_lottery_del?id=" + id + '&type=' + type + '&flag='+flag);
    },
    handleStatus(id, status) {
      if(status == 3){
        status = 0
      }
      free_lottery_status("id=" + id + "&status=" + status).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.get_lottery_list()
            return this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "修改失败"
            });
          }
        }
      });
    },
    changeStatus() {
      if (this.pattern == 1) {
        this.statusList = this.statusList2;
      } else if (this.pattern == 2) {
        this.statusList = this.statusList1;
      }
      this.status = "";
    }
  }
};
</script>


<style lang="less" >
.free_lottery-container {
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
    }
  }
  .cell img {
    vertical-align: middle;
    width: 30px;
    height: 30px;
  }
}
</style>
