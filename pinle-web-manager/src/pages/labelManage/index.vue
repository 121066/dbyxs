<template>
  <div class="goods_mana_type-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
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
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible1 = true">添加</el-button>
          <el-dialog title="商品标签添加" :visible.sync="dialogVisible1">
            <el-form :model="form1">
              <el-form-item label="商品类型名称：">
                <el-select v-model="form1.status" placeholder>
                  <el-option
                    v-for="(item, index) in goodsTypes"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品标签名称：" label-width="100px">
                <el-input v-model="form1.name"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <div class="btn">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addLabel">确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
      <div class="table">
        <el-table :data="labelList" style="width: 100%" height="598">
          <el-table-column prop="goodsTypeName" label="商品类型名称"></el-table-column>
          <el-table-column prop="goodsLabelName" label="商品标签名称"></el-table-column>

          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id)"
                v-if="scope.row.status == '使用' ? true:false"
              >禁用</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleForbidden(scope.row.status,scope.row.id,scope.row.name)"
                v-if="scope.row.status == '禁用' ? true:false"
              >使用</el-button>
              <el-button type="text" size="small" @click="get_label_detail(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :currentPage="currentPage"
          :page="page"
          :total="total"
          :pageSize="pageSize"
          @change-current="currentChange"
          @change-size="sizeChange"
        ></pagination>
      </div>
      <el-dialog title="商品类型修改" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-form-item label="商品类型名称：">
            <el-select v-model="form.status" placeholder>
              <el-option
                v-for="(item, index) in goodsTypes"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型名称：" label-width="100px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="btn">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateLabel">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
import {
  goodsType,
  add_label,
  label_list,
  label_detail,
  label_modify
} from "../../api/getData.js";

export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      currentPage: 1,
      labelList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      labelId: "",
      goodsTypeName: "",
      goodsTypeId: "",
      goodsTypes: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        name: "",
        status: ""
      },
      form1: {
        name: "",
        status: "1"
      }
    };
  },
  created() {
    this.goodsType();
    this.get_label_list();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_label_list()

    },
    currentChange(val) {
      this.currentPage = val;
      this.get_label_list()
    },
    addLabel() {
      if (!this.form1.name) {
        return this.$message({
          type: "warning",
          message: "商品标签名不能为空"
        });
      }
      var data = { name: this.form1.name, typeId: this.form1.status };
      add_label(data).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.dialogVisible1 = false;
            this.get_label_list();
             this.form1.name = ''
            this.$message({
              type: "success",
              message: "添加成功"
            });
          } else if (res.data.data == 2) {
            this.$message({
              type: "warning",
              message: "存在重复的标签名"
            });
          }
        }
      });
    },
    updateLabel() {
      if (!this.form.name) {
        return this.$message({
          type: "warning",
          message: "商品标签名不能为空"
        });
      }
      var data = {
        name: this.form.name,
        typeId: this.form.status,
        id: this.labelId
      };
      label_modify(data).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.dialogVisible = false;
            this.get_label_list();
            this.$message({
              type: "success",
              message: "修改成功"
            });
          } else if (res.data.data == 2) {
            this.$message({
              type: "warning",
              message: "存在重复的标签名"
            });
          }
        }
      });
    },
    goodsType() {
      goodsType().then(res => {
        if (res.data.status == 0 && res.data.data.length != 0) {
          this.goodsTypes = res.data.data;
        }
      });
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
          this.total = res.data.data.total;
          this.page = Math.ceil(this.total / this.pageSize);
        }
      });
    },
    get_label_detail(id) {
      this.labelId = id;
      this.dialogVisible = true;
      label_detail({ id }).then(res => {
        if (res.data.status == 0) {
          var data = res.data.data;
          this.form.name = data.goodsLabelName;
          this.form.status = data.goodsTypeId + "";
        }
      });
    }
  }
};
</script>


<style lang="less" >
.goods_mana_type-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  width: 100%;
  height: 100%;
  .content {
    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }
    .el-dialog {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 620px;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      margin: 0;
      margin-top: 0 !important;
      .el-dialog__header {
        line-height: 70px;
        text-align: center;
        padding: 0;
        .el-dialog__title {
          font-size: 16px;
        }
      }
      .el-form-item__label {
        padding: 0;
      }

      .el-form {
        width: 320px;
        margin: 0 auto;
        .el-input {
          width: 200px;
        }
      }
      .dialog-footer {
        margin-top: 20px;

        .btn {
          text-align: center;
          margin-top: 50px;
          button {
            height: 30px;
            line-height: 30px;
            padding: 0;
            width: 70px;
            margin: 0 70px;
          }
        }
      }
    }
  }
}
</style>
