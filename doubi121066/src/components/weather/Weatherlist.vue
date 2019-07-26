<template>
    <div>
        <h1>我是天气查询页面</h1>
        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062171695,4117159893&fm=26&gp=0.jpg" alt="">
    </div>
</template>
<script>
export default {
  data(){
      return{

      }
  },
  created(){
      this.getWeather()
  },
methods:{
    getWeather(){
        $.ajax({
            url:'https://api.jisuapi.com/weather/city',
            type:'get',
            dataType:'jsonp',
            data:{
                appkey:'e6e222c0b651e2a2'
            }
        }).then(res=>{
            console.log(res,12)
        })
    }
}
}
</script>
<style lang="scss" scoped>

</style>


