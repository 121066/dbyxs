<template>
  <div class="coupon_type_modify-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="优惠券类型名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
                            <el-form-item label="创建时间" style="margin-left: 150px;">
                              <span>{{form.createtime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="试用场景" name="2">
            <div class="radio">
              <el-radio v-model="radio" label="1">全场通用</el-radio>
              <el-radio v-model="radio" label="2">部分活动通用</el-radio>
              <el-radio v-model="radio" label="3">部分商品类型通用</el-radio>
              <el-radio v-model="radio" label="4">部分活动商品类型通用</el-radio>
              <el-radio v-model="radio" label="5">部分商品可用</el-radio>
              <span class="explain" @mouseenter="show_introduce" @mouseleave="hide_introduce">
                <i class="el-icon-question"></i>&nbsp;使用说明
              </span>
            </div>
            <div class="msg" v-if="radio == 2">
              <div class="msg_one" v-for="(item, index) in checkList2" :key="index">
                <span>
                  <i class="el-icon-caret-bottom"></i>&nbsp;
                  <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                </span>
              </div>
            </div>
            <div class="msg" v-if="radio == 4">
              <div class="msg_one" v-for="(item, index) in checkList4" :key="index">
                <span>
                  <i class="el-icon-caret-bottom"></i>&nbsp;
                  <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                </span>
                <div class="goodsType">
                  <div v-for="(item1, index1) in item.typeList" :key="index1">
                    <el-checkbox 
                      v-model="item1.checked" 
                      @change="isSelected(item.id)"
                    >{{item1.label}}</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="msg" v-if="radio == 5">
              <div class="msg_one" v-for="(item, index) in checkList5" :key="index">
                <span>
                  <i class="el-icon-caret-bottom"></i>&nbsp;
                  <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                </span>
                <div class="goodsType">
                  <div v-for="(item1, index1) in item.typeList" :key="index1">
                    <el-checkbox
                      v-model="item1.checked"
                      @change="isSelected_five(item.id)"
                    >{{item1.label}}</el-checkbox>&nbsp;
                    <span>({{item1.ids.length}})</span>
                    <i class="el-icon-edit" @click="select_goods( item1.id,item.id,item1.ids)"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="msg" v-if="radio == 3 ">
              <div class="msg_one goodsType" v-for="(item, index) in goodsTypeList" :key="index">
                <span>
                  <el-checkbox v-model="item.checked1">{{item.label}}</el-checkbox>
                </span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="优惠券类型备注" name="3">
            <el-form ref="form" :model="form" label-width="50px">
              <el-form-item>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
                      <div style="width: 600px;" class="introduce" ref="introduce">
                <span>1.若选择“全场通用”，则平台都可使用，以后平台添加的商品也可使用</span>
                <span>2.若选择“部分活动通用”，则选择的活动都可以使用，以后这些活动添加的商品也可以使用；</span>
                <span>3.若选择“部分商品类型通用”，则选择的类型都可以使用，以后这些类型添加的商品也可使用；</span>
                <span>4.若选择“部分活动商品类型通用”，则选择的对应活动的对应类型可用，后期增加的商品也可用；</span>
                <span>5.若选择“部分商品可用”，则只有当前选择的商品可用。</span>
              </div>
        <el-footer>
          <el-button type="primary" @click="coupon_modify">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { coupon_type_detail, coupon_type_modify } from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2"],
      radio: "1",
      form: {
        name: "",
        textarea: "",
        createtime: '',
      },
      id: this.$route.query.id,
      goodsTypeList: [],
      checkList2: [
        {
          checked: false,
          label: "平台商城",
          id: 1
        },
        {
          checked: false,
          label: "七折拼团",
          id: 2
        },
        {
          checked: false,
          label: "五折拼团",
          id: 3
        },
        {
          checked: false,
          label: "9.9折拼团",
          id: 4
        },
        {
          checked: false,
          label: "十单免一",
          id: 6
        },
        {
          checked: false,
          label: "限时秒杀",
          id: 12
        },
        {
          checked: false,
          label: "新人免费拿",
          id: 11
        },
        {
          checked: false,
          label: "新人专区",
          id: 10
        }
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
        { id: 1, checked: false, label: "平台商城", typeList: [] },
        { id: 2, checked: false, typeList: [], label: "七折拼团" },
        { id: 3, typeList: [], checked: false, label: "五折拼团" },
        {
          id: 4,
          typeList: [],
          checked: false,
          label: "9.9折拼团"
        },
        {
          id: 6,
          typeList: [],
          checked: false,
          label: "十单免一"
        },
        { id: 12, typeList: [], checked: false, label: "限时秒杀" },
        { id: 11, typeList: [], checked: false, label: "新人免费拿" },
        { id: 10, typeList: [], checked: false, label: "新人专区" }
      ],
      goodsType: "",
      activityTyep: ""
      
    };
  },
  created() {},
  methods: {
            show_introduce(){
      console.log(1243)
      this.$refs.introduce.style.display = 'block'
    },
        hide_introduce(){
     this.$refs.introduce.style.display = 'none'
    },
    get_goodsType() {
      this.$axios.post("/web_goods_type/select_box").then(result => {
        console.log(result);
        if (result.data.status == 0) {
          let data = result.data.data;

          data.forEach(item => {
            this.goodsTypeList.push({
              id: item.id,
              label: item.name,
              checked1: false
            });
          });

          this.checkList4.forEach(item => {
            let goodsTypeList = [];
            data.forEach(item1 => {
              goodsTypeList.push({
                id: item1.id,
                label: item1.name,
                checked: false
              });
            });
            item.typeList = goodsTypeList;
          });
          this.checkList5.forEach(item => {
            let goodsTypeList = [];
            data.forEach(item1 => {
              goodsTypeList.push({
                id: item1.id,
                label: item1.name,
                checked: false,
                ids: []
              });
            });
            item.typeList = goodsTypeList;
          });
          console.log(this.checkList5);
        }
      });
    },
    select_goods(goodsType, activityTyep, ids) {
      this.goodsType = goodsType;
      this.activityTyep = activityTyep;
      localStorage.setItem(
        "msg",
        JSON.stringify({ goodsType, activityTyep, ids })
      );
      this.$router.push("/coupon_selectGoods");
    },
    get_detail(id) {
      let data = "id=" + id;
      coupon_type_detail(data).then(result => {
        console.log(result);
        if (result.data.status == 0) {
          let data = result.data.data;
          this.createtime = data.createtime;
          this.form.name = data.name;
          this.radio = data.type;
          this.form.textarea = data.note;
          this.form.createtime = data.createtime
          data.promotions.forEach(item => {
            this.checkList2.forEach(item1 => {
              if (item1.id == item.id) {
                console.log("------------------");
                item1.checked = true;
              }
            });
          });
          console.log(this.radio);
          data.gooodsTypes.forEach(item => {
            this.goodsTypeList.forEach(item1 => {
              if (item.id == item1.id) {
                item1.checked1 = true;
              }
            });
          });
          data.promotionGoodsTypes.forEach(item => {
            this.checkList4.forEach(item1 => {
              if (item.promotionId == item1.id) {
                item1.checked = true;
                item1.typeList.forEach(item2 => {
                  if (item.goodsTypeId == item2.id) {
                    item2.checked = true;
                  }
                });
              }
            });
          });
          data.goodses.forEach(item => {
            this.checkList5.forEach(item1 => {
              if (item.promotionId == item1.id) {
                item1.checked = true;
                item1.typeList.forEach(item2 => {
                  if (item.goodsTypeId == item2.id) {
                    console.log("-----------------------------");
                    item2.checked = true;
                    item2.ids = item.goodsId.split(",");
                  }
                });
              }
            });
          });
          console.log(this.checkList5);
        }
      });
    },
    coupon_modify() {
      let couponTypeDetailVo = {
        id: this.id,
        name: this.form.name,
        type: this.radio,
        note: this.form.textarea,
        promotionList: [],
        gooodsTypes: [],
        promotions: [],
        goodsIds: []
      };
      if (this.radio == 1) {
        couponTypeDetailVo = couponTypeDetailVo;
      } else if (this.radio == 2) {
        // console.log(this.checkList2)
        let promotions = [];
        this.checkList2.forEach(item => {
          if (item.checked == true) {
            promotions.push({ id: item.id, promotionName: item.label });
          }
        });
        couponTypeDetailVo.promotions = promotions;
      } else if (this.radio == 3) {
        let gooodsTypes = [];
        this.goodsTypeList.forEach(item => {
          if (item.checked1 == true) {
            gooodsTypes.push({ id: item.id, name: item.label });
          }
        });
        couponTypeDetailVo.gooodsTypes = gooodsTypes;
      } else if (this.radio == 4) {
        let promotionList = [];
        this.checkList4.forEach(item => {
          let couponTypePromotionVo = [];
          let goodsTypeList = [];
          if (item.checked == true) {
            couponTypePromotionVo = {
              id: item.id,
              promotionName: item.label
            };
            item.typeList.forEach(item1 => {
              if (item1.checked == true) {
                goodsTypeList.push({ id: item1.id, name: item.label });
              }
            });
            promotionList.push({ couponTypePromotionVo, goodsTypeList });
          }
        });
        couponTypeDetailVo.promotionList = promotionList;
      } else if (this.radio == 5) {
        let goodsIds = [];
        this.checkList5.forEach(item => {
          if (item.checked == true) {
            item.typeList.forEach(item1 => {
              if (item1.checked == true) {
                goodsIds = [...goodsIds, ...item1.ids];
              }
            });
          }
        });
        couponTypeDetailVo.goodsIds = goodsIds;
      }
      console.log(couponTypeDetailVo);
      let data = "couponTypeDetailVo=" + JSON.stringify(couponTypeDetailVo);
      coupon_type_modify(data).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$router.push("/couponType");
            return this.$message({
              type:'success',
              message:'修改成功'
            });
          } else {
            return this.$message({
              type:'warning',
              message:'修改失败'
            });
          }
        }
      });
    },
    isSelected(id) {
      this.checkList4.forEach(item => {
        if (item.id == id) {
          let flag = "";
          flag = item.typeList.some(item1 => {
            return item1.checked;
          });
          console.log(flag);
          if (flag) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        }
      });
    },
    isSelected_five(id) {
      this.checkList5.forEach(item => {
        if (item.id == id) {
          let flag = "";
          flag = item.typeList.some(item1 => {
            return item1.checked;
          });
          console.log(flag);
          if (flag) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        }
      });
    }
  },

  activated() {
    if (this.$route.meta.isBack) {
      console.log("123------------");
      this.form = {
        name: "",
        textarea: "",
        createtime: ''
      };
      this.radio = 1;
      this.goodsTypeList = [];
      this.id = this.$route.query.id
      this.checkList2 = [
        {
          checked: false,
          label: "平台商城",
          id: 1
        },
        {
          checked: false,
          label: "七折拼团",
          id: 2
        },
        {
          checked: false,
          label: "五折拼团",
          id: 3
        },
        {
          checked: false,
          label: "9.9折拼团",
          id: 4
        },
        {
          checked: false,
          label: "十单免一",
          id: 6
        },
        {
          checked: false,
          label: "限时秒杀",
          id: 12
        },
        {
          checked: false,
          label: "新人免费拿",
          id: 11
        },
        {
          checked: false,
          label: "新人专区",
          id: 10
        }
      ];
      this.checkList4 = [
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
      ];
      this.checkList5 = [
        { id: 1, checked: false, label: "平台商城", typeList: [] },
        { id: 2, checked: false, typeList: [], label: "七折拼团" },
        { id: 3, typeList: [], checked: false, label: "五折拼团" },
        {
          id: 4,
          typeList: [],
          checked: false,
          label: "9.9折拼团"
        },
        {
          id: 6,
          typeList: [],
          checked: false,
          label: "十单免一"
        },
        { id: 12, typeList: [], checked: false, label: "限时秒杀" },
        { id: 11, typeList: [], checked: false, label: "新人免费拿" },
        { id: 10, typeList: [], checked: false, label: "新人专区" }
      ];
      this.get_goodsType();
      this.get_detail(this.$route.query.id);

      // 如果isBack是true，表明需要充值数据
    } else {
      this.$route.meta.isBack = true
      let ids = localStorage.getItem("ids") || "";
      if (ids) {
        localStorage.removeItem("ids");
        this.checkList5.forEach(item => {
          if (item.id == this.activityTyep) {
            item.checked = true
            item.typeList.forEach(item1 => {
              if (item1.id == this.goodsType) {
                console.log("-------------------------");
                item1.ids = JSON.parse(ids);
                item1.checked = true
              }
            });
          }
        });
        console.log(this.checkList5);
      }
    }
    // 恢复成默认的true，避免isBack一直是false，导致下次无法获取数据
  }
};
</script>



<style lang="less">
.coupon_type_modify-container {
  @import "../../style/cardType.less";
  display: flex;
  flex-flow: column;
  height: 100%;
        .el-main{
        position: relative;
      }
        .introduce{
          position:absolute;
          z-index: 999999;
          right: 60px;
          top: 130px;
          display: none;
          font-size: 12px;
          span{
            display:block;
            line-height: 20px;color:#333;
          }
        }
}
</style>
