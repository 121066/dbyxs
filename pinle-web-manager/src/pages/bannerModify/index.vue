<template>
  <div class="bannermodify-container fillcontain">
    <breadcrumb style="position: absolute;width: 100%;"></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">
    <div class="content">
      <el-header>{{title}}</el-header>
      <el-main>
        <div class="form-container">
          <el-main>
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择类型">
                  <el-option label="禁用" value="0"></el-option>
                  <el-option label="使用" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外跳网页URL" v-if="form.type == 1 ? true : false">
                <el-input v-model="form.jumpUrl"></el-input>
              </el-form-item>
              <el-form-item label="跳转大图" class="query_big_pic" v-if="form.type == 4 ? true : false">
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changeBigPic"
                  :auto-upload="false"
                  :on-remove="handleRemove1"
                  :auto-false="false"
                  ref="upload"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="跳转活动" v-if="form.type == 2 ? true : false">
                <el-select v-model="form.jumpActive" placeholder="请选择类型">
                  <el-option
                    v-for="item in active"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外跳商品" v-if="form.type == 3 ? true : false">
                <!-- <el-input v-model="form.jumpGoods"></el-input> -->
                <div
                  class="goods_msg"
                  style="width: 180px;height: 140px; border: 1px solid #ccc;padding-left:10px;box-sizing: border-box;padding-top: 5px;"
                >
                  <div style="height: 106px;width: 106px;">
                    <img :src="goodsImg" alt style="height: 106px;width: 106px;">
                  </div>
                  <p style="color: #333;display: flex;margin-top: -5px;">
                    <span style="display: block; width: 70px;" class="ellipsis">{{goodsTitle}}</span> &nbsp;&nbsp;
                    <span
                      style="display: block; width: 70px;"
                      class="ellipsis"
                    >{{goodsPrice + '元'}}</span>
                  </p>
                </div>
                <el-button
                  type="primary"
                  style="height: 30px; padding:0;width: 90px;margin-top: 20px;"
                  @click="$router.push('/selectGoods')"
                >点击选择</el-button>
              </el-form-item>
            </el-form>
            <el-form :model="form" label-width="100px">
              <el-form-item label="跳转类型">
                <el-select v-model="form.type" placeholder="请选择类型" disabled>
                  <el-option label="外跳网页" value="1"></el-option>
                  <el-option label="跳转活动" value="2"></el-option>
                  <el-option label="跳转商品" value="3"></el-option>
                  <el-option label="跳转大图" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="轮播图" class="lunbo_pic">
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changepic"
                  :auto-upload="false"
                  :on-remove="handleRemove2"
                  :auto-false="false"
                  ref="upload"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer>
            <el-button type="primary" @click="update_banner">确 定</el-button>
            <el-button style="color: #409eff" @click="$router.push('/homeSetUp')">取 消</el-button>
          </el-footer>
        </div>
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
      form: {
        name: "",
        type: "",
        status: "",
        jumpUrl: "",
        picName: "",
        jumpActive: ""
      },
      imageUrl2: "",
      isFlag: true,
      active: [],
      bicPig: "",
      imageUrl1: "",
      smallFile: "",
      bigFile: "",
      id: this.$route.query.id,
      title: "",
      oldImg: "",
      goodsImg: "",
      goodsId: "",
      goodsPrice: "",
      goodsTitle: ""
    };
  },
  created() {
    this.get_active();
    this.get_bannerDetail();
    this.goodsId = localStorage.getItem('id') || "";
    localStorage.removeItem("id");

    if (this.goodsId) {
      this.get_goodsDeatil();
    }
  },
  methods: {
    changepic(file) {
      if (this.isFlag == true) {
        this.smallFile = file;
        var _this = this;
        var event = event || window.event;
        var file = event.target.files[0];
        var reader = new FileReader();
        //转base64
        reader.onload = function(e) {
          _this.imageUrl1 = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    changeBigPic(file) {
      if (this.isFlag == true) {
        this.bigFile = file;
        var _this = this;
        var event = event || window.event;
        var file = event.target.files[0];
        var reader = new FileReader();
        //转base64
        reader.onload = function(e) {
          _this.imageUrl2 = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    handleRemove1() {
      this.imageUrl2 = "";
      this.bigFile = ''
    },
    handleRemove2() {
      this.imageUrl1 = "";
      this.smallFile = ''
    },
    update_banner() {
      if (!this.form.name) {
        return this.$message({
          type:'warning',
          message:'请输入活动名称'
        });
      }
      if (!this.form.type) {
        return this.$message({
          type:'warning',
          message:'请选择跳转类型'
        });
      }
      if (!this.form.status) {
        return this.$message({
          type:'warning',
          message:'请选择状态'
        });
      }
      if (!this.imageUrl1) {
        return this.$message({
          type:'warning',
          message:'请上传轮播图'
        });
      }
      let formData = new FormData();
      formData.append('id',this.id)
      if(this.smallFile){
        formData.append("file", this.smallFile.raw);
      }
      formData.append("name", this.form.name);
      formData.append("type", this.form.type);
      formData.append("status", this.form.status);
      if (this.form.type == 1) {
        if(!this.form.jumpUrl){
          return this.$message({
            type:'warning',
            message:'外跳网页URL不能为空'
          })
        }
        formData.append("jumpUrl", this.form.jumpUrl);
        this.send_request(formData);
      } else if (this.form.type == 2) {
        var activeName;
        if(!this.form.jumpActive){
          return this.$message({
            type:'warning',
            message:'跳转活动不能为空'
          })
        }
        this.active.forEach(item => {
          if (item.id == this.form.jumpActive) {
            activeName = item.name;
          }
        });
        formData.append('promotionName',activeName);
        formData.append('promotionId',this.form.jumpActive)
        this.send_request(formData);
      } else if (this.form.type == 3) {
        if(!this.form.goodsId){
          return this.$message({
            type:'warning',
            message:'外跳商品不能为空'
          })
        }
        formData.append("goodsId",this.goodsId);
        formData.append("goodsName",this.goodsTitle)
        this.send_request(formData);
      } else {
        if(!this.bigpicUrl && !this.bigFile){
          return this.$message({
            type:'warning',
            message:'跳转大图不能为空'
          })
        }
        if(this.bigFile){
          formData.append("bigPictrueFile", this.bigFile.raw);
        }
        this.send_request(formData);
      }
    },
    send_request(data) {
      this.$axios.post("/web_banner/update", data).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$message({
              type:'success',
              message:'修改成功'
            });
            this.$router.push('/homeSetUp');
          } else {
            this.$message({
              type:'warning',
              message:'添加失败'
            });
          }
        } 
      });
    },
    get_active() {
      this.$axios.post("/web_promotion/list").then(result => {
        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.active.push({ id: item.id, name: item.promotionName });
          });
        }
      });
    },
    get_bannerDetail() {
      this.$axios.post("/web_banner/detail", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.form.type = data.type;
          this.form.name = data.name;
          this.form.status = data.status;
          this.oldImg = data.bannerUrl;
          this.imageUrl1 = data.bannerUrl;
          if (data.type == 1) {
            this.form.jumpUrl = data.jumpUrl;
            this.title = "外跳网页修改";
          } else if (data.type == 2) {
            this.title = "跳转活动修改";
            this.form.jumpActive = data.promotionId;
          } else if (data.type == 3) {
            this.title = "跳转商品修改";
            // this.goodsId = data.goodsId;
            this.goodsImg = data.goodsPicUrl;
            this.goodsPrice = data.goodsPrice;
            this.goodsTitle = data.goodsName;
          } else {
            this.title = "跳转大图修改";
            this.imageUrl2 = data.bigpicUrl;
          }
        }
      });
    },
    get_goodsDeatil() {
      this.$axios
        .post("/web_goods/get_one", "id=" + this.goodsId)
        .then(result => {
          if (result.data.status == 0) {
            let data = result.data.data.goods;
            this.goodsImg = data.pictureUrl;
            this.goodsPrice = data.price;
            this.goodsTitle = data.name;
          }
        });
    }
  }
};
</script>

