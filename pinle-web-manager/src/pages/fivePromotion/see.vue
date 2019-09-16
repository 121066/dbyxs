<template >
  <div class="five_see-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          拼图活动名称:&nbsp;
          <el-input v-model="value1" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          参与者昵称:&nbsp;
          <el-input v-model="value2" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          拼团状态:&nbsp;
          <el-select v-model="value3" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.value3"
              :label="item.label"
              :value="item.value3"
            ></el-option>
          </el-select>
        </div>
        <div class="start_time margin_right_20">
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="value4"
              placeholder="选择日期时间"
              @change="verfy_startTime"
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
        <el-table :data="activityList" style="width: 100%" height="632">
          <el-table-column prop="name" label="拼团活动名称"></el-table-column>
          <el-table-column prop="price" label="拼团价格(元)"></el-table-column>
          <el-table-column prop="status" label="拼团状态"></el-table-column>
          <el-table-column label="参与者">
            <template slot-scope="scope">
              <div
                class="cell"
                v-for="(item, index) in scope.row.participant"
                :key="index"
                v-html="item"
                style="height: 16px;font-size: 14px;line-height: 16px;"
              ></div>
            </template>
          </el-table-column>
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
      options1: [
        {
          value3: "",
          label: "所有"
        },
        {
          value3: "1",
          label: "拼团成功"
        },
        {
          value3: "2",
          label: "拼团超时"
        },
        {
          value3: "3",
          label: "等待拼团"
        }
      ],
      value1: "", //拼团活动名称
      value2: "", //参与者昵称
      value3: "", //拼团状态
      value4: "", //创建时间——开始
      value5: "", //创建时间——结束
      activityList: [],
      currentPage: 1,
      pageSize: 8,
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
        this.$router.push("/fivePromotion_successDetail?id=" + id);
      } else if (status == "等待拼团") {
        this.$router.push("/fivePromotion_awaitDetail?id=" + id);
      } else {
        this.$router.push("/fivePromotion_overtimeDetail?id=" + id);
      }
    },
    get_list(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value5 == null){
        this.value5 = ''
      }
      if(this.value4 == null){
        this.value4 = ''
      }
      this.activityList = [];
      let data =
        "name=" +
        this.value1 +
        "&username=" +
        this.value2 +
        "&status=" +
        this.value3 +
        "&startTime=" +
        this.value4 +
        "&endTime=" +
        this.value5 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      this.$axios.post("/web_five_promotion/list", data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (result.data.data.records == "") {
            this.total = 0;
            this.page = 0;
          } else {
            data.forEach(item => {
              let id = item.id;
              let name = item.name;
              let price = item.price;
              let status = "";
              this.options1.forEach(item1 => {
                if (item.status == item1.value3) {
                  return (status = item1.label);
                }
              });
              let participant = []
              if(item.member){
              participant = item.member.split(",");

              } else {
                participant = []
              }
              let winer = item.winner;
              let createTime = item.createtime;
              let endTime = item.overTime;
              this.activityList.push({
                id,
                name,
                price,
                status,
                participant,
                winer,
                createTime,
                endTime
              });
            });
          }
        }
      });
    },
    verfy_startTime(){

      if(this.value5){
        this.timeCompare(1)
      }
      if(this.value2 == null){
        this.value4 = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value4){
        this.timeCompare(2)
      }
      if(this.value5 == null){
        this.value5 = ''
      }

    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.value4)).getTime() >= (new Date(this.value5)).getTime()){
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

.five_see-container {
  @import "../../style/table.less";
@import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .el-table__row {
    height: 73px;
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

