<template>
  <div class="select_goods2-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          商品名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          所属类型:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          活动类型:&nbsp;
          <el-select v-model="value2" style="width: 100px;">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.position"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_goodsList">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="goodsList" ref="multipleTable" style="width: 100%" height="528">
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @change="handleSelectChange(scope.row.id,scope.row.checked)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属类型" width="130"></el-table-column>
          <el-table-column prop="price" label="价格" width="130"></el-table-column>
          <el-table-column prop="agentPrice" label="代理价格" width="130"></el-table-column>

          <el-table-column prop="size" label="规格"></el-table-column>
          <el-table-column prop="stock" label="库存" width="130"></el-table-column>
          <el-table-column prop="status" label="销售状态" width="130"></el-table-column>
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
import breadcrumb from "./breadcrumb.vue";
import pagination from "./page";

import { mapActions } from "vuex";
export default {
  components: { breadcrumb ,pagination},
  data() {
    return {
      currentPage: 1,
      goodsList: [],
      total: 10,
      value: "",
      value1: "",
      value2: "",
      page: 1,
      pageSize: 10,
      ids: [],
      val: [] // 用于保存已经选中的商品
    };
  },
  created() {
    let msg = localStorage.getItem("msg") || "";
    if (msg) {
      localStorage.removeItem("msg");
      this.value1 = JSON.parse(msg).goodsType + "";
      this.value2 = JSON.parse(msg).activityTyep + "";
      let ids = [];
      if (JSON.parse(msg).ids) {
        ids = JSON.parse(msg).ids;
      }
      this.ids = ids;
    }
    this.get_goodsList();
    this.sava_goods_type();
    this.sava_goods_position();
  },
  methods: {
    ...mapActions(["sava_goods_type", "sava_goods_position"]),
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_goodsList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_goodsList();
    },
    get_goodsList() {
      this.goodsList = [];
      var data =
        "name=" +
        this.value +
        "&type=" +
        this.value1 +
        "&page=" +
        this.currentPage +
        "&positionId=" +
        this.value2 +
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
              })
              if (this.ids) {
                this.goodsList.forEach(item => {
                  this.ids.forEach(item1 => {
                    if (item.id == item1) {
                      item.checked = true;
                    }
                  });
                });
              }


            });
          }
        } else if (result.data.status == -1) {
          this.$message("操作失败");
        } else {
          this.$message("网络异常");
        }
      });
    },
    handleSelectChange(id, status) {
      if (!this.ids) {
        this.ids.push(id);
      } else {
        if (status == false) {
          this.ids = this.ids.filter(item => {
            if (item != id) {
              return true;
            }
          });
        } else {
          this.ids.push(id);
        }
      }

    },
    submit_goods() {
      // if (this.val.length == 0) {
      //   return this.$message("请选择商品");
      localStorage.setItem("ids", JSON.stringify(this.ids));
      this.$router.go(-1);
    }
    // 获取商品所在位置
  },
  computed: {
    options1() {
      return [...[{ id: "", label: "全部" }], ...this.$store.state.goodsType];
    },
    options2() {
      return this.$store.state.position;
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
