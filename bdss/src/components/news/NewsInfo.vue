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
    <compoot :id="this.id"></compoot>
  </div>
</template>

<script>
import coment from "../listent/component.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        console.log(result);
        if (result.data.status === 0) {
          this.newsinfo = result.data.message[0];
        } else {
          Toast("失败");
        }
      });
    }
  },
  components: {
    compoot: coment
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
