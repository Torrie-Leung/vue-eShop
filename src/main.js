import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import global css
import './assets/css/global.css'
// import font
import './assets/fonts/iconfont.css'
// import element-ui
import elemUI from './plugins/element.js'
// import axios
import axios from 'axios'
// request root path
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(elemUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
