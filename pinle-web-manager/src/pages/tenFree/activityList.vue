<template >
  <div class="ten_free_act-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          活动名称:&nbsp;
          <el-input v-model="actName" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          商品名称:&nbsp;
          <el-input v-model="goodsname" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="status" style="width: 100px;">
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>
        <div class="start_time margin_right_20">
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="startTime"
              @change="verfy_startTime"
              placeholder="选择日期时间"
              style="width:200px"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="end_time margin_right_20">
          创建时间-结束:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              style="width:200px"
              default-time="23:59:59"
              v-model="endTime"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('tActivity_add')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="activityList" style="width: 100%" height="598">
          <el-table-column prop="activityName" label="活动名称"></el-table-column>

          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column label="商品价格(元)">
            <template slot-scope="scope">
              <span>{{scope.row.goodsPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1 ? '开启' : '关闭'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="活动创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
              <el-button
                type="text"
                size="small"
                @click="update_stauts(scope.row.id,scope.row.status)"
              >{{scope.row.status == 1 ? '关闭' : '开启'}}</el-button>
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
import { tFreeO_act, tFreeO_status } from "../../api/getData";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      statusList: [
        {
          key: "",
          label: "所有"
        },
        {
          key: "0",
          label: "关闭"
        },
        {
          key: "1",
          label: "开启"
        }
      ],
      actName: "", //  活动名称
      goodsname: "", //  商品名称
      status: "", //  活动状态
      startTime: "", //   活动创建时间-开始
      endTime: "", //   活动创建时间-结束
      activityList: []
    };
  },
  created() {

    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.actName = pageMsg.actName;
      this.goodsname = pageMsg.goodsname;
      this.status = pageMsg.status;
      this.startTime = pageMsg.startTime;
      this.endTime = pageMsg.endTime;
      this.currentPage = pageMsg.currentPage;
      this.pageSize = pageMsg.pageSize;
      localStorage.removeItem("pageMsg");
    }
    this.get_list();
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
    jump_detail(id) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          status: this.status,
          actName: this.actName,
          goodsname: this.goodsname,
          startTime: this.startTime,
          endTime: this.endTime,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
      );

      this.$router.push("tActivity_detail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          status: this.status,
          actName: this.actName,
          goodsname: this.goodsname,
          startTime: this.startTime,
          endTime: this.endTime,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
      );

      this.$router.push("tActivity_modify?id=" + id);
    },
    get_list(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      if (this.startTime == null) {
        this.startTime = "";
      }
      if (this.endTime == null) {
        this.endTime = "";
      }
      this.activityList = [];
      // var data = 'activityName=' + this.actName + '&activityStatus=' + this.status + '&beginTime=' + this.startTime + '&endTime=' + this.endTime + '&goodsName=' + this.goodsname + '&pageNum=' + this.currentPage + '&pageSize=' + this.pageSize
      //var data = {activityName: this.actName,activityStatus:this.status,beginTime:this.startTime,endTime:this.endTime,goodsName:this.goodsname,pageNum:this.currentPage,pageSize:this.pageSize}
      var data = { pageNum: this.currentPage, pageSize: this.pageSize };
      if (this.actName) {
        data["activityName"] = this.actName;
      }
      if (this.status) {
        data["activityStatus"] = this.status;
      }
      if (this.startTime) {
        data["beginTime"] = this.startTime;
      }
      if (this.endTime) {
        data["endTime"] = this.endTime;
      }
      if (this.goodsname) {
        data["goodsName"] = this.goodsname;
      }
      tFreeO_act(data).then(res => {
        if (res.data.status == 0 && res.data.data.records.length != 0) {
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
          res.data.data.records.forEach(item => {
            item["status"] = item.activityStatus;
            delete item.activityStatus;
          });
          this.activityList = res.data.data.records;
        }
      });
    },
    update_stauts(id, status) {
      if (status == 0) {
        status = 1;
      } else {
        status = 0;
      }

      tFreeO_status({ id, activityStatus: status }).then(result => {

        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.activityList.forEach(item => {
              if (item.id == id) {
                if (item.status == 0) {
                  item.status = 1;
                } else {
                  item.status = 0;
                }
              }
            });
            return this.$message({
              type: "success",
              message: "修改成功"
            });
          }
        }
      });
    },
    // 校验结束时间
    verfy_startTime() {

      if (this.endTime) {
        this.timeCompare(1);
      }
    },
    //   校验结束时间
    verfy_endtime() {
      if (this.startTime) {
        this.timeCompare(2);
      }
    },

    timeCompare(flag) {
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if (
        new Date(this.startTime).getTime() >= new Date(this.endTime).getTime()
      ) {
        if (flag == 1) {
          this.startTime = "";
        } else {
          this.endTime = "";
        }
        return this.$message({
          type: "warning",
          message: "'创建时间-开始'必须小于'创建时间-结束'"
        });
      }
    }
  }
};
</script>

<style lang="less" >
.ten_free_act-container {
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

