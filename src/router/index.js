import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // name: 'index',
        component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
        children: [
            {
                path: "",
                redirect: '/home',

            },
            {
                path:'/home',
                name:'Home',
                component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
            },
            {
                path:'/order',
                name:'Order',
                component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
            },
            {
                path:'/me',
                name:'Me',
                component: () => import(/* webpackChunkName: "about" */ '../views/Me.vue')
            },
            {
                path: '/address',
                name: 'Address',
                component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue'),
            },
            {
                path:'/city',
                name:'City',
                component: () => import(/* webpackChunkName: "about" */ '../views/City.vue'),
            }

        ]
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
        const isLogin = localStorage.ele_login ? true : false
        if (to.path == '/login') {
            next()
        } else {
            //是否在登录状态下
            isLogin ? next() : next("/login")
        }
    }
)


export default router
