import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Homecontainer from "../components/tatble/Homecontainer.vue";
import MembelContainer from "../components/tatble/MembelContainer.vue";
import SearchContainer from "../components/tatble/SearchContainer.vue";
import ShopcarContainer from "../components/tatble/ShopcarContainer.vue";
import NewList from "../components/new/NwesList.vue";
import NewsInfo from "../components/new/NewsInfo.vue";
import PhotoList from "../components/photolist/PhotoList.vue";

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/home",
      component: Homecontainer
    },
    {
      path: "/membel",
      component: MembelContainer
    },
    {
      path: "/shopcar",
      component: ShopcarContainer
    },
    {
      path: "/Search",
      component: SearchContainer
    },
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/home/newslist",
      component: NewList
    },
    {
      path: "/home/newsinfo/:id",
      component: NewsInfo
    },
    {
      path: "/home/photolist",
      component: PhotoList
    }
  ],
  linkActiveClass: "mui-active"
});

// var isLogin = true;
// router.beforeEach((to, from, next) => {
//   if (to.path !== "/home") {
//     if (isLogin) {
//       return next();
//     } else {
//       return next("/login");
//     }
//   }
//   next();
// });
var isLogin = true;
router.beforeEach((to, from, next) => {
  if (to.path !== "/home") {
    //当去往
    if (isLogin) {
      return next();
    } else {
      return next("/home");
    }
  }
  next();
});
export default router;
