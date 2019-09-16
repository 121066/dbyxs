<template>
  <div class="oneovertime-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/onePromotion_team')">
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="活动名称">
                <span>{{name}}</span>
              </el-form-item>
              <el-form-item label="活动状态">
                <span>{{'拼团超时'}}</span>
              </el-form-item>
              <el-form-item label="开始时间" style="margin-left: -20px;margin-right: 70px;">
                <span>{{createtime}}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{overtime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团商品定制" name="2">
            <el-form label-width="120px" class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods">
                  <img :src="goalGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goalGoods.name}}</p>
                    <p>原价: {{goalGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="失败商品" style="width: 250px;">
                <span style="color:#000; font-weight: 600;">{{failGoods.price}}元购物券</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团用户" name="3" class="promotion_user">
            <el-header>
              参与拼团人数
              <span>{{person}}</span>
            </el-header>
            <el-main style="padding:0;">
              <div class="table" style="height: 420px;">
                <el-table :data="member" style="width: 100%" height="290">
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="joinTime" label="加入时间"></el-table-column>
                  <el-table-column prop="type" label="用户类型"></el-table-column>
                </el-table>
                <div class="block" style="text-align:center;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="5"
                    :page-sizes="[5,10,15,20,25]"
                    layout="sizes,slot,prev,pager,next"
                    :total="total"
                    style="display: inline-block"
                  >
                    <span
                      style="width: 45px;height: 30px;display:inline-block; color: #666;margin-right: 10px;"
                    >
                      <button
                        ref="first"
                        style="width: 45px; border:1px solid #ccc;border-radius: 5px;"
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
                    :page-size="5"
                    layout="slot"
                    :total="total"
                    style="display: inline-block"
                  >
                    <span style="width: 45px;height: 30px;display:inline-block;">
                      <button
                        ref="last"
                        style="width: 45px;border:1px solid #ccc;border-radius: 5px;"
                        class="last"
                        @click="currentPage == page ? '' : handleCurrentChange(page)"
                      >末页</button>
                    </span>
                  </el-pagination>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="5"
                    layout="slot,jumper"
                    :total="total"
                    style="display: inline-block"
                  >
                    <span style="color: #666;" ref="pageAndTotal"></span>
                  </el-pagination>
                </div>
              </div>
            </el-main>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2"],
      pageSize: 5,
      currentPage: 1,
      page: 1,
      total: null,
      id: this.$route.query.id,
      name: "",
      status: "",
      goalGoods: {},
      failGoods: {},
      winner: "",
      createtime: "",
      overtime: "",
      person: "",
      members: [],
      member: []
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.member = this.members.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.member = this.members.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
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
    },
    get_detail() {
      this.$axios
        .post("/web_one_promotion/get_team_detail", "id=" + this.id)
        .then(result => {
          if (result.data.status == 0) {
            let data = result.data.data;
            this.name = data.name;
            let status = "";
            if (data.status == 1) {
              status = "拼团成功";
            } else if (data.status == 2) {
              status = "拼团超时";
            } else if (data.status == 3) {
              status = "等待拼团";
            } else {
              status = "揭幕中";
            }
            this.status = status;
            this.goalGoods = data.goalGoods;
            this.failGoods = data.failGoods;
            this.createtime = data.createtime;
            this.overtime = data.overTime;
            if (data.members.records.length) {
              data.members.records.forEach(item => {
                let type = "";
                if (item.type == 0) {
                  type = "机器人";
                } else {
                  type = "普通用户";
                }
                this.members.push({
                  username: item.name,
                  joinTime: item.participateTime,
                  type
                });
                this.total = this.members.length;
                this.page = Math.ceil(this.total / this.pageSize);
                this.member = this.members.slice(
                  (this.currentPage - 1) * this.pageSize,
                  this.currentPage * this.pageSize
                );
                this.$refs.pageAndTotal.innerHTML =
                  "[共" + this.page + "页/共" + this.total + "条数据]";
              });
            } else {
              this.total = 0;
              this.$refs.pageAndTotal.innerHTML =
                "[共" + 0 + "页/共" + 0 + "条数据]";
            }
            // this.members = [
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   },
            //   {
            //     username: "爱拼团的程序员",
            //     joinTime: "2018-02-05 08:02:04",
            //     type: "机器人"
            //   }
            // ];
            // this.total = this.members.length;
            // this.page = Math.ceil(this.total / this.pageSize);
            // this.member = this.members.slice(
            //   (this.currentPage - 1) * this.pageSize,
            //   this.currentPage * this.pageSize
            // );
            // this.$refs.pageAndTotal.innerHTML =
            //   "[共" + this.page + "页/共" + this.total + "条数据]";
            this.person = "(" + data.members.total + "/" + data.person + ")";
            if (this.currentPage == this.page) {
              this.$refs.last.disabled = true;
            }
          }
        });
    }
  }
};
</script>



<style lang="less">
@import "../../style/table";
.oneovertime-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  position: relative;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: auto;
    .el-main {
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            font-weight: 600;
            border-bottom: 1px solid #e4e5e7;
            background-color: #eff3f6;

            .el-collapse-item__arrow {
              margin: 0;
              margin-left: 10px;
            }
          }
          .el-collapse-item__wrap {
            margin-top: 20px;
            border: none;
            .el-collapse-item__content {
              padding: 0;
              padding-left: 15px;
              display: flex;
              background-color: #eff3f6;

              .el-form {
                display: flex;

                .el-form-item {
                  margin: 0;
                  width: 250px;
                  .el-form-item__label {
                    height: 30px;
                    line-height: 30px;
                    text-align: left;
                    color: #000;
                    font-weight: 600;
                    padding: 0;
                  }
                  .el-form-item__content {
                    line-height: 30px;
                  }
                }
              }
              .goods_select {
                display: flex;
                flex-wrap: wrap;
                .el-form-item {
                  width: 375px;
                  margin-right: 38px;
                  margin-bottom: 15px;
                  .el-form-item__content {
                    // display: flex;
                    // justify-content: space-between;
                    .goods {
                      width: 180px;
                      height: 80px;
                      padding: 5px;
                      box-sizing: border-box;
                      //   border: 1px solid #bbbfc2;
                      display: flex;
                      justify-content: space-around;
                      img {
                        width: 70px;
                        height: 70px;
                      }
                      .goods_msg {
                        width: 95px;
                        margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        p {
                          width: 100%;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .promotion_user {
          .el-collapse-item__content {
            flex-direction: column;
          }
          .el-header {
            height: 40px !important;
            color: #000;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
