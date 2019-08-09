<template>
  <div>
    <h1>我是你的心</h1>
    <cc :id="this.$route.params.id"></cc>
  </div>
</template>
<script>
import cc from "../listent/component.vue";
export default {
  components: {
    cc
  }
};
</script>
<style lang="scss" scoped>
</style>
