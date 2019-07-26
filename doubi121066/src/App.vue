<template>
  <div id="app" class="app-container">
    <mt-header fixed title="超级赛亚人"></mt-header>
    <transition name="myclick">
      <router-view/>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb mui-active" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/membel">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <!-- <h1>{{this.$store.state}}</h1> -->
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "你好"
    };
  },
  methods: {
   
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  margin-bottom: 50px;
}
.app-container {
  overflow-x: hidden;
}
.myclick-enter {
  opacity: 0;
  transform: translateX(100%);
}
.myclick-lenver-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.myclick-enter-active,
.myclick-lenver-active {
  transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
