<template>
<div class="box">
    <!-- <span class="spn">商品信息</span> -->
    <swiper :lunboList="lunboList" :isfull='true'></swiper>
    <!-- <h1>{{id}}</h1> -->
    <div class="bgc"></div>
    <div class="nav">
        <span class="span1">天猫</span>
        <p class="p1">{{goodsname}}</p>
        <p class="p2">
            <span>￥{{price}}元</span>
            <span>原价￥{{price+20}}</span>
            <span>已有{{num}}人购买</span>
            <span>库存{{num+102}}件</span>
            <span>自营</span>
            <span>包邮</span>
            <span>淘金币抵2% 店铺券满69减3</span>
           <span @click="showPopup"> <van-icon name="setting-o" />
           顺丰~快递:0.00·假一赔四·上门取退·极速退款·...
           <van-icon name="arrow" />
           </span>
        </p>
    </div>
    <div class="details">
        <p>商品详情</p>
    </div>
    <div class="detail" v-for="item in banelurl" :key="item">
        <img :src="item" alt="">
    </div>
  <div class="main">
  <van-goods-action class="van">
  <van-goods-action-icon icon="chat-o" text="客服"  />
  <van-goods-action-icon icon="cart-o" text="购物车" :info="$store.getters.getGoodsCountAndAmount.count" @click="$router.push('/home/shoping')"/>
  <van-goods-action-button type="warning" text="加入购物车" @click="getshop()" />
  <van-goods-action-button type="danger" text="立即购买"  />
</van-goods-action>
</div>
<!-- <van-sku
  v-model="show"
  :sku="sku"
  :goods="goods"
  :goods-id="goodsId"
  :quota="quota"
  :quota-used="quotaUsed"
  
  :message-config="messageConfig"
  @buy-clicked="onBuyClicked"
  @add-cart="onAddCartClicked"
/> -->
<!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->

<van-popup v-model="show">
    <div class="prop">
        <h3>信誉基础</h3>
        <ul>
            <li> <span class="icons"><van-icon name="star-o"  /></span> <h3>假一赔四</h3> <p>正品保障,假一赔四</p>  </li>
            <li> <van-icon name="star-o" class="icons"/><h3>上门取货</h3> <p>预约上门取件,最快1小时上门,取件后极速退款到账</p> </li>
            <li> <van-icon name="star-o" class="icons"/><h3>极速退款</h3>  <p>诚信用户在退货寄出后,享受极速退款到账</p></li>
            <li> <van-icon name="star-o" class="icons"/><h3>七天无理由退换</h3>  <p>有退货满足相应条件时,消费者可申请"七天wuli"</p></li>
        </ul>
    </div>
