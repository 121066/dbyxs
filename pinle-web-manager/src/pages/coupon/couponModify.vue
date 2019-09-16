
<template>
  <div class="coupon_modify-container">
    <breadcrumb style></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="优惠券名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="创建时间">{{form.createtime}}</el-form-item>
              <el-form-item label="状态">{{'已过期'}}</el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="优惠券价值" name="2">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-input v-model="form.price" class="price"></el-input>&nbsp;
                <span style="font-weight: 600">元</span>
              </el-form-item>
              <el-form-item label="满减限制  满">
                <el-input v-model="form.threshold"></el-input>&nbsp;
                <span style="font-weight: 600">元可用</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="优惠券类型" name="3">
            <el-form>
              <el-form-item label="优惠券类型"></el-form-item>
            </el-form>
            <p>{{form.couponName}}</p>
            <span @click="select_couponType">点击选择</span>
          </el-collapse-item>
          <el-collapse-item title="时间限制" name="4">
            <el-form label-width="80px">
              <el-form-item>
                <el-radio v-model="form.radio" label="1">有时间限制</el-radio>
                <el-radio v-model="form.radio" label="0">无时间限制</el-radio>
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
          <el-collapse-item title="优惠券来源" name="5">
            <span style="color:#666;margin-left: 30px;">{{form.source == 1 ? '手动创建' : '自动创建'}}</span>
          </el-collapse-item>
          <el-collapse-item title="备注" name="6">
            <el-form ref="form" :model="form" label-width="50px">
              <el-form-item>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.note"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer>
          <el-button type="primary" @click="update_coupon">确 定</el-button>
          <el-button style="color: #409eff" @click="$router.go(-1)">取 消</el-button>
        </el-footer>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import {
  coupon_detail,
  coupon_type_detail,
  coupon_modify
} from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4", "5"],
      id: this.$route.query.id,
      form: {
        name: "",
        price: "",
        threshold: "",
        textarea: "",
        note: "",
        startTime: "",
        endTime: "",
        createtime: "",
        source: "1",
        couponId: "",
        radio: "",
        couponName: ""
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
    } else {
      this.get_counponDetail();
    }
    if (couponMsg) {
      localStorage.removeItem("couponMsg");
      this.couponMsg = JSON.parse(couponMsg);
      this.form.couponName = this.couponMsg.name;
      this.form.couponId = this.couponMsg.id;
    }
  },
  methods: {
    //   获取优惠券的信息
    get_counponDetail() {
      let data = "id=" + this.id;
      coupon_detail(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.form = data;
          this.form.couponId = data.typeId;
          this.form.radio = data.limitKind;
          this.get_couponType_detail();
        }
      });
    },
    //  获取优惠券的使用范围
    get_couponType_detail() {
      let data = "id=" + this.form.couponId;
      coupon_type_detail(data).then(result => {
        if (result.data.status == 0) {
          this.$set(this.form,'couponName',result.data.data.name)
          this.form.couponName = result.data.data.name;
        }
      });
    },
    //  选择优惠券类型
    select_couponType() {
      localStorage.setItem("msg", JSON.stringify(this.form));
      this.$router.push("/selectCouponType");
    },
    //  修改优惠券
    update_coupon() {
      if (this.form.radio == 0) {
        this.form.startTime = "";
        this.form.endTime = "";
      }
      let data =
        "id=" +
        this.id +
        "&name=" +
        this.form.name +
        "&typeId=" +
        this.form.couponId +
        "&price=" +
        this.form.price +
        "&threshold=" +
        this.form.threshold +
        "&source=" +
        this.form.source +
        "&startTime=" +
        this.form.startTime +
        "&endTime=" +
        this.form.endTime +
        "&note=" +
        this.form.note +
        "&createtime=" +
        this.form.createtime +
        "&limitKind=" +
        this.form.radio;
      coupon_modify(data).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$router.push("/couponList");
            return this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            return this.$message({
              type: "warning",
              message: "修改失败"
            });
          }
        }
      });
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
.coupon_modify-container {
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
        color: #666;
        margin-top: 10px;
        margin-left: 30px;
        display: inline-block;
      }
      span:last-of-type {
        margin-top: 10px;

        color: #409eff;
        margin-left: 10px;
        cursor: pointer;
      }
      .el-collapse-item__wrap {
        margin-bottom: 10px;
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
    &:nth-of-type(6) {
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
