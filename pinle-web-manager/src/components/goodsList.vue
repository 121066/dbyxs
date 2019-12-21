<template>
  <div class="goods_list-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          商品名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          所属类型:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          销售状态:&nbsp;
          <el-select v-model="value2" style="width: 100px;">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value2"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_goodsList(1)">查询</el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" @click="$router.push('/sevenPromotion_selectGoods')">添加</el-button> -->
        </div>
      </div>
      <div class="table">
        <el-table :data="goodsList" style="width: 100%" height="598">
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属类型"></el-table-column>
          <el-table-column prop="price" label="价格(元)" v-if="positionsId != 5"></el-table-column>
          <el-table-column prop="pointsPrice" label="积分(积分)" v-else ></el-table-column>
          <el-table-column prop="size" label="规格"></el-table-column>
          <el-table-column prop="stock" label="库存"></el-table-column>
          <el-table-column prop="status" label="销售状态"></el-table-column>
          <el-table-column prop="createTime" label="活动创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_goods_detail(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "./breadcrumb";
import pagination from './page'
import { positions } from '../api/getData';
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      goodsList: [],
      total: 0,
      options1: [{ value1: "", label: "所有" }],
      options2: [
        {
          value2: "",
          label: "所有"
        },
        {
          value2: "1",
          label: "在售"
        },
        {
          value2: "0",
          label: "下架"
        }
      ],
      value: "",
      value1: "",
      value2: "",
      page: 1,
      pageSize: 10
    };
  },
  props:['positionsId'],
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value = pageMsg.value
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.currentPage = pageMsg.currentPage
      this.pageSize = pageMsg.pageSize
      localStorage.removeItem("pageMsg");
    }
    this.get_goodsType();
    this.get_goodsList();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_goodsList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_goodsList();
    },
    jump_goods_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({value:this.value,value1:this.value1,value2:this.value2,currentPage:this.currentPage,pageSize:this.pageSize}));

        this.$router.push('goodsDetail?id=' + id)
      
      
    },
    get_goodsList(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      this.goodsList = [];
      var data =
        "name=" +
        this.value +
        "&type=" +
        this.value1 +
        "&sellStatus=" +
        this.value2 +
        "&positionId=" +
        this.positionsId +
        "&page=" +
        this.currentPage +
        "&limit=" +
        this.pageSize;
      this.$axios.post("/web_goods/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = result.data.data.pages;
          if (result.data.data.records == "") {
            this.total = 0;
            this.page = 0;
          } else {
            result.data.data.records.forEach(item => {
              if (item.sellStatus == 1) {
                var status = "在售";
              } else {
                var status = "下架";
              }
              if(!item.specification){
                item.specification = '--------'
              }
              this.goodsList.push({
                id: item.id,
                goodsName: item.name,
                type: item.type,
                price: item.price,
                pointsPrice:item.pointsPrice,
                agentPrice: item.agentPrice,
                size: item.specification,
                stock: item.store,
                createTime: item.createtime,
                status
              });
            });
          }
        } else if (result.data.status == -1) {
          this.$message("操作失败");
        } else {
          this.$message("网络异常");
        }
      });
    },
    get_goodsType() {
      this.$axios.post("/web_goods_type/select_box").then(result => {
        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.options1.push({ value1: item.id, label: item.name });
          });
        } else if (result.data.status == -1) {
          return this.$message("操作失败");
        } else {
          return this.$message("网络错误");
        }
      });
    }
  }
};
</script>


<style lang="less" >

.goods_list-container {
  @import "../style/table.less";
@import "../style/content.less";
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
