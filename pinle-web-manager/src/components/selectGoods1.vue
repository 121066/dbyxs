<template>
  <div class="select_goods2-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="query">
        <div >
          商品名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div >
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
        <div >
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
        </div>
      </div>
      <div class="table">
        <el-table
          :data="goodsList"
          style="width: 100%"
          height="528"
        >
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" @change="handleSelectChange(scope.row.id,scope.row.checked)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属类型"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="agentPrice" label="代理价格"></el-table-column>

          <el-table-column prop="size" label="规格"></el-table-column>
          <el-table-column prop="stock" label="库存"></el-table-column>
          <el-table-column prop="status" label="销售状态"></el-table-column>
          <el-table-column prop="createTime" label="活动创建时间"></el-table-column>
        </el-table>
        <pagination
          :currentPage="currentPage"
          :page="page"
          :total="total"
          :pageSize="pageSize"
          @change-current="currentChange"
          @change-size="sizeChange"
        ></pagination>

        <div class="btn">
          <el-button type="primary" @click="submit_goods">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "./breadcrumb";
import pagination from "./page";

export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      goodsList: [],
      total: 10,
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
      pageSize: 10,
      type: this.$route.query.type,
      goodsType: this.$route.query.goodsType || '',
      val: ''  //   用于保存选中商品的id
    };
  },
  created() {
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
    get_goodsList(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      if (this.goodsType) {
        this.value1 = this.goodsType;
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
        this.type +
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
                checked: false
              });
            });
            if(this.val){
              this.goodsList.forEach(item => {
                if(item.id == this.val){
                  item.checked = true
                }
              })
            }
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
    },
    handleSelectChange(id,status){
      this.goodsList.forEach(item => {
        if(item.id != id){
          item.checked = false
        } else {
          item.checked = true
        }
      })
      this.val = id
    },
    submit_goods() {
      if (this.val.length == 0) {
        return this.$message("请选择一个商品");
      }

      localStorage.setItem("id", this.val);
      this.$router.go(-1);
    }
  }
};
</script>


<style lang="less" >
.select_goods2-container {

  @import "../style/table.less";
  @import "../style/content.less";
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    padding-top: 0;
    .btn {
      .el-button {
        width: 70px;
      }
    }
  }
  .table {
    .btn {
      margin-top: 70px;
      text-align: center;
      .el-button {
        margin: 0 80px;
      }
    }
  }
}
</style>
