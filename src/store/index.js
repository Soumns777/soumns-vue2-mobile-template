import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user/index'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  modules: {
    User
  }
})
