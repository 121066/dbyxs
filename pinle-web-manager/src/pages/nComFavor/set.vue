<template >
  <div class="nComer_favor_set-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          活动名称:&nbsp;
          <el-input v-model="activityName" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          商品A名称:&nbsp;
          <el-input v-model="goodsAName" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="status" style="width: 100px;">
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
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
              v-model="endTime"
              @change="verfy_endtime"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$router.push('/nComer_favor_add')"
          >添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="activityList" style="width: 100%" height="598">
          <el-table-column prop="name" label="拼团活动名称"></el-table-column>
          <el-table-column prop="price" label="拼团价格(元)"></el-table-column>
          <el-table-column prop="goodsAName" label="商品A"></el-table-column>
          <el-table-column prop="goodsBName" label="商品B"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1 ? '开启' : '关闭'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
              <el-button
                type="text"
                size="small"
                @click="update_stauts(scope.row.id)"
              >{{scope.row.status == 0 ? '开启' : '关闭'}}</el-button>
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
import { nc_favor_set,nc_favor_status } from "../../api/getData";
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
          label: "全部"
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
      goodsAName: "", // 商品A名称
      status: "", // 状态
      startTime: "", // 创建开始时间
      endTime: "", // 创建结束时间
      activityName: "", //  活动名称
      activityList: []
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    //   用于记录当前页码
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.activityName = pageMsg.activityName;
      this.status = pageMsg.status;
      this.startTime = pageMsg.startTime;
      this.endTime = pageMsg.endTime;
      this.goodsAName = pageMsg.goodsAName;
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
          activityName: this.activityName,
          goodsAName: this.goodsAName,
          status: this.status,
          startTime: this.startTime,
          endTime: this.endTime,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
      );
        this.$router.push("nComer_favor_detail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          activityName: this.activityName,
          goodsAName: this.goodsAName,
          status: this.status,
          startTime: this.startTime,
          endTime: this.endTime,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
      );

        this.$router.push("nComer_favor_modify?id=" + id);
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
      let data =
        "name=" +
        this.activityName +
        "&goodsAName=" +
        this.goodsAName +
        "&status=" +
        this.status +
        "&startTime=" +
        this.startTime +
        "&endTime=" +
        this.endTime +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      nc_favor_set(data).then(res => {
        if (res.data.status == 0 && res.data.data.records.length != 0) {
          this.total = res.data.data.total;
          this.page = res.data.data.pages;

          res.data.data.records.forEach(item => {
            this.activityList.push({
              id: item.id,
              name: item.name,
              price: item.price,
              goodsAName: item.goodsAName,
              goodsBName: item.goodsBName,
              createtime: item.createtime,
              status: item.status
            });
          });
        }
      });
    },
    update_stauts(id) {
      this.$confirm("此操作将更改状态, 是否继续?", "提示", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          nc_favor_status("id=" + id).then(result => {
            if (result.data.status == 0) {
              if (result.data.data == 1) {
                this.get_list();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    // 校验结束时间
    verfy_startTime() {
      if (this.endTime) {
        this.timeCompare(1);
      }
      if (this.startTime == null) {
        this.startTime = "";
      }
    },
    //   校验结束时间
    verfy_endtime() {
      if (this.startTime) {
        this.timeCompare(2);
      }
      if (this.endTime == null) {
        this.endTime = "";
      }
    },
    timeCompare(flag) {
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if (
        new Date(this.endTime).getTime() <= new Date(this.startTime).getTime()
      ) {
        if (flag == 1) {
          this.endTime = "";
        } else {
          this.startTime = "";
        }
        return this.$message({
          type: "warning",
          message: "'活动创建时间-开始'必须小于'活动创建时间-结束'"
        });
      }
    }
  }
};
</script>

<style lang="less" >
.nComer_favor_set-container {
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

