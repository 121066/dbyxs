<template>
    <div id="bts">
        <h1>天气查询</h1>
        <!-- <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062171695,4117159893&fm=26&gp=0.jpg" alt=""> -->
        <input type="text" id="citys" value="" placeholder="请输入查询城市" v-model="city" v-on:input="testHand">
        <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" @click="getWeath()" >查询</button>
        <table>
            <tr>
                <td>日期</td>
                <td>白天天气</td>
                <td>最高温度</td>
                <td>最低温度</td>
                <td>风向</td>
                <td>风力</td>
                <td>风速</td>
                <td>湿度温度</td>
                <td>城市</td>
                <td>星期</td>
            </tr>
            <tbody >
                <tr >
                    <td>{{list.date}}</td>
                    <td>{{list.weather}}</td>
                    <td>{{list.temphigh}}</td>
                    <td>{{list.templow}}</td>
                    <td>{{list.winddirect}}</td>
                    <td>{{list.windpower}}</td>
                    <td>{{list.windspeed}}</td>
                    <td>{{list.humidity}}</td>
                    <td>{{list.city}}</td>
                    <td>{{list.week}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
  data(){
      return{
         city:'' ,
         list:{}
      }
  },
  created(){
      this.getWeather()
      this.getWeathers()
      this.getWeath()
      this.bts()
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
    },
     testHand(e) {
     return this.city = e.target.value;
      //console.log(this.city);
    },
    getWeath(){
    //  var city=$('#citys').val()
    var city=this.city
    //var that=this
    var list={}
        //console.log(city,2)
         $.ajax({
           url:'https://api.jisuapi.com/weather/query',
           type:'get',
           dataType:'jsonp',
        
           data:{
            city,
            appkey:'e6e222c0b651e2a2'
           }   
       }).then(res=>{
           console.log(res.result,1)
           this.list=res.result
           console.log(this.list,22)
       })

    },
    getWeathers(){
      
    },
    bts(){
        this.bts.onmouseover=function(){
            console.log(9)
        }
    }
}
}
</script>
<style lang="scss" scoped>
div{
    height: 600px;
    background:url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062171695,4117159893&fm=26&gp=0.jpg')
}
table{
    border: 1px solid #ccc;
}
tr{
    width: 100%;
    display: flex
}
td{
    width: 10%;
    height: 70px;
    border: 1px solid orange;
    overflow: hidden;
    color: red
}
h1:hover{
    font-weight: 400;
    background-color: skyblue;
    
    color: burlywood;
}
h1{
    box-shadow: 0 0 5px rgba(0, 0, 0, 10);
    font-weight: 200;
    color: red;
}
</style>


