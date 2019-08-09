<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunboList" :key="item.id">
        <img :src="item.img" alt :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["lunboList", "isfull"]
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    img {
      //   width: 100%;
      height: 100%;
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
