<template>
  <div class="coupon_type_detail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="优惠券类型名称" name="1">
            <el-form  label-width="80px">
              <el-form-item label="名称">
                <span>{{name}}</span>
              </el-form-item>
              <el-form-item label="创建时间" style="margin-left: 30px;">
                <span>{{createtime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="试用场景" name="2">
            <div class="radio">
              <el-radio v-model="radio" label="1" v-if="radio == 1" disabled>全场通用</el-radio>
              <el-radio v-model="radio" label="2" v-if="radio == 2" disabled>部分活动通用</el-radio>
              <el-radio v-model="radio" label="3" v-if="radio == 3" disabled>部分商品类型通用</el-radio>
              <el-radio v-model="radio" label="4" v-if="radio == 4" disabled>部分活动商品类型通用</el-radio>
              <el-radio v-model="radio" label="5" v-if="radio == 5" disabled>部分商品可用</el-radio>
            </div>
            <div class="msg" v-if="radio == 2">
              <div class="msg_one" v-for="(item, index) in checkList2" :key="index">
                <span>
                  <el-checkbox v-model="item.checked" disabled>{{item.label}}</el-checkbox>
                </span>
              </div>
            </div>
            <div class="msg" v-if="radio == 4">
              <div class="msg_one" v-for="(item, index) in checkList4" :key="index">
                <span>{{item.label}}</span>
                <div class="goodsType">
                  <div v-for="(item1, index1) in item.typeList" :key="index1">{{item1.label}}</div>
                </div>
              </div>
            </div>
            <div class="msg" v-if="radio == 5">
              <div class="msg_one" v-for="(item, index) in checkList5" :key="index">
                <span>
                  <i class="el-icon-caret-bottom"></i>&nbsp;
                  {{item.label}}
                </span>
                <div class="goodsType">
                  <div v-for="(item1, index1) in item.typeList" :key="index1">
                {{item1.label}}
                    <span>({{item1.store}})</span>

                  </div>
                </div>
              </div>
            </div>
            <div class="msg" v-if="radio == 3 ">
              <div class="msg_one goodsType" v-for="(item, index) in goodsTypeList" :key="index">
                <span>
                  <el-checkbox v-model="item.checked1" disabled>{{item.label}}</el-checkbox>
                </span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="优惠券类型备注" name="3">
            <el-form label-width="50px">
              <el-form-item>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="note"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import {coupon_type_detail} from '../../api/getData.js'
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2"],
      radio: "",
      id: this.$route.query.id,

        name: "",
        note: "",
        createtime: "",

      goodsTypeList: [
        // { checked: false, label: "家电" },
        // { checked: false, label: "衣服" },
        // { checked: false, label: "酒水" },
        // { checked: false, label: "奢侈品" },
        // { checked: false, label: "零食" }
      ],
      checkList2: [
      ],
      checkList4: [
        {
          checked: false,
          label: "平台商城",
          id: 1,
          typeList: []
        },
        {
          checked: false,
          label: "七折拼团",
          id: 2,
          typeList: []
        },
        {
          checked: false,
          label: "五折拼团",
          id: 3,
          typeList: []
        },
        {
          checked: false,
          label: "9.9折拼团",
          id: 4,
          typeList: []
        },
        {
          checked: false,
          label: "十单免一",
          id: 6,
          typeList: []
        },
        {
          checked: false,
          label: "限时秒杀",
          id: 12,
          typeList: []
        },
        {
          checked: false,
          label: "新人免费拿",
          id: 11,
          typeList: []
        },
        {
          checked: false,
          label: "新人专区",
          id: 10,
          typeList: []
        }
      ],
      checkList5: [
        { id: 1,  label: "平台商城", typeList: [] },
        { id: 2,  typeList: [], label: "七折拼团" },
        { id: 3, typeList: [], store:'', label: "五折拼团" },
        {
          id: 4,
          typeList: [],

          label: "9.9折拼团"
        },
        {
          id: 6,
          typeList: [],

          label: "十单免一"
        },
        { id: 12, typeList: [],label: "限时秒杀" },
        { id: 11, typeList: [],label: "新人免费拿" },
        { id: 10, typeList: [],label: "新人专区" }
      ],
      goodsType: "",
      activityTyep: ""
    };
  },
  created() {
    this.get_detail()
  },
  methods: {

    get_detail(){
      let data= 'id=' +this.id
      coupon_type_detail(data).then(result => {
        console.log(result)
        if(result.data.status == 0) {
          let data = result.data.data 
          this.createtime = data.createtime
          this.name = data.name
          this.radio = data.type
          this.note = data.note
          data.promotions.forEach(item => {

              this.checkList2.push({label:item.promotionName,checked:true})
          })
          data.gooodsTypes.forEach(item => {


                this.goodsTypeList.push({label:item.name,checked1:true})
              
          })
          data.promotionGoodsTypes.forEach(item => {
            
            this.checkList4.forEach(item1 => {
              if(item.promotionId == item1.id){
                item1.typeList.push({label:item.goodsTypeName})
              }
            })
          })
          data.goodses.forEach(item => {
            this.checkList5.forEach(item1 =>{
              if(item.promotionId == item1.id) {
                item1.typeList.push({label:item.goodsTypeName,store:item.store})
              }
            })
          })

        }
      })
    }
  }
};
</script>



<style lang="less">
.coupon_type_detail-container {
  @import '../../style/cardType.less';
  display: flex;
  flex-flow: column;
  height: 100%;
    position: relative;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }

}
</style>
