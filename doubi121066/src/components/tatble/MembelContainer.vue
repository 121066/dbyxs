<template>
  <div>
    <h1>腾讯超级至尊心悦3尊贵会员</h1>
    <input type="button" value="点击" @click="getXiao()">
    <el-header>11</el-header>
    <el-container>内容区域</el-container>
    <el-main>我才是内容</el-main>
    <el-footer>我是你的脚</el-footer>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <div class="ad"></div>
    <div class="bd"></div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete-solid"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" plain round>主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <div>
      <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger" disabled>危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      sort: "addtime",
      appkey: "e6e222c0b651e2a2"
    };
  },
  mountes() {
    this.getXiao();
  },
  methods: {
    getXiao() {
      // (sort = "addtime"),
      //   (pagenum = 1),
      //   (pagesize = 10),
      //   (appkey = "e6e222c0b651e2a2"),
      this.$http
        .get(
          "https://api.jisuapi.com/xiaohua/pic?pagenum=?pagesize=?sort=?appkey="
        )
        .then(result => {
          //return result.jsonp();
          console.log(result, 11);
          console.log(result.jsonp(), 22);
        })
        .then(result => {
          console.log(result);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-header,
.el-footer {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.ad {
  width: 100px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.bd {
  width: 100px;
  height: 100px;
  display: inline-block;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10);
}
</style>
