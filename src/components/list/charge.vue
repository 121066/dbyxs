<template>
<div>
    <div class="box">
        <span>充值中心</span>
        <span @click="get()">充值记录</span>
        <p> <button > 我的</button> </p>
        <input type="text" placeholder="请输入手机号码" id="inputs" v-model="prices">
        <div class="main">
           <!-- <div class="nav"> -->
            <span> <div><img src="../../assets/icons/余额.png" alt=""/></div> 余额查询</span>
            <span><div><img src="../../assets/icons/充值流量.png" alt=""></div> 充流量</span>
            <span> <div><img src="../../assets/icons/加油卡.png" alt=""></div> 加油卡</span>
           <!-- </div> -->
          <div class="nav">
            <!-- <ul>
               <li>
                   <h3>10元</h3>
                   <div class="stn">售价 9.98元</div>
               </li>
               <li>
                    <h3>20元</h3>
                   <div class="stn">售价 20.00元</div>
               </li>
               <li>
                    <h3>30元</h3>
                   <div class="stn">售价 29.94元</div>
               </li>
               <li>
                    <h3>50元</h3>
                   <div class="stn">售价 49.98元</div>
               </li>
               <li>
                    <h3>100元</h3>
                   <div class="stn">售价 99.98元</div>
               </li>
               <li>
                    <h3>充20减12</h3>
                   <div class="stn">话费宝</div>
               </li>
           </ul> -->
           <ul >
               <li v-for=" item in list" :key="item.id" @click="add(item.id,item.price)">
                   <h3>{{item.price}}元</h3>
                   <div class="stn">{{item.name}}</div>
               </li>
           </ul>
          </div>
        </div>
        <div
  v-if="show"
  class="van"
>
<van-icon style="position:absolute;top:0%;left:0%;" name="cross" @click="show=false" />
<p>确认付款</p>
<h3>￥{{this.prce}}.00元</h3>
<span>订单信息&nbsp;&nbsp;{{!this.prices==''?this.prices:''}}{{this.name}}充值{{this.prce}}元</span>
<div>
   <van-dropdown-menu class="vans">

  
<van-dropdown-item class="items" v-model="value1" :options="option1" /> 
付款方式 
</van-dropdown-menu>
</div>
<button  class="btns" @click="addget()">确认付款</button>
</div>
    </div>
    <van-loading type="spinner" color="#1989fa" class="loading" v-if="yxs" />
<div class="bgc" v-if="ys">
<van-icon style="position:absolute;top:0%;left:0%;" name="cross" @click="ys=false" />
<h3>手机充值账单</h3>
<div class="del">
总计:{{this.num}}
</div>
<div v-for="item in order" :key="item.id">
    <span><img src="../../assets/icons/tt.jpg" alt=""> </span>
