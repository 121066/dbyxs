<template >
  <div class="select_red_type-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          红包类型名称:&nbsp;
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
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_redList(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="couponTypeList"
          style="width: 100%"
          height="528"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="红包类型名称"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="createtime" label="创建时间"></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>

        <div class="btn">
          <el-button type="primary" @click="submit_coupon_type">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from '../../components/page'

import { red_packet_type_list } from "../../api/getData.js";
export default {
  components: { breadcrumb,pagination },
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
      redPacTypeList: [],
      page: 1,
      total: null,
      currentPage: 1,
      pageSize: 10,
      val: ""
    };
  },
  created() {
    this.get_redList();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_redList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_redList();
    },
    get_redList(currentPage) {
      this.couponTypeList = [];
      if (currentPage) {
        this.currentPage = currentPage;
      }
      if (this.value2 == null) {
        this.value2 = "";
      }
      if (this.value3 == null) {
        this.value3 = "";
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
      red_packet_type_list(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.records;
          this.total = result.data.data.total;
          this.page = Math.ceil(result.data.data.total / this.pageSize);
          if (!data) {
            this.total = 0;
            this.page = 0;

          } else {
            data.forEach(item => {
              let { name, type, note, id, createtime } = item;
              this.options1.forEach(item1 => {
                if (type == item1.value1) {
                  return (type = item1.label);
                }
              });
              this.couponTypeList.push({ name, type, note, id, createtime });

            });
          }
        }
      });
    },
    handleSelectionChange(val) {
      this.val = val;
    },
    submit_coupon_type() {
      if (this.val.length == 0) {
        return this.$message({
          type:'warning',
          message:'请选择商品'
        });
      } else if (this.val.length == 2) {
        return this.$message({
          type:'warning',
          message:'只能选择一个购物券类型'
        });
      }
      localStorage.setItem(
        "redPacMsg",
        JSON.stringify({ id: this.val[0].id, name: this.val[0].name })
      );
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" >
.select_red_type-container {
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
  .table >   .btn {
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
</style>

