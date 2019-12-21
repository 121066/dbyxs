<template>
  <div class="free_rec_goods-container">
    <goodslist :positionsId="positionsId"></goodslist>
  </div>
</template>
<script>
import goodslist from "../../components/goodsList";
export default {
  components: { goodslist },
  data() {
    return {
      positionsId: 11
    }
  },

};
</script>
<style lang="less" >
.free_rec_goods-container {
  height: 100%;
}
</style>
