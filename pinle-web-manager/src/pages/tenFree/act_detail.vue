<template>
  <div class="ten_detail-container">
    <breadcrumb style></breadcrumb>
        <img
      src="../../img/return_icon.png"
      alt
      @click="$router.go(-1)"
    >
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="活动名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="活动名称">
                <!-- <el-input v-model="formData.actname" placeholder="请输入活动名称"></el-input> -->
                <span>{{formData.actname}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品定制" name="2">
            <el-form class="goods_select">
              <el-form-item label="目标商品" style="width:460px">
                <div class="goods">
                  <img :src="formData.goods.picture" alt />
                  <div class="goods_msg" v-if="formData.goods.picture">
                    <p class="ellipsis">
                        <el-tooltip class="item" effect="dark" :content="formData.goods.name" placement="bottom">
                            <span> 
                                {{formData.goods.name}}
                            </span>
                        </el-tooltip>
                    </p>
                    <p class="ellipsis">原价: {{formData.goods.price + '元'}}</p>
                  </div>
                </div>
                <div><span style="margin-left: 100px;">商品价格:</span><span > {{formData.goodsPrice}} 元</span></div>
              </el-form-item>
  
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="规则制定" name="3">
              <div class="rule" v-for="(item, index) in formData.rules" :key="index">
                  <div><span>人数达 : </span><span>{{item.peopleNumber}}</span><span> 人</span></div>
                  <div><span>团队获得佣金 : </span><span>{{item.leaderCommission}}</span><span> %</span></div>
                  <div><span>随机幸运团员得佣金 : </span><span>{{item.luckyCommission}}</span><span> %</span></div>
              </div>
          </el-collapse-item>
          <el-collapse-item title="时间约束" name="4">
              <el-form>
                  <el-form-item label="活动超时时间 :">
                      <span>{{formData.min}}</span>
                      <span>分钟</span>
                  </el-form-item>
              </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import {tFreeO_detail} from '../../api/getData'
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      id: this.$route.query.id,
      formData: {
        actname: "",
        goods: {
          picture: "", //  商品的图片
          name: "", //  商品的名称
          price: "", //  商品的价格
    
        },
        goodsPrice: '',  //  商品的价格
        rules:[],
        min: 10,  //  拼图超时时间
      }
    };
  },
  created() {
    this.act_detail()
  },
  methods: {
    act_detail(){
      tFreeO_detail('id=' + this.id).then(res => {
        if(res.data.status == 0){
          var data = res.data.data
          this.formData.actname = data.activityName  //  活动的名称
          this.formData.goods.picture =  data.goodsPictureUrl  //  商品的图片
          this.formData.goods.name = data.goodsName  //  商品的名称
          this.formData.goods.price =data.originalPrice  //  商品的原始价格
          this.formData.goodsPrice = data.goodsPrice     //  商品现价
          this.formData.rules = data.activityRules  //  拼团规则
          this.formData.min = data.failureTime    //  活动的结束时间
        } 
      })
    }
  }
};
</script>



<style lang="less">
.ten_detail-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  position: relative;
    > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  .el-tag__close.el-icon-close:hover {
    background-color: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: hidden;
    .el-main {
      background-color: #fff;
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            border-bottom: 1px solid #e4e5e7;
            .el-collapse-item__arrow {
              margin: 0;
              margin-left: 10px;
            }
          }
          .el-collapse-item__wrap {
            margin-top: 20px;
            border: none;
            .el-collapse-item__content {
              padding: 0;
              padding-left: 15px;
            }
          }
          &:nth-of-type(3){
              .el-collapse-item__content{
                    .el-button{
                        width: 60px;
                        margin-top: 10px;
                    }
              }
          }
        }
      }
    }
    //   所有的input框样式
    .el-input {
        width: 200px;
        height: 30px;
        .el-input__inner{
            height: 30px;
        }
    }

    //   商品展示
    .goods_select {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 360px;
        margin-right: 38px;
        margin-bottom: 15px;
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .goods {
            width: 180px;
            height: 70px;
            padding: 5px;
            box-sizing: border-box;
            border: 1px solid #bbbfc2;
            display: flex;

            img {
              width: 60px;
              height: 60px;
              margin-right: 10px;
            }
            .goods_msg {
                flex: 1;
              width: 95px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              p {
                width: 100%;
              }
            }
          }
          >span {
            cursor: pointer;
            height: 20px;
            color: #0066ff;
          }
        }
      }
    }
    //  活动规则
    .rule{
        display: flex;
        line-height: 40px;

        > div{
            margin-right: 40px;
        }
        .el-input{
            width: 80px;
        }


    }

  }
}
</style>
