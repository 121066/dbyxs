<template>
  <div class="sev_goodsMana-container">
    <goodslist :positionsId = 'positionsId'></goodslist>
  </div>
</template>

<script>
import goodslist from "../../components/goodsList";

export default {
  components:{goodslist},
  data(){
      return {
        positionsId:14
      }
    }
  
};
</script>


<style lang="">
  .sev_goodsMana-container{
    height: 100%;
  }
</style>

