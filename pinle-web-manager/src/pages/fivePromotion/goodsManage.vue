<template>
  <div class="five_goods-container">
    <goodslist :positionsId="positionsId"></goodslist>
  </div>
</template>
<script>
import goodslist from "../../components/goodsList";
export default {
  components: { goodslist },
  data() {
    return {
      positionsId: 3
    }
  },

};
</script>
<style lang="less" >
.five_goods-container {
  height: 100%;
}
</style>
