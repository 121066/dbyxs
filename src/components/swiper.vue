<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in lunboList" :key="index">
        <img :src="item" alt :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["lunboList", "isfull"]
};
</script>
<style lang="less" scoped>
.mint-swipe {
  //margin-top:40px;
  height: 250px;
  .mint-swipe-item {
    img {
      //   width: 100%;
      height: 100%;
      padding: 0 10px;
    }
    // &:nth-child(1) {
    //   background-color: #00a4ff;
    // }
    // &:nth-child(2) {
    //   background-color: pink;
    // }
    // &:nth-child(3) {
    //   background-color: red;
    // }
  }
  .full {
    width: 100%;
  }
} 
</style>
