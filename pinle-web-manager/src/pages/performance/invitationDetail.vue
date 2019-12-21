
<template >
  <div class="invite_detail-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/performance_team_detail?id='+teamId)">
    <div class="content">
      <div class="table">
        <el-table :data="invitationList" style="width: 100%" height="598">
          <el-table-column prop="userPhone" label="手机号"></el-table-column>
          <el-table-column prop="createTime" label="邀请时间"></el-table-column>
          <el-table-column prop="userAddTime" label="加入时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="accountUsed" label="消费金额"></el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from '../../components/page'
import {team_inviter} from '../../api/getData'
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      invitationList: [],
      value1: "",
      id:this.$route.query.id,
      teamId: this.$route.query.teamId
    };
  },
  created() {
    this.get_teamInvitations()
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
    get_teamInvitations(){
      let data = 'promoterId=' + this.id + '&current=' + this.currentPage + '&size=' + this.pageSize
      team_inviter(data).then(res => {
        if(res.data.status == 0 && res.data.data.records != null){
          this.total = res.data.data.total
          this.page = Math.ceil(this.total / this.pageSize)
          this.invitationList = res.data.data.records
        }
      })
    }
  }
};
</script>

<style lang="less" >
.invite_detail-container {
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
    padding-top: 80px;
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

