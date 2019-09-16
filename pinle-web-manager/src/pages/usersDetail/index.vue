<template>
  <div class="users_detail-container">
    <breadcrumb></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/usersManage')">
    <div class="content">
      <div class="content-container">
        <el-header>用户详情</el-header>
        <el-main>
          <el-row :gutter="24" style="padding-top: 0;margin: 0;">
            <el-col :span="6">
              <div class="grid-content">
                <div>会员id</div>
                <div>会员昵称</div>
                <div>头像</div>
                <div>性别</div>
                <div>生日</div>
                <div>状态</div>

              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div style="background-color: #f6f6f6">{{memberId}}</div>
                <div style="background-color: #f6f6f6">{{username}}</div>
                <div style="background-color: #f6f6f6"><img :src="imageUrl" alt="" style="width:60px;height:60px;"></div>
                <div style="background-color: #f6f6f6">{{sex}}</div>
                <div style="background-color: #f6f6f6">{{birthday}}</div>
                <div style="background-color: #f6f6f6">{{status}}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div>会员等级</div>
                <div>注册时间</div>
                <div>最后登陆时间</div>
                <div>总消费金额</div>
                <div>默认地址</div>
                <div>消费订单</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div style="background-color:#f6f6f6">{{memberGrade}}</div>
                <div style="background-color:#f6f6f6">{{createTime}}</div>
                <div style="background-color:#f6f6f6">{{lastLandTime}}</div>
                <div style="background-color:#f6f6f6">{{consumption}}</div>
                <div style="background-color:#f6f6f6" class="ellipsis">{{address}}</div>
                <div style="background-color:#f6f6f6;color:#5d70e9">{{orderCount}}</div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb },
  data(){
    return {
      id: this.$route.query.id,
      memberId: '',
      username: '',
      imageUrl: '',
      sex: '',
      status: '',
      birthday: '',
      memberGrade: '',
      createTime: '',
      lastLandTime: '',
      consumption: '',
      address: '',
      orderCount: ''
    }
  },
  created(){
    this.get_usersDetail()
  },
  methods: {
    get_usersDetail() {
      this.$axios.post("/web_user/getUser", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          var data = result.data.data;
          this.memberId = data.id;
          this.username = data.name;
          this.imageUrl = data.pictureUrl;
          this.oldImgUrl = data.pictureUrl
          if(data.gender == 1){
            this.sex = '男'
          }else{
            this.sex = '女'
          }
          if(data.status == 0){
            this.status = '冻结'
          }else {
            this.status = '正常'
          }
          if(data.birthday !== null && !data.birthday){
           this.birthday = data.birthday.split(' ')[0];
          }
          this.memberGrade = data.vipLevel;
          this.createTime = data.createtime;
          this.lastLandTime = data.lastLogintime;
          this.consumption = data.consume;
          this.address =
            data.addressProvince +
            data.addressRegion +
            data.addressTown +
            data.detailAddress;
          this.orderCount = data.orderCount
        }
      });
    },
  },

};
</script>

<style lang="less">
.users_detail-container {
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
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 80px 60px;
    .content-container {
      margin-top: 50px;
      .el-header {
        height: 60px;
        background-color: #dfe2eb;
        line-height: 60px;
        text-align: center;
        color: #5d70e9;
        margin-bottom: 1px;
      }
      .el-main {
        padding: 0;
        .grid-content {
          padding: 0;
          > div {
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #333;
            margin-bottom: 1px;
            background-color: #dfe2eb;
            font-size: 14px;

          }
        }
        .el-col.el-col-6{
            padding: 0!important;
        }
      }
    }
  }
}
</style>

