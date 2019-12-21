<template>
<div class="main">
    <van-popup
  v-model="show"
  position="top"
  :style="{ height: '40%' }" class="pop" :overlay-style="{backgroundColor: 'transparent'}" 
>
    </van-popup>
</div>
</template>
<script>
export default {
    name:'search',
    data(){
        return{
            show:false
        }
    }
}
</script>
<style lang="less" scoped>
.main{
    margin-top: 40px;
}
</style>