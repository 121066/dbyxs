
<template>
  <div class="addcoupon-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="优惠券名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="优惠券价值" name="2">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-input v-model="form.price" class="price"></el-input>&nbsp;
                <span style="font-weight: 600">元</span>
              </el-form-item>
              <el-form-item label="满减限制  满">
                <el-input v-model="form.limit"></el-input>&nbsp;
                <span style="font-weight: 600">元可用</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="优惠券类型" name="3">
            <el-form>
              <el-form-item label="优惠券类型" style="width: 100%;">
                <p>{{couponMsg.name}}</p>
                <span @click="select_coupon_type" style="color:#409EFF">点击选择</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="时间限制" name="4">
            <el-form label-width="80px">
              <el-form-item>
                <el-radio v-model="form.radio" label="1">有时间限制</el-radio>
                <el-radio v-model="form.radio" label="2">无时间限制</el-radio>
              </el-form-item>
              <el-form-item label="可用时间" v-if="form.radio == 1">
                <el-date-picker
                  type="datetime"
                  v-model="form.startTime"
                  @change="verfy_startTime"
                  placeholder="选择日期时间"
                  style="width:200px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <span>------</span> &nbsp;
                <el-date-picker
                  type="datetime"
                  v-model="form.endTime"
                  @change="verfy_endTime"
                  placeholder="选择日期时间"
                  style="width:200px"
                  default-time="23:59:59"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="备注" name="5">
            <el-form ref="form" :model="form" label-width="50px">
              <el-form-item>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="add_coupon">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { coupon_add } from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4", "5"],
      form: {
        name: "",
        price: "",
        limit: "",
        textarea: "",
        startTime: "",
        endTime: "",
        radio: "1"
      },
      couponMsg: { name: "", id: "" }
    };
  },
  created() {
    let msg = localStorage.getItem("msg") || "";
    let couponMsg = localStorage.getItem("couponMsg") || "";
    if (msg) {
      localStorage.removeItem("msg");
      this.form = JSON.parse(msg);
    }
    if (couponMsg) {
      localStorage.removeItem("couponMsg");
      this.couponMsg = JSON.parse(couponMsg);
    }
  },
  methods: {
    add_coupon() {
      let limitKind = "";
      if (this.form.radio == 2) {
        this.form.startTime = "";
        this.form.endTime = "";
        limitKind = 0;
      } else {
        limitKind = 1;
      }
      let data =
        "name=" +
        this.form.name +
        "&price=" +
        this.form.price +
        "&threshold=" +
        this.form.limit +
        "&source=" +
        "1" +
        "&startTime=" +
        this.form.startTime +
        "&endTime=" +
        this.form.endTime +
        "&note=" +
        this.form.textarea +
        "&typeId=" +
        this.couponMsg.id +
        "&limitKind=" +
        limitKind;
      coupon_add(data).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$router.push("/couponList");
            return this.$message({
              type: "success",
              message: "添加成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "添加失败"
            });
          }
        }
      });
    },
    select_coupon_type() {
      localStorage.setItem("msg", JSON.stringify(this.form));
      localStorage.setItem("couponMsg", JSON.stringify(this.couponMsg));
      this.$router.push("/selectCouponType");
    },
        //   校验开始时间
    verfy_startTime(){
      if(this.form.startTime == null){
        this.form.startTime = ''
      }

      if(this.form.endTime){
        this.timeCompare(1)
      }

    },
    //   校验结束时间
    verfy_endTime(){
      if(this.form.endTime == null){
        this.form.endTime = ''
      }

      if(!this.form.startTime){
        this.form.endTime = ''
        return this.$message({
          type: 'warning',
          message: '请先输入活动开始时间'
        })
      } else {
        this.timeCompare(2)
      }
    },
    //   结束时间与开始时间进行比较
    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.form.startTime)).getTime() >= (new Date(this.form.endTime)).getTime()){
        if(flag == 1){
          this.form.startTime = ''
        } else {
          this.form.endTime = ''
        }
        return this.$message({
          type: 'warning',
          message: "优惠券'可用开始时间'必须小于'可用结束时间'"
        })
      }
    }
  }
};
</script>



<style lang="less">
.addcoupon-container {
  @import "../../style/card.less";
  display: flex;
  flex-flow: column;
  height: 100%;
  .price {
    width: 70px !important;
    .el-input__inner {
      width: 70px !important;
    }
  }
  .el-collapse-item {
    &:nth-of-type(3) {
      p {
        margin-left: 30px;
      }
      span:last-of-type {
        color: #409eff;
        margin-left: 10px;
        cursor: pointer;
      }
      .el-collapse-item__wrap {
        margin-bottom: 15px;
      }
    }
    &:nth-of-type(4) {
      .el-form {
        // width: 600px;
        display: block !important;
        .el-form-item {
          width: 600px !important;
          &:nth-of-type(1) {
            margin-bottom: 20px !important;
            .el-form-item__content {
              margin-left: 0 !important;
            }
          }
        }
      }
      .el-form-item__content {
        width: 460px;
        .el-input__inner {
          width: 195px !important;
        }
        .el-input__icon.el-icon-time {
          line-height: 30px;
        }
      }
    }
    &:nth-of-type(5) {
      .el-form-item {
        width: 330px !important;
        height: 90px;
        .el-textarea__inner {
          height: 90px;
        }
      }
    }
  }
}
</style>
