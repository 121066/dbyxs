<template>
  <div>
    <h1>购物车我帮你清空了哦</h1>
    <!-- <ul v-for="self in silt" key="silt.id">
    <li></li>
    </ul>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      silt: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var self = this;
      $.ajax({
        url: "https://api.jisuapi.com/xiaohua/pic",
        type: "get",
        dataType: "jsonp",
        data: {
          pagenum: 1,
          pagesize: 11,
          sort: "addtime",
          appkey: "e6e222c0b651e2a2"
        }
      }).then(res => {
        console.log(res);
        self.silt = res;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
