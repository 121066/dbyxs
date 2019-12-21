<template>
<div class="main">
  <van-goods-action class="van">
  <van-goods-action-icon icon="chat-o" text="客服"  />
  <van-goods-action-icon icon="cart-o" text="购物车"  />
  <van-goods-action-button type="warning" text="加入购物车"  />
  <van-goods-action-button type="danger" text="立即购买"  />
</van-goods-action>
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
.main{
    width: 100%;
    height: 60px;
}
.van{
    width: 100%;
    height: 60px;
    z-index: 99;
    position: fixed;
   bottom: 0%;
   //top: 100%;
}
</style>