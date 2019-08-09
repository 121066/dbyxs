<template>
  <div class="goodsdesc-container">
    <h3>{{inf.title}}</h3>
    <hr>
    <div class="content" v-html="inf.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inf: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get("api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          if (result.data.status === 0) {
            this.inf = result.data.message[0];
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsdesc-container {
  
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  /deep/.content {
    overflow:hidden;
    
    img {
      width: 100%;
       display:inline;
   
    }
  }
}
</style>
