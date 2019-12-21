<template>
    <div class="by">
        <h3>购物车</h3>
      <div class="main" v-for="item in list" :key="item.id">
          <van-checkbox v-model="$store.getters.getGoodsSelected[item.id]" class="check"
          @click="toggle(item.id,$store.getters.getGoodsSelected[item.id])"
          ref='checkbox'
          ></van-checkbox>
      <img :src="item.banelurl" alt="" class="imgs"/>
      <!-- </template> -->
      <div class="box">
          <p>{{item.goodsname}}</p>
          <span>￥{{item.price}}.00</span>
      </div>
       <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
    <!-- <van-button square type="danger" text="删除" style="height:100%;"/> -->
<div class="side" @click.prevent="remove(item.id)">
删
除
</div>
     </div>
   
<div class="footer">
 <div><van-checkbox  >全选</van-checkbox></div>
 <span>共{{$store.getters.getGoodsCountAndAmount.count}}件</span>
 <button>{{$store.getters.getGoodsCountAndAmount.amount}}元</button>
</div>
    </div>
</template>
<script>
import numbox from '../components/shopingnumbox.vue'
export default {
    data(){
        return{
            checked:true,
           // value:'',
            id:this.$route.query.id||[],
            list:[],
            goodsinfo:{},
            selectedCount:1
        }
    },
    created(){
        this.getlist()
       // this.getadd()
       //console.log(this.$store.getters.getGoodsCount[item.id])
    },
    methods:{
        onClose(clickPosition, instance) {
      switch (clickPosition) {
       // case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
            console.log('确定删除吗')
        //   Dialog.confirm({
        //     message: '确定删除吗？'
        //   }).then(() => {
        //     instance.close();
        //   });
          break;
      }
    },
    getlist(){
        console.log(typeof this.id)
        //var ids=this.id.split(' ')
        var ids=[]
        this.$store.state.car.forEach(item=>{
            ids.push(item.id)
        })
        console.log(ids)
        this.$axios.post('/goods/detas').then(res=>{
            res.data.message.forEach(item=>{
                ids.forEach(item1=>{
                    if(item.id==item1){
                        return this.list.push(item)
                    }
                })
            })
            console.log(this.list)
        })
    },
    getadd(){
      
    },
    selectedChanged(id,val){
        console.log(val)
        console.log('22')
      //  this.$store.commit('updateGoodsSelected',{id,selected:val})
    },
    toggle(id,val){
        console.log(val)
        //console.log(this.$refs.checkbox[2].value)
        this.$store.commit('updateGoodsSelected',{id,selected:val})
    },
    remove(id){
        console.log(id)
       // console.log(index,'index')
       const obj=[]
       this.list.forEach(item=>{
           if(item.id==id){
               return  this.list.pop(item)
           }
       })
       console.log(obj)
        this.$store.commit('removes',id)
       // this.getlist()
    }
    },
    components:{
        numbox
    }
}
</script>
<style lang="less" scoped>
.by{
    background-color: #fff;
}
img{
    width: 100px;
    height: 100px;
    box-shadow: 3px 3px 3px #fda;
    border-radius: 10px;
}

    .check{
        width: 5%;
        // line-height: 100px;
        // margin-top: 50px;
    }
   
    .main{
        display: flex;
        height: 116px;
       // flex-direction: column;
       justify-content: space-evenly;
        flex-wrap: nowrap;
       align-self: auto;
        border: 1px dashed #fda;
            margin: 5px;
            background: linear-gradient(to right,#efb,#9ff,#fcc);
            box-shadow: 1px 1px 1px 1px aqua;
        .box{
          // height: 100%;
          flex: 1;
          align-items: center;
           // margin-left: 10px;
           width: 100%;
            display: inline;
            >span{
                color: #ff3333;
            }
            >p{
               font-size: 12px;
                width: 170px !important;
               // padding: 10px 0;
               // margin-top: -10px; 
              // line-height: 20px;
            }
           
        }
           .nav{
               // width: 140px;
               padding: 5px 0;
                height: 50px !important;
            .int{
                margin: 50px 0 0 0!important;
               // width: 40px;
               // padding: 10px 0;
               height: 40px;
                /deep/.van-stepper__input{
                    margin: 10px 0;
                    width: 40px;
                }
            }
            }
            .side{
              //  border: 1px dashed #ccc;
                width: 30px;
                background-color: #f81212;
                line-height: 60px;
                color: #fff;
                font-weight: 500;
                // display: none;
            }
    }
  
   
    .btn{
        width: 50px;
        height: 100%;
        text-align: right;
    }

.footer{
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
    >div{
        position: absolute;
        top: 35%;
    }
    span{
        width: 50px;
        height: 30px;
        position: absolute;
        top: 30%;
        right:  30%;
    }
    button{
        position: absolute;
        top: 20%;
        right: 10%;
        width: 60px;
        border: none;
        color: #fff;
        border-radius: 10px;
        background-color: #cc0000;
    }
}
</style>