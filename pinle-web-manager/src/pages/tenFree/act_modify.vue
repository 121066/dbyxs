<template>
  <div class="ten_add-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="活动名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="formData.actname" placeholder="请输入活动名称"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品定制" name="2">
            <el-form class="goods_select">
              <el-form-item label="目标商品">
                <div class="goods">
                  <img :src="formData.goods.picture" alt />
                  <div class="goods_msg" v-if="formData.goods.picture">
                    <p class="ellipsis">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="formData.goods.name"
                        placement="bottom"
                      >
                        <span>{{formData.goods.name}}</span>
                      </el-tooltip>
                    </p>
                    <p class="ellipsis">原价: {{formData.goods.price + '元'}}</p>
                  </div>
                </div>
                <span @click="select_goods">点击选择</span>
              </el-form-item>
              <el-form-item label="商品价格:" style="width: 200px;">
                <el-input v-model="formData.price" style="width: 100px;"></el-input>
                <span>元</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="规则制定" name="3">
            <div class="legend" style="color: #409eff">
             <i class="el-icon-question"></i>&nbsp; <span>团队获得佣金，随机幸运团员获得佣金的值需为小于等于100的正整数。</span>
            </div>
            <div class="rule" v-for="(item, index) in formData.rules" :key="index">
              <div>
                <span>人数达 :</span>
                <!-- <el-input type="number" v-model="item.num" placeholder="请输入人数" ></el-input> -->
                <el-select v-model="item.num" placeholder="请输入人数" >
                  <el-option
                    v-for="item in formData.nums"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  ></el-option>
                </el-select>
                <span>人</span>
              </div>
              <div>
                <span>团队获得佣金 :</span>
                <el-input type="number" v-model="item.commission"  @change="verfy_value(item.commission)"></el-input>
                <span>%</span>
              </div>
              <div>
                <span>随机幸运团员获得佣金 :</span>
                <el-input type="number" v-model="item.randomComm" @change="verfy_value(item.commission)"></el-input>
                <span>%</span>
              </div>
              <i class="el-icon-error" @click="del_rule(index)"></i>
            </div>
            <el-button type="primary" icon="el-icon-plus" @click="add_rules">添加</el-button>
          </el-collapse-item>
          <el-collapse-item title="时间约束" name="4">
            <el-form>
              <el-form-item label="活动超时时间 :">
                <el-input style="width: 80px;" v-model="formData.failureTime"></el-input>
                <span>分钟</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="tenFree_update">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { goods_detail, tFreeO_modify,tFreeO_detail } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      id:this.$route.query.id,
      formData: {
        actname: "",
        goods: {
          picture: "", //  商品的图片
          name: "", //  商品的名称
          price: "", //  商品的价格
          id: '',  // 目标商品的id不能为空 
        },
        rules: [],
        nums: [
          { key: "1", label: 1 },
          { key: "2", label: 2 },
          { key: "3", label: 3 },
          { key: "4", label: 4 },
          { key: "5", label: 5 },
          { key: "6", label: 6 },
          { key: "7", label: 7 },
          { key: "8", label: 8 },
          { key: "9", label: 9 },
          { key: "10", label: 10 }
        ],
        failureTime: '',  //  活动超时时间
        price: '', //  商品价格
      }
    };
  },
  created() {
    let msg = localStorage.getItem("msg") || "";

    if (msg) {
      localStorage.removeItem("msg");
      this.formData = JSON.parse(msg);
    } else {
      this.act_detail()
    }
    let id = localStorage.getItem("id") || "";
    if (id) {
      localStorage.removeItem("id");
      this.goodsDetail(id);
    }
  },
  methods: {
    select_goods() {
      localStorage.setItem("msg", JSON.stringify(this.formData));
      this.$router.push("/tActivity_select?type=6");
    },
    goodsDetail(id) {
      goods_detail("id=" + id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.goods;
          this.formData.goods.picture = data.pictureUrl;
          this.formData.goods.name = data.name;
          this.formData.goods.price = data.price;
          this.formData.goods.id = data.id;
        }
      });
    },
    add_rules() {
      if (this.formData.rules.length == 0) {
        return this.formData.rules.push({
          num: "",
          commission: "",
          randomComm: "",
          id: 1
        });
      }
      this.formData.rules.push({
        num: "",
        commission: "",
        randomComm: "",
        id: this.formData.rules[this.formData.rules.length - 1]["id"] + 1
      });
    },
    del_rule(index) {
      this.formData.rules.splice(index, 1);
    },
    //   对规则指定中的人数进行校验，不能出现重复的人数
    check_num(index) {
      for (var i = 0; i < this.formData.rules.length; i++) {
        for (var j = i + 1; j < this.formData.rules.length; j++) {
          if (this.formData.rules[i].num && this.formData.rules[j].num) {
            if (this.formData.rules[i].num === this.formData.rules[j].num) {
              this.formData.rules.forEach((item, index1) => {
                if (index == index1) {
                  item.num = "";
                }
              });
              return this.$message({
                type: "warning",
                message: "不能出现重复的人数"
              });
            }
          }
        }
      }
    },
    tenFree_update(){
      if(!this.formData.actname){
        return this.$message({
          type: 'warning',
          message: '活动名称不能为空'
        })
      }
      if(!this.formData.goods.id){
        return this.$message({
          type: 'warning',
          message:"目标商品不能为空，请添加目标商品"
        })
      }
      this.formData.rules.forEach(item => {
        if(!item.num){
          return this.$message({
            type: 'warning',
            message: '拼团人数不能为空'
          })
        }
        if(item.commission === ''){
          return this.$message({
            type: 'warning',
            message: '团队获得佣金不能为空'
          })
        }
        if(item.randomComm === ''){
          return this.$message({
            type: 'warning',
            message: '随机幸运团员获得佣金不能为空'
          })
        }


      })

              if(!this.formData.failureTime){
          return this.$message({
            type: 'warning',
            message: '活动超时时间不能为空'
          })
        }
        if(!this.formData.price){
          return this.$meesage({
            type: 'wanring',
            message: '商品价格不能为空'
          })
        }
                // var formData = new FormData() 
        // formData.append('activityName',this.formData.actname)
        // formData.append('failureTime',this.formData.failureTime)
        // formData.append('goodsId',this.formData.goods.id)
        // formData.append('goodsPrice',this.formData.price)
      var activityRules = []
      this.formData.rules.forEach(item => {
        activityRules.push({
          peopleNumber:item.num,
          leaderCommission: item.commission,
          luckyCommission: item.randomComm
        })
        // formData.append('activityRules',JSON.stringify({
        //   peopleNumber:item.num,
        //   leaderCommission: item.commission,
        //   luckyCommission: item.randomComm
        // }))


      })
      //var formData = 'activityName=' + this.formData.actname + '&failureTime=' + this.formData.failureTime + '&goodsId=' +this.formData.goods.id + '&goodsPrice=' + this.formData.price + '&activityRules=' + JSON.stringify(activityRules)
      var formData = {id:this.id,activityName:this.formData.actname,failureTime:this.formData.failureTime,goodsId:this.formData.goods.id,goodsPrice:this.formData.price,activityRules:activityRules}
      tFreeO_modify(formData).then(res => {
          if(res.data.status == 0){
            if(res.data.data == 1){
              this.$router.push('/tActivity_list')
              return this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              return this.$message({
                type: 'warning',
                message: '修改失败'
              })
            }
          }
        })
      
    },
    act_detail(){
      tFreeO_detail('id=' + this.id).then(res => {
        if(res.data.status == 0){
          var data = res.data.data
          this.formData.actname = data.activityName  //   商品活动名称
          this.formData.goods.picture =  data.goodsPictureUrl  //  商品的图片
          this.formData.goods.name = data.goodsName  //  商品的名称
          this.formData.goods.price =data.originalPrice  //  商品的原始价格
          this.formData.goods.id = data.goodsId   //  商品的id
          this.formData.price = data.goodsPrice  //  商品的价格
          this.formData.failureTime = data.failureTime  //  活动超时时间
          data.activityRules.forEach(item => {
            this.formData.rules.push({num:item.peopleNumber,commission:item.leaderCommission,randomComm:item.luckyCommission,id:item.id})
          })

        }
      })
    },
    verfy_value(value){
      if(parseInt(value) > 100){
        return this.$message({
          type: 'warning',
          message: '输入的值必须为小于等于100的整数'
        })
      }
    }
  }
};
</script>



