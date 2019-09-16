<template>
  <div class="nComer_favor_goods-container">
    <goodslist :positionsId = 'positionsId'></goodslist>
  </div>
</template>

<script>
import goodslist from "../../components/goodsList";

export default {
  components:{goodslist},
  data(){
      return {
        positionsId:10
      }
    }
  
};
</script>


<style lang="">
  .nComer_favor_goods-container{
    height: 100%;
  }
</style>

