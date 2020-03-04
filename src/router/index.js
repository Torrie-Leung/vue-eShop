import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// hook navigation guard
router.beforeEach((to, from, next) => {
  // to: the url to visit
  // from: come from which url
  // next: the function permits the visit action
  // next() -move on to the next hook in the pipeline
  // next('./') -redirect to a different location.
  const tokenStr = window.sessionStorage.getItem('token')
  // use if/else to avoid duplicated require
  if (to.path !== '/login' && !tokenStr) {
    Vue.prototype.$message({
      message: 'please log in first',
      type: 'warning',
      duration: 2000
    })
    next('./login')
  } else {
    next()
  }
})
export default router
