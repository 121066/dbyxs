<template>
  <div class="nComer_free_modify-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="拼团活动名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
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
                <span @click="select_goods(1)">点击选择</span>
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
                <span @click="select_goods(2)">点击选择</span>
              </el-form-item>
              <el-form-item label="返回数量" style="width: 200px;">
                <el-input type="number" v-model="form.num" style="width: 100px;"></el-input>&nbsp;
                <span>个</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="modify_promotion">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import {nc_free_modify,nc_free_detail} from '../../api/getData'
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3"],
      id: this.$route.query.id,  //  活动的id
      form: {
        name: "",
        num: "", //  红包返回的数量
        goods: {
          picture: "",
          goodsName: "",
          goodsPrice: "",
          id: '',
        },
        flag: 1, //  1: 选择目标商品  2：选择红包
        redPack: {
          picture: "",
          name: "",
          price: "",
          id: '',
        }
      }
    };
  },
  created() {
    if (localStorage.getItem("msg")) {
      this.form = JSON.parse(localStorage.getItem("msg")) || "";
      localStorage.removeItem('msg')
      var id = localStorage.getItem("id") || "";
      this.goodsDetail(id)
    } else {
        this.get_pro_detail()
    }
  },
  methods: {
    // 修改活动接口
    modify_promotion() {
      if(!this.form.name){
        return this.$message({
          type: 'warning',
          message: '活动名称不能为空'
        })
      }
      if(!this.form.goods.id){
        return this.$message({
          type: 'warning',
          message: '目标商品不能为空'
        })
      }
      if(!this.form.redPack.id){
        return this.$message({
          type: 'warning',
          message: '目标红包不能为空'
        })
      }
      if(!this.form.num){
        return this.$message({
          type: 'warning',
          message: '红包的返回数量不能为空'
        })
      }
      nc_free_modify({id: this.id,promotionName: this.form.name,goodsA: this.form.goods.id,goodsB: this.form.redPack.id,count:this.form.num}).then(res => {
        if(res.data.status == 0){
          if(res.data.data == 1){
            this.$router.push('/nComer_free_set')
            return this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            return this.$message({
              type: 'warning',
              message: '修改失败'
            })
          }
        }
      })
    },
    get_pro_detail(){
        nc_free_detail('id=' + this.id).then(res => {
            if(res.data.status == 0){
                var data = res.data.data
                this.form.num = data.count + ''
                this.form.name = data.promotionName
                this.form.goods.id = data.goodsA + ''
                this.form.goods.picture  = data.goodsAPictureUrl
                this.form.goods.goodsName = data.goodsAName
                this.form.goods.goodsPrice = data.goodsAPrice
                this.form.redPack.picture = data.goodsBPictureUrl
                this.form.redPack.name = data.goodsBName
                this.form.redPack.price = data.goodsBPrice
                this.form.redPack.id = data.goodsB + ''
            }
        })
    },
    goodsDetail(id) {
      this.$axios.post("web_goods/get_one", "id=" + id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.goods;
          if (this.form.flag == 1) {
            this.form.goods = {
              picture: data.pictureUrl,
              goodsName: data.name,
              goodsPrice: data.price,
              id: data.id
            };
          } else if (this.form.flag == 2) {
            this.form.redPack = {
              picture: data.pictureUrl,
              name: data.name,
              price: data.price,
              id: data.id
            };
          }
        }
      });
    },
    select_goods(goodsType) {
      this.form.flag = goodsType;
      localStorage.setItem("msg", JSON.stringify(this.form));
      if(goodsType == 1){
        this.$router.push("/nComer_free_selectGoods?type=" + "11");
      } else if(goodsType == 2){
        this.$router.push("/nComer_free_selectGoods?type=" + "11" + '&goodsType=' + 16);
      }
    },
    
  },
  activated() {}
};
</script>



<style lang="less">
.nComer_free_modify-container {
  display: flex;
  flex-flow: column;
  height: 100%;
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
              .el-form {
                display: flex;

                .el-form-item {
                  margin: 0;
                  width: 250px;
                  .el-form-item__label {
                    height: 30px;
                    line-height: 30px;
                    text-align: left;
                    color: #000;
                    font-weight: 600;
                    padding: 0;
                  }
                  .el-form-item__content {
                    line-height: 30px;
                    .el-input {
                      .el-input__inner {
                        height: 30px;
                        line-height: 30px;
                      }
                    }
                  }
                }
              }
              .goods_select {
                display: flex;
                flex-wrap: wrap;
                position: relative;
                .el-form-item {
                  width: 375px;
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

    .el-footer {
      margin-top: 70px;
      text-align: center;
      > button {
        height: 30px !important;
        line-height: 30px;
        padding: 0;
        width: 60px;
        margin: 0 70px;
        // box-sizing: content-box;
      }
    }
  }
}
</style>
