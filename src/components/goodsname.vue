<template> 
 <div class="box">
     <div class="main" v-for="item in this.listA" :key="item.id" @click="$router.push('/images?id='+item.id)">
         <img :src="item.url" alt="">
         <p>{{item.name}}</p>
     </div>
 </div>
</template>
    <script>
        export default {
          //  props:["listA","getlist"],
            data(){
                return{
                    listA:[]
                }
            },created(){
                this.goodsList()
            },
            methods:{
                goodsList(){
                    this.$axios.get('/goods').then(res=>{
                        console.log(res)
                        this.listA=res.data.message
                    })
                },
               getlist(id){
                   console.log(id)
                   this.$router.push('/goodsdetail?id='+id-1)
               }
            }
        }
        </script>
        <style lang="less" scoped>
        .box{
           // width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .main{
            width: 25%;
            height: 60px;
            margin-top: 30px;
        }
        .main>img{
            width: 60px;
        }
        .main>p{
            color: #ccc;
        }
        </style>