<template>
  <div id="app">
    <button @click="init">点击</button>
    <router-view />
  </div>
</template>

<script>
import { soumnsGet } from '@/libs/SHttp'

export default {
  methods: {
    init() {
      soumnsGet({
        url: '/mock',
        data: {
          userName: 'iu',
          password: '123'
        }
      }).then((res) => console.log(res, 'setup data 💙💛'))
      // .catch((err) => console.log(err.message, '真的错了'))
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
