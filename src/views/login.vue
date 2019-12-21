<template>
<div>
    <div class="box">
        <p> <button type="text">登录</button> <button type="text">注册</button> </p>
        <input type="text" placeholder="请输入用户名" class="login" value="" v-model="username">
        <input type="password" placeholder="请输入密码" class="main" value="" v-model="password">
        <span><button @click="Login">登录</button> </span>
    </div>

</div>
</template>
<script>
export default {
   // name:'login',
    data(){
        return{
            username:'',
            password:''
        }
    },
    created(){

    },
    methods:{
        Login(){
            
            this.$axios.post('/getuser',{username:this.username,password:this.password}).then(res=>{
                console.log(res)
                alert(res)
                if(res.data.err_code==1){
                    alert('121')
                    this.$axios.post('/user',{user:this.username,password:this.password}).then(res=>{
                        if(res.data.err_code==1)return alert('注册失败')
                        window.sessionStorage.setItem('token',res.data.jwt)
                        this.$router.push('/home')
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
div{
    background-color: #eee;
}
.box{
    width: 250px;
    height: 350px;
    border: 1px solid #ccc;
    margin: 0 auto;
    // position: relative;
}
p>button{
    border: 0;
    background: aqua;
    color: #ccc;
}
.login{
   // border: none;
   border:1px solid #ccc;
    list-style: none;
    height: 40px;
    box-shadow: 3px 3px 3px aquamarine;
    border-radius: 20px;
    padding: 0 5px;
    margin: 5px 0;
}
.main{
    border: none;
    list-style: none;
    height: 40px;
    box-shadow: 3px 3px 3px aqua;
    border-radius: 20px;
    padding: 0 5px;
}
span{
    position: absolute;
    width: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
}
span>button{
    width: 70px;
    height: 30px;
    background-color: turquoise;
    border:0;
    border-radius: 15px;
    color: #fff;
}
.login:hover{
   // border: 1px salmon solid;
}
</style>