import Axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'

/**
 * get status code
 */
const getErrorCode2text = response => {
  const code = response.status
  let message = 'Request Error'
  switch (code) {
    case 400:
      message = 'Request Error'
      break
    case 401:
      message = 'Unauthorized, please login'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '访问资源不存在'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '位置错误'
      break
    case 501:
      message = '承载服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务暂不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = '暂不支持的 HTTP 版本'
      break
    default:
      message = '位置错误'
  }
  return message
}

/**
 * service
 */
const service = Axios.create({
  timeout: 10000,
  headers: {
    'content-type': 'application/json' // post请求传递json格式数据,node才能接收到
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  service.defaults.baseURL = 'http://66.1.42.194:80'
} else if (process.env.NODE_ENV === 'production') {
  service.defaults.baseURL = 'https://www.production.com'
}

/**
 * @description 请求发起前的拦截器
 */
service.interceptors.request.use(async config => {
  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  const token = store.state.countApply.token
  token && (config.headers.Authorization = token)
  // console.log(config, '--->请求拦截器');
  return config
})

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async response => {
    // console.log(response, '--->响应拦截器');
    if (response.status === 200) {
      return Promise.resolve(response)
    } else if (response.status === 401) {
      // router.push('/login')
    } else {
      const __text = getErrorCode2text(response)
      return Promise.reject(new Error(__text))
    }
  },
  /** 请求无响应 */
  error => {
    let __emsg = error.message || ''

    if (error.message) {
      __emsg = error.message
    }

    if (error.response) {
      __emsg = error.response.data.message ? error.response.data.message : error.response.data.data
    }
    // timeout
    if (__emsg.indexOf('timeout') >= 0) {
      __emsg = 'timeout'
    }

    Toast.fail(`${__emsg}`)
    return Promise.reject(new Error(__emsg))
  }
)

export default service
