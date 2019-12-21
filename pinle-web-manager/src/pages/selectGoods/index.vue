<template>
  <div class="selectgoods-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="jumpType" style="margin-right: 20px;">
          商品名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="status" style="margin-right: 20px;">
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
        <div class="status margin_right_20">
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
                             <div class="margin_right_20">
          所属位置:&nbsp;
          <el-select v-model="positionId">
            <el-option
              v-for="item in position"
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
          style="width: 100%"
          height="528"
          highlight-current-row
          @current-change="handleSelectionChange"
        >
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属类型" width="130"></el-table-column>
          <el-table-column prop="price" label="价格" width="130"></el-table-column>
          <el-table-column prop="agentPrice" label="代理价格" width="130"></el-table-column>
          <el-table-column prop="size" label="规格"></el-table-column>
          <el-table-column prop="stock" label="库存" width="130"></el-table-column>
          <el-table-column prop="status" label="销售状态" width="130"></el-table-column>
          <el-table-column prop="createTime" label="商品创建时间"></el-table-column>
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
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import {mapActions} from 'vuex'

export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      goodsList: [
        {
          goodsName: "联想笔记本ThinkPad T450",
          type: "家电",
          price: "7200元",
          agentPrice: "7000元",
          size: "83G*512G 2G独显",
          stock: "231件",
          status: "在售",
          createTime: "2018-09-22 20:20:20",
          id: 1
        }
      ],
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
      positionId: '',
      val: {}
    };
  },
  created() {
    this.get_goodsType();
    this.get_goodsList();
    this.sava_goods_position()

  },
  methods: {
    ...mapActions(['sava_goods_position']),

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
        "&sellStatus=" +
        this.value2 +
        "&page=" +


        this.currentPage +
                '&positionId=' + 
        this.positionId + 
        "&limit=" +
        this.pageSize;
      this.$axios.post("/web_goods/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          this.page = result.data.data.pages;
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
          });
        }

      });
    },
    get_goodsType() {
      this.$axios.post("/web_goods_type/select_box").then(result => {

        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.options1.push({ value1: item.id, label: item.name });
          });
        }
      });
    },
    handleSelectionChange(val) {


      this.goodsList.forEach(item => {
        // 排他,每次选择时把其他选项都清除
        if (item.id !== val.id) {
          item.checked = false;
        }
        this.val = val;
      });
    },
    submit_goods() {
                localStorage.setItem("id", this.val.id);
          history.go(-1);
    }
  },
    computed:{
        position(){
      let position = this.$store.state.position
      position = [...[{id:'',position: '所有'}],...position]
      position = position.splice(0,13)

     position =  position.filter(item => {
        if(item.id != 8 && item.id != 9){
          return item
        }
      })
      return position
    },
  }
};
</script>


<style lang="less" >
.selectgoods-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  .content {
    padding-top: 0;

    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }
    .table {
      > .btn {
        margin-top: 50px;
        text-align: center;
        button{
          width: 65px;
          margin: 0 65px;
        }
      }
    }
  }
  .el-table__row td {
    height: 48px;
  }
}
</style>
