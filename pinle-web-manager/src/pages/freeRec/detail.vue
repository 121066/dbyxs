<template>
  <div class="nComer_free_del-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1" >
            <el-form ref="form" :model="form" label-width="80px" style="display:flex;">
              <el-form-item label="活动名称">
                <span>{{form.name}}</span>
              </el-form-item>
              <el-form-item label="创建时间" style="margin-left: 100px;">
                <span>{{form.createTime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="选择商品" name="2">
            <el-form label-width="80px" class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods">
                  <img :src="form.goods.picture" alt v-show="form.goods.picture" />
                  <div class="goods_msg" v-show="form.goods.picture">
                    <p class="ellipsis">{{form.goods.goodsName}}</p>
                    <p class="ellipsis">原价:{{form.goods.goodsPrice + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="选择红包" name="3">
            <el-form label-width="80px" class="goods_select">
              <el-form-item label="目标红包">
                <div class="goods">
                  <img :src="form.redPack.picture" alt v-show="form.redPack.picture" />
                  <div class="goods_msg" v-show="form.redPack.picture">
                    <p class="ellipsis">{{form.redPack.name}}</p>
                    <p class="ellipsis">原价:{{form.redPack.price + '元'}}</p>
                  </div>
                </div>

              </el-form-item>
              <el-form-item label="返回数量" style="width: 100px; ">
                <span style="color: #000">{{form.num}}</span>&nbsp;
                <span style="color: #000">个</span>
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
import { nc_free_modify, nc_free_detail } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3"],
      id: this.$route.query.id, //  活动的id
      form: {
        name: "",
        num: "", //  红包返回的数量
        goods: {
          picture: "",
          goodsName: "",
          goodsPrice: "",
          id: ""
        },
        flag: 1, //  1: 选择目标商品  2：选择红包
        redPack: {
          picture: "",
          name: "",
          price: "",
          id: ""
        },
        createTime: '',  // 活动的创建时间
      }
    };
  },
  created() {
    this.get_pro_detail();
  },
  methods: {
    get_pro_detail() {
      nc_free_detail("id=" + this.id).then(res => {
        if (res.data.status == 0) {
          var data = res.data.data;
          this.form.num = data.count + "";
          this.form.name = data.promotionName;
          this.form.goods.id = data.goodsA + "";
          this.form.goods.picture = data.goodsAPictureUrl;
          this.form.goods.goodsName = data.goodsAName;
          this.form.goods.goodsPrice = data.goodsAPrice;
          this.form.redPack.picture = data.goodsBPictureUrl;
          this.form.redPack.name = data.goodsBName;
          this.form.redPack.price = data.goodsBPrice;
          this.form.redPack.id = data.goodsB + "";
          this.form.createTime = data.createTime
        }
      });
    }
  },
  activated() {}
};
</script>



<style lang="less">
.nComer_free_del-container {
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
  .el-form-item{
      margin-bottom: 0;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: auto;
    .el-main {
      background-color: #fff;
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
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

              .goods_select {
                display: flex;
                flex-wrap: wrap;
                position: relative;
                .el-form-item {
                  width: 300px;
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
                      justify-content: space-around;
                      img {
                        width: 70px;
                        height: 60px;
                      }
                      .goods_msg {
                        width: 95px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        p {
                          width: 100%;
                        }
                      }
                    }
                    span {
                      cursor: pointer;
                      height: 20px;
                      color: #0066ff;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
