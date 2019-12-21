<template>
  <div class="one_goods-container">
    <goodslist :positionsId="positionsId"></goodslist>
  </div>
</template>
<script>
import goodslist from "../../components/goodsList";
export default {
  components: { goodslist},
  data() {
    return {
      positionsId: 4
    };
  },
};
</script>

<style lang="less" >
.one_goods-container {
  height: 100%;
}
</style>
