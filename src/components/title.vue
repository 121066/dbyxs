<template>
<div class="box">
    <div></div>
    <div></div>
</div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.box{
    width: 100%;
   // background: linear-gradient(to right,#fca,#880000) ;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    >div{
        height: 150px;
       // flex-flow: 1 1;
      // margin: 5px; 
     // padding: 10px;
        border: 1px dashed #00ff00;
    }
}
</style>