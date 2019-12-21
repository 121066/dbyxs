
<template >
  <div class="performance-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/performance')">
    <div class="content">
      <div class="query">
                  <div class="margin_right_20">
                      推广员:&nbsp;
                      <el-input style="width:100px" placeholder="请输入" v-model="value1"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_team_detail(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="teamDetailList" style="width: 100%" height="598">
          <el-table-column prop="promoterName" label="推广员"></el-table-column>
          <el-table-column prop="inviteUserNum" label="邀请人数"></el-table-column>
          <el-table-column prop="addUserNum" label="已加入"></el-table-column>
          <el-table-column prop="waitAddUserNum" label="待加入"></el-table-column>
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
import {team_detail} from '../../api/getData'
export default {
  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: null,
      id:this.$route.query.id,
      teamDetailList: [],
    value1:'',
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    if (localStorage.getItem("pageMsg1")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg1"))
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
    }
    this.get_team_detail( )
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
        localStorage.setItem('pageMsg1',JSON.stringify({currentPage:this.currentPage,pageSize:this.pageSize}))
        this.$router.push('performance_invitation_detail?id=' + id + '&teamId=' + this.id)
    },
    get_team_detail(currentPage){
      if(currentPage){
        this.currentPage = currentPage
      }
      let data = 'teamId=' + this.id + '&promoterName=' + this.value1 + '&size=' + this.pageSize + '&current=' + this.currentPage
      team_detail(data).then(res => {
        if(res.data.status == 0 && res.data.data.records != null){
          this.total = res.data.data.total
          this.page = Math.ceil(this.total / this.pageSize)
          this.teamDetailList = res.data.data.records
        }
      })
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
    }
  }
}
</style>

