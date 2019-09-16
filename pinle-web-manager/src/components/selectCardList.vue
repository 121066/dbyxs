<template >
  <div class="select_card-container">
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          <span>{{type == 1 ?'优惠券类型名称':'红包类型名称'}}</span>:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          <span>类型</span>:&nbsp;
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
          <span>创建时间-开始</span>:&nbsp;
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
          <span>创建时间-结束</span>:&nbsp;
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              style="width:200px"
              v-model="value3"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn" v-if="type == 1">
          <el-button type="primary" icon="el-icon-search" @click="get_couponList(1)">查询</el-button>
        </div>
        <div class="btn" v-else>
          <el-button type="primary" icon="el-icon-search" @click="get_redPacList(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="dataList" style="width: 100%" height="528">
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @change="handleSelectionChange(scope.row.checked,scope.row.id,scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="type == 1 ? '优惠券名称': '红包名称'"></el-table-column>
          <el-table-column prop="price" :label=" type == 1 ? '优惠券价值': '红包价值'"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="limitKind" label="有无时间限制"></el-table-column>
          <el-table-column prop="typeId" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.type == '2'" style="color:#00baff">
                <img src="../img/icon_not_start1.png" alt>
                <span>{{'未开始'}}</span>
              </div>
              <div v-if="scope.row.type == '1'" style="color:#04bb33">
                <img src="../img/icon_use.png" alt>
                <span>{{'可使用'}}</span>
              </div>
              <div v-if="scope.row.type == '0'" style="color:#555555">
                <img src="../img/icon_overdue.png" alt>
                <span>{{'已过期'}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="来源"></el-table-column>
          <el-table-column prop="createtime" label="创建时间"></el-table-column>
        </el-table>
        <div class="block" style="text-align:center;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
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
            :current-page="currentPage"
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
            :current-page="currentPage"
            :page-size="10"
            layout="slot,jumper"
            :total="total"
            style="display: inline-block"
          >
            <span style="color: #666;" ref="pageAndTotal"></span>
          </el-pagination>
        </div>
        <div class="btn">
          <el-button type="primary" @click="submit_coupon_type">确 定</el-button>
          <el-button style="color: #409eff" @click="cancel">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { coupon_list, red_packet_list } from "../api/getData.js";
export default {
  data() {
    return {
      options1: [
        {
          value1: "",
          label: "所有"
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
      dataList: [],
      page: 1,
      total: null,
      currentPage: 1,
      pageSize: 10,
      val: "",
    };
  },
  props: ["type"],
  created() {
    // localStorage.removeItem('currentPage')
    if (this.type == 1) {
      this.get_couponList();
    } else if (this.type == 2) {
      this.get_redPacList();
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
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
      if (this.type == 1) {
        this.$route.meta.title = ["卡券管理", "优惠券列表"];
        this.get_couponList();
      } else {
        this.$route.meta.title = ["卡券管理", "红包列表"];

        this.get_redPacList();
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
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
      if (this.type == 1) {
        this.get_couponList();
      } else {
        this.get_redPacList();
      }
    },

    handleSelectionChange(stauts, id, scope) {

      this.dataList.forEach(item => {
        if (item.id != id) {
          item.checked = false;
        }
      });
      this.val= scope;
    },
    get_couponList(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      let data =
        "name=" +
        this.value +
        "&type=" +
        this.value1 +
        "&startTime=" +
        this.value2 +
        "&endTime=" +
        this.value3 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      coupon_list(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!data) {
            this.total = 0;
            this.page = 0;
            this.$refs.pageAndTotal.innerHTML = "[共0页/共条0数据]";
          } else {
            data.forEach(item => {
              if (item.source == 1) {
                item.source = "手动创建";
              } else {
                item.source = "系统自动创建";
              }
              if (item.limitKind == 0) {
                item.startTime = "----------";
                item.endTime = "----------";
              }
              if (item.limitKind == 0) {
                item.limitKind = "无时间限制";
              } else {
                item.limitKind = "有时间限制";
              }
              item["checked"] = false;
            });
            this.dataList = data;
            this.dataList.forEach(item => {
              if (item.id == this.val.id) {
                item.checked = true;
              }
            });

            if (this.currentPage == this.page) {
              this.$refs.last.disabled = true;
            }
            this.$refs.pageAndTotal.innerHTML =
              "[共" + this.page + "页/共" + this.total + "条数据]";
          }
        }
      });
    },
    get_redPacList(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      let data =
        "name=" +
        this.value +
        "&type=" +
        this.value1 +
        "&startTime=" +
        this.value2 +
        "&endTime=" +
        this.value3 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      red_packet_list(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!data) {
            this.total = 0;
            this.page = 0;
            this.$refs.pageAndTotal.innerHTML = "[共0页/共条0数据]";
          } else {
            data.forEach(item => {
              if (item.source == 1) {
                item.source = "手动创建";
              } else {
                item.source = "系统自动创建";
              }
              if (item.limitKind == 0) {
                item.startTime = "----------";
                item.endTime = "----------";
              }
              if (item.limitKind == 0) {
                item.limitKind = "无时间限制";
              } else {
                item.limitKind = "有时间限制";
              }
              item["checked"] = false;
            });
            this.dataList = data;
            this.dataList.forEach(item => {
  

              if (item.id == this.val.id) {
                item.checked = true;
              }
            });
            if (this.currentPage == this.page) {
              this.$refs.last.disabled = true;
            }
            this.$refs.pageAndTotal.innerHTML =
              "[共" + this.page + "页/共" + this.total + "条数据]";
          }
        }
      });
    },
    submit_coupon_type() {
      if (this.val.length == 0) {
        return this.$message("请选择商品");
      } 
      this.show1 = false
      this.$emit('addCardType',this.val,this.show1)
    },
    cancel(){
        this.show1  = false
        this.$emit('changeShow',this.show1)
    },

  }
};
</script>

<style lang="less" >
.select_card-container {
  @import "../style/table.less";
  @import "../style/content.less";
  width: 100%;
  height: 100%;
  .content {
    padding-top: 0;
    box-sizing: border-box;
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
  .table {
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
</style>

