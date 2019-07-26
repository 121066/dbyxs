<template>
    <div>
        <h1>你是来搞笑的把</h1>
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
        console.log(res,11);
        self.silt = res;
      });
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

