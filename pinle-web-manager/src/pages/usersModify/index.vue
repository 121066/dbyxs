
<template>
  <div class="usersmodify-container fillcontain">
    <breadcrumb style="position: absolute;width: 100%;z-index:9;"></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">
    <el-main>
      <el-header>修改用户信息</el-header>
      <el-main>
        <div class="form-container">
          <el-form label-width="85px">
            <el-form-item label="会员Id">
              <el-input v-model="form.memberId" disabled></el-input>
            </el-form-item>
            <el-form-item label="账号昵称">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="头像" style="height: 60px" class="img">
              <el-upload
                class="avatar-uploader"
                :action="''"
                :on-change="changepic1"
                :auto-upload="false"
                :on-remove="handleRemove1"
                :auto-false="false"
                style="height: 60px;width: 60px;"
              >
                <i class="el-icon-delete" @click.stop="handleRemove_pic()" v-show="imageUrl"></i>
                <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:60px;height: 60px;">
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                  style="width: 60px;height: 60px;"
                ></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日">
              <div class="block">
                <el-date-picker v-model="form.birthday" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status">
                <el-option label="冻结" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员等级">
              <el-input v-model="form.memberGrade" disabled></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="110px" style="width: 400px;">

            <el-form-item label="注册时间">
              <el-input v-model="form.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="最后登陆时间">
              <el-input v-model="form.lastLandTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="总消费金额">
              <el-input v-model="form.consumption" disabled></el-input>
            </el-form-item>
            <el-form-item label="收货人姓名">
              <el-input v-model="form.addressName" ></el-input>
            </el-form-item>
            <el-form-item label="收货人电话">
              <el-input v-model="form.addressPhone" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="请选则省市区">
              <el-cascader :options="options" @active-item-change="handleItemChange" :props="props"></el-cascader>
            </el-form-item>-->
            <el-form-item class="address" label="请选择地址">
              <addressDetail></addressDetail>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.detailAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-container">
          <el-button type="primary" @click="updatedUserDetail">确定</el-button>
          <el-button style="color: #409EFF" @click="$router.go(-1)">取消</el-button>
        </div>
      </el-main>
    </el-main>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import addressDetail from "../../components/address";
