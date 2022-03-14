import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

import iphoneXBottom from '@/mixins/iphoneXBottomSetAside'

// mixin处理iphone的底部
Vue.mixin(iphoneXBottom)

// 引入Vconsole
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
Vue.use(vConsole)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
