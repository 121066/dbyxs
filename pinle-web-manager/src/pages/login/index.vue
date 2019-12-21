<template>
  <div class="login-container fillcontain">
    <img src="../../img/组26.png" alt>
    <h1>欢迎使用拼了APP后台管理系统</h1>
    <el-form
      ref="loginForm1"
      :model="loginForm1"
      :rules="rules"
      status-icon
      class="demo-ruleForm"
      v-if="isFlag == 1"
    >
      <el-form-item prop="phone">
        <img src="../../img/icon_tel.png" alt>
        <span></span>
        <el-input v-model="loginForm1.phone" placeholder="请输入手机号" autocomplete="off" type="number"></el-input>
        <el-button @click="sendCode" :disabled="flag == true ? true : false">{{message}}</el-button>
      </el-form-item>
      <el-form-item style="width:380px;" prop="code">
        <img src="../../img/icon_code.png" alt>
        <span></span>
        <el-input type="number" v-model="loginForm1.code" placeholder="请输入验证码" autocomplete="off" v-on:keyup.enter.native="handleLogin"></el-input>
      </el-form-item>
      <div style="text-align:right;margin-right: 20px;">
        <span
          style="color:#fff;border-bottom: 1px solid #fff;cursor: pointer"
          @click="tab_login(1)"
        >切换到密码登陆</span>
      </div>
      <el-button
        type="info"
        class="login_btn"
        @click="handleLogin"
      >登录</el-button>
    </el-form>
    <el-form
      ref="loginForm2"
      :model="loginForm2"
      :rules="rules"
      status-icon
      class="demo-ruleForm"
      v-if="isFlag == 2"
    >
      <el-form-item prop="admin">
        <img src="../../img/icon_user.png" alt>
        <span></span>
        <el-input v-model="loginForm2.admin" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="width:380px;" prop="password">
        <img src="../../img/icon_password.png" alt>
        <span></span>
        <el-input
          v-model="loginForm2.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
          v-on:keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <div style="text-align:right;margin-right: 20px;">
        <span
          style="color:#fff;border-bottom: 1px solid #fff;cursor: pointer"
          @click="tab_login(2)"
        >切换到验证码登陆</span>
      </div>
      <el-button
        type="info"
        class="login_btn"
        @click="handleLogin"
      >登陆</el-button>
    </el-form>
    <div class="footer">武汉宏远前程科技有限公司&nbsp;&nbsp;&nbsp;鄂备案号1000256</div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { send_code, login_1,login_2 } from "../../api/getData.js";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        if (!Number.isInteger(parseInt(value))) {
          return callback(new Error("验证码必须为数字"));
        } else if (value.toString().length != 6) {
          return callback(new Error("验证码必须为6位数"));
        } else {
          callback();
        }
      }
    };
    var checkAdmin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        if (value.length <= 6) {
          return callback(new Error("密码需大于6位数"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm1: {
        phone: "",
        code: ""
      },
      loginForm2: {
        admin: "",
        password: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
        admin: [{ validator: checkAdmin, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      },
      message: "发送验证码",
      flag: false,
      isFlag: 1, //  用于标记是用什方式登陆，1代表验证码登陆， 2代表密码登陆
      times: 60
    };
  },
  created() {},
  methods: {
    ...mapActions(["save_usersInfo"]),
    sendCode() {
      this.$refs.loginForm1.validateField(["phone"], valid => {
        if (valid == "") {
          this.message = "发送中-";
          this.flag = true;
          setTimeout(() => {
            this.message = "发送验证码";
            this.flag = false;
          }, 60000);
          for (var i = 60; i > 0; i--) {
            setTimeout(() => {
              this.times--;
              this.message = "剩余 " + this.times + " 秒";
            }, 60000 - i * 1000);
          }

          send_code("phone=" + this.loginForm1.phone).then(result => {
            if (result.data.status == 0) {
              if (result.data.data == 1) {
                this.$message({
                  type:'success',
                  message:'发送成功'
                });
                // this.loginForm.code = result.data.data.
              } else {
                this.$message({
                  type:'warning',
                  message:'发送失败'
                });
              }
            } 
          });
        }
      });
    },
    handleLogin() {
      if (this.isFlag == 1) {
        this.$refs.loginForm1.validate(valid => {
          if (valid) {
            login_1(
              "code=" + this.loginForm1.code + "&phone=" + this.loginForm1.phone
            ).then(result => {
              if (result.data.status == 0) {
                if (result.data.data.status == 1) {
                  // var token = result.data.data.token;
                  // let token = '1234599fsadsgfdffgsfdfggssfdf'
                  let usersInfo = result.data.data
                  this.save_usersInfo(usersInfo);
                  this.$router.push("/manage");
                  this.$message({
                    type:"success",
                    message:'登陆成功'
                  });
                } else if(result.data.data.status == 2){
                  return this.$message({
                    type:'warning',
                    message:'账号冻结'
                  })
                } else if(result.data.data.status == 3){
                  return this.$message({
                    type:'warning',
                    message:'密码错误'
                  })
                } else if(result.data.data.status == 4){
                  return this.$message({
                    type:'warning',
                    message:'用户不存在'
                  })
                } else if(result.data.data.status == 5){
                  return this.$message({
                    type:"warning",
                    message:'验证码错误'
                  })
                } else if(result.data.data.status == 6){
                  return this.$message({
                    type:'warning',
                    message:'手机号为空'
                  })
                } else if(result.data.data.status == 7){
                  return this.$message({
                    type:'warning',
                    message:'密码为空'
                  })
                } else if(result.data.data.status == 8){
                  return this.$message({
                    type:'warning',
                    message:'验证码为空'
                  })
                } else if(reuslt.data.data.status == 9){
                  return this.$message({
                    type:'warning',
                    message:'验证码超时'
                  })
                } else if(result.data.data.status == 10){
                  return this.$message({
                    type:'warning',
                    message:'验证码不正确'
                  })
                }
              } 
            });
          }
        });
      } else if (this.isFlag == 2) {
        this.$refs.loginForm2.validate(valid => {
          if (valid) {
            login_2("username=" + this.loginForm2.admin + "&password=" + this.loginForm2.password).then(result => {
              if(result.data.status == 0){
                if(result.data.data.status == 1){
                  let usersInfo = result.data.data
                  this.save_usersInfo(usersInfo)
                  this.$router.push('/manage')
                  return this.$message({
                    type:'success',
                    message:'登陆成功'
                  })
                } else if(result.data.data.status == 2){
                  return this.$message({
                    type:'warning',
                    message:'账号冻结'
                  })
                } else if(result.data.data.status == 3){
                  return this.$message({
                    type:'warning',
                    message:'密码错误'
                  })
                } else if(result.data.data.status == 4){
                  return this.$message({
                    type:'warning',
                    message:'用户名错误'
                  })
                } else if(result.data.data.status == 5){
                  return this.$message({
                    type:'warning',
                    message:'验证码错误'
                  })
                } else if(result.data.data.status == 6){
                  return this.$message({
                    type:'warning',
                    message:'手机号为空'
                  })
                } else if(result.data.data.status == 7){
                  return this.$message({
                    type:'warning',
                    message:'密码为空'
                  })
                } else if(result.data.data.status == 8){
                  return this.$message({
                    type:'warning',
                    message:'验证码为空'
                  })
                } else if(reuslt.data.data.status == 9){
                  return this.$message({
                    type:'warning',
                    message:'验证码超时'
                  })
                } else if(result.data.data.status == 10){
                  return this.$message({
                    type:'warning',
                    message:'验证码不正确'
                  })
                }
              }
            })
          }
        });
      }
    },
    tab_login(type) {
      if (type == 1) {
        this.isFlag = 2;
      } else {
        this.isFlag = 1;
      }
    }
  }
};
</script>

<style lang="less" >
.login-container {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .el-form-item__content {
    margin-left: 0 !important;
    width: 100%;
    left: 0;
    height: 52px;
  }
  background-image: url("../../img/组25.png");
  background-repeat: repeat;
  background-size: 100% 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 17%;
    width: 18.2%;
    left: 50%;
    transform: translateX(-50%);
  }
  h1 {
    font-size: 22px;
    font-weight: normal;
    color: #fff;
    position: absolute;
    top: 32%;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-form {
    position: absolute;
    top: 45%;
    width: 380px;
    left: 50%;
    transform: translateX(-50%);
    .el-form-item {
      .el-form-item__content {
        position: relative;
        > button {
          position: absolute;
          top: 50%;
          right: -140px;
          transform: translateY(-50%);
          width: 100px;
          height: 32px;
          padding: 0;
          border-radius: 6px;
          background-color: transparent;
          margin-left: 40px;
          color: #fff;
        }
        img {
          position: absolute;
          top: 50%;
          left: 20px;
          height: 27px;
          width: 19px;
          z-index: 999;
          transform: translateY(-50%);
        }
        > span {
          width: 1px;
          height: 34px;
          position: absolute;
          background-color: #ccc;
          top: 50%;
          left: 52px;
          z-index: 999;
          transform: translateY(-50%);
        }
        &:first-child {
          display: flex;
          align-items: center;
        }
      }
    }
    .login_btn{
      margin-top: 30px;
      width:200px;
      height: 50px;
      border-radius: 25px;
      background-color: #393b6a;
      border:none;
      span{
        display: block;
      }
    }
    .el-input {
      width: 380px;
      height: 52px;
      .el-input__inner {
        height: 52px;
        border-radius: 26px;
        padding-left: 65px;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 60px;
    background-color: #393b6a;
    color: #fff;
  }
}
</style>
