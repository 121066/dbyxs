<template >
  <div class="ranking_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          排行榜设置名称:&nbsp;
          <el-input v-model="name" placeholder="请输入名称" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="status" style="width: 100px;">
            <el-option
              v-for="item in options1"
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
              v-model="createtime"
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
              v-model="endtime"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_rankingList_records(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('/add_ranking')">添加</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :data="rankingList" style="width: 100%" height="590">
          <el-table-column prop="name" label="排行榜设置名称"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div class="ceil" v-if="scope.row.status == 0">禁用</div>
              <div class="ceil" v-else>启用</div>
            </template>
          </el-table-column>
          <el-table-column prop="createtime" label="创建时间"></el-table-column>

          <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.id,scope.row.status)"
                v-if="scope.row.status == 0 ? true:false"
              >启用</el-button>
   
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
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
      <!-- <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
        <div>
          <p>{{content1}}</p>
          <p>{{content2}}</p>
          <p></p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>-->
    </div>
  </div>
</template>
<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import { ranking_list, modify_ranking_status } from "../../api/getData";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      rankingList: [],
      name: "",
      status: "",
      createtime: "",
      endtime: "",
      options1: [
        { key: "", label: "全部" },
        { key: "0", label: "禁用" },
        { key: "1", label: "启用" }
      ],
      dialogVisible: false,
      title: "",
      content1: "",
      content2: ""
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      var pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.pageSize = pageMsg.pageSize;
      this.currentPage = pageMsg.currentPage;
      this.name = pageMsg.name;
      this.status = pageMsg.status;
      this.endtime = pageMsg.endtime;
      this.createtime = pageMsg.createtime;
      localStorage.removeItem("pageMsg");
    }

    this.get_rankingList_records();
    // 获取商品类型
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_rankingList_records();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_rankingList_records();
    },
    get_rankingList_records(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      let data =
        "name=" +
        this.name +
        "&size=" +
        this.pageSize +
        "&limit=" +
        this.currentPage +
        "&status=" +
        this.status +
        "&endTime=" +
        this.endtime +
        "&startTime=" +
        ranking_list(data).then(res => {
          if (!res.data.status && res.data.data.records.length != 0) {
            this.total = res.data.data.total;
            this.page = Math.ceil(this.total / this.pageSize);
            this.rankingList = res.data.data.records;
            this.rankingList.forEach(item => {
              if (!item.updateTime) {
                item.updateTime = "------------";
              }
            });
          }
        });
    },
    handleForbidden(id, status) {
      this.$confirm("当前已有启动的抽奖活动，如果修改则以当前活动为主。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          modify_ranking_status("id=" + id).then(res => {
            if (res.data.status == 0) {
              if (res.data.data == 1) {
                this.rankingList.forEach(item => {
                  if (item.id == id) {
                    this.get_rankingList_records()
                  }
                });
                return this.$message({
                  type:'success',
                  message:'修改成功'
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

    jump_modify(id) {
      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          name: this.name,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          status: this.status,
          endtime: this.endtime,
          createtime: this.createtime
        })
      );
      this.$router.push("/modify_ranking?id=" + id);
    },
    jump_detail(id) {
      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          name: this.name,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          status: this.status,
          endtime: this.endtime,
          createtime: this.createtime
        })
      );
      this.$router.push("/ranking_detail?id=" + id);
    },
     verfy_startTime(){

      if(this.endtime){
        this.timeCompare(1)
      }
      if(this.createtime == null){
        this.createtime = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.createtime){
        this.timeCompare(2)
      }
      if(this.endtime == null){
        this.endtime = ''
      }

    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.createtime)).getTime() >= (new Date(this.endtime)).getTime()){
        if(flag == 1){
          this.createtime = ''
        } else {
          this.endtime = ''
        }
        return this.$message({
          type: 'warning',
          message: "'创建时间-开始'必须小于'创建时间-结束'"
        })
      }
    }
  }
};
</script>

<style lang="less" >
.ranking_list-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .el-table__row > td {
    height: 50px;
  }
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

