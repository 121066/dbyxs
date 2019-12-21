<template>
    <div class="bgcs" v-cloak>
        
        <!-- <router-view/> -->
<div class="int" else v-cloak>
     <span class="mui-icon mui-icon-search"></span>
    <input type="text" placeholder="请输入搜索的商品" id="int" :value="goods"
    @focus="goodslist()" @blur="goodsList()" @input="inputValue">
    <button  class="btn" @click="onSearch()">搜索</button>
    <van-icon name="comment-o"  class="icons" @click="getgoods()"/>
</div>
<mt-header fixed title="诗一" v-show="flag" >
          <span slot="left" @click="$router.go(-1)" >
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
  <!-- <search v-if="db"></search> -->
       <swiper :lunboList="lunboList" :isfull="true"  class="sw"></swiper>
        <van-notice-bar
  :text="msg"
  left-icon="volume-o"
  class="text"
  
 />
 <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/information" >
        <!-- <van-icon name="like" /> -->
          <div class="tas">
            <!-- <div class="circle-loading"> -->
              <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png.webp" alt></div>
         
          <!-- </div> -->
           <div class="mui-media-body">爱心超市</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/images">
        <div class="tas">
         <!-- <div class="circle-loading">  -->
           <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/17169/3/4127/4611/5c2f35cfEd87b0dd5/65c0cdc1362635fc.png.webp" alt></div>
         <!-- </div> -->
          <div class="mui-media-body">生活用品</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/phone">
        <div class="tas">
          <!-- <div class="circle-loading"> -->
          <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t17725/156/1767366877/17404/f45d418b/5ad87bf0N66c5db7c.png.webp" alt>

          <!-- </div> -->
        </div>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <div class="tas">
            <!-- <div class="circle-loading"> -->
          <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp" alt>

            <!-- </div> -->
          </div>
          <div class="mui-media-body">快速到家</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/charge">
          <div class="tas">
            <!-- <div class="circle-loading"> -->
          <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png.webp" alt>

            <!-- </div> -->
          </div>
          <div class="mui-media-body">充值缴费</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <div class="tas">
            <!-- <div class="circle-loading"> -->
          <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp" alt>

            <!-- </div> -->
          </div>
          <div class="mui-media-body">一起拼购</div>
        </a>
      </li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <div class="tas">
            <!-- <div class="circle-loading"> -->
          <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp" alt>

            <!-- </div> -->
          </div>
          <div class="mui-media-body">一起拼购</div>
        </a>
      </li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <div class="tas">
            <!-- <div class="circle-loading"> -->
          <img src="//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp" alt>

            <!-- </div> -->
          </div>
          <div class="mui-media-body">一起拼购</div>
        </a>
      </li>
</ul>
<titles></titles>
    <van-popup
  v-model="show"
  position="top"
  :style="{ height: '40%' }" class="pop" :overlay-style="{backgroundColor: 'transparent'}" 
    >
    <goodsname  ></goodsname>
    </van-popup>
   <div class="db" v-if="db">
    <div class="box">
  
  <div class="main"> <h4>历史搜索</h4> <span class="mui-icon mui-icon-trash" @click="details()"></span></div>
 <div class="said">
    <div class="nav" v-for="item in this.na" :key="item.id">
    <div>{{item.name}}</div>
  </div>
 </div>
</div>
</div>
    </div>
