<template>
  <div class="promoters_detail-container">
    <breadcrumb></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.push('/promotersManage')">
    <div class="content">
      <div class="content-container">
        <el-header>推广员详情</el-header>
        <el-main>
          <el-row :gutter="24" style="padding-top: 0;margin: 0;">
            <el-col :span="6">
              <div class="grid-content">
                <div>姓名</div>
                <div>绑定手机</div>
                <div>微信</div>
                <div>性别</div>

              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div style="background-color: #f6f6f6">{{name}}</div>
                <div style="background-color: #f6f6f6">{{tel}}</div>
                <div style="background-color: #f6f6f6">{{wechart}}</div>
                <div style="background-color: #f6f6f6">{{sex}}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div>加入时间</div>
                <div>生日</div>
                <div>团队名称</div>
                <div>状态</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <div style="background-color:#f6f6f6">{{joinTime}}</div>
                <div style="background-color:#f6f6f6">{{birthday}}</div>
                <div style="background-color:#f6f6f6">{{teamName}}</div>
                <div style="background-color:#f6f6f6">{{status}}</div>
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
import {promoters_detail} from '../../api/getData'
export default {
  components: { breadcrumb },
  data(){
    return {
      id: this.$route.query.id,
        name: '',
        tel: '',
        wechart: '',
        sex: '',
        joinTime: '',
        birthday: '',
        teamName: '',
        status: '',
    }
  },
  created(){
    this.get_promoters_detail()
  },
  methods: {
    get_promoters_detail(){
      promoters_detail('id=' + this.id).then(res => {
        if(res.data.status == 0){
          let data = res.data.data
          this.name = data.promoterName 
          this.tel = data.phone 
          this.wechart = data.wechat
          if(data.sex == 1){
            this.sex = '男'
          } else {
            this.sex = '女'
          }
          this.joinTime = data.puttime
          this.birthday = data.promoterBirthday
          this.teamName = data.teamName
          if(data.status == 0){
            this.status = '注销'
          } else {
            this.status = '正常'
          }
        }
      })
    }
  },

};
</script>

<style lang="less">
.promoters_detail-container {
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

