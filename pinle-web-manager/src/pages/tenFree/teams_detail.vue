<template>
  <div class="t_teams_detail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="活动名称" name="1">
            <el-form label-width="80px" style="display:flex;">
              <el-form-item label="活动名称">
                <!-- <el-input v-model="formData.actname" placeholder="请输入活动名称"></el-input> -->
                <span>{{actname}}</span>
              </el-form-item>
              <el-form-item label="拼团状态" style="margin-left: 50px;">
                <!-- <el-input v-model="formData.actname" placeholder="请输入活动名称"></el-input> -->
                <span>{{statusList[status].label}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品定制" name="2">
            <el-form class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods">
                  <img :src="goods.picture" alt />
                  <div class="goods_msg" v-if="goods.picture">
                    <p class="ellipsis">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="goods.name"
                        placement="bottom"
                      >
                        <span >{{goods.name}}</span>
                      </el-tooltip>
                    </p>
                    <p class="ellipsis">价格: {{goods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="佣金返现详情" name="3">
            <div class="head" style="display: flex;" >
              <div class="user_info">
                <img :src="leaderPic" alt />
                <p class="ellipsis">{{leaderUserName}}</p>
                <p>{{'团长佣金'}}</p>
              </div>
              <div class="money">{{ leaderMoney + '元'}}</div>
            </div>
            <div class="head" style="display: flex;" v-if="status == 1">
              <div class="user_info">
                <img :src="luckyPic" alt />
                <p class="ellipsis">{{luckyUserName}}</p>
                <p>{{'随机团员佣金'}}</p>
              </div>
              <div class="money">{{luckyMoney + '元'}}</div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="拼团参与者" name="4">
            <p>拼团参与者</p>
            <div class="partner">
              <div class="user_info" v-for="(item, index) in activityItemVos" :key="index">
                <img src="item.userPictureUrl" alt />
                <p class="ellipsis">{{item.userName}}</p>
                <p>{{item.createTime}}</p>
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
import { tTeams_detail } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      actname: "10人抢·100元话费",
      goods: {
        picture: "", //  商品的图片
        name: "", //  商品的名称
        price: "" //  商品的价格
      },
      statusList: [
        { key: "", label: "全部" },
        { key: "1", label: "拼团成功" },
        { key: "2", label: "拼团超时" },
        { key: "3", label: "等待拼团" }
      ],
      leaderUserName: "", //  开团人姓名
      leaderMoney: "", //  开团人获取佣金
      leaderPic: "", //  开团人图片
      luckyMoney: "", //  随机团员获取佣金
      luckyUserName: "", //  随机团员姓名
      luckyPic: "", //   随机团员图片
      status: this.$route.query.status,
      id: this.$route.query.id,
      activityItemVos: []
    };
  },
  created() {
    this.get_tTeams_detail();
  },
  methods: {
    get_tTeams_detail() {
      tTeams_detail("id=" + this.id).then(res => {
        if (res.data.status == 0) {
          var data = res.data.data;
          this.actname = data.activityName;
          this.goods.picture = data.goodsPictureUrl;
          this.goods.name = data.goodsName;
          this.leaderUserName = data.leaderUserName;
          this.goods.price = data.goodsPrice;
          if(data.leaderMoney == null){
            data.leaderMoney = 0
          }
          this.leaderMoney = data.leaderMoney;
          if(data.luckyMoney == null){
            data.luckyMoney = 0
          }
          this.luckyMoney = data.luckyMoney;
          this.luckyUserName = data.luckyUserName;
          this.activityItemVos = data.activityItemVos; //  拼团参与者
          this.activityItemVosf.forEach(item => {
            if (item.id == data.leaderUserId) {
              this.leaderPic = item.userPictureUrl;
            }
            if (item.id == data.luckyUserId) {
              this.luckyPic = item.userPictureUrl;
            }
          });
        }
      });
    }
  }
};
</script>

$('.choose').on('click',function(){
  
})

<style lang="less">
.t_teams_detail-container {
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
  .el-tag__close.el-icon-close:hover {
    background-color: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: hidden;
    .el-main {
      background-color: #fff;
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
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
            }
          }
          &:nth-of-type(3) {
            .el-collapse-item__content {
              display: flex;
              .head {
                margin-right: 100px;
              }
              .user_info {
                width: 100px;
                text-align: center;
                img {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  vertical-align: middle;
                }
                p {
                  line-height: 25px;
                  &:nth-of-type(2) {
                    color: #666;
                  }
                }
              }
              .money {
                margin-left: 20px;
                line-height: 90px;
                color: #0000ff;
              }
            }
          }
          &:nth-of-type(4) {
            .partner {
              margin-top: 15px;
              display: flex;
           
            }
            .user_info {
              width: 140px;
                 margin-right: 20px;
              text-align: center;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: middle;
              }
              p {
                line-height: 25px;
                &:nth-of-type(2) {
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
    //   所有的input框样式
    .el-input {
      width: 200px;
      height: 30px;
      .el-input__inner {
        height: 30px;
      }
    }

    //   商品展示
    .goods_select {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 360px;
        margin-right: 38px;
        margin-bottom: 15px;
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .goods {
            width: 180px;
            height: 70px;
            padding: 5px;
            box-sizing: border-box;
            border: 1px solid #bbbfc2;
            display: flex;

            img {
              width: 60px;
              height: 60px;
              margin-right: 10px;
            }
            .goods_msg {
              flex: 1;
              width: 95px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              p {
                width: 100%;
              }
            }
          }
          > span {
            cursor: pointer;
            height: 20px;
            color: #0066ff;
          }
        }
      }
    }
    //  活动规则
    .rule {
      display: flex;
      line-height: 40px;

      > div {
        margin-right: 40px;
      }
      .el-input {
        width: 80px;
      }
    }
  }
}
</style>
