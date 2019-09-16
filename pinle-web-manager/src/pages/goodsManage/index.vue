<template>
  <div class="goodsmanage-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20" >
          商品名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          所属类型:&nbsp;
          <el-select v-model="value1" >
            <el-option
              v-for="item in goodsType"
              :key="item.id"
              :label="item.label"
              :value="item.id"
              
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          销售状态:&nbsp;
          <el-select v-model="value2" >
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value2"
             
            ></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          活动类型:&nbsp;
          <el-select v-model="value3">
            <el-option
              v-for="item in position"
              :key="item.id"
              :label="item.position"
              :value="item.id"
              
            ></el-option>
          </el-select>
        </div>

        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_goodsList(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('/addGoods')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="goodsList" style="width: 100%" height="598">
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属类型" width="130"></el-table-column>
          <el-table-column prop="price" label="价格(元)" width="130"></el-table-column>
          <el-table-column prop="agentPrice" label="代理价格(元)" width="130"></el-table-column>
          <el-table-column prop="size" label="规格"></el-table-column>
          <el-table-column prop="stock" label="库存" width="130"></el-table-column>
          <el-table-column prop="status" label="销售状态" width="130"></el-table-column>
          <el-table-column prop="position" label="活动类型" width="150"></el-table-column>
          <el-table-column prop="createTime" label="商品创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_goods_modify(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="jump_goods_detail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="removeGoods(scope.row.id)">删除</el-button>
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
import {goodsList, goodsType} from '../../api/getData.js'
import {mapActions} from 'vuex'
export default {
  components: { breadcrumb ,pagination},
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
      value: "", //商品名称
      value1: "", // 所属类型
      value2: "", // 销售状态
      value3: "", //  商品所处位置
      page: 1,
      pageSize: 10,
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
    // this.get_goodsType();
    this.sava_goods_position()
    this.sava_goods_type()
    this.get_goodsList();
    // 获取商品所在位置
  },
  methods: {
    ...mapActions(['sava_goods_position','sava_goods_type']),
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_goodsList();
    },
    currentChange(val) {
      this.currentPage = val
      this.get_goodsList();
    },
    jump_goods_detail(id) {
        //       "name=" +
        // this.value +
        // "&type=" +
        // this.value1 +
        // "&sellStatus=" +
        // this.value2 +
        // "&positionId=" +
        // this.value3 +
        // "&page=" +
        // this.currentPage +
        // "&limit=" +
        // this.pageSize;
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({currentPage:this.currentPage,pageSize:this.pageSize,value1:this.value1,value2:this.value2,value3:this.value3,value:this.value}));
      this.$router.push("/goodsDetail?id=" + id);
    },
    jump_goods_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({currentPage:this.currentPage,pageSize:this.pageSize,value1:this.value1,value2:this.value2,value3:this.value3,value:this.value}));
      this.$router.push("/goodsModify?id=" + id);
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
        this.value3 +
        "&page=" +
        this.currentPage +
        "&limit=" +
        this.pageSize;
      goodsList(data).then(result => {
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
              let position = "";
              this.position.forEach(item1 => {
                if (item1.id == item.positionId) {
                  position = item1.position;
                  return 
                }
              });
              if(!item.specification){
                item.specification = '------'
              }
              this.goodsList.push({
                id: item.id,
                goodsName: item.name,
                type: item.type,
                price: item.price,
                agentPrice: item.agentPrice,
                size: item.specification,
                stock: item.store,
                createTime: item.createtime,
                status,
                position: position
              });
            });
          }
        }
      });
    },
    removeGoods(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.$axios.post("/web_goods/remove", "id=" + id).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$message({
              type:'success',
              message:'删除成功'
            });
            if(this.total % 10 == 1){
              if(this.currentPage != 1 && this.total % this.pageSize == 1){
                this.currentPage--
              }
            }
            this.get_goodsList()
          } else {
            return this.$message({
              type:'warning',
              message:'删除失败'
            });
          }
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
  },
  computed: {
    position(){
      let position = this.$store.state.position
      position = [...[{id:'',position: '所有'}],...position]
      return position
    },
    goodsType(){
      let goodsType = this.$store.state.goodsType
      goodsType = [...[{id:'',label: '所有'}],...goodsType]
      return goodsType
    }
  },
};
</script>


<style lang="less" >

.goodsmanage-container {
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
