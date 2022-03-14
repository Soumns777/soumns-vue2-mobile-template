import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import iphoneXBottom from '@/mixins/iphoneXBottomSetAside'

// mixin处理iphone的底部
Vue.mixin(iphoneXBottom)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
