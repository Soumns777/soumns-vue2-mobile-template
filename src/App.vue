<template>
  <div id="app">
    <button @click="init">get</button>
    <button @click="setup">post</button>

    <router-view />
  </div>
</template>

<script>
import soumnsHttp from './libs/http'

export default {
  methods: {
    async init() {
      const res = await soumnsHttp.get({
        url: '/mock',
        data: {
          userName: 'iu',
          password: '123'
        }
      })

      console.log(res, '💙💛 get data')
    },
    async setup() {
      const res = await soumnsHttp.post({
        url: '/mock',
        data: {
          userName: 'yoona',
          password: '3033817'
        }
      })

      console.log(res, '💙💛 post data')
    }
  },
  created() {}
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
