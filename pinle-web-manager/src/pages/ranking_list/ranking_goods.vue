<template>
  <div class="ranking_goodslist-container">
    <goodslist :positionsId = 'positionsId'></goodslist>
  </div>
</template>

<script>

import goodslist from "../../components/goodsList"
export default {

  components: { goodslist },
  data() {
    return {
      positionsId: '13'
    }
  },

};
</script>


<style lang="less" >

.ranking_goodslist-container {
  height: 100%;
}
</style>
