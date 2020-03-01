import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import global css
import './assets/css/global.css'
// import font
import './assets/fonts/iconfont.css'
// import element-ui
import elemUI from './plugins/element.js'

Vue.config.productionTip = false
Vue.use(elemUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
