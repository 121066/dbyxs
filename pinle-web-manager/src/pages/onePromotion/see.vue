<template >
  <div class="one_see-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          拼团活动名称:&nbsp;
          <el-input v-model="value4" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          拼团状态:&nbsp;
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
          拼团创建时间-开始:&nbsp;
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
          拼团创建时间-结束:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              style="width:200px"
              v-model="value3"
              @change="verfy_endtime"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="activityList" style="width: 100%" height="598">
          <el-table-column prop="name" label="拼团活动名称"></el-table-column>
          <el-table-column prop="price" label="拼团价格(元)"></el-table-column>
          <el-table-column prop="status" label="拼团状态"></el-table-column>

          <el-table-column prop="winer" label="获胜者"></el-table-column>
          <el-table-column prop="createTime" label="拼团创建时间" width="200"></el-table-column>
          <el-table-column prop="endTime" label="拼团结束时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="jump_detail(scope.row.id,scope.row.status)"
              >详情</el-button>
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
      pageSize: 10,
      options1: [
        {
          value1: "",
          label: "所有"
        },
        {
          value1: "1",
          label: "拼团成功"
        },
        {
          value1: "2",
          label: "拼团超时"
        },
        {
          value1: "3",
          label: "等待拼团"
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      activityList: [],
      page: 1,
      total: 0
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value = pageMsg.value
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.value4 = pageMsg.value4
      this.value5 = pageMsg.value5
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

      localStorage.setItem("pageMsg", JSON.stringify({value:this.value,value1:this.value1,value2:this.value2,value3:this.value3,value4:this.value4,value5:this.value5,currentPage:this.currentPage,pageSize:this.pageSize}));

      if (status == "拼团成功") {
        this.$router.push("onePromotion_successDetail?id=" + id);
      } else if (status == "等待拼团") {
        this.$router.push("onePromotion_awaitDetail?id=" + id);
      } else if (status == "拼团超时") {
        this.$router.push("onePromotion_overtimeDetail?id=" + id);
      } else {
        this.$router.push("onePromotion_openingDetail?id=" + id);
      }
    },
    get_list(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value2 == null){
        this.value2 = ''
      }
      if(this.value3 == null){
        this.value3 = ''
      }
      this.activityList = []
      let data = 'name=' + this.value4 + '&status=' + this.value1 + '&startTime=' + this.value2 + '&endTime=' + this.value3 + '&current=' + this.currentPage + '&size=' + this.pageSize 
      this.$axios.post("/web_one_promotion/list",data).then(result => {
        if (result.data.status == 0) {
                      this.total = result.data.data.total;
            this.page = result.data.data.pages;
            let data = result.data.data.records;
          if (result.data.data.records.length != 0) {
            let data = result.data.data.records;
            data.forEach(item => {
              let status = "";
              this.options1.forEach(item1 => {
                if (item.status == item1.value1) {
                  return status = item1.label;
                }
              });
              this.activityList.push({
                id: item.id,
                name: item.name,
                price: item.price,
                status,
                winer: item.winner,
                createTime: item.createtime,
                endTime: item.overTime
              });
            });
          } else {
            this.total = 0;
            this.page = 0;
          }
        }
      });
    },
     verfy_startTime(){

      if(this.value3){
        this.timeCompare(1)
      }
      if(this.value2 == null){
        this.value2 = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value2){
        this.timeCompare(2)
      }
      if(this.value3 == null){
        this.value3 = ''
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
          message: "'拼团创建时间-开始'必须小于'拼团创建时间-结束'"
        })
      }
    }
  }
};
</script>

<style lang="less" >

.one_see-container {
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

