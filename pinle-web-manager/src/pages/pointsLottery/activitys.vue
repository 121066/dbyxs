<template>
  <div class="seckill_acti_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          活动名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
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
        <div class="start_time margin_right_20">
          修改时间-开始:&nbsp;
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
          修改时间-结束:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              style="width:200px"
              v-model="value3"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="23:59:59"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_lottery(1)">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$router.push('/points_addActivitys')"
          >添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="activityList" style="width: 100%" height="598">
          <el-table-column prop="drawName" label="活动名称"></el-table-column>
          <el-table-column prop="drawScore" label="单次抽奖积分(积分)"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.drawStatus" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column prop="操作" label="状态">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="chang_stauts(scope.row.drawStatus,scope.row.id)"
                v-if="!scope.row.drawStatus"
              >启用</el-button>
              <el-button
                type="text"
                size="small"
                @click="jump_modify(scope.row.drawStatus,scope.row.id)"
              >修改</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row.drawStatus,scope.row.id)"
              >删除</el-button>
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
      <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
        <div>
          <p>{{content1}}</p>
          <p>{{content2}}</p>
          <p></p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import {
  points_lottery,
  lottery_delete,
  lottery_status
} from "../../api/getData";

export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      total: 0,
      options1: [
        { value1: "", label: "全部" },
        { value1: "1", label: "启用" },
        { value1: "0", label: "禁用" }
      ],
      dialogVisible: false,
      isFlag: 2, //  用于标记是删除，还是修改活动的状态  2：表示修改活动的状态  1：表示删除
      activityList: [],
      value: "",
      value1: "",
      value2: "",
      value3: "",
      page: 1,
      pageSize: 10,
      title: "",
      content1: "",
      content2: "",
      status: "", //  用于记录活动的状态
      id: "" //   用于记录活动的id
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value = pageMsg.value;
      this.value1 = pageMsg.value1;
      this.value2 = pageMsg.value2;
      this.value3 = pageMsg.value3;
      this.currentPage = pageMsg.currentPage;
      this.pageSize = pageMsg.pageSize;
      localStorage.removeItem("pageMsg");
    }
    this.get_lottery();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_lottery();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_lottery();
    },
    jump_detail(id, status) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));

      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          value: this.value,
          value1: this.value1,
          value2: this.value2,
          value3: this.value3,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      );
      this.$router.push("/points_activitysDetail?id=" + id);
    },
    jump_modify(status, id) {
      localStorage.setItem("path", JSON.stringify(this.$route.path));
      localStorage.setItem(
        "pageMsg",
        JSON.stringify({
          value: this.value,
          value1: this.value1,
          value2: this.value2,
          value3: this.value3,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      );
      this.$router.push("/points_activitysModify?id=" + id);
    },
    handleDelete(status, id) {
      if (status) {
        this.isFlag = 1;
        this.title = "删除提醒";
        this.content1 = "无法删除！正在启用的活动仅此一条，";
        this.content2 = "删除后无法使用积分抽奖，请先添加'启用'状态的活动。";
        return this.dialogVisible = true;
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (!status) {
              status = 0;
            } else if (status) {
              status = 1;
            }
            let data = "DrawStatus=" + status + "&id=" + id;
            lottery_delete(data).then(res => {
              if (res.data.status == 0) {
                if (res.data.data == 1) {
                  this.$message({
                    type:'success',
                    message:'删除成功'
                  });
                  if(this.currentPage != 1){
                    this.currentPage--
                  }
                  this.get_lottery();
                } else {
                  this.$message({
                    type:'warning',
                    message:'删除失败'
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
      }
    },
    submit() {
      if (this.isFlag == 1) {
        this.dialogVisible = false;
      } else if (this.isFlag == 2) {
        let data = "DrawStatus=" + this.status + "&id=" + this.id;
        lottery_status(data).then(res => {
          if (res.data.status == 0) {
            if (res.data.data == 1) {
              this.get_lottery();
              this.dialogVisible = false;
              this.$message({
                type:'success',
                message:'修改成功'
              });
            } else {
              this.$message({
                type:'warning',
                message:'修改失败'
              });
            }
          }
        });
      }
    },
    get_lottery(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      if(this.value2 == null){
        this.value2 = ''
      }
      if(this.value3 == null){
        this.value3 = ''
      }
      // let data = "size=" + this.pageSize + "&current=" + this.currentPage
      let data = "size=" + this.pageSize + "&current=" + this.currentPage + '&drawName=' + this.value + '&drawStatus=' + this.value1 + '&startUpdaTimeDate=' + this.value2 + '&endUpdateTime=' + this.value3;
      points_lottery(data).then(res => {
        if (res.data.status == 0) {
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
          this.activityList = res.data.data.records;
          this.activityList.forEach(item => {
            if(item.drawStatus == 1){
              item.drawStatus = true
            } else if(item.drawStatus == '0'){
              item.drawStatus = false
            }
          })
        }
      });
    },
    chang_stauts(status, id) {
      this.isFlag = 2;
      this.dialogVisible = true;
      this.title = "修改状态提示";
      this.content1 = "当前已有启动的抽奖活动，如果修改则以当前活动为主";
      this.content2 = "";
      if (!status) {
        this.status = 0;
      } else {
        this.status = 1;
      }
      this.id = id;
    },
    verfy_startTime(){
      if(this.value3 && this.value2){
        this.timeCompare(1)
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value2 && this.value3){
        this.timeCompare(2)
      }
    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.value2)).getTime() >= (new Date(this.value3)).getTime()){
        if(flag == 1){
          this.value2 = ''
        } else {
          this.value3 = ''
        }
        return this.$message({
          type: 'warning',
          message: "'活动修改时间-开始'必须小于'活动修改时间-结束'"
        })
      }
    }
  }
};
</script>


<style lang="less" >
.seckill_acti_list-container {
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
    .el-dialog {
      width: 555px !important;
      height: 340px !important;
      .el-dialog__header {
        line-height: 75px;
        text-align: center;
        padding: 0;
        .el-dialog__title {
          font-size: 16px;
        }
      }
      .el-dialog__body {
        padding: 0;
        margin-top: 30px;
        > div {
          p {
            line-height: 30px;
            text-align: center;
            color: #fe000c;
          }
        }
      }
      .el-dialog__footer {
        margin-top: 60px;
        text-align: center;
        .el-button {
          width: 60px;
          height: 30px;
        }
      }
    }
  }
}
</style>
