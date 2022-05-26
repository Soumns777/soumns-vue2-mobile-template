import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

// 引入Vconsole
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

import iphoneXBottom from '@/mixins/iphoneXBottomSetAside'

Vue.config.productionTip = false

// mixin处理iphone的底部
Vue.mixin(iphoneXBottom)

Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