<style lang="less">
.ten_add-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  .el-tag__close.el-icon-close:hover {
    background-color: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: hidden;
    .el-main {
      background-color: #fff;
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            border-bottom: 1px solid #e4e5e7;
            .el-collapse-item__arrow {
              margin: 0;
              margin-left: 10px;
            }
          }
          .el-collapse-item__wrap {
            margin-top: 20px;
            border: none;
            .el-collapse-item__content {
              padding: 0;
              padding-left: 15px;
            }
          }
          &:nth-of-type(3) {
            .el-collapse-item__content {
              .el-button {
                width: 60px;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    //   所有的input框样式
    .el-input {
      width: 200px;
      // height: 30px;
      .el-input__inner {
        height: 30px;
      }
    }

    //   商品展示
    .goods_select {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 360px;
        margin-right: 38px;
        margin-bottom: 15px;
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .goods {
            width: 180px;
            height: 70px;
            padding: 5px;
            box-sizing: border-box;
            border: 1px solid #bbbfc2;
            display: flex;

            img {
              width: 60px;
              height: 60px;
              margin-right: 10px;
            }
            .goods_msg {
              flex: 1;
              width: 95px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              p {
                width: 100%;
              }
            }
          }
          > span {
            cursor: pointer;
            height: 20px;
            color: #0066ff;
          }
        }
      }
    }
    //  活动规则
    .rule {
      display: flex;
      line-height: 40px;

      > div {
        margin-right: 40px;
      }
      .el-input {
        width: 80px;
      }
      > i {
        font-size: 20px;
        line-height: 40px;
        display: none;
        color: #409eff;
        // right: -30px;
        // top: 50%;
        // transform: translateY(-50%);
      }
      &:hover > i {
        display: block;
      }
    }
    .el-footer {
      margin-top: 70px;
      text-align: center;
      > button {
        height: 30px !important;
        line-height: 30px;
        padding: 0;
        width: 60px;
        margin: 0 70px;
        // box-sizing: content-box;
      }
    }
  }
}
</style>
