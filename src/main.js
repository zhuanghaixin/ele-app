import Vue from 'vue'
import App from './App.vue'
// import MintUI from 'mint-ui'
import { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import axios from 'axios'
// import qs from 'qs'
//图片懒加载
// import VueLazyload from 'vue-lazyload'

// import VConsole from 'vconsole'

// const vConsole = new VConsole();

Vue.prototype.$axios=axios
Vue.config.productionTip = false
// Vue.use(MintUI)
Vue.use(Indicator)

//注册VueLazyload
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: '/imgs/loading-svg/loading-bubbles.svg',
//   attempt: 1
// })

// axios.defaults.baseURL="https://ele-interface.herokuapp.com/"
//请求拦截
axios.interceptors.request.use(config=>{
  // if(config.method=='post'){
  //     config.data=qs.stringify(config.data)
  // }
  //加载动画
  Indicator.open()
  return config
},error=>{
  return Promise.reject(error)
})
//响应拦截
axios.interceptors.response.use(response=>{
  Indicator.close()
  return response
},error=>{
  //错误提醒
  Indicator.close()
  return Promise.reject(error)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
