<template>
  <div class="goodsmanage1-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="jumpType" style="margin-right: 20px;">
          商品名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="status">
          所属类型:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="status">
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
        <el-table
          :data="goodsList"
          ref="multipleTable"
          style="width: 100%"
          height="528"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属类型" width="130"></el-table-column>
          <el-table-column prop="price" label="价格" width="130"></el-table-column>
          <el-table-column prop="agentPrice" label="代理价格" width="130"></el-table-column>

          <el-table-column prop="size" label="规格"></el-table-column>
          <el-table-column prop="stock" label="库存" width="130"></el-table-column>
          <el-table-column prop="status" label="销售状态" width="130"></el-table-column>
          <el-table-column prop="createTime" label="活动创建时间"></el-table-column>
        </el-table>
        <div class="block" style="text-align:center;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            :page-sizes="[10,15,20,25,30]"
            layout="sizes,slot,prev,pager,next"
            :total="total"
            style="display: inline-block"
          >
            <span
              style="width: 45px;height: 30px;display:inline-block; color: #666;margin-right: 10px;"
            >
              <button
                ref="first"
                style="width: 45px;"
                class="first"
                disabled
                @click="currentPage == 1 ? '' : handleCurrentChange(1)"
              >首页</button>
            </span>
          </el-pagination>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="slot"
            :total="total"
            style="display: inline-block"
          >
            <span style="width: 45px;height: 30px;display:inline-block;">
              <button
                ref="last"
                style="width: 45px;"
                class="last"
                @click="currentPage == page ? '' : handleCurrentChange(page)"
              >末页</button>
            </span>
          </el-pagination>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="slot,jumper"
            :total="total"
            style="display: inline-block"
          >
            <span style="color: #666;" ref="pageAndTotal"></span>
          </el-pagination>
        </div>
        <div class="btn">
          <el-button type="primary" @click="submit_goods">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb },
  data() {
    return {
      currentPage: 1,
      goodsList: [
        // {
        //   goodsName: "联想笔记本ThinkPad T450",
        //   type: "家电",
        //   price: "7200元",
        //   agentPrice: "7000元",
        //   size: "83G*512G 2G独显",
        //   stock: "231件",
        //   status: "在售",
        //   createTime: "2018-09-22 20:20:20",
        //   id: 1
        // }
      ],
      total: 10,
      options1: [],
      options2: [],
      value: "",
      value1: "",
      value2: "",
      page: 1,
      pageSize: 10,
      ids: [],
      val: ""// 用于保存已经选中的商品
    };
   
  },
  created() {
    let msg = localStorage.getItem("msg") || "";
    if (msg) {
      localStorage.removeItem("msg");
      this.value1 = JSON.parse(msg).goodsType + "";
      this.value2 = JSON.parse(msg).activityTyep + "";
      let ids = JSON.parse(msg).ids;
      this.ids = ids;
      console.log(ids);
    }
    this.get_goodsType();
    this.get_goodsList();
    this.get_goodsPos();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.get_goodsList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      // console.log(`当前页: ${val}`);
      if (this.currentPage == 1) {
        this.$refs.first.disabled = "true";
      } else {
        this.$refs.first.disabled = "";
      }
      if (this.currentPage == this.page) {
        this.$refs.last.disabled = "true";
      } else {
        this.$refs.last.disabled = "";
      }
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
            this.$refs.pageAndTotal.innerHTML = "[共0页/共条0数据]";
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
                status
              });
              if (this.currentPage == this.page) {
                this.$refs.last.disabled = true;
              }
              this.$refs.pageAndTotal.innerHTML =
                "[共" + this.page + "页/共" + this.total + "条数据]";
            });
            let rows = [];
            if(this.ids.length){
              this.goodsList.forEach(item => {
              this.ids.forEach(item1 => {
                if (item.id == item1) {
                  rows.push(item);
                }
              });
            });
            }

            console.log(rows);

            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
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
            this.options1 = result.data.data;
          });
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.val = val;
    },
    submit_goods() {
      if (this.val.length == 0) {
        return this.$message("请选择商品");
      }
      console.log(this.val);
      let ids = [];
      this.val.forEach(item => {
        ids.push(item.id);
      });
      localStorage.setItem("ids", JSON.stringify(ids));
      this.$router.go(-1);
    },
    // 获取商品所在位置
    get_goodsPos() {
      this.$axios.post("/web_goods_pos/list").then(result => {
        if (result.data.status == 0) {
          this.options2 = result.data.data;
        }
      });
    }
  }
};
</script>


<style lang="less" >
.goodsmanage1-container {
  .first,
  .last {
    cursor: pointer;
  }
  display: flex;
  flex-flow: column;
  .disabled {
    cursor: not-allowed !important;
  }
  .el-pagination button,
  .el-pagination span:not([class*="suffix"]) {
    min-width: 30px;
  }
  .el-input__inner {
    padding-left: 10px;
    height: 30px;
  }
  thead tr {
    background-color: #e6e9f2 !important;
  }
  .el-table th {
    background-color: transparent;
  }
  .el-breadcrumb {
    height: 100%;
    display: flex;
    align-items: center;
    .el-breadcrumb__item {
      display: block;
      line-height: 19px;
    }
  }
  .el-input--mini .el-input__inner {
    height: 30px;
  }
  .el-pagination .el-select .el-input {
    margin: 0;
  }
  .el-pager li.active {
    background-color: #8b98ed;
    position: relative;
  }
  width: 100%;
  height: 100%;
  th > .cell {
    text-align: center;
    color: #333;
  }
  .el-input__icon {
    line-height: 30px;
  }
  td > .cell {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table tr {
    background-color: tansparent;
  }
  .content {
    background-color: #eff3f6;
    padding: 0px 20px 20px;

    height: 100%;
    flex: 1;
    display: flex;
    flex-flow: column;
    // box-sizing: border-box;
    .query {
      height: 60px;
      font-size: 14px;
      color: #666;
      display: flex;
      align-items: center;
      .status {
        margin-right: 20px;
      }
      .btn {
        .el-button {
          height: 30px;
          width: 70px;
          text-align: center;
          padding: 0;
          border-radius: 5px;
        }
      }
    }
    .table {
      padding: 0 20px;
      padding-top: 15px;
      box-sizing: border-box;
      height: 100%;
      flex: 1;
      overflow: hidden;
      background-color: #fff;
      .block {
        margin-top: 40px;
        .el-pagination {
          text-align: center;
          margin-right: 5px;
          padding: 0;
          button {
            width: 30px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #dadcde;
            color: #666;
            padding: 0;
          }
          .el-pager {
            margin-right: 10px;
            li {
              width: 30px;
              height: 30px;
              border: 1px solid #dadcde;
              color: #666;
              min-width: 0;
              margin-left: 10px;
            }
          }
          .el-pagination__jump {
            margin-left: 10px;
            color: #666;
          }
        }
      }

      .btn {
        margin-top: 70px;
        text-align: center;
        > button {
          height: 30px !important;
          line-height: 30px;
          padding: 0;
          width: 60px;
          margin: 0 70px;
          // box-sizing: content-box;
        }
      }
    }
  }
}
</style>
