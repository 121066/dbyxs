<template>
  <div class="pointes_lottery-container">
    <goodslist :positionsId = "positionsId"></goodslist>
  </div>
</template>

<script>
import goodslist from '../../components/goodsList'
export default {
  components:{goodslist},
  data(){
    return {
      positionsId: 7
    }
  }
}
</script>
<style lang="less">
  .pointes_lottery-container{
    height: 100%;
  }
</style>