</van-popup>
</div>
</template>
<script>
import swiper from '@/components/swiper.vue'
import cart from '@/components/cart.vue'
export default {
    data(){
        return{
            id:this.$route.query.id,
            lunboList: [],
            List:[],
            goodsname:'',
            price:'',
            num:'',
            listgoods:[],
            show:false,
            sku:{},//
            goods:{},
            messageConfig:{},
            goodsId:'',
            quota:0,
            quotaUsed:0,
            prurl:['https://img.alicdn.com/imgextra/https://img.alicdn.com/bao/uploaded/i3/1644123097/O1CN01eMYZNC1YkT9V5BmIP_!!1644123097.jpg_430x430q90.jpg',
            'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/1644123097/O1CN01bEs72Q1YkT9VOp487_!!1644123097.jpg_430x430q90.jpg'],
            banelurl:[],
            ballFlag:false,//控制商品的选中
            selectedCount:1,//默认添加到购物车的数量
        }
    },
    created(){
        this.list()
    },
    methods:{
        list(){
            this.$axios.post('/goods/detail','id='+this.id).then(res=>{
               console.log(res.data.message[0].url) 
               this.lunboList=res.data.message[0].url.split(",")
              this.goodsname=res.data.message[0].goodsname
              this.price=res.data.message[0].price
              this.num=res.data.message[0].maxpeople
              this.banelurl=res.data.message[0].banelurl.split(",")
              
            })
        },
        onBuyClicked(){

        },
        onAddCartClicked(){

        },
        showlist(){
            console.log(22)
           // this.show=true
        },
        showPopup(){
            this.show=true
        },
        getshop(){
            // console.log(this.id)
            // this.$router.push('/home/shoping?id='+this.id)
           // this.ballFlag=!this.ballFlag
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.price,
                selected:true
            }
            console.log(this.price,'价格呀')
            this.$store.commit('addToCar',goodsinfo)
        }
    },
    components:{
        swiper,
       // cart
    }
}
</script>
<style lang="less" scoped>
html,body{
    height: 100%;
}
.box{
    //position: relative;
}
.spn{
    width: 100%;
    height: 40px;
    display: inline-block;
   // margin-top: -70px;
    background-color: #ff3333;
    // position: absolute;
    // top: 20%;
    // left: 0;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
    margin: 2px 0;
}
.bgc{
    margin: 4px 0;
    border: 3px solid #fff;
}
.nav{
    width: 100%;
    position: relative;
    height: 200px;
}
.p1{
    position: absolute;
    left: 16%;
    width: 80%;
    font-size: 14px;
    color: #000;
    font-weight: 500;
    height: 40px;
    border-bottom: 3px solid #fff;
}
.span1{
    width: 40px;
    height: 20px;
    line-height: 20px;
    border:1px solid #ff3333;
    position: absolute;
    top: 0%;
    left: 5%;
    font-size: 10px;
    color: #ff3333;
}
.p2 span:nth-child(1){
    position: absolute;
    top: 20%;
    left: 5%;
    font-size: 16px;
    color: #ff3333;
}
.p2 span:nth-child(2){
    position: absolute;
    text-decoration:line-through;
    top: 22%;
    left: 23%;
    font-size: 10px;
}
.p2 span:nth-child(3){
    position: absolute;
    top: 20%;
    right: 5%;
}
.p2 span:nth-child(4){
    position: absolute;
    top: 30%;
    left: 5%;
    color: #aaaaaa;
}
.p2 span:nth-child(5){
    position: absolute;
    top: 40%;
    left: 5%;
    width: 40px;
    height: 20px;
    border: #ff8888 solid 1px;
    color: #ff8888;
    text-align: center;
}
.p2 span:nth-child(6){
    position: absolute;
    top: 40%;
    left: 20%;
    width: 40px;
    height: 20px;
    border: #ff8888 solid 1px;
    border-radius: 3px ;
    color: #ff8888;
    text-align: center;
}
.p2 span:nth-child(7){
    position: absolute;
    width: 90%;
    height: 40px;
    background-color: #ffcccc;
    color: #ffa488;
    top: 53%;
    left: 5%;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
}
.p2 span:nth-child(8){
    position: absolute;
    bottom: 10%;
   // top: 0%;
   height: 30px;
    width: 90%;
    left: 5%;
    line-height: 30px;
}
.van-icon .van-icon-setting-o{
    line-height: 30px;
     vertical-align: middle;
}
.van{
    z-index: 99;
    position: fixed;
    bottom: 0%;
//margin- : 0;
}
.prop{
    height: 350px;
    width: 300px;
}
.prop ul{
    list-style: none;
}
.prop  h3:nth-child(1){
    text-align: center;
}
.prop h3,p{
    text-align: left;
    margin-left: 20px;
}
 .icons {
    width: 20px;
    height: 20px;
    //border: 1px solid #ff3333;
   // display: inline-block;
    text-align: left;
   position: absolute;
   left: 0;
   caret-color: #ff3333;
   color: #ff8888;
}
.detail{
    width: 100%;
}
.detail>img{
    width: 100%;
}
.details>p{
    text-align: center;
}
</style>