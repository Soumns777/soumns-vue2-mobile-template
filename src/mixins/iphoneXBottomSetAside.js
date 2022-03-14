/**
 * iPhoneX底部处理
 */
import { iphoneXBottomSetAside } from '@/core/mxApi'
export default {
  data() {
    return {}
  },
  watch: {},
  created() {
    if (window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && navigator.userAgent.indexOf('iPhone') > -1) {
      iphoneXBottomSetAside(1, function (res) {
        // eslint-disable-next-line
        console.log('打开自适应==>>' + res)
      })
    }
  },
  mounted() {},
  props: {},
  methods: {}
}
