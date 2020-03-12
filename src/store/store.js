import Vue from 'vue'
import Vuex from 'vuex'

// tell vue to use plugin
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isCollapse: false,
    test: true
  },
  mutations: {
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  }
})
