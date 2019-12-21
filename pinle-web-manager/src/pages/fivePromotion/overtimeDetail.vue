<template>
  <div class="fiveovertime-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/fivePromotion_see')">
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="活动名称">
                <span>{{name}}</span>
              </el-form-item>
              <el-form-item label="活动状态">
                <span>拼团超时结束</span>
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
              <el-form-item label="第一轮失败商品">
                <div class="goods">
                  <img :src="oneTimesGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{oneTimesGoods.name}}</p>
                    <p>原价: {{oneTimesGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="第三轮失败商品">
                <div class="goods">
                  <img :src="threeTimesGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{threeTimesGoods.name}}</p>
                    <p>原价: {{threeTimesGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="朋友邀请失败商品">
                <div class="goods">
                  <img :src="friendGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{friendGoods.name}}</p>
                    <p>原价: {{friendGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="第二轮失败商品">
                <div class="goods">
                  <img :src="twoTimesGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{twoTimesGoods.name}}</p>
                    <p>原价: {{twoTimesGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团用户" name="3">
            <el-form label-width="120px" style="float: left;">
              <el-form-item label="拼团参与者" class="users">
                <div class="user" v-for="item in member" :key="item.id">
                  <img :src="item.picture" alt>
                  <div class="user_msg">
                    <p>{{item.name}}</p>
                    <p>{{item.participateTime}}</p>
                    <span>{{item.frequency}}</span>
                  </div>
                </div>
                <div
                  class="user"
                  style="line-height:50px;"
                  v-for="(item ,index) in noMember"
                  :key="index"
                >
                  <span style="margin-left: 47px;color:#000;font-weight: 600">{{item}}</span>
                </div>
                <!-- <div class="user" style="line-height:50px;">
                  <span style="margin-left: 47px;color:#000;font-weight: 600">无人拼图</span>
                </div>-->
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼团商品" name="4">
            <el-form label-width="80px" class="goods_select">
              <el-form-item label="胜者奖励" style="width: 300px;">
                <div class="goods">
                  <img :src="goalGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">{{goalGoods.name}}</p>
                    <p>原价: {{goalGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="败者奖励" style="width: 300px;">
                <div class="goods">
                  <img src="../../img/20190429153524.png" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">中国移动100元话费快充</p>
                    <p>原价： 100元</p>
                  </div>
                </div>
              </el-form-item>-->
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="好友助力" name="5">
            <div class="user">
              <img :src="goalUser.picture" alt>
              <div class="user_msg">
                <p>{{goalUser.name}}</p>
                <p>{{goalUser.participateTime}}</p>
                <span>（第一轮拼团）</span>
              </div>
            </div>
            <div class="assistance" v-if="totalImgs.length">
              <div class="title">
                助力人数
                <span>{{people}}人</span>
              </div>
              <div class="imgs">
                <img v-for="(item, index) in imgs" :key="index" :src="item" alt>
                <!-- <img src="../../img/123.png" alt>
                <img src="../../img/123.png" alt>
                <img src="../../img/123.png" alt>
                <img src="../../img/123.png" alt>
                <img src="../../img/123.png" alt>-->
                <span v-show="totalImgs.length > 5" @click="showIsHide">
                  {{text}}
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </div>
            </div>
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
      activeName: "1",
      id: this.$route.query.id,
      name: "",
      goalGoods: {},
      oneTimesGoods: {},
      twoTimesGoods: {},
      threeTimesGoods: {},
      friendGoods: {},
      member: [],
      noMember: [],
      goalUser: {},
      people: "",
      totalImgs: [],
      imgs: [],
      flag: false,
      text: "点击展开"
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    get_detail() {
      this.$axios
        .post("/web_five_promotion/get_team_detail", "id=" + this.id)
        .then(result => {
          if (result.data.status == 0) {
            let data = result.data.data;
            this.name = data.name;
            this.goalGoods = data.goalGoods;
            this.oneTimesGoods = data.oneTimesGoods;
            this.twoTimesGoods = data.twoTimesGoods;
            this.threeTimesGoods = data.threeTimesGoods;
            this.friendGoods = data.friendGoods;
            if (data.members) {
              data.members.forEach(item => {
                let frequency;
                if (item.times == 1) {
                  frequency = "(第一轮拼团)";
                } else if (item.times == 2) {
                  frequency = "(第二轮拼团)";
                } else if (item.times == 3) {
                  frequency = "(第三轮拼团)";
                }
                this.member.push({
                  name: item.name,
                  picture: item.picture,
                  participateTime: item.participateTime,
                  frequency,
                  id: item.id
                });
              });
            } else {
              this.member = [];
            }
            for (var i = 1; i <= 3 - this.member.length; i++) {
              this.noMember.push("无人拼团");
            }
            if (data.goalUser) {
              this.goalUser = data.goalUser;
              if (this.goalUser.times == 1) {
                this.goalUser.times = "(第一轮拼团)";
              } else if (this.goalUser.times == 2) {
                this.goalUser.times = "(第二轮拼团)";
              } else if (data.goalUser.times == 3) {
                this.goalUser.times = "(第三轮拼团)";
              }
            }
            if (!data.helpUser) {
              data.helpUser = [];
            }
            this.people = data.helpUser.length + "/" + data.helpNumber;
            this.totalImgs = data.helpUser;
            if (this.totalImgs.length >= 5) {
              this.imgs = this.totalImgs.filter((item, index) => {
                if (index < 5) {
                  return item;
                }
              });
            } else {
              this.imgs = this.totalImgs;
            }
          }
        });
    },
    showIsHide() {
      if (!this.flag) {
        this.imgs = this.totalImgs;
        this.flag = true;
        this.text = "点击隐藏";
      } else {
        this.imgs = this.totalImgs.filter((item, index) => {
          if (index < 5) {
            return item;
          }
        });
        this.flag = false;
        this.text = "点击展开";
      }
    }
  }
};
</script>



<style lang="less">
.fiveovertime-container {
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
      background-color: #fff;
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
                    display: flex;
                    justify-content: space-between;
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
                    span {
                      cursor: pointer;
                      height: 20px;
                      color: #0066ff;
                    }
                  }
                }
              }
              .users {
                width: 100% !important;

                .el-form-item__content {
                  display: flex;
                }
              }
              .user {
                width: 200px;
                height: 70px;
                margin-right: 60px;
                display: flex;
                margin-bottom: 20px;
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
                &:last-of-type {
                  margin-bottom: 0;
                }
              }
              .help_promotion {
                width: 200px;
                height: 33px;
                display: flex;
                padding-top: 10px;
                // box-sizing: border-box;
                i {
                  font-size: 33px;
                  color: #caced1;
                  cursor: pointer;
                }
                span {
                  display: block;
                  line-height: 33px;
                  margin-left: 10px;
                }
              }
              .el-radio {
                width: 240px;
                height: 50px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                .el-radio__input {
                  line-height: 50px;
                }
                .el-radio__label {
                  width: 200px;
                  height: 50px;
                }
                &:nth-last-type {
                  margin-bottom: 0;
                }
              }
              .assistance {
                margin-left: 20px;
                > .title {
                  font-weight: 600;
                  color: #000;
                  span {
                    padding-left: 20px;
                  }
                }
                .imgs {
                  margin-top: 30px;
                  display: flex;
                  img {
                    width: 37px;
                    height: 37px;
                    display: block;
                    margin-left: 10px;
                    &:first-of-type {
                      margin-left: 0;
                    }
                  }
                  span {
                    display: block;
                    height: 20px;
                    line-height: 20px;
                    cursor: pointer;
                    margin-top: 9px;
                    margin-left: 15px;
                    color: #0066ff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
