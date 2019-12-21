<template >
  <div class="promoters-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">

            姓名:&nbsp;
            <el-input v-model="value1" style="width:100px;height:30px;" placeholder="请输入姓名"></el-input>
        </div>
        <div class="margin_right_20">
          团队名称:&nbsp;
          <el-select v-model="value2" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in teamList"
              :key="item.id"
              :label="item.teamName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="value3" style="width: 100px;">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.key"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_promoters_list(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('/add_promoters')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="promotersList" style="width: 100%" height="598">
          <el-table-column prop="promoterName" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="绑定手机"></el-table-column>
          <el-table-column prop="promoterBirthday" label="生日"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="wechat" label="微信号"></el-table-column>
          <el-table-column prop="puttime" label="加入时间"></el-table-column>
          <el-table-column prop="teamName" label="团队名称"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '注销' ? true:false"
              >启用</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '正常' ? true:false"
              >注销</el-button>
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
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
import {get_promoters_list,promoters_status,promoters_team} from '../../api/getData.js'
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total: 0,
      promotersList:[],

    value1: '',
    value2: '',
    value3:'',
    options2:[{id:'',key:'全部'},{id:0,key:'注销'},{id:1,key:'正常'}],
    teamList:[]
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem("pageMsg");
    }
    this.get_promoters_list()
    this.promotersTeam()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_promoters_list();
    },
    currentChange(val) {
      this.currentPage = val
      this.get_promoters_list();
    },
    jump_detail(id) {
      localStorage.setItem("pageMsg", JSON.stringify({value1: this.value1,value2:this.value2,value3:this.value3,currentPage:this.currentPage,pageSize:this.pageSize}));
      localStorage.setItem('path',JSON.stringify(this.$route.path))
      this.$router.push("promotersDetail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))
      localStorage.setItem("pageMsg", JSON.stringify({value1: this.value1,value2:this.value2,value3:this.value3,currentPage:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("promotersModify?id=" + id);
    },
    get_promoters_list() {
      let data = 'promoterName=' + this.value1 + '&teamId=' + this.value2 +'&status=' + this.value3 + '&current=' + this.currentPage + '&size=' + this.pageSize
      get_promoters_list(data).then(result => {
        if(result.data.status == 0 && result.data.data.records.length != 0 ){
          this.total = result.data.data.total
          this.page = Math.ceil(this.total / this.pageSize)
          this.promotersList = result.data.data.records
          this.promotersList.forEach(item => {
            if(item.sex == 0){
              item.sex = '男'
            } else {
              item.sex = '女'
            }
            if(item.status == 1){
              item.status = '正常'
            } else {
              item.status = '注销'
            }
          })
        }
      })
    },
    handleForbidden(status, id) {
      if(status == '注销'){
        status = 1
      } else {
        status = 0
      }
       this.$confirm('此操作将修改状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                promoters_status('id=' + id + '&status=' + status).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            if (status == "注销") {
              this.$message({
                type:'success',
                message:'启用成功'
              });
            } else {
              this.$message({
                type:"success",
                message:'注销成功'
              });
            }
            this.promotersList.forEach(item => {
              if (item.id == id) {
                item.status = item.status == "注销" ? "正常" : "注销";
              }
            });
          } else {
            this.$message({
              type:"warning",
              message:"操作失败"
            });
          }
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });

    },
    promotersTeam() {
      promoters_team().then(res => {
        if (res.data.status == 0 && res.data.data.length != 0) {
          this.teamList = res.data.data;
          this.teamList.unshift({id:'',teamName:"全部"})
        }
      });
    }
  }
};
</script>

<style lang="less" >

.promoters-container {
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

