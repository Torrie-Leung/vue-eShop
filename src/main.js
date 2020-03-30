import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
// import global css
import './assets/css/global.css'
// import font
import './assets/fonts/iconfont.css'
// import G2 from '@antv/g2'
// import { View } from '@antv/data-set'
// import element-ui
import elemUI from './plugins/element.js'
// import vue-table-tree-grid
import TreeTable from 'vue-table-with-tree-grid'
// import vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// import axios
import axios from 'axios'
// request root path
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// use axios interceptor to add token to request
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // this function returns config in the end
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(elemUI)
// Vue.use(G2)
// Vue.use(View)
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

// global filter
Vue.filter('timeFormat', function(originalVal) {
  const date = new Date(originalVal)
  const year = date.getFullYear()
  // The padStart() method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length.
  // The padding is applied from the start of the current string.
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  const hour = (date.getHours() + '').padStart(2, '0')
  const minute = (date.getMinutes() + '').padStart(2, '0')
  const second = (date.getSeconds() + '').padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
