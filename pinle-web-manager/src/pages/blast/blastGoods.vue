<template>
  <div class="sev_blast_goods-container">
    <goodslist :positionsId = 'positionsId'></goodslist>
  </div>
</template>

<script>
import goodslist from "../../components/goodsList";

export default {
  components:{goodslist},
  data(){
      return {
        positionsId:9
      }
    }
  
};
</script>


<style lang="">
  .sev_blast_goods-container{
    height: 100%;
  }
</style>

