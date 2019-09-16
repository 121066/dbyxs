<template>
  <div class="labelList">
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          商品标签名称:&nbsp;
          <el-input v-model="goodsTypeName" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          商品类型:&nbsp;
          <el-select v-model="goodsTypeId" style="width: 100px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item, index) in goodsTypes"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>

        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_label_list(1)">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="labelList" style="width: 100%" height="528">
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                :disabled="!isModify1"
                @change="handleSelectChange(scope.row.id,scope.row.checked)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="goodsTypeName" label="商品类型名称"></el-table-column>
          <el-table-column prop="goodsLabelName" label="商品标签名称"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
        </el-table>
        <pagination
          :currentPage="currentPage"
          :page="page"
          :total="total"
          :pageSize="pageSize"
          @change-current="currentChange"
          @change-size="sizeChange"
        ></pagination>
        <div class="btns">
          <el-button type="primary" @click="addLabel">确 定</el-button>
          <el-button style="color: #409eff" @click="cancel">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "./page";

import { label_list, goodsType } from "../api/getData.js";
export default {
  data() {
    return {
      currentPage: 1,
      labelList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      goodsTypeName: "",
      goodsTypeId: "",
      goodsTypes: [],
      ids1: [],
      show1: null,
      isModify1: true,
    };
  },
  props: {
    ids: {
      type: Array,
      default: function() {
        return [];
      }
    },
    show: '',
    isModify: '',
    typeId: '',
    
  },
  components: {
    pagination
  },
  created() {
    this.show1 = this.show;
    this.ids1 = this.ids
    this.goodsTypeId = this.typeId ? this.typeId : this.goodsTypeId
    this.isModify1 = this.isModify == false ? this.isModify : this.isModify1
    this.get_label_list();
    this.goodsType();
  },
  methods: {
    handleSelectChange(id, status) {
      if (status) {
        this.ids1.push(id);
      } else {
        this.ids1 = this.ids1.filter(item => item !== id);
      }
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_label_list()
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_label_list()
    },
    get_label_list(currentPage) {
      this.labelList = [];
      if (currentPage) {
        this.currentPage = currentPage;
      }
      var data = {
        current: this.currentPage,
        size: this.pageSize,
        name: this.goodsTypeName,
        typeId: this.goodsTypeId
      };
      label_list(data).then(res => {
        if (res.data.status == 0 && res.data.data.records.length != 0) {
          this.labelList = res.data.data.records;
          this.labelList.forEach(item => {
            item['checked'] = false
            this.ids.forEach(item1 => {
              if(item.id == item1) {
                item['checked'] = true
              }
            })
          })

          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
        }
      });
    },
    goodsType() {
      goodsType().then(res => {
        if (res.data.status == 0 && res.data.data.length != 0) {
          this.goodsTypes = res.data.data;
          this.goodsTypes.forEach(item => {
            item["checked"] = false;
          });
        }
      });
    },
    cancel() {
      this.show1 = false;
      this.$emit("changeShow", this.show1);
    },
    addLabel() {
      this.show1 = false;
      this.$emit("addLabel", this.ids1, this.show1);
    }
  }
};
</script>

<style lang="less">
.labelList {
  @import "../style/table.less";
  @import "../style/content.less";
  width: 100%;
  height: 100%;
  .content {
    padding-top: 0 !important;
    box-sizing: border-box;
    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }
    .btns {
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
    .el-input__inner {
      height: 30px !important;
    }
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
        background-color: #409EFF;
    border-color: #409EFF;
  }
}
</style>

