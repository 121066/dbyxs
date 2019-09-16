<template>
  <div class="page-container">
    <div class="block" style="text-align:center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
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
        :page-size="pageSize"
        layout="slot"
        :total="total"
        style="display: inline-block"
      >
        <span style="width: 45px;height: 30px;display:inline-block;">
          <button
            ref="last"
            style="width: 45px;"
            class="last"
            :disabled = 'page == 1 ? true : false'
            @click="currentPage ==  page? '' : handleCurrentChange(page)"
          >末页</button>
        </span>
      </el-pagination>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="slot,jumper"
        :total="total"
        style="display: inline-block"
      >
        <span style="color: #666;" ref="pageAndTotal">{{"[共" + page + "页/共" + total + "条数据]"}}</span>
      </el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pageAndTotal: "",
      pageSizes: [10,15,20,25,30]
    };
  },
  props: ["currentPage", "total", "page", "pageSize","flag"],
  created(){
    if(this.flag == 2){
      this.pageSizes = [5,10,15,20,25]
    }
  },
  methods: {
    handleSizeChange(val) {
      if (Math.ceil(this.total / val) == 1) {
        this.$nextTick(() => {
          this.$refs.last.disabled = "true";
        });
      } else {
        this.$nextTick(() => {
          this.$refs.last.disabled = "";
        });
      }
      this.$emit("change-size", val);
    },
    handleCurrentChange(val) {
      this.$emit("change-current", val);
    }
  },
  
  watch: {
    currentPage(val, oldVal) {
      if (val == 1) {
        this.$refs.first.disabled = "true";
      } else {
        this.$refs.first.disabled = "";
      }
      if (val == this.page) {
        this.$refs.last.disabled = "true";
      } else {
        this.$refs.last.disabled = "";
      }


    },
    page(val) {
      this.page = val;
      this.$nextTick(() => {
        this.$refs.pageAndTotal.innerHTML =
          "[共" + this.page + "页/共" + this.total + "条数据]";
      });
      if(this.page != 1){
        this.$refs.last.disabled = "";
      }
    },
    total(val) {
      this.total = val;
      this.$nextTick(() => {
        this.$refs.pageAndTotal.innerHTML =
          "[共" + this.page + "页/共" + this.total + "条数据]";
      });
      if (Math.ceil(val / this.pageSize) == 1) {
        this.$nextTick(() => {
          this.$refs.last.disabled = "true";
        });
      }
    },
    

  },

};
</script>

<style lang="less">
.page-container {
  @import "../style/table.less";
}
</style>

