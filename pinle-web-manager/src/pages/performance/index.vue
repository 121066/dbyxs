
<template >
  <div class="performance-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
                  <div class="margin_right_20">
          团队名称:&nbsp;
          <el-select v-model="value1" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in teamList"
              :key="item.id"
              :label="item.teamName"
              :value="item.teamName"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_teamList(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="performanceList" style="width: 100%" height="598">
          <el-table-column prop="teamName" label="团队名称"></el-table-column>
          <el-table-column prop="teamNum" label="团队人数"></el-table-column>
          <el-table-column prop="inviteUserNum" label="邀请人数"></el-table-column>
          <el-table-column prop="joinedUserNum" label="已加入人数"></el-table-column>
          <el-table-column prop="waitAddUserNum" label="待加入人数"></el-table-column>
          <el-table-column prop="applyTime" label="创建时间"></el-table-column>
          <el-table-column prop="amountUsed" label="总消费金额"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">查看明细</el-button>
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
import {team_performance,promoters_team} from '../../api/getData'
export default {
  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      performanceList: [],
    options1:[
        {id:'',label: '全部'},
        {id:'1',label: '加油队'},
        {id:'2',label: '加油队'},
    ],
    value1:'全部',
    teamList:[],
    };
  },
  created() {
    if(localStorage.getItem('pageMsg')){
      let pageMsg = JSON.parse(localStorage.getItem('pageMsg'))
      this.value1 = pageMsg.value1
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem('pageMsg')
    }
    this.get_teamList()
    this.promotersTeam()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_teamList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_teamList();
    },
    jump_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))
        localStorage.setItem('pageMsg',JSON.stringify({value1:this.value1,currentPage:this.currentPage,pageSize:this.pageSize}))
        this.$router.push('/performance_team_detail?id='+id)
    },
    get_teamList(currentPage){
      if(currentPage){
        this.currentPage = currentPage
      }
       let data = ''
      if(this.value1  == '全部' || this.value1 == ''){
        data =  'current=' + this.currentPage + '&size=' + this.pageSize
      }else {
      data = 'teamName=' + this.value1 + '&current=' + this.currentPage + '&size=' + this.pageSize

      }
      team_performance(data).then(res => {
        if(res.data.status == 0 && res.data.data.records != 0){
          this.total = res.data.data.total
          this.performanceList =  res.data.data.records
        }
      })
    },
        promotersTeam() {
      promoters_team().then(res => {
        if (res.data.status == 0 && res.data.data.length != 0) {
          this.teamList = [...[{id:'0',teamName:'全部'}],...res.data.data];
        }
      });
    }
  }
};
</script>

<style lang="less" >
.performance-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
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

