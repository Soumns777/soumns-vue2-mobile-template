import { Toast } from 'vant'

/**
 * @description: 校验状态码
 * @param {number} status
 */
export const checkStatus = (status) => {
  switch (status) {
    case 400:
      Toast.error('请求失败！请您稍后重试')
      break
    case 401:
      Toast.error('登录失效！请您重新登录')
      break
    case 403:
      Toast.error('当前账号无权限访问！')
      break
    case 404:
      Toast.error('你所访问的资源不存在！')
      break
    case 405:
      Toast.error('请求方式错误！请您稍后重试')
      break
    case 408:
      Toast.error('请求超时！请您稍后重试')
      break
    case 500:
      Toast.error('服务异常！')
      break
    case 502:
      Toast.error('网关错误！')
      break
    case 503:
      Toast.error('服务不可用！')
      break
    case 504:
      Toast.error('网关超时！')
      break
    default:
      Toast.error('请求失败！')
  }
}
