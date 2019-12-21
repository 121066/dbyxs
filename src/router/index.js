import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login'
import Homelist from '@/pages/homelist'
import Search from '@/pages/search.vue'
import Shoping from '../pages/shoping.vue'
import Information from '@/components/list/information.vue'
import Images from '@/components/list/images.vue'
import Phone from '@/components/list/phone.vue'
import User from '@/pages/user.vue'
import Goodsdetail from '@/components/list/goodsdetail.vue'
import Goodsname from '@/components/goodsname.vue'
import Charge from '@/components/list/charge.vue'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '*',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: []
        },
        {
            path: '/homelist',
            component: Homelist
        },
        {
            path: '/home/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/home/shoping',
            name: 'Shoping',
            component: Shoping
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/information',
            name: 'Information',
            component: Information
        },
        {
            path: '/images',
            name: 'Images',
            component: Images
        }, {
            path: '/phone',
            name: 'Phone',
            component: Phone
        }, {
            path: '/user',
            name: 'User',
            component: User
        }, {
            path: '/goodsdetail',
            name: 'Goodsdetail',
            component: Goodsdetail
        }, {
            path: '/goodsname',
            name: 'Goodsname',
            component: Goodsname
        }, {
            path: '/charge',
            name: 'Charge',
            component: Charge
        }

    ]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router