<template >
  <div class="integra-container">
    <goodslist :positionsId="positionsId"></goodslist>
  </div>
</template>
<script>
import goodslist from "../../components/goodsList";
export default {
  components: { goodslist },
  data() {
    return {
      positionsId:5,
    }
  },


};
</script>

<style lang="less" >
.integra-container {
height: 100%;
}
</style>

