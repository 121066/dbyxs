<template>
  <div class="opening-container">
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
                <span>{{'拼团开幕中'}}</span>
              </el-form-item>
              <el-form-item label="开始时间" style="margin-left: -20px;margin-right: 70px;">
                <span>{{createtime}}</span>
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
              <div>
                拼团参与人数
                <span>{{person}}</span>
              </div>
            </el-header>
            <el-main style="padding:0;">
              <div class="table" style="height: 450px;">
                <el-table :data="member" style="width: 100%" height="290">
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="joinTime" label="加入时间"></el-table-column>
                  <el-table-column prop="type" label="用户类型"></el-table-column>
                  <el-table-column label="设定中奖用户">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.value"
                        @change="change_status(scope.row.id,scope.row.value)"
                        :disabled="scope.row.flag"
                      ></el-switch>
                    </template>
                  </el-table-column>
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
                    :page-size="5"
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
                    :page-size="5"
                    layout="slot,jumper"
                    :total="total"
                    style="display: inline-block"
                  >
                    <span style="color: #666;" ref="pageAndTotal"></span>
                  </el-pagination>
                </div>
                <div class="btn">
                  <el-button type="primary" @click="set_winner">确定</el-button>
                  <el-button @click="$router.push('/onePromotion_team')">取消</el-button>
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
      person: "", // 用来记录拼团人数,
      personNum: "",
      members: [],
      member: [],
      rewardUser: ""
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.page);

      // console.log(`当前页: ${val}`);
      if (this.currentPage == 1) {
        this.$refs.first.disabled = "true";
      } else {
        this.$refs.first.disabled = "";
      }
      if (this.currentPage == this.page) {
        console.log(123);
        this.$refs.last.disabled = "true";
      } else {
        this.$refs.last.disabled = "";
      }
    },
    get_detail() {
      this.$axios
        .post("/web_one_promotion/get_team_detail", "id=" + this.id)
        .then(result => {
          console.log(result);
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
            console.log(data.members.records.length);
            if (data.members.records.length) {
              console.log("------------------");
              data.members.records.forEach(item => {
                let type = "";
                if (item.type == 0) {
                  type = "机器人";
                } else {
                  type = "普通用户";
                }
                this.members.push({
                  id: item.id,
                  username: item.name,
                  joinTime: item.participateTime,
                  type,
                  value: false,
                  flag: false
                });
                this.members = [
                  {
                    id: 1,
                    username: "爱拼团的程序员",
                    joinTime: "2018-02-13",
                    type: "机器人",
                    value: false,
                    flag: false
                  },
                  {
                    id: 2,
                    username: "爱拼团的程序员",
                    joinTime: "2018-02-13",
                    type: "机器人",
                    value: false,
                    flag: false
                  },
                  {
                    id: 3,
                    username: "爱拼团的程序员",
                    joinTime: "2018-02-13",
                    type: "机器人",
                    value: false,
                    flag: false
                  },
                  {
                    id: 4,
                    username: "爱拼团的程序员",
                    joinTime: "2018-02-13",
                    type: "机器人",
                    value: false,
                    flag: false
                  }
                ];
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
            this.person = "(" + data.members.total + "/" + data.person + ")";
            if (this.currentPage == this.page) {
              this.$refs.last.disabled = true;
            }
          }
        });
    },
    set_winner() {
      this.$axios.post("/web_one_promotion/set_winner","teamId=" + this.id + '&userid=' + this.rewardUser).then(result => {
        if(result.data.status == 0){
          if(result.data.data == 1){
            this.$router.push('/onePromotion_team')
            return this.$message({
              type:'success',
              message:'操作失败'
            })
          }else {
            return this.$message({
              type:'warning',
              message:'操作失败'
            })
          }
        }
      });
    },
    change_status(id, status) {
      if (!status) {
        console.log("------------------------------");
        this.rewardUser = "";
        this.members.forEach(item => {
          item.flag = false;
        });
      } else {
        if (!this.rewardUser) {
          console.log(123);
          this.rewardUser = id;
          console.log(this.rewardUser);
          this.members.forEach(item => {
            item.flag = true;
            if (item.id == id) {
              item.flag = false;
            }
          });
        }
      }
    }
  }
};
</script>



<style lang="less">
@import "../../style/table";
.opening-container {
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
          .el-header {
            display: flex;
            height: 100px !important;
            .user {
              width: 200px;
              height: 70px;
              display: flex;
              img {
                width: 42px;
                height: 42px;
                margin-top: 4px;
                display: block;
              }
              .user_msg {
                margin-left: 5px;
                p {
                  height: 25px;
                  line-height: 25px;
                  &:first-of-type {
                    color: #000;
                    font-weight: 600;
                  }
                }
                span {
                  color: #000;
                  font-weight: 600;
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
            line-height: 30px;
            color: #000;
            font-weight: 600;
          }
        }
      }
    }
    .btn {
      margin-top: 30px;
      text-align: center;
      .el-button {
        width: 60px;
        height: 30px !important;
        padding: 0;
        margin: 0 80px;
        &:last-of-type {
          color: #409eff;
        }
      }
    }
  }
}
</style>
