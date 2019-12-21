import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomeContainer from '../components/tabbar/HomeContainer.vue'
import MemberContainer from '../components/tabbar/MemberContainer.vue'
import ShopcarContainer from '../components/tabbar/ShopcarContainer.vue'
import SearchContainer from '../components/tabbar/SearchContainer.vue'
import NewsList from '../components/news/NewsList.vue'
import NewsInfo from '../components/news/NewsInfo.vue'
import Photolist from '../components/photolist/Photolist.vue'
import PhotoInfo from '../components/photolist/PhotoInfo.vue'
import Goodslist from '../components/goods/GoodsList.vue'
import Goodsinfo from '../components/goods/GoodsInfo.vue'
import Goodsdesc from '../components/goods/GoodsDesc.vue'
import GoodsComment from '../components/goods/GoodsComment.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/home',
      component: HomeContainer
    }, {
      path: '/member',
      component: MemberContainer
    }, {
      path: '/shopcar',
      component: ShopcarContainer
    },
    {
      path: '/search',
      component: SearchContainer
    }, {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home/newslist',
      component: NewsList
    }, {
      path: '/home/newsinfo/:id',
      component: NewsInfo
    }, {
      path: '/home/photolist',
      component: Photolist
    }, {
      path: '/home/photoinfo/:id',
      component: PhotoInfo
    }, {
      path: '/home/goodslist',
      component: Goodslist
    }, {
      path: '/home/goodsinfo/:id',
      component: Goodsinfo,
      name: 'goodsinfo'
    },
    {
      path: '/home/goodsdesc/:id',
      component: Goodsdesc,
      name: 'goodsdesc'
    },
    {
      path: '/home/goodscomment/:id',
      component: GoodsComment,
      name: 'goodscomment'
    }

  ],
  linkActiveClass: 'mui-active'
})
