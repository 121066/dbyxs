<template>
  <div class="banner_detail-container">
    <breadcrumb style="position: absolute;width: 100%;"></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/homeSetUp')">
    <div class="content">
      <el-header>{{title}}</el-header>
      <el-main>
        <el-row :gutter="24" style="padding-top: 0;margin: 0;">
          <el-col :span="12">
            <div class="grid-content">
              <div>轮播页名称</div>
              <div>跳转类型</div>
              <div>状态</div>
              <div v-if="typeFlag == 1 ? true:false">外跳网页URL</div>
              <div v-if="typeFlag == 2 ? true:false">跳转活动</div>

              <div>创建时间</div>
              <div style="line-height: 150px;height: 150px;">轮播图</div>
              <div style="line-height: 150px;height: 150px;" v-if="typeFlag == 3 ? true:false">跳转商品</div>

              <div style="line-height: 359px;height: 359px;" v-if="typeFlag == 4 ? true:false">跳转大图</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <div style="background-color: #f6f6f6">{{name}}</div>
              <div style="background-color: #f6f6f6">{{type}}</div>
              <div style="background-color: #f6f6f6">{{status}}
              </div>
              <div v-if="typeFlag == 1 ? true:false" style="background-color: #f6f6f6">{{jumpUrl}}</div>
              <div v-if="typeFlag == 2 ? true:false" style="background-color: #f6f6f6">{{promotionName}}</div>

              <div style="background-color: #f6f6f6">{{createdTime}}</div>
              <div style="background-color: #f6f6f6;line-height: 150px;height: 150px;" ><img :src="bannerImg" alt="" style="width: 200px;height: 115px;margin-top: 17px;" ></div>
              <div style="background-color: #f6f6f6;line-height: 150px;height: 150px;" v-if="typeFlag == 3 ? true:false" ><img :src="goodsImg" alt="" style="height: 115px;margin-top: 17px;vertical-align:middle;" @click="$router.push('/goodsDetail?id=' + goodsId)"> &nbsp; &nbsp;<span>{{goodsName}}</span> &nbsp; &nbsp;<span>{{goodsPrice}}</span></div>
              <div style="background-color: #f6f6f6;line-height: 359px;height: 359px;" v-if="typeFlag == 4 ? true:false"><img :src="bigpicUrl" alt="" style="width: 215px;height: 325px; margin-top: 25px;"></div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb },
  data(){
    return {
      name: '',
      type: '',
      status: '',
      createdTime: '',
      bannerImg: '',
      queryBigImg: '',
      jumpUrl: '',
      id: this.$route.query.id,
      typeFlag: '',
      title: '',
      promotionName: '',
      goodsId:'',
      goodsImg: '',
      goodsPrice: '',
      goodsName: '',
  }},
  created(){
    this.get_bannerDetail()
  },

  methods: {
    get_bannerDetail(){
      this.$axios.post('/web_banner/detail','id=' + this.id).then(result => {
        if(result.data.status == 0){
          let data = result.data.data
          this.name = data.name
          this.typeFlag = data.type
          this.bannerImg = data.bannerUrl
          this.createdTime = data.createtime
          if(data.type == 1){
            this.type = '外跳网页'
            this.jumpUrl = data.jumpUrl
            this.title = '外跳网页详情'
          }else if(data.type == 2){
            this.type = '跳转活动'
            this.title = '跳转活动详情'
            this.promotionName = data.promotionName
          }else if( data.type == 3){
            this.type = '跳转商品'
            this.title = '跳转商品详情'
            this.goodsImg = data.goodsPicUrl
            this.goodsId = data.goodsId
            // this.goodsImg = '../../img/捕获3.PNG'
            this.goodsName = data.goodsName
            this.goodsPrice = data.goodsPrice + '元'
          }else {
            this.type = '跳转大图'
            this.bigpicUrl = data.bigpicUrl
            this.title = '跳转大图详情'
          }
          if(data.status == 0){
            this.status = '禁用'
          }else {
            this.status = '使用'
          }
        } 
      })
    }
  }

}
</script>

<style lang="less">
.banner_detail-container {
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  .content {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    box-sizing: border-box;
    .el-header {
      text-align: center;
      line-height: 50px !important;
      height: 50px !important;
      color: #409eff;
      background-color: #fff;
      position: relative;
    }
    > .el-main {
      // height:100%;
      padding: 0;
      // padding: 0 340px;
      height: 100%;
      margin-top: -50px;
      // padding-top: 50px;
      padding: 50px 30px 30px;
      // background-color: #f6f6f6;
      .el-row{
        .el-col.el-col-12{
          padding: 0!important;
        }
        .grid-content{
          >div{
            height: 60px;
            line-height: 60px;
            text-align: center;
            background-color: #e6e9f2;
            margin-bottom: 2px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>

