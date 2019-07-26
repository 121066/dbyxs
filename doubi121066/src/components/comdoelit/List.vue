<template>
    <div>
   <el-container>
  <el-header>时尚女装</el-header>
  <el-container>
    <el-aside width="100px"><ul>
        <li><a href="#"  @click="cur=0" :class="{active:cur==0}">商品购买</a></li>
        <li><a href="#"  @click="cur=1" :class="{active:cur==1}">特价优惠</a></li>
        <li><a href="#"  @click="cur=2" :class="{active:cur==2}">新品上市</a></li>
        <li><a href="#"  @click="cur=3" :class="{active:cur==3}">潮流新款</a></li>
        <li><a href="#"  @click="cur=4" :class="{active:cur==4}">low到极致</a></li>
        </ul></el-aside>
    <el-main><img src="https://img-tmdetail.alicdn.com/bao/uploaded///img.alicdn.com/bao/uploaded/O1CN01P5dRoh1q7EGVCQAjl_!!0-item_pic.jpg_160x160q90.jpg" alt="" class="topnav-show" v-show="cur==0">
                <img src="https://img.alicdn.com/bao/uploaded/i2/TB18Bu0KXXXXXX0XVXXXXXXXXXX_!!0-item_pic.jpg" alt="" class="topnav-show" v-show="cur==1">
                <img src="https://img.alicdn.com/bao/uploaded/i2/1842930643/O1CN01lKPpIt1GcXCrlzee7_!!0-item_pic.jpg" alt=""  v-show="cur==2">
                <img src="https://img.alicdn.com/bao/uploaded/i3/TB1fqUMMXXXXXbuXFXXXXXXXXXX_!!0-item_pic.jpg" alt=""  v-show="cur==3">
                <img src="https://img.alicdn.com/bao/uploaded/i2/TB1zDUuLpXXXXbnXFXXXXXXXXXX_!!0-item_pic.jpg" alt=""  v-show="cur==4">
    </el-main>
  </el-container>
</el-container>
<div class="ther">
<ul>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
    <li><img src="https://img.alicdn.com/bao/uploaded/i2/2177707621/O1CN0126AStPUFVD8ycR2_!!0-item_pic.jpg" alt=""><p class="bt"><span>时尚女装</span><span>潮流新款</span></p></li>
</ul> 
</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           cur:0
        }
    },
    methods:{
        click(){
            if(show=false){
                this.show=true
            }
        }
    }
}
</script>
<style lang="scss" scoped>
 .el-header, .el-footer {
    background-color: red;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-weight: 700;
  }
  
  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 20px;
    ul{
      margin: 0;
      padding: 0;
    //   width: 100%;
    //   height: 100%;
  }
  li{
      width: 100%;
      list-style: none;
      height: 20px;
      margin: 10px 0 ;
      background-color: #fff;
     // border: 1px solid #ccc;
     box-shadow: 2px 0 2px red;
      a{
          display: inline-block;
          font-size: 12px;
          color: red;
          line-height: 20px;
       
      }
     
  }
  }
  
//   a:link{
//       background-color: #fff;
//   }
    li:hover.a{
          background-color: red;
          color: #fff;
      }
   
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    img{
        width: 100%;
        height: 100%;
    }
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .ther{
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      width: 100%;
      display: flex;
      ul { 
          padding: 0;
          li{
          width: 49%;
          margin: 1px;
          padding: 0;
          float: left;
          list-style: none;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            height: 220px;
        img{
            width: 100%;
           .bt{
                height: 30px;
                padding: 0;
                margin: 0;
                line-height: 30px;
                
            }
        }
      }
      }
  }
  p{
     height: 30px;
                padding: 0;
                margin: 0;
                line-height: 30px; 
                span{
                    margin: 2px 5px;
                    color: red;
                }
  }
</style>

