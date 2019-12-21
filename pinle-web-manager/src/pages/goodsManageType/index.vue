<template>
  <div class="goods_mana_type-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
          商品类型名称:&nbsp;
          <el-input v-model="value" placeholder="请输入内容" style="width:100px;height:30px;"></el-input>
        </div>
        <div class="margin_right_20">
          状态:&nbsp;
          <el-select v-model="value1" style="width: 100px;">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
            ></el-option>
          </el-select>
        </div>

        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_goodsManageType(1)">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible1 = true">添加</el-button>
          <el-dialog title="商品类型添加" :visible.sync="dialogVisible1">
            <el-form :model="form1">
              <el-form-item label="商品类型名称：" label-width="100px">
                <el-input v-model="form1.name"></el-input>
              </el-form-item>
              <el-form-item label="商品类型状态：">
                <el-select v-model="form1.status" placeholder>
                  <el-option label="禁用" value="0"></el-option>
                  <el-option label="使用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <div class="btn">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addGoodsType">确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
      <div class="table">
        <el-table :data="goodsTypeList" style="width: 100%" height="598">
          <el-table-column prop="goodsNameType" label="商品类型名称"></el-table-column>
          <el-table-column prop="goodsTypeCount" label="标签名称"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
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
              <el-button type="text" size="small" @click="handleEdit(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>
      </div>
      <el-dialog title="商品类型修改" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-form-item label="商品类型名称：" label-width="100px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品类型状态：">
            <el-select v-model="form.status" placeholder>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="使用" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="btn">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="upateGoodsType">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from '../../components/page'
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      goodsTypeList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      id: "",
      options1: [
        {
          value1: "",
          label: "所有"
        },
        {
          value1: "0",
          label: "禁用"
        },
        {
          value1: "1",
          label: "使用"
        }
      ],
      value: "",
      value1: "",
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        name: "",
        status: "1"
      },
      form1: {
        name: "",
        status: "1"
      }
    };
  },
  created() {
    this.get_goodsManageType();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_goodsManageType();
    },
    currentChange(val) {
      this.currentPage = val
      this.get_goodsManageType();
    },
    get_goodsManageType(num) {
      if(num){
        this.currentPage = num
      }
      this.goodsTypeList = [];
      var data =
        "name=" +
        this.value +
        "&status=" +
        this.value1 +
        "&size=" +
        this.pageSize +
        "&current=" +
        this.currentPage;
      this.$axios.post("/web_goods_type/list", data).then(result => {
        if (result.data.status == 0) {
          this.total = result.data.data.total;
          if (result.data.data.records == "") {
            this.total = 0;
            this.page = 0;
          } else {
            var flagItem = {};
            result.data.data.records.forEach((item, index) => {
              var goodsNameType = item.name;
              var status;
              if (item.status == 0) {
                status = "禁用";
              } else {
                status = "使用";
              }
              var createTime = item.createtime;
              var id = item.id;
              if (item.id == flagItem.id) {
                this.goodsTypeList[this.goodsTypeList.length - 1][
                  "goodsTypeCount"
                ] =
                  parseInt(
                    this.goodsTypeList[this.goodsTypeList.length - 1][
                      "goodsTypeCount"
                    ]
                  ) + parseInt(flagItem.num);
                // flagItem.goodsTypeCount += item.num
                this.total--;
              } else {
                var goodsTypeCount = item.num;
                this.goodsTypeList.push({
                  goodsNameType,
                  goodsTypeCount,
                  createTime,
                  status,
                  id
                });
              }
              flagItem = item;
            });
          }
          this.page = Math.ceil(this.total / this.pageSize);
        }
      });
    },
    upateGoodsType() {
      if (this.form.name == "") {
        return this.$message({
          type:'warning',
          message:'请输入商品类型名称'
        });
      }

      this.$axios
        .post(
          "/web_goods_type/modify",
          "id=" +
            this.id +
            "&name=" +
            this.form.name +
            "&status=" +
            this.form.status
        )
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 1) {
              this.dialogVisible = false;
              this.$message({
                type:'success',
                message:'修改成功'
              });
              this.get_goodsManageType();
            } else if (result.data.data == 0) {
              this.$message({
                type:'warning',
                message:'修改失败'
              });
            } else if (result.data.data == 2) {
              this.$message({
                type:'warning',
                message:'用户名重复'
              });
            }
          }
        });
    },
    handleEdit(id) {
      this.dialogVisible = true;
      this.id = id;
      this.goodsTypeList.forEach(item => {
        if (item.id == this.id) {
          this.form.name = item.goodsNameType;
          this.form.status = item.status;
        }
      });
    },
    handleForbidden(status, id, name) {
      var goodsStatus = '';
      if (status == "禁用") {
        goodsStatus = 0;
      } else {
        goodsStatus = 1;
      }
      this.$confirm('此操作将修改状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
        .post(
          "/web_goods_type/start_and_stop",
          "id=" + id + "&status=" + goodsStatus
        )
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 1) {
              if (status == "禁用") {
                this.$message({
                  type:'success',
                  message:'启用成功'
                });
              } else {
                this.$message({
                  type:'success',
                  message:'禁用成功'
                });
              }
              this.goodsTypeList.forEach(item => {
                if (item.id == id) {
                  item.status = item.status == "禁用" ? "使用" : "禁用";
                }
              });
            } else {
              this.$message({
                type:'warning',
                message:'操作失败'
              });
            }
          }
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      
    },
    addGoodsType() {
      if (!this.form1.name) {
        return this.$message({
          type:'warning',
          message:'请输入商品类型名称'
        });
      }
      this.$axios
        .post(
          "/web_goods_type/add",
          "name=" + this.form1.name + "&status=" + this.form1.status
        )
        .then(result => {
          if (result.data.status == 0) {
            if (result.data.data == 1) {
              this.dialogVisible1 = false;
              this.get_goodsManageType();
              return this.$message({
                types:'success',
                message:'添加成功'
              });
            } else if (result.data.data == 2) {
              return this.$message({
                type:'warning',
                message:'商品已存在'
              });
            } else {
              return this.$message({
                type:'warning',
                message:'操作失败'
              });
            }
          }
        });
    }
  }
};
</script>


<style lang="less" >
.goods_mana_type-container {
  @import '../../style/table.less';
@import '../../style/content.less';
  display: flex;
  flex-flow: column;
  position: relative;
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
          }
        }
      }
    }
  }
}
</style>
