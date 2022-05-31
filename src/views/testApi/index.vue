<template>
  <div id="app">
    <button @click="init">get</button>
    <button @click="setup">post</button>
  </div>
</template>

<script>
import { getMock, postMock } from '@/services/request'

export default {
  name: 'testApi',
  methods: {
    async init() {
      const res = await getMock({
        userName: 'yoona',
        password: '123'
      })

      console.log(res, '💙💛 getMock')
    },
    async setup() {
      const res = await postMock({
        name: 'iu',
        age: 18
      })

      console.log(res, '💙💛 postMock')
    }
  },
  created() {}
}
</script>

<style lang="scss"></style>
