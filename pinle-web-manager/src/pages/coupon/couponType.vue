<template >
  <div class="conpont_type-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          优惠券类型名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          类型:&nbsp;
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
          <el-button type="primary" icon="el-icon-search" @click="get_couponType(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('addCouponType')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="couponTypeList" style="width: 100%" height="598">
          <el-table-column prop="name" label="优惠券类型名称"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="createtime" label="创建时间"></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_modify(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
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

import { coupon_type_list, coupon_type_delete } from "../../api/getData.js";
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      options1: [
        {
          value1: "",
          label: "全部"
        },
        {
          value1: "1",
          label: "全场通用"
        },
        {
          value1: "2",
          label: "部分活动通用"
        },
        {
          value1: "3",
          label: "部分商品类型通用"
        },
        {
          value1: "4",
          label: "部分活动类型商品通用"
        },
        {
          value1: "5",
          label: "部分商品通用"
        }
      ],
      value: "",
      value1: "",
      value2: "",
      value3: "",
      couponTypeList: [],
      page: 1,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    // localStorage.removeItem('currentPage')
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value = pageMsg.value
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem("pageMsg");
    }
    this.get_couponType();
  },
  methods: {
        sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_couponType();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_couponType();
    },
    jump_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value: this.value,value1: this.value1,value2:this.value2,value3:this.value3,currentPage:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("couponType_detail?id=" + id);
    },
    jump_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value: this.value,value1: this.value1,value2:this.value2,value3:this.value3,currentPage:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("couponType_modify?id=" + id);
    },
    handleDelete(id) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                let data = 'id=' + id
      coupon_type_delete(data).then(result => {
        if(result.data.status == 0){
          if(result.data.data == 1){
            // this.get_couponList()
            let page = this.total % this.pageSize
            if(page == 1){
              if(this.currentPage != 1){
                this.currentPage --
              }
            }
            this.get_couponType()
            return this.$message({
              type:'success',
              message:'删除成功'
            })
          } else {
            return this.$message({
              type:'warning',
              message:'删除失败'
            })
          }
        }
      })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    get_couponType(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value2 == null){
        this.value2 = ''
      }
      if(this.value3 == null){
        this.value3 = ''
      }
      this.couponTypeList = []
      let data =
        "name=" +
        this.value +
        "&type=" +
        this.value1 +
        "&startTime=" +
        this.value2 +
        "&endTime=" +
        this.value3 +
        "&limit=" +
        this.pageSize +
        "&page=" +
        this.currentPage;
      coupon_type_list(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!data.length) {
            this.total = 0;
            this.page = 0;
          } else {
            data.forEach(item => {
              if(!item.note){
                item.note = '--------'
              }
              let { name, type, note, id, createtime } = item;
              this.options1.forEach(item1 => {
                if (type == item1.value1) {
                  return type = item1.label
                }
              });
              this.couponTypeList.push({ name, type, note, id, createtime });
            });
          }
        }
      });
    },
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
          message: "'优惠券类型创建时间-开始'必须小于'优惠券类型创建时间-结束'"
        })
      }
    }
  }
};
</script>

<style lang="less" >
.conpont_type-container {
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

