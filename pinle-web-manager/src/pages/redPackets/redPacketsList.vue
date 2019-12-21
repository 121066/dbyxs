<template>
  <div class="red_packets_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          优惠券名称:&nbsp;
          <el-input v-model="value1" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="value2" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          来源:&nbsp;
          <el-select v-model="value3" style="width: 100px;">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="start_time margin_right_20">
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="value4"
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
              v-model="value5" 
              default-time="23:59:59"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('/addRedpackets')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="redPocList" style="width: 100%" height="598">
          <el-table-column prop="name" label="红包名称"></el-table-column>
          <el-table-column prop="price" label="红包价值(元)"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="limitKind" label="有无时间限制"></el-table-column>
          <el-table-column prop="type" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.type == '2'" style="color:#00baff">
                <img src="../../img/icon_not_start1.png" alt>
                <span>{{'未开始'}}</span>
              </div>
              <div v-if="scope.row.type == '1'" style="color:#04bb33">
                <img src="../../img/icon_use.png" alt>
                <span>{{'可使用'}}</span>
              </div>
              <div v-if="scope.row.type == '0'" style="color:#555555">
                <img src="../../img/icon_overdue.png" alt>
                <span>{{'已过期'}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="来源"></el-table-column>
          <el-table-column prop="createtime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="jump_modify(scope.row.id)"
                v-if="scope.row.origin != '系统自动创建'"
              >修改</el-button>
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
              <el-button
                type="text"
                size="small"
                @click="remove_redpac(scope.row.id)"
                v-if="scope.row.origin != '系统自动创建' && scope.row.type == '0'"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>

      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from '../../components/page'

import { red_packet_list, red_packet_delete } from "../../api/getData.js";
export default {
  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 10,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      options1: [
        { value: "", label: "全部" },
        { value: "0", label: "已过期" },
        { value: "2", label: "未开始" },
        { value: "1", label: "可使用" }
      ],
      options2: [
        { value: "", label: "全部" },
        { value: "1", label: "手动创建" },
        { value: "2", label: "系统自动创建" }
      ],
      redPocList: []
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.value4 = pageMsg.value4
      this.value5 = pageMsg.value5
      this.currentPage = pageMsg.current
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem('pageMsg')
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
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value1:this.value1,value2:this.value2,value3:this.value3,value4:this.value4,value5:this.value5,pageSize:this.pageSize,current:this.currentPage}));
      this.$router.push("/redPackets_detail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value1:this.value1,value2:this.value2,value3:this.value3,value4:this.value4,value5:this.value5,pageSize:this.pageSize,current:this.currentPage}));
      this.$router.push("/redPackets_modify?id=" + id);
    },
    get_list(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value4 == null){
        this.value4 = ''
      }
      if(this.value5 == null){
        this.value5 = ''
      }
      let data =
        "name=" +
        this.value1 +
        "&type=" +
        this.value2 +
        "&source=" +
        this.value3 +
        "&startTime=" +
        this.value4 +
        "&endTime=" +
        this.value5 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      red_packet_list(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!data) {
            this.total = 0;
            this.page = 0;
          } else {
            data.forEach(item => {
              if (item.source == 1) {
                item.source = "手动创建";
              } else {
                item.source = "系统自动创建";
              }
              if (item.limitKind == 0) {
                item.startTime = "----------";
                item.endTime = "----------";
              }
              if (item.limitKind == 0) {
                item.limitKind = "无时间限制";
              } else {
                item.limitKind = "有时间限制";
              }
            });
            this.redPocList = data;
          }
        }
      });
    },
    remove_redpac(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = "id=" + id;
          red_packet_delete(data).then(result => {
            if (result.data.status == 0) {
              if (result.data.data == 1) {
                if(this.total % this.pageSize == 1){
                  if(this.currentPage != 1){
                    this.currentPage--
                  }
                }
                this.get_list();
                return this.$message({
                  type:'success',
                  message:'删除成功'
                });
              } else {
                return this.$message({
                  type:'success',
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
    },
     verfy_startTime(){

      if(this.value5){
        this.timeCompare(1)
      }
      if(this.value4 == null){
        this.value4 = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value4){
        this.timeCompare(2)
      }
      if(this.value5 == null){
        this.value6 = ''
      }

    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.value4)).getTime() >= (new Date(this.value5)).getTime()){
        if(flag == 1){
          this.value4 = ''
        } else {
          this.value5 = ''
        }
        return this.$message({
          type: 'warning',
          message: "'优惠券类型创建时间-开始'必须小于'优惠券类型创建时间-结束'"
        })
      }
    }
  }
};
</script>


<style lang="less" >
.red_packets_list-container {
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
