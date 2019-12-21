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
          商品名称:&nbsp;
          <el-input v-model="value2" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
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
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="value3"
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
              v-model="value4"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="23:59:59"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$router.push('/seckill_addActivity')"
          >添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="activityList" style="width: 100%" height="598">
          <el-table-column prop="name" label="活动名称"></el-table-column>
          <el-table-column prop="goodsName" label="活动商品"></el-table-column>
          <el-table-column prop="originalPrice" label="商品原价(元)"></el-table-column>
          <el-table-column prop="seckillPrice" label="秒杀价格(元)"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <div class="cell" v-if="scope.row.status == '已结束'" style="color: #5e5e5e">
                <img src="../../img/icon_end.png" alt>
                <span>{{scope.row.status}}</span>
              </div>
              <div class="cell" v-if="scope.row.status == '进行中'" style="color: #04bb33">
                <img src="../../img/icon_processing.png" alt>
                <span>{{scope.row.status}}</span>
              </div>
              <div class="cell" v-if="scope.row.status == '未开始'" style="color: #38c9ff">
                <img src="../../img/icon_not_start.png" alt>
                <span>{{scope.row.status}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="jump_detail(scope.row.id,scope.row.status)"
              >详情</el-button>
              <el-button
                type="text"
                size="small"
                @click="jump_modify(scope.row.id)"
                v-if="scope.row.status == '未开始'"
              >修改</el-button>
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

export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      total: 0,
      activityList: [],
      options1: [
        { value1: "", label: "所有" },
        { value1: "0", label: "已结束" },
        { value1: "1", label: "进行中" },
        { value1: "2", label: "未开始" }
      ],
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      page: 1,
      pageSize: 10
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value = pageMsg.value
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.value4 = pageMsg.value4
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
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
    jump_detail(id, status) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value: this.value,value1:this.value1,value2:this.value2,value3:this.value3,value4:this.value4,currentPage:this.currentPage,pageSize:this.pageSize}));
      if (status == "已结束") {
        let status = 0;
        this.$router.push(
          "/seckill_activityDetail?id=" + id + "&status=" + status
        );
      } else if (status == "未开始") {
        let status = 2;
        this.$router.push(
          "/seckill_activityDetail?id=" + id + "&status=" + status
        );
      } else if (status == "进行中") {
        let status = 1;
        this.$router.push(
          "/seckill_activityDetail?id=" + id + "&status=" + status
        );
      }
    },
    jump_modify(id) {

      localStorage.setItem('path',JSON.stringify(this.$route.path))
 localStorage.setItem("pageMsg", JSON.stringify({value: this.value,value1:this.value1,value2:this.value2,value3:this.value3,value4:this.value4,currentPage:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("/seckill_activityModify?id=" + id);
    },
    get_list(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value3 == null){
        this.value3 = ''
      } 
      if(this.value4 == null){
        this.value4 = ''
      }
      this.activityList = [];
      let data =
        "&name=" +
        this.value +
        "&goodsName=" +
        this.value2 +
        "&status=" +
        this.value1 +
        "&startTime=" +
        this.value3 +
        "&endTime=" +
        this.value4 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      this.$axios.post("/web_panic_buy/list", data).then(result => {

        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = result.data.data.pages;
          let data = result.data.data.records;
          if (data.length == 0) {
            this.total = 0;
            this.page = 0;
          }
          data.forEach(item => {
            let status = "";
            if (item.status == 0) {
              status = "已结束";
            } else if (item.status == 1) {
              status = "进行中";
            } else if (item.status == 2) {
              status = "未开始";
            }
            let id = item.id;
            let name = item.name;
            let goodsName = item.goodsName;
            let originalPrice = item.price;
            let seckillPrice = item.panicBuyPrice;
            let startTime = item.startTime;
            let endTime = item.endTime;
            let createTime = item.createtime;
            this.activityList.push({
              id,
              name,
              goodsName,
              originalPrice,
              seckillPrice,
              startTime,
              endTime,
              createTime,
              status
            });
          });
        }
      });
    },
       verfy_startTime(){

      if(this.value4){
        this.timeCompare(1)
      }
      if(this.value2 == null){
        this.value3 = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value3){
        this.timeCompare(2)
      }
      if(this.value4 == null){
        this.value4 = ''
      }

    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.value3)).getTime() >= (new Date(this.value4)).getTime()){
        if(flag == 1){
          this.value3 = ''
        } else {
          this.value4 = ''
        }
        return this.$message({
          type: 'warning',
          message: "'活动创建时间-开始'必须小于'活动创建时间-结束'"
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
  position:relative;
  height:100%;
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
