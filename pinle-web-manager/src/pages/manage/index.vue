
<template>
  <div class="manage-container fillcontain">
    <header class="header_container">
      <h3 class="title">拼了APP后台管理系统</h3>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../../assets/logo.png">欢迎你，admin
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <el-row>
      <el-col :span="3">
        <div class="user_message"></div>
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%;"
          background-color="#262d40"
          text-color="#fff"
          router
        >
          <el-menu-item index="manage">首页</el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <span>基本设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="memberSetUp">会员设置</el-menu-item>
              <el-menu-item index="homeSetUp">首页设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">商品管理</template>
            <el-menu-item-group>
              <el-menu-item index="goodsManageType">商品类型管理</el-menu-item>
              <el-menu-item index="labelManage">标签管理</el-menu-item>
              <el-menu-item index="goodsManage">商品管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">人员管理</template>
            <el-menu-item-group>
              <el-menu-item index="usersManage">用户管理</el-menu-item>
              <el-menu-item index="administratorsManage">管理员管理</el-menu-item>
              <el-menu-item index="promotersManage">推广员管理</el-menu-item>
              <el-menu-item index="teamManage">团队管理</el-menu-item>
              <el-menu-item index="performance">团队业绩</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="orderManage">订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">活动管理</template>
            <el-menu-item-group>
              <el-submenu index="6-1">
                <template slot="title">商城</template>
                <el-menu-item index="mall_goods">商品管理</el-menu-item>
                <el-menu-item index="mall_single">拼单购买</el-menu-item>
                <el-menu-item index="mall_bargain">发起砍价</el-menu-item>
              </el-submenu>
              <el-submenu index="6-2">
                <template slot="title">新人特惠</template>
                <el-menu-item index="nComer_favor_goodsManage">商品管理</el-menu-item>
                <el-menu-item index="nComer_favor_set">活动设置</el-menu-item>
                <el-menu-item index="nComer_favor_see">拼单查看</el-menu-item>
              </el-submenu>
              <el-submenu index="6-3">
                <template slot="title">新人免费拿</template>
                <el-menu-item index="nComer_free_goods">商品列表</el-menu-item>
                <el-menu-item index="nComer_free_set">活动设置列表</el-menu-item>
              </el-submenu>
              <el-submenu index="6-4">
                <template slot="title">七折拼团</template>
                <el-menu-item index="sevenPromotion_goodsManage">活动商品列表</el-menu-item>

                <el-menu-item index="sevenPromotion_activitySettings">活动设置</el-menu-item>
                <el-menu-item index="sevenPromotion_see">拼团查看</el-menu-item>
              </el-submenu>
              <el-submenu index="6-5">
                <template slot="title">五折拼团</template>
                <el-menu-item index="fivePromotion_goodsManage">活动商品列表</el-menu-item>
                <el-menu-item index="fivePromotion_activitySettings">活动设置</el-menu-item>
                <el-menu-item index="fivePromotion_see">拼团查看</el-menu-item>
              </el-submenu>
              <el-submenu index="6-6">
                <template slot="title">9.9拼团</template>
                <el-menu-item index="onePromotion_goodsManage">商品管理</el-menu-item>
                <el-menu-item index="onePromotion_activitySettings">活动设置</el-menu-item>
                <el-menu-item index="onePromotion_team">拼团团队</el-menu-item>
              </el-submenu>
              <el-submenu index="6-7">
                <template slot="title">积分商城</template>
                <el-menu-item index="integralMall_goodsList">商品列表</el-menu-item>
              </el-submenu>
              <el-menu-item index="interactive">互动晒单</el-menu-item>
              <el-submenu index="6-8">
                <template slot="title">秒杀</template>
                <el-menu-item index="seckill_goodsList">商品列表</el-menu-item>
                <el-menu-item index="seckill_activityList">活动列表</el-menu-item>
              </el-submenu>
              <el-submenu index="6-9">
                <template slot="title">积分抽奖</template>
                <el-menu-item index="points_goodsList">商品列表</el-menu-item>
                <el-menu-item index="points_activitys">活动列表</el-menu-item>
              </el-submenu>
              <el-submenu index="6-10">
                <template slot="title">排行榜</template>
                <el-menu-item index="ranking_goods">商品列表</el-menu-item>
                <el-menu-item index="ranking_list">排行榜设置列表</el-menu-item>
                <el-menu-item index="ranking_records">往期排行榜记录</el-menu-item>
              </el-submenu>
              <el-submenu index="6-11">
                <template slot="title">免费抽奖</template>
                <el-menu-item index="free_lottery_set">免费抽奖设置</el-menu-item>
                <el-menu-item index="free_lottery">排行榜设置列表</el-menu-item>
              </el-submenu>
              <el-submenu index="6-12">
                <template slot="title">十单免一</template>
                <el-menu-item index="tenFreeO">商品列表</el-menu-item>
                <el-menu-item index="tActivity_list">活动设置列表</el-menu-item>
                <el-menu-item index="tTeams_list">拼团团队列表</el-menu-item>
              </el-submenu>
              <el-menu-item index="blastGoods">爆单商品列表</el-menu-item>
              <el-menu-item index="o_member_send">会员开通赠送</el-menu-item>


              <!-- <el-menu-item index="ranking_records">往期排行榜记录</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">卡券管理</template>
            <el-menu-item-group>
              <el-submenu index="7-1">
                <template slot="title">优惠券</template>
                <el-menu-item index="couponType">优惠券类型列表</el-menu-item>
                <el-menu-item index="couponList">优惠券列表</el-menu-item>
              </el-submenu>
              <el-submenu index="7-2">
                <template slot="title">红包</template>
                <el-menu-item index="redPacketsType">红包类型列表</el-menu-item>
                <el-menu-item index="redPacketsList">红包列表</el-menu-item>
              </el-submenu>
              <el-menu-item index="shop">购物券</el-menu-item>
              <el-menu-item index="shop">免邮券</el-menu-item>
              <el-menu-item index="shop">免单券</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">财务管理</template>
            <el-menu-item-group>
              <el-submenu index="8-1">
                <template slot="title">佣金管理</template>
                <el-menu-item index="commission_set">佣金设置</el-menu-item>
                <el-menu-item index="commission_check">佣金审核</el-menu-item>
                <el-menu-item index="commission_list">佣金列表</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">领券中心</template>
            <el-menu-item-group>
              <el-submenu index="9-1">
                <template slot="title">领券中心</template>
                <el-menu-item index="card_list">卡券列表</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21" style="height: 100%;overflow: auto;">
        <!-- <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <keep-alive>-->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
          </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如详情B页面-->
        </router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    },
    usersInfo() {
      return this.$store.state.usersInfo;
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      if (command == "home") {
        this.$router.push("/manage");
      } else if (command == "signout") {
        localStorage.removeItem("token");
        this.$router.push("/login");
        return this.$message({
          type: "success",
          message: "退出登陆！"
        });
      }
    }
  }
};
</script>

<style lang="less" >
.manage-container {
  @import "../../style/scroll.less";
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-submenu .el-menu-item {
    min-width: 0;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .header_container {
    height: 70px;
    width: 100%;
    background-color: #6979e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    .title {
      font-size: 18px;
      color: #fff;
      padding-left: 15px;
    }
    .el-dropdown {
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      padding-right: 30px;

      span {
        display: block;
        color: #fff;
        line-height: 44px;
        margin: 0 5px;
        img {
          width: 40px;
          height: 40px;
          vertical-align: top;
          border-radius: 50%;
        }
      }
    }
  }
  .el-row {
    height: 100%;
    padding-top: 70px;
    box-sizing: border-box;
    .el-col {
      height: 100%;
    }
    .el-col.el-col-3 {
      overflow: auto;
      // width: 235px!important;
    }
    .el-col.el-col-21 > div {
      min-width: 1645px !important;
    }
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  // ::-webkit-scrollbar
  // {
  //     width: 0px;
  //     height: 0px;
  //     background-color: #F5F5F5;
  // }
  // ::-webkit-scrollbar {
  // /*隐藏滚轮*/
  // display: none;
  // }
}
</style>

