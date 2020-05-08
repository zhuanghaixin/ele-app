 import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

 const routes = [
   {
     path: '/',
     name: 'index',
     component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
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
//  router.beforeEach(to,from,next){
//
//  }




export default router
