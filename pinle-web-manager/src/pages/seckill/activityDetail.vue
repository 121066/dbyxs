<template>
  <div class="seckill_act_detail-container">
    <breadcrumb></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="秒杀活动名称" name="1">
            <span>{{name}}</span>
          </el-collapse-item>
          <el-collapse-item title="活动状态" name="2">
            <div v-if="status == 0" style="color:#555555">
              <img src="../../img/icon_end.png" alt>
              <span>已结束</span>
            </div>
            <div v-if="status ==2" style="color: #38c9ff">
              <img src="../../img/icon_not_start.png" alt>
              <span>未开始</span>
            </div>
            <div v-if="status == 1" style="color: #04bb33">
              <img src="../../img/icon_processing.png" alt>
              <span>进行中</span>
            </div>
          </el-collapse-item>
          <el-collapse-item title="活动时间" name="3">
            <el-form label-width="100px">
              <el-form-item label="开始时间">
                <span>{{startTime}}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{endTime}}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{creteTime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动商品" name="4">
            <el-form label-width="100px">
              <el-form-item label="活动商品">
                <div class="goods">
                  <img :src="goods.picture" alt @click="$router.push('/goodsDetail?id=' + goods.id)">
                  <div class="msg">
                    <p class="ellipsis goodsname">{{goods.name}}</p>
                    <p class="ellipsis" v-show="goods.id">原价: {{goods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="活动价格">
                <span>{{seckillPrice}}元</span>
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
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3","4"],
      name: "",
      startTime: '',
      endTime: '',
      creteTime:'',
      seckillPrice: '',
      goods:{picture:'',name:'',price:'',id:''},
      id:this.$route.query.id,
      status: this.$route.query.status
    };
  },
  created(){
    this.get_detail()
  },
  methods: {
    get_detail(){
      this.$axios.post('/web_panic_buy/get','id=' + this.id).then(result => {

        if(result.data.status == 0){
          let data = result.data.data
          this.name = data.name
          this.startTime = data.startTime
          this.endTime = data.endTime
          this.creteTime = data.createtime
          this.seckillPrice = data.panicBuyPrice
          this.goods = data.goods
        }
      })
    }
  }
};
</script>



<style lang="less">
.seckill_act_detail-container {
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
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    .el-main {
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            font-weight: 600;
            border-bottom: 1px solid #e4e5e7;
            background-color: #eff3f6;

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
              display: flex;
              background-color: #eff3f6;
            }
          }
          &:nth-of-type(1) {
            .el-collapse-item__content {
              color: #000;
              font-weight: 600;
              .el-input {
                width: 150px !important;
              }
            }
          }
          &:nth-of-type(2) {
            .el-collapse-item__content {
              div{
                display: flex;
                              img {
                width: 20px;
                height: 20px;
              }
              span {
                margin-left: 10px;
                font-weight: 600;
                height:20px;
                line-height: 20px;
              }
              }
            }
          }
          &:nth-of-type(3) {
            .el-collapse-item__content {
              .el-form {
                display: flex;
                .el-form-item {
                  margin-right: 90px;
                }
              }
              .el-input {
                width: 190px !important;
              }
            }
          }
          &:nth-of-type(4) {
            .el-collapse-item__content {
              .el-form {
                display: flex;
                .el-form-item {
                  margin-right: 90px;
                }
              }
            }
            .el-form-item__content:first-of-type {
              flex-direction: column;
            }
            .el-form-item__content:last-of-type {
              .el-input {
                width: 150px !important;
              }
            }
          }
        }
      }
      .goods {
        display: flex;
        height: 80px;
        border: 1px solid #ccc;
        padding: 10px 0;
        box-sizing: border-box;
        img {
          width: 70px;
          height: 60px;
          display: block;
        }

        .msg {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          margin-left: 10px;
          p {
            height: 30px;
            line-height: 30px;
            width: 120px;
            font-weight: 400;
            color: #333;
          }
        }
      }
      .el-form {
        .el-form-item__label {
          text-align: left;
          color: #000;
          font-weight: 600;
        }
        .el-form-item__content {
          color: #000;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
