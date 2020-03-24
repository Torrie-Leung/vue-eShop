import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/users/Users'
import Rights from '../components/rights/Rights'
import Assignment from '../components/rights/Assignment'
import Cate from '../components/goods/Cate'
import Params from '../components/goods/Params'
import List from '../components/goods/List'
import Report from '../components/report/Report'

Vue.use(VueRouter)

// define router
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    // nested router
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Assignment },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: List },
      { path: '/reports', component: Report }
    ]
  }
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
