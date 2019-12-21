<template>
  <div class="commission_detail-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          用户名称:&nbsp;
          <el-input v-model="username" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="start_time margin_right_20">
          消费时间-开始:&nbsp;
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
          消费时间-结束:&nbsp;
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
          <el-button type="primary" icon="el-icon-search" @click="get_commission_detail(1)">查询</el-button>
        </div>
      </div>
      <div class="query" style="height:45px;display:flex;">
        <span style="margin-right:25px;">一级团队佣金&nbsp;{{levelOneNum + '元'}}</span>
        <span style="margin-right:50px;">二级团队佣金&nbsp;{{levelTwoNum + '元'}}</span>
        <span style="color:#409EFF">总佣金:&nbsp;{{commissionSum + '元'}}</span>
      </div>
      <div class="table">
        <el-table :data="detailList" style="width: 100%" height="528">
          <el-table-column prop="teamUserName" label="用户名称"></el-table-column>
          <el-table-column  label="团队">
            <template slot-scope="scope">
              <div class="cell">
                {{scope.row.teamLevel == 1 ? '一级团队': '二级团队'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="userAmount" label="消费金额（元）"></el-table-column>
          <el-table-column label="消费类型">
            <template slot-scope="scope">
              <div class="cell">{{scope.row.cotegory == 1 ? '购买商品':'充值vip'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sysTime" label="消费时间"></el-table-column>
          <el-table-column prop="commission" label="获取佣金（元）"></el-table-column>
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
import {commission_detail} from '../../api/getData'
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      page: 1,
      userId: this.$route.query.id,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      username: "",
      startTime:'',
      endTime:'',
      levelOneNum:'',
      levelTwoNum:'',
      commissionSum:'',
      detailList: []
    };
  },
  created() {
    this.get_commission_detail()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_commission_detail()
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_commission_detail()

    },
    get_commission_detail(currentPage){
      if(currentPage){
        this.currentPage = currentPage
      }
      let data = 'endTime=' + this.endTime + "&startTime=" + this.startTime + '&userId=' + this.userId + '&size=' + this.pageSize + '&current=' + this.currentPage
      commission_detail(data).then(res => {
        if(res.data.status == 0 && res.data.data.records.length != 0){
          this.total = res.data.data.total 
          this.page = Math.ceil(this.total / this.pageSize)
          this.detailList = res.data.data.records
          this.levelOneNum = res.data.data.records[0].levelOneNum
          this.levelTwoNum=res.data.data.records[0].levelTwoNum
          this.commissionSum =res.data.data.records[0].commissionSum
        }
      })
    }
  }
};
</script>


<style lang="less" >
.commission_detail-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  .content {
    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
      .start_time {
        display: flex;
        align-items: center;
      }
      .end_time {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