<style lang="less">
.bannermodify-container {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
    .el-select__caret.el-input__icon.el-icon-arrow-up {
      line-height: 30px;
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
      .form-container {
        height: 100%;
        box-sizing: border-box;
        background-color: #f6f6f6;
        > .el-main {
          padding: 0;
          padding-top: 80px;
          height: 530px;
          .el-form-item__label {
            text-align: left;
          }
          width: 880px;
          display: flex;
          margin: 0 auto;
          justify-content: space-around;
          .el-form-item {
            margin-bottom: 40px;
            .el-form-item__label {
              line-height: 30px;
            }
            .el-form-item__content {
              height: 30px;
              line-height: 30px;
              .el-input {
                width: 180px !important;
                height: 30px;
                .el-input__inner {
                  width: 180px;
                  height: 30px;
                  line-height: 30px;
                }
              }
            }
          }
          .el-form:first-of-type {
            width: 350px;
            .query_big_pic {
              width: 230px;
              height: 270px;
              .el-icon-plus.avatar-uploader-icon {
                width: 230px;
                height: 270px;
                line-height: 270px;
              }
              img {
                width: 230px;
                height: 270px;
              }
            }
          }
          .el-form:last-of-type {
            width: 300px;
            .lunbo_pic {
              width: 180px;
              height: 120px;
              .el-icon-plus.avatar-uploader-icon {
                width: 180px;
                height: 120px;
                line-height: 120px;
              }
              img {
                width: 180px;
                height: 120px;
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
  }
}
</style>
