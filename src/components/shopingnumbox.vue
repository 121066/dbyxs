<template>
<!-- <div> -->
     <div class="nav">
          <van-stepper :value="initcount" integer min='0' max='10'
          input-width='40px' button-size='20px' class="int" @change="countChanged"
          ref="numbox"/>
      </div>
<!-- </div> -->
</template>
<script>
export default {
    data(){
        return{
            value:''
        }
    },
    methods:{
        countChanged(value){
            this.value=value
           // console.log(this.$refs.numbox.value)
            console.log(this.value)
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count:this.value
            })
        }
    },
    props:['initcount','goodsid']
}
</script>
<style lang="less" scoped>
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
</style>