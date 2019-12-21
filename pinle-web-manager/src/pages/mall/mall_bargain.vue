<template >
  <div class="homeSetUp-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">

        <div class="margin_right_20" >
          商品名称:&nbsp;
          <el-input v-model="goodsName" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          所属类型:&nbsp;
          <el-select v-model="type" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in goodsType"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20" >
          发起者:&nbsp;
          <el-input v-model="initiator" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
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
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" >查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="barList" style="width: 100%" height="598">
          <el-table-column prop="username" label="发起者"></el-table-column>
          <el-table-column prop="shortName" label="商品名称"></el-table-column>
          <el-table-column prop = 'type' label="所属类型">

          </el-table-column>
          <el-table-column  label="价格(元)">
              <template slot-scope="scope">
                  <span>{{scope.row.price}}</span>
              </template>
          </el-table-column>
          <el-table-column  label="状态">
              <template slot-scope="scope">
                  <span>{{statusList[scope.row.stauts]['label']}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="totalTimes" label="已砍刀数(刀)">

          </el-table-column>
          <el-table-column prop="totalPrice" label="已砍价格(元)">
          </el-table-column>
          <el-table-column prop="createtime" label="开始时间" width="170px"></el-table-column>
          <el-table-column prop="overTime" label="结束时间" width="170px"></el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
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
import {bargain_list} from '../../api/getData'
import {mapActions} from 'vuex'
export default {

  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      barList: [],
      page: 1,
      total: 0,
      goodsName: '',    // 商品的名称
      type: '',        //  商品的类型
      initiator: '',   //  发起者昵称
      status:'',       //  活动的状态
      startTime: '',   //  活动创建时间
      endTime: '',     //   活动结束时间
      statusList:[
          {key: '', label: '全部'},
          {key: '1', label: '已获得'},
          {key: '3', label: '砍价中'},
          {key: '2', label: '砍价超时'},
      ],
    };
  },
  created() {
    //     获取商品的类型
    var pageMsg = localStorage.getItem('pageMsg')

    if(pageMsg){
        var pageMsg = JSON.parse(pageMsg)
        this.currentPage = pageMsg.currentPage
        this.pageSize = pageMsg.pageSize
        this.userName = pageMsg.userName
        this.type = pageMsg.type
        this.initiator = pageMsg.initiator
        this.status = pageMsg.status
        this.startTime = pageMsg.startTime
        this.endTime = pageMsg.endTime
        localStorage.removeItem('pageMsg')
    }
    this.sava_goods_type()
    this.get_bargain_list()
  },
  methods: {
    ...mapActions(['sava_goods_type']),
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_bargain_list()

    },
    currentChange(val) {
      this.currentPage = val
      this.get_bargain_list()
    },
    jump_detail(id){
      localStorage.setItem('path',JSON.stringify(this.$route.path))
      localStorage.setItem('pageMsg', JSON.stringify({currentPage: this.currentPage, pageSize: this.pageSize, userName: this.userName, type: this.type,initiator: this.initiator, status: this.status, startTime: this.startTime, endTime: this.endTime }))
        this.$router.push('/bar_detail?id=' + id)
    },
    get_bargain_list(currentPage) {
      if(currentPage) {
        this.currentPage = currentPage
      }
      this.barList = []
      var data = 'startTime=' + this.startTime + '&endTime=' + this.endTime + '&shortName=' + this.goodsName + '&type=' + this.type + '&username=' + this.initiator + '&status=' + this.status + '&current=' + this.currentPage + '&size=' + this.pageSize
      bargain_list(data).then(res => {
        if(res.data.status == 0 && res.data.data.records.length != 0) {
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize)
          this.barList = res.data.data.records
          this.barList.forEach(item => {
            if(item.overTime == null) {
              item.overTime = '------'
            }
          })
        }
      })
    },

        // 校验结束时间
    verfy_startTime(){

      if(this.value3){
        this.timeCompare(1)
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value2){
        this.timeCompare(2)
      }
    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.startTime)).getTime() >= (new Date(this.endTime)).getTime()){
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
  },
  computed:{
    goodsType(){
      let goodsType = this.$store.state.goodsType
      goodsType = [...[{id:'',label: '全部'}],...goodsType]
      return goodsType
    }
  }
};
</script>

<style lang="less" >

.homeSetUp-container {
  @import '../../style/table.less';
@import '../../style/content.less';
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

