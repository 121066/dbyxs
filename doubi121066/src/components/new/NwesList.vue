<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img
            class="mui-media-object mui-pull-left"
            src="https://gitee.com/uploads/71/556171_UniverseKing.jpg?1457705879"
          >
          <div class="mui-media-body">
            <h1>{{item.title}}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time}}</span>
              <span>点击:{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newlist: []
    };
  },
  created() {
    this.getnewlist();
  },
  methods: {
    getnewlist() {
      this.$http.get("/api/getnewslist").then(result => {
        if (result.data.status === 0) {
          this.newlist = result.data.message;
          console.log(this.newlist);
        } else {
          Toast("额获取失败了");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
  }
  .mui-ellipsis {
    font-size: 12px;
    color: #00a4ff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
