import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import global css
import './assets/css/global.css'
// import font
import './assets/fonts/iconfont.css'
// import G2 from '@antv/g2'
// import { View } from '@antv/data-set'
// import element-ui
import elemUI from './plugins/element.js'
// import axios
import axios from 'axios'
// request root path
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// use axios' interceptor to add token to request
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // must to return config in the end
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(elemUI)
// Vue.use(G2)
// Vue.use(View)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
