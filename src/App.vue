<template>
  <div id="app">
    <button @click="init">init</button>

    <button @click="setup">setup</button>
    <router-view />
  </div>
</template>

<script>
import { soumnsGet } from '@/libs/SHttp'
import { axiosGet } from './services/request'

export default {
  methods: {
    async init() {
      const res = await soumnsGet({
        url: '/mock',
        data: {
          userName: 'iu',
          password: '123'
        }
      })

      console.log(res, '💙💛 soumnsGet data')
    },
    async setup() {
      // try {
      //   const res = await axiosGet({
      //     url: '/mock',
      //     data: {
      //       userName: 'iu',
      //       password: '123'
      //     }
      //   })
      //   console.log(res, '💙💛 axiosGet data')
      // } catch (error) {
      //   console.log(error, '💙💛 error')
      // }
      const res = await axiosGet({
        url: '/mock',
        data: {
          userName: 'iu',
          password: '123'
        }
      })
      console.log(res, '💙💛 axiosGet data')
    }
  },
  created() {
    // this.init()
  }
}
</script>

<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
