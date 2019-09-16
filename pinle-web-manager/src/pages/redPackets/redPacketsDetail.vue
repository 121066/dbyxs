
<template>
  <div class="redpac_detail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="红包名称" name="1">
            <el-form label-width="80px">
              <el-form-item label="名称">{{name}}</el-form-item>
              <el-form-item label="创建时间">{{createtime}}</el-form-item>
              <el-form-item label="状态">{{type}}</el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="红包价值" name="2">
            <el-form label-width="80px">
              <el-form-item>{{price}} &nbsp;&nbsp;元</el-form-item>
              <el-form-item label="满减限制  满">
                {{threshold}} &nbsp;
                <span style="font-weight: 600">元可用</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="红包类型" name="3">
            <el-form>
              <el-form-item label="红包类型"></el-form-item>
            </el-form>
            <p>{{couponName}}</p>
          </el-collapse-item>
          <el-collapse-item title="时间限制" name="4">
            <el-form label-width="80px">
              <el-form-item label="可用时间" v-if="limitKind == 1">
                <span style="padding: 0 20px">{{startTime}}</span>
                <span style="color: #000;font-weight: 600">------</span> &nbsp;
                <span style="padding: 0 20px">{{endTime}}</span>
              </el-form-item>
              <el-form-item label="无时间限制" v-else> </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="红包来源" name="5">
            <span style="color:#666;margin-left: 30px;">{{source}}</span>
          </el-collapse-item>
          <el-collapse-item title="备注" name="6">
            <el-form label-width="50px">
              <el-form-item>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
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
import {
  red_packet_detail,
  red_packet_type_detail
} from "../../api/getData.js";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4", "5"],
      textarea: "",
      id: this.$route.query.id,
      name: "",
      createtime: "",
      startTime: "",
      threshold: "",
      endTime: "",
      source: "",
      price: "",
      couponId: "",
      couponName: "",
      type: "",
      limitKind: '',
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    get_detail() {
      let data = "id=" + this.id;
      red_packet_detail(data).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.name = data.name;
          this.createtime = data.createtime;
          this.price = data.price;
          this.threshold = data.threshold;
          this.startTime = data.startTime;
          this.endTime = data.endTime;
          if (data.source == 1) {
            this.source = "手动创建";
          } else {
            this.source = "自动创建";
          }
          if (data.type == 0) {
            this.type = "已过期";
          } else if (data.type == 1) {
            this.type = "可使用";
          } else {
            this.type = "未开始";
          }
          this.couponId = data.typeId;
          this.textarea = data.note;
          this.limitKind =data.limitKind
          this.get_red_packet();
        }
      });
    },
    get_red_packet() {
      let data = "id=" + this.couponId;
      red_packet_type_detail(data).then(result => {
        if (result.data.status == 0) {
          this.couponName = result.data.data.name;
        }
      });
    }
  }
};
</script>



<style lang="less">
.redpac_detail-container {
  @import "../../style/card.less";
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
  .el-collapse-item {
    &:nth-of-type(3) {
      p {
        margin-left: 30px;
        margin-top: 10px;
        display: inline-block;
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
        width: 600px;
        .el-form-item {
          width: 600px !important;
        }
      }
      .el-form-item__content {
        width: 460px;
        .el-input__inner {
          width: 195px !important;
        }
        .el-input__icon.el-icon-time {
          line-height: 15px;
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