<span>手机充值</span>
<span>{{item.prices}}.00</span>
<span class="span3">{{item.orders}}</span>
<span class="span2">{{item.time}}</span>
<span class="span1">交易成功</span>
</div>
</div>
</div>
</template>
<script>
export default {
    data(){
        return {
            order:[],
            ys:false,
            yxs:false,
            value1:0,
            prce:'',
            plone:'',
            name:'',
            activeNames:[],
            show:false,
            prices:'',
            list:[
                {id:0,price:'10',name:'售价 9.98'},{
                    id:1,price:'20',name:'售价 20.00'
                },
                {id:2,price:'30',name:'售价 29.94'},{
                    id:3,price:'50',name:'售价 49.99'
                },{
                    id:4,price:'100',name:'售价 100.00'
                },{
                    id:5,price:'20减12',name:'话费宝'
                }
            ],
             option1: [
        { text: '支付宝', value: 0 },
        { text: '银行卡', value: 1 },
        { text: '微信', value: 2 }
      ],
      pic:[],
      num:0
        }
    },
    created(){

    },
    methods:{
        add(id,price){
            console.log(id,price)
            this.prce=price
            if(!/^1[3456789]\d{9}$/.test(this.prices)){
   
         return this.$toast({
        icon:'https://img.yzcdn.cn/vant/logo.png',
        message:'请输入手机号码',
        })
            }
        let url='https://api.jisuapi.com/shouji/query'
        let data={
            shouji:this.prices,
             appkey: 'e6e222c0b651e2a2'
        }
        this.$http.jsonp(url,{params:data }).then(res=>{
           console.log(res.body)
           let data=res.body.result
           this.name=data.province+data.city+data.company
           this.show=true
           this.yxs=false
        })
        this.yxs=true
            
        },
        addget(){
            var date=new Date()
           console.log(date .toLocaleString( ))
           let tiems=date.toLocaleString()
            let data={
               time:tiems,
                orders:this.name,
                prices:this.prce,
                phone:JSON.stringify(this.prices),
                pay:JSON.stringify(this.value1)
            }
           this.$axios.post('/order',data).then(res=>{
               console.log(res)
           })
            this.$toast('充值成功')
            this.show=false
        },
        get(){
            this.ys=true
            this.$axios.get('/get/order').then(res=>{
                console.log(res)
                this.order=res.data.message
                this.order.forEach(item=>{
                    if(item.prices!==""){
                        this.pic.push(item.prices)
                    }
                   this.num=eval(this.pic.join('+'))
                   console.log(this.num)
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.box{
    width: 100%;
    height: 150px;
    background-color: #5599ff;
    position: relative;
    >span{
        font-weight: 700;
        color: #fff;
    }
    
}
.box span:nth-child(2){
   // border: 1px solid #00ff00;
    font-weight: 500;
    color: #fff;
   // text-align: right;
   font-size: 14px;
   position: absolute;
   right: 5%;
}
p{
    position: absolute;
    left: 5%;
    button{
        height: 30px;
        border: none;
        border-radius: 20%;
        background-color: #4444;
        color: #eee;
    }
}
#inputs{
    position: absolute;
    width: 90% !important;
    overflow: hidden;
    top: 40%;
    left: 5%;
    background-color: transparent !important;
    color: #eee;
    border: none;
    border-bottom: 1px solid #eee;
}
.main{
   width: 90%;
   height: 300px;
   position: absolute;
   background-color: #fff;
   top: 75%;
   left: 5%;
  //display: flex;
}

.main span:nth-child(1){
    position: absolute;
   width: 30%;
    top: 10%;
    left: 5%;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
   // border: 1px solid #ccc;
    font-size: 14px;
    font-weight: 700;
    color: #000;
   // text-align: right;
    >div{
        display: inline-block;
        top: 20%;
      //  position: absolute;
      //  width: 3%;
      //  top: 10%;
        // left: 6%;
        // margin-right: 10px;
    }
     img{
     //  margin-top: 10px;
    width: 20px;
    height: 20px;
}
}
.main span:nth-child(2){
    position: absolute;
    width: 30%;
    top: 10%;
    left: 40%;
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    font-size: 14px;
    color: #000;
    >div{
        position: absolute;
        left: 20%;
        top: 7%;
        margin-left: -10px;
    }
    img{
        width: 20px;
        height: 20px;
    }
}
.main span:nth-child(3){
    position: absolute;
    width: 30%;
    top: 10%;
    left: 75%;
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    font-size: 14px;
    color: #000;
    >div{
        position: absolute;
        left: 10%;
        top: 10%;
        color: aqua;
    }
    img{
        width: 20px;
        height: 20px;
    }
}
.nav{
    position: absolute;
    top: 29%;
   // display: flex;
    width: 100%;
    height: 200px;
   
}
ul{
    width: 100%;
    display: flex;
     flex-direction: row;
    flex-flow: wrap;
    justify-content: space-around;
}
li{
   width: 30%;
   height: 80px;
   margin: 5px;
   border: 1px solid #00ff00; 
   line-height: 80px;
   border-radius: 3px;
   h3{
      // max-width: 10px 0 0 0 ;
      margin: 10px 0 0 0;
   }
  .stn{
       height: 30px;
       line-height: 40px;
      // text-align: center;
      // margin-left: 10px;
   }
}
.van{
    position: fixed;
    bottom: 0%;
    height: 350px;
    width: 100%;
    background-color: #fff;
    p{
        position: absolute;
        width: 50%;
        top: 10%;
        height: 40px;
        color: #000;
        left:50% ;
        transform: translate(-50%);
       // bottom: 10%;
    }
    h3{
        position: absolute;
        width: 50%;
        top: 20%;
        left: 50%;
        transform: translate(-50%);
    }
    span{
        width: 100%;
        position: absolute;
        top: 30%;
        left: 0%;
        display: inline-block;
        color: #5599ff;
       // transform: translate(-50%);
    }
    .vans{
        position: absolute;
        bottom: 40%;
        line-height: 50px;
        width: 100%;
        .items{
            width: 30%;
            position: absolute;
            right: 0;
        }
    }
    .btns{
        width: 120px;
        position: absolute;
        bottom: 20%;
        height: 50px;
        line-height: 40px;
        color: #fff;
        font-weight: 700;
        background-color: #00ff00;
        left: 50%;
        transform: translate(-50%);
        font-size: 16px;
        border-radius: 10px;
        border: none;
        box-shadow: 4px 4px #eee;
    }
    
}
.loading{
    position: fixed;
    top: 60%;
    left: 50%;
}
.bgc{
    z-index: 9919;
    width: 100%;
    background-color: #fff;
    height: 400px;
    //border: 1px solid #444400;
    position: fixed;
    top: 5%;
    h1{
        font-size: 16px;
    }
    .del{
        position: absolute;
        top: 0%;
        right: 0;
        font-size: 12px;
        color: #99ffff;
        width: 80px;
        height: 20px;
        line-height: 20px;
        border: none;
    }
    div{
        height: 70px;
        border-bottom: 1px solid #ccc;
    }
    >div span img{
        width: 30px;
        position: absolute;
        left: 5%;
    }
    >div span:nth-child(2){
        position: absolute;
        left: 15%;
        color: #444;
        font-size: 14px;
    }
    >div span:nth-child(3){
        position: absolute;
        right: 5%;
    }
    >div span:nth-child(4){
        // position: absolute;
        // right: 5%;
        // top: 20%;
        color: #ccc;
        font-size: 14px;
    }
    >div span:nth-child(5){
        // position: absolute;
        // left: 15%;
        // top: 20%;
        font-size: 14px;
        color: #ccc;
    }
    >div span:nth-child(6){
       margin-top: 30px;
       margin-left: 10px; 
       font-size: 14px;
       display: inline-block;
       color: #5599ff;
    }
}
</style>