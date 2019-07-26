<template>
  <div>
    <h1>点击就送</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getShu();
  },
  methods: {
    getShu() {
      this.$http.get("http://127.0.0.1:3000/api/getlist").then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
