import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'testApi'
    }
  },
  {
    path: '/testApi',
    name: 'testApi',
    component: () => import('@/views/testApi/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
