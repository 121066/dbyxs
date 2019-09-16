<template>
  <div class="one_del-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/onePromotion_team')" />
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="活动名称">
                <span>{{name}}</span>
              </el-form-item>
              <el-form-item label="活动状态">
                <span>{{'等待拼团'}}</span>
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
                  <img :src="goalGoods.picture" alt />
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
              <div>
                添加帮团用户
                <el-button icon="el-icon-plus" type="primary" @click="addUser">添加</el-button>
              </div>
            </el-header>
            <el-main style="padding:0;">
              <div class="table" style="height: 420px;">
                <el-table :data="member" style="width: 100%" height="290">
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="joinTime" label="加入时间"></el-table-column>
                  <el-table-column prop="type" label="用户类型"></el-table-column>
                  <el-table-column width="55">
                    <template slot-scope="scope">
                      <el-checkbox
                        v-model="scope.row.checked"
                        @change="selectWinner(scope.row.id,scope.row.checked)"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                  :currentPage="currentPage"
                  :page="page"
                  :total="total"
                  :pageSize="pageSize"
                  :flag="2"
                  @change-current="currentChange"
                  @change-size="sizeChange"
                ></pagination>
              </div>
            </el-main>
            <div class="btn">
              <el-button type="primary" @click="set_winner">确定</el-button>
              <el-button @click="$router.push('/onePromotion_team')">取消</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from "../../components/page";
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      activeName: ["1", "2", "3"],
      pageSize: 5,
      currentPage: 1,
      page: 1,
      total: 10,
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
      winnerId: "", //   中奖用户id
      addMember: [], //  添加的用户
      joinRobot: [] //  添加的机器人
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.member = this.members.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    currentChange(val) {
      this.currentPage = val;
      this.member = this.members.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
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
                  this.joinRobot.push(item.id);
                } else {
                  type = "普通用户";
                }
                var checked = false;
                if (data.winner != null) {
                  if (item.id == data.winner.id) {
                    checked = true;
                  }
                }

                this.members.push({
                  id: item.id,
                  username: item.name,
                  joinTime: item.participateTime,
                  checked: checked,
                  type
                });
              });

              if (localStorage.getItem("ids")) {
                this.addMember = JSON.parse(localStorage.getItem("ids"));

                localStorage.removeItem("ids");
                this.addMember.forEach(item => {
                  this.members.push({
                    id: item.id,
                    username: item.name,
                    joinTime: "-------",
                    checked: false,
                    type: item.type
                  });
                });
              }
              this.member = this.members.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
              );
            }
            this.total = this.members.length;
            this.page = Math.ceil(this.total / this.pageSize);

            this.personNum = data.person;
            this.person = "(" + this.members.length + "/" + data.person + ")";
          }
        });
    },
    selectWinner(id, status) {
      if (status == true) {
        this.winnerId = id;
        this.members.forEach(item => {
          item.checked = false;

          if (item.id == id) {
            item.checked = true;
          }
        });
      }
    },
    addUser() {
      localStorage.setItem("join_ids", JSON.stringify(this.addMember));
      localStorage.setItem("join_robot", JSON.stringify(this.joinRobot));
      var maxJoinNum = this.personNum - this.members.length;
      this.$router.push(
        "/onePromotion_help?teamId=" + this.id + "&maxJoinNum=" + maxJoinNum
      );
    },
    set_winner() {
      if (!this.addMember.length && !this.winnerId) {
        return this.$message({
          type: "warning",
          message: "请添加用户或设置一个中奖用户"
        });
      }
      var data = { teamId: this.id };
      if (this.winnerId) {
        data["winner"] = this.winnerId;
      }
      var ids = [];
      this.addMember.forEach(item => {
        ids.push(item.id);
      });
      if (ids.length) {
        data["ids"] = ids;
      }
      this.$axios.post("/web_one_promotion/set_one_help", data).then(res => {
        if (res.data.status == 0) {
          if (res.data.data == 1) {
            this.$router.push("onePromotion_team");
            return this.$message({
              type: "success",
              message: "添加成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "添加失败"
            });
          }
        }
      });
    }
  }
};
</script>



<style lang="less">
@import "../../style/table";
.one_del-container {
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
            .el-button {
              height: 30px !important;
              padding: 0;
              width: 80px;
              margin-left: 20px;
            }
            div:last-of-type {
              margin-left: 80px;
            }
          }
        }
      }
    }
  }
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
</style>
