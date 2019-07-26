<template>
  <div>
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbo" :key="item.id">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe> -->
    <mt-swipe :auto="4000">
      <mt-swipe-item >
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3625344829,3079500447&fm=26&gp=0.jpg">
      </mt-swipe-item>
        <mt-swipe-item >
        <img src="http://i1.whymtj.com/uploads/tu/201907/9999/29f6a8d7c6.jpg">
      </mt-swipe-item>
        <mt-swipe-item >
        <img src="http://i1.whymtj.com/uploads/tu/201907/10242/z5c15sa.jpg">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
    <!-- <h1>我是{{$store.state.user}}</h1> -->
    <!-- <button @click="changeUser">点我修改</button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      lunbo: []
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          console.log(result);
          this.lunbo = result.data.message;
          console.log(this.lunbo);
        });
    },
    changeUser() {
      this.$store.commit("change", "王五");
    }
  }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: #00a4ff;
    }
    &:nth-child(2) {
      background-color: red;
    }
    &:nth-child(3) {
      background-color: pink;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;

  .mui-table-view-cell {
    width: 33.33%;
    border: none;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 12px;
  }
}
</style>
