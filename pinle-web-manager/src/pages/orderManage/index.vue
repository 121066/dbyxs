<template >
  <div class="ordermanage-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          订单编号:&nbsp;
          <el-input v-model="orderNum" placeholder="请输入订单编号" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          用户编号:&nbsp;
          <el-input v-model="usersNum" placeholder="请输入用户编号" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          商品名称:&nbsp;
          <el-input v-model="goodsName" placeholder="请输入商品名称" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          商品类型:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="margin_right_20">
          订单状态:&nbsp;
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
          是否申请售后:&nbsp;
          <el-select v-model="value3" style="width: 100px;">
            <el-option
              v-for="item in options3"
              :key="item.value3"
              :label="item.label"
              :value="item.value3"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_orderList(1)">查询</el-button>
        </div>
      </div>
      <div class="query">
        <div class="margin_right_20">
          订单状态:&nbsp;
          <el-select v-model="value4" style="width: 100px;">
            <el-option
              v-for="item in options4"
              :key="item.value4"
              :label="item.label"
              :value="item.value4"
            ></el-option>
          </el-select>
        </div>
        <div class="start_time margin_right_20">
          创建时间-开始:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              v-model="value5"
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
              v-model="value6"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table :data="orderList" style="width: 100%" height="548">
          <el-table-column prop="orderNum" label="订单编号"></el-table-column>
          <el-table-column prop="usersNum" label="用户标号"></el-table-column>
          <el-table-column prop="usersName" label="用户昵称"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="goodsType" label="商品类型"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
          <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="isAfterSale" label="是否申请售后"></el-table-column>
          <el-table-column prop="shipmentStatus" label="配送状态"></el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jump_order_modify(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="jump_order_detail(scope.row.id)">详情</el-button>
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

import { mapActions} from "vuex";
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total:0,
      options2: [
        { value2: "", label: "全部" },
        { value2: "1", label: "待付款" },
        { value2: "2", label: "未填地址" },
        { value2: "3", label: "待发货" },
        { value2: "4", label: "待收货" },
        { value2: "5", label: "待评价" },
        { value2: "6", label: "已完成" },
        { value2: "7", label: "待分享" },
        { value2: "8", label: "待领取" },
        // { value2: "9", label: "拼单未获得" },
        // { value2: "10", label: "拼单未成功，已退款" },
      ],
      options3: [
        { value3: "", label: "全部" },
        { value3: "0", label: "未申请" },
        { value3: "1", label: "有申请" }
      ],
      options4: [
        { value4: "", label: "全部" },
        { value4: "1", label: "备货中" },
        { value4: "2", label: "缺货" },
        { value4: "3", label: "备货完成" }
      ],
      orderList: [],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      orderNum: "",
      usersNum: "",
      goodsName: ""
    };
  },
  created() {
    if (localStorage.getItem("pageMsg")) {
      let pageMsg = JSON.parse(localStorage.getItem("pageMsg"));
      this.value1 = pageMsg.value1
      this.value2 = pageMsg.value2
      this.value3 = pageMsg.value3
      this.value4 = pageMsg.value4
      this.value5 = pageMsg.value5
      this.value6 = pageMsg.value6
      this.currentPage = pageMsg.currentChange
      this.pageSize = pageMsg.pageSize
      this.orderNum = pageMsg.orderNum
      this.usersNum = pageMsg.usersNum
      this.goodsName = pageMsg.goodsName
      localStorage.removeItem("pageMsg");
    }
    // this.get_bannerList();

    this.get_orderList();
    // 获取商品类型
    this.sava_goods_type();
  },
  methods: {
    ...mapActions(["sava_goods_type"]),

    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_orderList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_orderList();
    },
    jump_order_detail(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))
      
      localStorage.setItem("pageMsg",JSON.stringify({orderNum:this.orderNum,usersNum:this.usersNum,goodsName:this.goodsName,value1: this.value1,value2:this.value2,value3: this.value3,value4:this.value4,value5: this.value5,value6:this.value6,currentChange:this.currentPage,pageSize:this.pageSize}) );
      this.$router.push("orderDetail?id=" + id);
    },
    jump_order_modify(id) {
      localStorage.setItem('path',JSON.stringify(this.$route.path))

      localStorage.setItem("pageMsg", JSON.stringify({orderNum:this.orderNum,usersNum:this.usersNum,goodsName:this.goodsName,value1: this.value1,value2:this.value2,value3: this.value3,value4:this.value4,value5: this.value5,value6:this.value6,currentChange:this.currentPage,pageSize:this.pageSize}));
      this.$router.push("orderModify?id=" + id);
    },
    get_orderList(currentPage) {
      if(currentPage){
        this.currentPage = currentPage
      }
      if(this.value5 == null){
        this.value5 = ''
      }
      if(this.value6 == null){
        this.value6 = ''
      }
      this.orderList = [];
      let data =
        "id=" +
        this.orderNum +
        "&userId=" +
        this.usersNum +
        "&goodsName=" +
        this.goodsName +
        "&goodsType=" +
        this.value1 +
        "&status=" +
        this.value2 +
        "&postSaleStatus=" +
        this.value3 +
        "&sendStatus=" +
        this.value4 +
        "&createTime=" +
        this.value5 +
        "&finishTime=" +
        this.value6 +
        "&size=" +
        this.pageSize +
        "&current=" + 
        this.currentPage;
      this.$axios.post("web_order/list", data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.total = result.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize)
          if (data.records.length == 0) {
            this.total = 0;
            this.page = 0;
          } else {
            data.records.forEach(item => {
              let id = item.id;
              let orderNum = item.id;
              let usersNum = item.userId;
              let usersName = item.userName;
              let goodsName = item.goodsName;
              let goodsType = "";
              this.options1.forEach(item1 => {
                if (item1.id == item.goodsType) {
                  goodsType = item1.label;
                }
              });
              let orderAmount = item.amount;
              let orderStatus = "";
              this.options2.forEach(item1 => {
                if (item1.value2 == item.status) {
                  orderStatus = item1.label;
                }
              });
              let createTime = item.createtime;
              let shipmentStatus = "";
              this.options4.forEach(item1 => {
                if (item1.value4 == item.sendStatus) {
                  shipmentStatus = item1.label;
                }
              });
              let isAfterSale = "";
              if (item.postSaleStatus == 0) {
                isAfterSale = "未申请";
              } else {
                isAfterSale = "有申请";
              }
              this.orderList.push({
                id,
                orderNum,
                usersNum,
                usersName,
                goodsName,
                goodsType,
                orderAmount,
                orderStatus,
                createTime,
                isAfterSale,
                shipmentStatus
              });
            });
          }
        }
      });
    },
         // 校验结束时间
    verfy_startTime(){

      if(this.value6){
        this.timeCompare(1)
      }
    },
    //   校验结束时间
    verfy_endtime(){
      if(this.value5){
        this.timeCompare(2)
      }
    },

    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.startTime)).getTime() >= (new Date(this.endTime)).getTime()){
        if(flag == 1){
          this.value5 = ''
        } else {
          this.value6 = ''
        }
        return this.$message({
          type: 'warning',
          message: "'拼团创建时间-开始'必须小于'拼团创建时间-结束'"
        })
      }
    }
  },
  computed: {
    options1() {
      return [...[{ id: "", label: "全部" }], ...this.$store.state.goodsType];
    }
  }
};
</script>

<style lang="less" >
.ordermanage-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;

  //更改行高
  .el-table__row td {
    height: 50px;
    padding: 0;
  }
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

