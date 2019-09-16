<template >
  <div class="ten_teams_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          拼团活动名称:&nbsp;
          <el-input v-model="actName" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <!-- <div class="margin_right_20">
          参与者昵称:&nbsp;
          <el-input v-model="username" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div> -->
        <div class="margin_right_20">
          拼团状态:&nbsp;
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
          拼团创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="startTime"
              v-on:change="verfy_startTime"
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
              v-model="endTime"
              v-on:change="verfy_endtime"  
              placeholder="选择日期时间"
              style="width:200px"
              default-time="23:59:59"           
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="team_list(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="teamList" style="width: 100%" height="598">
          <el-table-column prop="activityName" label="拼团活动名称"></el-table-column>
          <el-table-column  label="拼团价格(元)">
            <template slot-scope="scope">
              <span>{{scope.row.goodsPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="拼团状态">
              <template slot-scope="scope">
                <span>{{statusList[scope.row.teamStatus].label}}</span>
              </template>
          </el-table-column>

          <!-- <el-table-column prop="winer" label="获胜者"></el-table-column> -->
          <el-table-column prop="createTime" label="创建时间" ></el-table-column>
          <el-table-column prop="overTime" label="结束时间" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="jump_detail(scope.row.id,scope.row.teamStatus)"
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
import {tTeams_list} from '../../api/getData.js'
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      actName: '', //  拼团活动名称
      username: '', //  参与者昵称
      status: '', // 拼团状态
      startTime: '', //  拼团创建时间-开始
      endTime: '',  //   拼团创建时间-结束
      statusList:[
          {key: '', label: '全部'},
          {key: '1', label: '拼团成功'},
          {key: '2', label: '拼团超时'},
          {key: '3', label: '等待拼团'},
      ],
      teamList: [],

    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      this.actName = pageMsg.actName
      this.username = pageMsg.username
      this.status = pageMsg.status
      this.startTime = pageMsg.startTime
      this.endTime = pageMsg.endTime
      localStorage.removeItem("pageMsg");
    }
    this.team_list();
  },
  methods: {
        sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    //   this.get_list();
    },
    currentChange(val) {
      this.currentPage = val;
      this.team_list();
    },
    jump_detail(id,status){
        localStorage.setItem('path',JSON.stringify(JSON.stringify(this.$route.path)))
        localStorage.setItem('pageMsg',JSON.stringify({actName:this.actName,username:this.username,status:status,startTime: this.startTime,endTime:this.endTime}))
        this.$router.push('/tTeams_detail?id=' + id + '&status=' + status)
    },
    team_list(currentPage){
      if(currentPage == 1){
        this.currentPage = currentPage
      }
      var data = {pageNum: this.currentPage,pageSize:this.pageSize}
      if(this.actName){
        data['activityName'] = this.actName
      } 
      if(this.startTime){
        data['beginTime'] = this.startTime
      }
      if(this.endTime){
        data['endTime'] = this.endTime
      }
      if(this.status){
        data['activityStatus'] = this.status
      }
      tTeams_list(data).then(res => {
        if(res.data.status == 0){
          this.total = res.data.data.total
          this.page = Math.ceil(this.total / this.pageSize)
          this.teamList = res.data.data.records
        }
      })
    },



    // 校验结束时间
    verfy_startTime(){
      if(this.startTime == null){
        this.startTime = ''
      }
      if(this.endTime){
        this.timeCompare(1)
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.endTime == null){
        this.endTime = ''
      }
      if(this.startTime){
        this.timeCompare(2)
      }
    },
    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.startTime)).getTime() >= (new Date(this.endTime)).getTime()){
        if(flag == 1){
          this.startTime = ''
        } else {
          this.endTime = ''
        }
        consoel.log(11111,'--------------')
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

.ten_teams_list-container {
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

