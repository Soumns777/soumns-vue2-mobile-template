<template>
  <div class="container"></div>
</template>

<script>
import { uploadImgs } from '@/services/request'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    this.uploadImgs()
  },
  methods: {
    /**
     * 上传图片示例
     */
    async uploadImgs() {
      let formData = new FormData()
      formData.append('uName', 'iu')
      formData.append('age', '17')

      const res = await uploadImgs(formData)
      console.log(res, '💛💙 上传图片')
    }
  }
}
</script>

<style scoped lang="scss"></style>
