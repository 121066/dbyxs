<template >
  <div class="homeSetUp-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          跳转类型:&nbsp;
          <el-select v-model="value" style="width: 100px;font-size: 12px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
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
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="value2"
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
              v-model="value3"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_bannerList(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('addBanner')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="bannerList" style="width: 100%" height="598">
          <el-table-column prop="name" label="轮播页名称"></el-table-column>
          <el-table-column prop="queryType" label="跳转类型"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="queryWeb" label="跳转网页"></el-table-column>
          <el-table-column prop="queryActive" label="跳转活动"></el-table-column>
          <el-table-column prop="queryGood" label="跳转商品"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '禁用' ? true:false"
              >使用</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '使用' ? true:false"
              >禁用</el-button>
              <el-button type="text" size="small" @click="jump_banners_modify(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
              <el-button type="text" size="small" @click="jump_banenrs_detail(scope.row.id)">详情</el-button>
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
  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      options: [
        {
          value: "",
          label: "所有"
        },
        {
          value: "1",
          label: "外跳网页"
        },
        {
          value: "2",
          label: "跳转活动"
        },
        {
          value: "3",
          label: "跳转商品"
        },
        {
          value: "4",
          label: "跳转大图"
        }
      ],
      options1: [
        {
          value1: "",
          label: "所有"
        },
        {
          value1: "0",
          label: "禁用"
        },
        {
          value1: "1",
          label: "使用"
        }
      ],
      value: "",
      value1: "",
      value2: "",
      value3: "",
      bannerList: [],
      page: 1,
      total: 0,
      pageAndTotal:''
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value1 = pageMsg.value1
      this.value = pageMsg.value
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem("pageMsg");
    }
    this.get_bannerList();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_bannerList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_bannerList();
    },
    jump_banenrs_detail(id) {
      // //         "current=" +
      //   this.currentPage +
      //   "&size=" +
      //   this.pageSize +
      //   "&status=" +
      //   this.value1 +
      //   "&startTime=" +
      //   this.value2 +
      //   "&endTime=" +
      //   this.value3 +
      //   "&type=" +
      //   this.value;
      localStorage.setItem('path',JSON.stringify(this.$route.path))
      localStorage.setItem("pageMsg", JSON.stringify({currentPage:this.currentPage,pageSize:this.pageSize,value1:this.value1,value2:this.value2,value3:this.value3,value:this.value}));
      this.$router.push("bannerDetail?id=" + id);
    },
    jump_banners_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))
      localStorage.setItem("pageMsg", JSON.stringify({currentPage:this.currentPage,pageSize:this.pageSize,value1:this.value1,value2:this.value2,value3:this.value3,value:this.value}));
      this.$router.push("bannerModify?id=" + id);
    },
    get_bannerList(num) {
      this.bannerList = [];
      if (num) {
        this.currentPage = num;
      }
      this.bannerList = [];
      if (this.value2 == null) {
        this.value2 = ''
      } 
      if (this.value3 == null) {
        this.value3 = ''
      } 
      var data =
        "current=" +
        this.currentPage +
        "&size=" +
        this.pageSize +
        "&status=" +
        this.value1 +
        "&startTime=" +
        this.value2 +
        "&endTime=" +
        this.value3 +
        "&type=" +
        this.value;
      this.$axios.post("web_banner/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!result.data.data.records.length) {
            this.total = 0;
            this.page = 0;
          } else {
            result.data.data.records.forEach(item => {
              var name = item.name;
              var queryType;
              if (item.type == 1) {
                queryType = "外跳网页";
              } else if (item.type == 2) {
                queryType = "跳转活动";
              } else if (item.type == 3) {
                queryType = "跳转商品";
              } else {
                queryType = "跳转大图";
              }
              var status;
              if (item.status == 0) {
                status = "禁用";
              } else {
                status = "使用";
              }
              var queryWeb = item.jumpUrl || '-------';
              var queryActive = item.promotionName || '-------';
              var queryGood = item.goodsName || '-------';
              var createTime = item.createtime;
              var id = item.id;
              this.bannerList.push({
                name,
                queryType,
                status,
                queryWeb,
                queryActive,
                queryGood,
                createTime,
                id
              });
            });
          }
        } 
      });
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
                this.$axios.post("/web_banner/remove", "id=" + id).then(result => {
        if (result.data.status == 0) {
          if(this.total % this.pageSize == 1){
            if(this.currentPage != 1){
              this.currentPage--
              // this.page--
            }
          }
          this.$message({
            type:'success',
            message:'删除成功'
          });
          this.get_bannerList();
        } else if (result.data.status == -1) {
          this.$message({
            type:'warning',
            message:'删除失败'
          });
        } else {
          this.$message({
            type:'warning' ,
            message:'网络异常'
          });
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    handleForbidden(status, id) {
      if (status == "禁用") {
        var url = "/web_banner/start";
      } else {
        var url = "/web_banner/stop";
      }
     this.$confirm('此操作将改变状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.$axios.post(url, "id=" + id).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            if (status == "禁用") {
              this.$message({
                type:'success',
                message:'启用成功'
              });
            } else {
              this.$message({
                type:'success',
                message:'禁用成功'
              });
            }
            this.bannerList.forEach(item => {
              if (item.id == id) {
                item.status = item.status == "禁用" ? "使用" : "禁用";
              }
            });
          } else {
            this.$message({
              type:'warning',
              message:'操作失败'
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

