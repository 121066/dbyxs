<template>
  <div class="newsinfo-container">
    <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">{{ newsinfo.title }}</h3>
      <!-- 子标题 -->
      <p class="subtitle">
        <span>发表时间：{{ newsinfo.add_time }}</span>
        <span>点击：{{ newsinfo.click }}次</span>
      </p>
      <hr>
      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.content"></div>
    </div>
    <com :id="this.id"></com>
  </div>
</template>
<script>
import comment from "../listen/component.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsinfo();
  },
  methods: {
    getNewsinfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.data.status === 0) {
          //   console.log(result);
          this.newsinfo = result.data.message[0];
        } else {
          Toast("失败啦");
        }
      });
    }
  },
  components: {
    com: comment
  }
};
</script>
<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  margin-bottom: 50px;
  .title {
    font-size: 12px;
    text-align: center;
    color: red;
    margin: 15px 0;
    .subtitle {
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
    .content {
      img {
        width: 100%;
      }
    }
  }
}
</style>
