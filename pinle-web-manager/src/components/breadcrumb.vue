<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta.title" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>


<style lang="less">

.breadcrumb-container {
  height: 40px;
  background-color: #dfe2eb;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  // position:fixed;
.el-breadcrumb__inner.is-link{
    color: #5e70e6;
    font-size: 16px;
}
}
</style>
