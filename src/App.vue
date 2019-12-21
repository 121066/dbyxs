<template>
    <div id="app" class="app-container">
      
    <mt-header fixed title="诗一" v-show="flag" v-cloak >
          <span slot="left" @click="$router.go(-1)" >
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
   <transition name="myclick">
      <router-view></router-view>
   </transition>
          <nav class="mui-bar mui-bar-tab">
		   	<router-link class="mui-tab-item mui-active" to="/home" >
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
		   	</router-link>
			<router-link class="mui-tab-item" to="/home/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
			<router-link class="mui-tab-item" to="/home/shoping">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/user">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">个人</span>
			</router-link>
		   </nav>
  
  <!-- <router-link to="/homelist">页面</router-link> -->
  
    </div>
</template>

<script>
// @ is an alias to /src
import home from './views/Home'
export default {
   name: 'app',
    data() {
        return {
            goodsPictures: [],
            bannerImgs: [],
            flag:false
        }
    },
    created() {
        this.list()
    },
    methods: {
        list() {
            this.$axios.get('/api/getlist').then(res => {
                // this.goodsPictures=res.data.message
                this.$toast('提示文案')
                res.data.message.forEach(item => {
                    //this.$toast.success('获取成功');

                    //  console.log(item.url.split(" "))
                    let url =
                        'http://dbyxs.vipgz1.idcfengye.com/node/' +
                        item.url.split(' ')
                    this.goodsPictures.push(url.split(' '))
                    this.bannerImgs.push(url.split(' '))
                    // this.goodsPictures.push('http://dbyxs.vipgz1.idcfengye.com/node/'+item.url.split(" "))
                })
            })
        },
        onChange(index) {
            this.index = index
        }
    },
    watch:{
        "$route.path":function(newVal){
            if(newVal=='/home'){
                this.flag=false
            }else{
                this.flag=true
            }
        }
    },
    components:{
     // home
    }
}
</script>
<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
  margin-top: 40px;
  //overflow-x: hidden;
}
.yxs{
  z-index: 99;
}
[v-cloak]{
  display: none;
}
.app-container{
  //overflow-x: hidden;
  //background-color: transparent;
  z-index: 999;
}
.mint-header{
  z-index: -99;
  //overflow: hidden;
}
// .mint-header.is-fixed{
//   position: fixed;
//   top: 0;
//   //background-color: transparent;
// z-index: -1;
// }
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
}
.myclick-enter {
  opacity: 0;
  transform: translateX(100%);
}
.myclick-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.myclick-enter-active,
.myclick-leave-active {
  transition: all 0.5s ease;
}
// .mui-bar-tab .mui-tab-item-llb.mui-active {
//   color: #880000;
// }

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mint-header{
 // background-color: #880000;
  position: relative;
}
</style>