</template>
<script>
// @ is an alias to /src
import swiper from '@/components/swiper.vue'
import goodsname from '@/components/goodsname.vue'
import search from '@/pages/search.vue'
import titles from '@/components/title.vue'
import{mapState,mapActions,mapMutations,mapGetters}from 'vuex'
export default {
   name: 'home',
    data() {
        return {
            goodsPictures: [],
            bannerImgs: [],
            flag:false,
             lunboList: [
               '//gw.alicdn.com/imgextra/i4/1114511827/O1CN01xMRsYF1PMoBgyr1JG_!!1114511827.jpg_790x10000Q75.jpg_.webp',
               '//gw.alicdn.com/imgextra/i4/81/O1CN01J8Cygs1CT8emjzp7Y_!!81-0-luban.jpg_790x10000Q75.jpg_.webp',
               '//gw.alicdn.com/imgextra/i4/1585808/O1CN01HrFBbQ1sm6vQ58W5T_!!1585808-0-lubanu.jpg_790x10000Q75.jpg_.webp',
               '//gw.alicdn.com/tfs/TB17emto4n1gK0jSZKPXXXvUXXa-1035-390.png_790x10000.jpg_.webp',
               'http://pic38.nipic.com/20140221/10634005_121524619109_2.jpg'
             ],
             value:'',
             goods:'',
             lists:[{name:'衣服'},{name:'女士'}],
             yxs:true,
             yyx:true,
             msg:'今晚月色真美,今晚月色真美，今晚月色真美111111111111111111111111111',
             show:false,
             listA:[],
             db:false,
             goodsB:'',
             goodsName:[],//保存vux中的商品标签
             goodsA:'',//多此一举没办法
             detail:[],//保存搜索记录
             na:[]
        }
    },
     computed:{
      ...mapState(['listname','count']),
      ...mapActions(['getList']),
      ...mapGetters(['getname'])
    },
    created() {
        this.list()
        this.$store.dispatch('getList')
        this.flags=true
    },
    mounted(){
       setInterval(()=>{
          this.goodsName=this.getname
       },1000)
       console.log(this.goodsName)
    },
    methods: {
    //  ...mapMutations(['add','addN']),
      //获取轮播图已废弃
        list() {
            this.$axios.get('/api/getlist').then(res => {
               
                res.data.message.forEach(item => {
                   
                    let url =
                        'http://dbyxs.vipgz1.idcfengye.com/node/' +
                        item.url.split(' ')
                })
                if(this.yxs){
                            var a=9
                        this.yyx=   setInterval(()=>{
                         a--
                        if(a==0){
                             a=9
                            }else{
                             // console.log(this.goodsName)
                        // this.goods=this.lists[a]
                       // console.log(this.goodsName[a].name)
                        this.goods=this.goodsName[a].name
                         }
                        },2000)
                }
            })
        },
        //input获得焦点
       goodslist(e){
       // this.goods=this.goods
          // this.goodB=this.goods
         clearInterval(this.yyx)
        
        // console.log(this.goodsName)
        //console.log(this.$store.state.listname)
      // console.log( this.$store.commit('add'))
      // console.log(this.listname)
      // console.log(this.$store.dispatch('getList'))
          this.db=true
          this.goodsSearch()
         // console.log(this.goods,'goods')
       },
       goodsSearch(){
          this.$axios.get('/search').then(res=>{
           console.log(res)
           let data=[]
           data=res.data.message
         this.na=  data.filter(function(item,index,self){
           return self.indexOf(item)==index
         })
         console.log(this.na,'na')
         })
       },
       //input失去焦点
       goodsList(){
         setTimeout(()=>{
           this.db=false
         },500)
        // this.getlist()
               var a=9
                        this.yyx=   setInterval(()=>{
                         a--
                        if(a==0){
                             a=9
                            }else{
                        // console.log(this.goodsName[a].name)
                         this.goods=this.goodsName[a].name
                         }
                        },2000)
       },
       getgoods(){
         this.show=true
         this.$axios.get('/goods').then(res=>{
           this.listA=res.data.message
         })
       },
       getlist(id){
         console.log(id)
       },
      onSearch(){
         // const i =this.goodsName.findIndex(x=>x.name===this.goods)
         console.log(this.goods,'有没有id')
         this.$store.state.listname.forEach(item=>{
         
           if(item.name==this.goods){
            this.goodsA=item
           
           }
         })
         let data={
           ids:this.goodsA.id||0,
           name:this.goodsA.name||this.goods
         }
         console.log(data)
         this.$axios.post('/add/search',data).then(res=>{
           console.log(res)
         })
      //  localStorage.setItem('names',data.name)
      //  this.detail.push(localStorage.getItem('names'))
      //    console.log(this.goodsA,'goodA')
      //    console.log(data)
     this.$router.push('/images?id='+this.goodsA.id)
       
      },
      inputValue(e){
      //  console.log('33')
       // console.log(e.target.value)
        this.goods=e.target.value
      },
      details(){
       // this.db=false
        this.$axios.post('/detail/serach').then(res=>{
          console.log(res)
          this.goodsSearch()
        })
      }
    },
    watch:{
        // "$route.path":function(newVal){
        //     if(newVal==='/home'){
        //         this.flag=false
        //     }else{
        //         this.flag=true
        //     }
        // }
    },
    components:{
     swiper,
     goodsname,
     titles
    // search
    },
   
}
</script>
<style lang="less" scoped>
html{
  //margin-top: -40px!important;
}
body{
  background-color: #ff0000;
}
[v-cloak]{
  display: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
  margin-top: 40px;
  background-color: #ff0000;
}
.bgcs{
  // overflow-y: hidden;
  //overflow: hidden;
  //margin-top: -40px;
  background-color: #ff0000;
}
img {
    width: 360px;
    height: 350px;
}
.van-swipe {
    height: 350px;
    background-color: red;
}
.swipe > .van-swipe > .van-swipe__track {
    width: 360px;
    height: 350px;
   // padding: 0 5px;
}
.int{
  position: absolute;
   // top: 0px;
   margin-top: -40px;
  opacity: 1;
  z-index: 91;
  padding: 10px 0 5px 0;
   width: 100%;
    height: 55px; 
    background-color: red;
}
.int>input{
    width: 80%;
    border-radius: 20px;
    font-size: 14px;
    color: #444;
    padding: 0 0 0 40px;
}
.int>span{
position: absolute;
top: 20%;
left: 15%;
}
.int>.btn{
    position: absolute;
    top: 19%;
    right: 10%;
    font-size: 14px;
    font-weight: 700;
    border: none;
    height: 40px;
    line-height: 28px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #880000;
    color: #fff;

}
.int>.icons{
    position: absolute;
    font-size: 30px;
    color: #fff;
    line-height: 55px;
    //background-color: #fff;
    top: 15%;
    right: 1%;
}
.mui-icon-search:before{
  line-height: 40px;
}
.text{
    color: #ccff99;
    background-color: #880000;
    padding: 0 10px;
   // border-bottom: 3px solid #fff;
   border-left: 10px solid #ff0000;
   border-right: 10px solid #ff0000;
}
.mui-grid-view.mui-grid-9 {
 
  margin: 3px 0 0 0 ;
  border-top: 3px solid #fff;
  background-color: #fff;
  border: none;
  padding: 0 10px;
   background-color: #ff0000;
    border-radius: 10%;
  .mui-table-view-cell {
    background-color: #fff;
    border: none;
   width: 25%;
   text-align: center;
  }
  img {
   //position: absolute;
    width: 40px;
    height: 40px;
    //border: 4px solid #fff;
    border-radius: 30px;
     animation: bts infinite 2s linear;
  }
 .tas img:nth-child(1){
     animation: bts infinite 5s linear;
  }
  .tas{
  position: relative;
  text-align: center;
  padding: 0 15px;
  //margin: 0 0 0 15px;
  //left: 15%;
}
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
  color: #444;
  text-align: center;
  font-size: 14px;
   max-width: 0 5px;

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  padding: 0;
}
.pop{
    margin-top: 52px;
    width: 95.5%;
    margin-left: 10px;
}
element.style{
  //z-index: 999;
   // z-index: -1;
}
.van-overlay{
   background-color: #fff;
  // background-color: transparent !important;
}
.box{
 // width: 100%;
  position: relative;
  height: 100%;
  top: 0%;
}
.said{
  //margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
 // margin-bottom: 40px;
   .nav{
  margin: 30px 5px;
  width: 25%;
height: 20px;
line-height: 20px;
color: #ccc;
font-size: 14px;
box-shadow: 3px 3px #efb;
//border: 1px solid pink;
  //height: 200px;
  // display: flex;
  // float: left;
  //   flex-direction: row;
  //   flex-flow: wrap;
  //   //justify-content: center;
  //border: 1px solid red;
 >div{
  // position: absolute;
 // margin:  10px;
// width: 25%;
// height: 20px;
// line-height: 20px;
// color: #ccc;
// font-size: 14px;
// border: 1px solid pink;
}
    
}
}
.main{
  width: 100%;
  height: 30px;
  position: absolute;
  top: 0%;
 // margin-bottom: 50px;
}
.main>h4{
  margin-top: 10px;
  text-align: left;
}
.main>span{
  position: absolute;
  top: 30%;
  right: 10%;
}
.db{
  position: fixed;
  top: 7%;
  left: 2.5%;
  width: 95%;
  height: 400px;
  background-color: #fff;
  //border: 1px solid red;
}
    .circle-loading{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px solid rgb(184, 187, 191);
        border-radius: 100%;
        width: 40px;
        height: 40px;
        font-size: 12px;
        font-weight: bold;
        color: rgb(172, 28, 177);
        box-shadow: 0 1px 2px rgb(0, 0, 0,0.2),
        inset 0 1px 2px 1px rgba(0, 0, 0, 0.2);
    }
    .circle-loading::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -24px;
        margin-top: -24px;
        display: block;
        border: 4px solid transparent;
        border-top-color: rgb(172, 28, 191);
        border-radius: 100%;
        width: 40px;
        height: 40px;
        animation: rotatel infinite 2s linear;
    }
    @keyframes rotatel{
        0%{
            transform: rotate(0deg);
            border-top-color: red;
        }
        25%{
            transform: rotate(90deg);
            border-top-color: violet;
        }
        50%{
            transform: rotate(180deg);
            border-top-color: skyblue;
        }
        75%{
            transform: rotate(270deg);
            border-top-color: springgreen;
        }
        100%{
            transform: rotate(360deg);
        }
    }
     @keyframes bts {
            0% {
                /* transform: rotate(0px); */
                transform: translateY(0px);
            }
            25% {
                transform: translateY(2px);
                box-shadow: 0 2px 2px 2px #ccc;
            }
            50% {
                transform: translateY(4px);
                box-shadow: 0 2px 2px 2px #eee;
            }
            75% {
                transform: translateY(2px);
                box-shadow: 0 2px 2px 2px #ccc;
            }
            100% {
                transform: translateY(0px);
                box-shadow: 0 2px 2px 2px #eee;
                /* transform: rotate(); */
            }
        }
        ::-webkit-scrollbar {
    width: 0 !important;
}

 ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}
body{
    overflow-x: hidden!important;
    overflow-y: hidden!important;
}
</style>

