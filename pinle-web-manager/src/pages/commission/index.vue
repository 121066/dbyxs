<template>
  <div class="commission_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          用户名称:&nbsp;
          <el-input v-model="username" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>


        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_commission_list(1)">查询</el-button>


        </div>
      </div>
      <div class="table">
        <el-table :data="commissionList" style="width: 100%" height="598">
          <el-table-column prop="userName" label="用户名称"></el-table-column>
          <el-table-column prop="commissionSun" label="总佣金（元）"></el-table-column>
          <el-table-column prop="extractCommission" label="已提现佣金（元）"></el-table-column>
          <el-table-column prop="commission" label="待提取佣金（元）"></el-table-column>
          <el-table-column  label="账号状态">
              <template slot-scope="scope">
                         <div class="ceil" v-if="scope.row.status == 0">禁用</div>
              <div class="ceil" v-else>启用</div>
              </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handledetail(scope.row.userId)">详情</el-button>
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
import {commission_list} from '../../api/getData'
export default {
  components: { breadcrumb,pagination },
  data() {
      return {
          page: 1,
          currentPage: 1,
          pageSize:10,
          total:0,
          username:'',
          commissionList:[
              // {id:1,username:'张三',amountCommission:'100',commission1:'20',commission2:'80',status:'1'},
              // {id:2,username:'李四',amountCommission:'100',commission1:'20',commission2:'80',status:'1'},
          ]
      }
  },
  created() {
    if(localStorage.getItem('pageMsg')){
      var pageMsg = JSON.parse(localStorage.getItem('pageMsg')) || ''
      localStorage.removeItem('pageMsg')
      this.username = pageMsg.username
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
    }
    this.get_commission_list()
  },
  methods:{
          sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_commission_list()

    },
    currentChange(val) {
      this.currentPage = val;
      this.get_commission_list()
    },
    handledetail(id){
      localStorage.setItem('path',JSON.stringify(this.$route.path))

        localStorage.setItem('pageMsg',JSON.stringify({currentPage:this.currentPage,pageSize:this.pageSize,username:this.username}))
        this.$router.push('/commission_detail?id='+id)
    },
    get_commission_list(currentPage){
      if(currentPage){
        this.currentPage = currentPage
      }
      // let data = ''
      // + '&userName=' + this.username
      let data =  'size=' + this.pageSize + '&current=' + this.currentPage
      if(this.username) {
        data = data + '&userName=' + this.username

      }
      commission_list(data).then(res => {
        if(res.data.status == 0){
          this.total = res.data.data.total
          this.page = Math.ceil(this.total / this.pageSize)
          this.commissionList = res.data.data.records
        }
      })
    }
  }
};
</script>


<style lang="less" >
.commission_list-container {
  @import '../../style/table.less';
@import '../../style/content.less';
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .content {
    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }

  }
}
</style>