import { mapActions } from "vuex";
export default {
  components: { breadcrumb, addressDetail },
  data() {
    return {
      form: {
        username: "",
        memberId: "",
        sex: "",
        birthday: "",
        status: "",
        memberGrade: "",
        createTime: "",
        lastLandTime: "",
        consumption: "",
        detailAddress: "",
        addressUserId:'',
        addressName:'',
        addressPhone:''
      },
      addressId: "",
      id: this.$route.query.id,
      imageUrl: "",
      oldImgUrl: "",
      isFlag1: true,
      file: null,
      options1: [
        // {
        //   label: "江苏",
        //   cities: []
        // },
        // {
        //   label: "浙江",
        //   cities: []
        // }
      ],
      options2: [],
      options3: []
    };
  },
  created() {
    this.get_usersDetail();
    // this.get_province();
    // this.handleChange();
  },
  methods: {
    ...mapActions(["save_address"]),
    changepic1(file) {
      // type : 用于判断是第几张图片
      if (this.isFlag1 == true) {
        this.file = file.raw;
        var _this = this;
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = function(e) {
          _this.imageUrl = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    handleRemove1() {
      this.imageUrl = "";
    },
    get_usersDetail() {
      this.$axios.post("/web_user/getUser", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          var data = result.data.data;
          this.form.memberId = data.id;
          this.form.username = data.name;
          this.imageUrl = data.pictureUrl;
          this.oldImgUrl = data.pictureUrl;
          this.form.sex = data.gender;
          this.form.status = data.status;
          this.form.addressUserId = data.addressUserId
          this.form.addressName = data.addressName
          this.form.addressPhone = data.addressPhone
          this.form.birthday = data.birthday;
          // if (data.status == 0) {
          //   this.form.status = "冻结";
          // } else {
          //   this.form.status = "正常";
          // }
          this.form.memberGrade = data.vipLevel;
          this.form.createTime = data.createtime;
          this.form.lastLandTime = data.lastLogintime;
          this.form.consumption = data.consume;
          this.form.detailAddress = data.detailAddress;
          // this.form.address = data.detailAddress;
          // this.form.province = data.addressProvince;
          // this.form.city = data.addressRegion;
          this.save_address({
            province: data.addressProvince,
            city: data.addressRegion,
            area: data.addressTown
          });
          this.addressId = data.addressId;
        } 
      });
    },
    handleRemove_pic(){
      this.imageUrl = ''
    },
    updatedUserDetail() {
      if(!this.form.username){
        return this.$message({
          type:'warning',
          message:'账号昵称不能为空'
        })
      }
      // if(!this.imageUrl && !this.file){
      //   return this.$message({
      //     type:'warning',
      //     message:'用户图像不能为空'
      //   })
      // }
      // if(!this.form.sex){
      //   return this.$message({
      //     type:'warning',
      //     message:'用户性别不能为空'
      //   })
      // }
      // if(!this.form.birthday){
      //   return this.$message({
      //     type:'warning',
      //     message:'用户生日不能为空'
      //   })
      // }
      // if(!this.form.status){
      //   return this.$message({
      //     type:'warning',
      //     message:'用户状态不能为空'
      //   })
      // }
      // if(!this.addressDetail.province || !this.addressDetail.city || !this.form.detailAddress){
      //   return this.$message({
      //     type:'warning',
      //     message:'地址不能为空'
      //   })
      // }
        let formData = new FormData();
      let user = { name: this.form.username, id: this.id };
      if (this.oldImgUrl == this.imageUrl) {
        formData.append("pictureUrl", this.imageUrl);
        // user["pictureUrl"] = this.imageUrl;
      } else {
        formData.append("file", this.file);
      }

      // formData.append('user',JSON.stringify(user))
      formData.append("name", this.form.username);
      formData.append("id", this.id);
      formData.append("gender", this.form.sex);
      // let time = new Date(this.form.birthday).getTime();

      formData.append("birthday", this.form.birthday);
      formData.append("status", this.form.status);
      //         // "addressType": "1",
      formData.append("addressId", this.addressId);
      formData.append("addressName", this.form.addressName);
      formData.append("addressUserId", this.form.addressUserId);
      formData.append("addressPhone", this.form.addressPhone);
      formData.append("addressProvince", this.addressDetail.province);
      formData.append("addressRegion", this.addressDetail.city);
      formData.append("addressTown", this.addressDetail.area);
      formData.append("detailAddress", this.form.detailAddress);
      // formData.append('userAddress',JSON.stringify(userAddress))
      this.$axios.post("/web_user/modify_user", formData).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$message({
              type:"success",
              message:'修改成功'
            });
            this.$router.push("/usersManage");
          }
        }
      });
    }
  },
  computed: {
    addressDetail() {
      return this.$store.state.addressDetail;
    }
  }
};
</script>

<style lang="less">
.usersmodify-container {
  position: relative;
  // 更改图标的样式
  .el-input__icon {
    line-height: 30px;
  }
  .el-upload.el-upload--text {
    height: 60px;
  }
  .img {
    .el-form-item__label {
      line-height: 60px !important;
    }
  }
  .el-upload {
    position: relative;
    > i {
      &:first-of-type {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999999;

        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          color: #409eff;
        }
      }
    }
    &:hover > i:first-of-type {
      display: block;
    }
  }
  // 图像上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 60px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  > .el-main {
    height: 100%;
    padding: 70px 50px 30px;
    background-color: #eff3f6;
    position: relative;
    .el-header {
      line-height: 50px;
      height: 50px !important;
      text-align: center;
      color: #5d70e9;
      position: absolute;
      width: 100%;
      background-color: #eff3f6;
    }
    > .el-main {
      height: 100%;
      background: #f6f6f6;
      .form-container {
        padding: 0;

        padding-top: 50px;
        display: flex;
        .el-input__inner {
          width: 280px;
          height: 30px;
        }
        .el-form {
          margin-top: 80px;

          width: 365px;
          margin-left: 60px;
          .el-form-item {
            height: 30px;

            .el-form-item__label {
              line-height: 30px;
              text-align: left;
            }
            .el-form-item__content {
              line-height: 30px;
            }
            .el-input {
              width: 280px;
            }
          }
          .address {
            color: #666;
            width: 450px;
            .el-form-item__content {
              margin-left: 0 !important;
            }
            .el-select {
              width: 100px;
              .el-input.el-input--suffix {
                width: 100px;
                .el-input__inner {
                  width: 100px;
                }
              }
            }
          }
          &:last-of-type {
            margin-left: 100px;
          }
        }
        .el-textarea__inner {
          width: 280px;
        }
        .el-textarea {
          width: 280px;
        }
      }
      .btn-container {
        margin-top: 100px;
        text-align: center;
        button {
          margin: 0 70px;
          width: 60px;
          height: 30px;
          padding: 0;
        }
      }
    }
  }
}
</style>

