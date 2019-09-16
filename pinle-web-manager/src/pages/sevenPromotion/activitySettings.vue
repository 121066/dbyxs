<template >
  <div class="seven_actset-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          活动名称:&nbsp;
          <el-input v-model="value4" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          商品A名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
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
              @change="verfy_startTime"
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
              @change="verfy_endtime"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_list(1)">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$router.push('sevenPromotion_addActivity')"
          >添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="activityList" style="width: 100%" height="598">
          <el-table-column prop="name" label="拼团活动名称"></el-table-column>
          <el-table-column prop="price" label="拼团价格(元)"></el-table-column>
          <el-table-column prop="goodsAName" label="商品A"></el-table-column>
          <el-table-column prop="goodsBName" label="商品B"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
              <el-switch
                v-model="scope.row.flag"
                style="margin-left: 10px;"
                @change="update_stauts(scope.row.id,scope.row.flag)"
              ></el-switch>
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
          label: "关闭"
        },
        {
          value1: "1",
          label: "开启"
        }
      ],
      value: "", // 商品A名称
      value1: "", // 状态
      value2: "", // 创建开始时间
      value3: "", // 创建结束时间
      value4: "", //  活动名称
      activityList: [],
      page: 1,
      total: 0
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    //   用于记录当前页码
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value4 = pageMsg.value4
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.value = pageMsg.value
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
    jump_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg",JSON.stringify({value4:this.value4 ,value: this.value, value1: this.value1, value2:  this.value2,value3: this.value3 ,pageSize:this.pageSize ,currentPage: this.currentPage}) );
      this.$router.push("sevenPromotion_activityDetail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg",JSON.stringify({value4:this.value4 ,value: this.value, value1: this.value1, value2:  this.value2,value3: this.value3 ,pageSize:this.pageSize ,currentPage: this.currentPage}) );
      this.$router.push("sevenPromotion_activityModify?id=" + id);
    },
    get_list(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value2 == null){
        this.value2 = ''
      }
      if(this.value3 == null){
        this.value3 = ''
      }
      this.activityList = [];
      let data =
        "name=" + this.value4 + "&goodsAName=" + this.value + "&status=" +this.value1  + '&startTime=' + this.value2 + '&endTime=' + this.value3 + '&size=' + this.pageSize + '&current=' + this.currentPage;
      this.$axios.post("/web_seven_promotion/promotion_list",data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = result.data.data.pages;
          if (result.data.data.records.length == 0) {
            this.total = 0;
            this.page = 0;
          } else {
            result.data.data.records.forEach(item => {
              let status  = ''
              let flag = false
              if(item.status == 0){
                status = '关闭'
                flag = true
              } else {
                status = '开启'
                flag = false
              }
              this.activityList.push({id:item.id,name: item.name,price:item.price,goodsAName:item.goodsAName,goodsBName:item.goodsBName,createtime:item.createtime,status,flag})
            })
          }
        }
      });
    },
    update_stauts(id,status) {
      this.$confirm('此操作将更改状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.$axios
        .post("/web_seven_promotion/modify_promotion_status", "id=" + id)
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 1) {
              this.activityList.forEach(item => {
                if (item.id == id) {
                  if(item.status == '关闭'){
                    item.status = '开启'
                  } else {
                    item.status = '关闭'
                  }
                }
              });
              return this.$message({
                type:'success',
                message:'修改成功'
              });
            } else {
              return this.$message({
                type:'warning',
                message:'修改失败'
              });
            }
          }
        });
        }).catch(() => {
          this.activityList.forEach(item => {
            if(item.id == id){
              item.flag = !item.flag
            }
          })
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
      if(this.value2 == null){
        this.value2 = ''
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value2){
        this.timeCompare(2)
      }
      if(this.value3 == null){
        this.value3 = ''
      }

    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.value2)).getTime() >= (new Date(this.value3)).getTime()){
        if(flag == 1){
          this.value2 = ''
        } else {
          this.value3 = ''
        }
        return this.$message({
          type: 'warning',
          message: "'活动创建时间-开始'必须小于'活动创建时间-结束'"
        })
      }
    }
  }
};
</script>

<style lang="less" >

.seven_actset-container {
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

