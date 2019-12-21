<template>
  <div class="seckill_goodslist-container">
    <goodslist :positionsId = 'positionsId'></goodslist>
  </div>
</template>

<script>

import goodslist from "../../components/goodsList"
export default {

  components: { goodslist },
  data() {
    return {
      positionsId: 12
    }
  },

};
</script>


<style lang="less" >

.seckill_goodslist-container {
  height: 100%;
}
</style>
