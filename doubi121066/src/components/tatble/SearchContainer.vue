<template>
  <div class="content">
    <div class="login-wrap">
        <form id="user_login" action="">
            <h3>登 录</h3>
            <input class="name" name="" id="accountName" type="text" placeholder="请输入用户名">
            <input class="code" name="password" id="password" type="password" placeholder="请输入密码">
            <div class="btn">
                <input type="button" id="submit" class="submit" value="登录" onclick="return check(this.form);">
                <input type="reset" id="reset"  class="reset" value="重置" >
            </div>
		<div id="CheckMsg" class="msg"></div>
        </form>
    </div>
</div>

</template>
<script>
export default {
 data() {
      return {
        form: {
          name: '',
          password:'',
          delivery: false,
          type: [],
         
        }
      }
    },
    methods: {
      onSubmit() {
   this.$refs.form
   console.log(name,password)
       if(name||password){
         console.log(name,password)
       }
      }
    }
};
</script>
<style lang="scss" scoped>
.content{
	padding:0 auto;
    margin: 0 auto;
    height: 450px;
    width: 100%;
    //background: url(../Image/Login-Img/login_bg.jpg) no-repeat center;
    background-size:100% 450px ;
    margin-top: 25px;
}
.login-wrap{
    position: absolute;
    left: 50%;
    width:320px;
    height: 300px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    // right:200px;
    //margin-top: 75px;
    margin-left: -160px;
    background: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1468212278,551660381&fm=15&gp=0.jpg') no-repeat;
    background-size: 100%;
}
.login-wrap h3{
    color:#fff;
    font-size: 18px;
    text-align: center;
}
.name,.code{
    border:1px solid #fff;
    width:230px;
    height: 40px;
    // margin-left: 25px;
    // margin-bottom: 20px;
    // padding-left: 40px;
}
.name{
    background: url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3358389957,2580769923&fm=26&gp=0.jpg') no-repeat left;
    background-position-x:12px;
}
.code{
    background: url() no-repeat left;
    background-position-x:12px;
}
.btn input{
    height: 40px;
    width: 120px;
    float: left;
    margin-right: 25px;
    border:none;
    color:#fff;
    font-size: 16px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
}
input:active{border-color:#147a62}
.submit{background: #ea8c37;margin-left: 25px;}
.reset{background: #bbb;}
/**错误信息提醒**/
.msg{
    color: #ea8c37;
    font-size: 14px;
    padding-left: 40px;
    padding-top: 10px;
    clear: both;
    font-weight: bold;
}

</style>
