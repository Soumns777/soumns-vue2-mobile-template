import axios, { CancelToken, isCancel } from 'axios'
import { Toast } from 'vant'

class SoumnsHttp {
  cancal = ''
  constructor(config) {
    this.config = config
  }

  setupIntercetors(instance) {
    instance.interceptors.request.use((config) => {
      // Toast加载提示
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '数据加载中...'
      })
      // 重复点击取消请求
      if (SoumnsHttp.cancal) SoumnsHttp.cancal('取消请求了!')
      config.cancelToken = new CancelToken((c) => {
        SoumnsHttp.cancal = c
      })

      return config
    }),
      (error) => {
        Toast.fail('请求超时!')

        return Promise.resolve(error)
      }

    instance.interceptors.response.use(
      (response) => {
        // doing something when get response data
        Toast.clear()

        return response.data
      },
      (error) => {
        if (isCancel(error)) {
          console.log('💙💛 用户取消了请求', error.message)
          Toast.fail('取消请求成功!')
        } else if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '错误请求'
              break
            case 401:
              error.message = '未授权，请重新登录'
              break
            case 403:
              error.message = '拒绝访问'
              break
            case 404:
              error.message = '请求错误,未找到该资源'
              break
            case 405:
              error.message = '请求方法未允许'
              break
            case 408:
              error.message = '请求超时'
              break
            case 500:
              error.message = '服务器端出错'
              break
            case 501:
              error.message = '网络未实现'
              break
            case 502:
              error.message = '网络错误'
              break
            case 503:
              error.message = '服务不可用'
              break
            case 504:
              error.message = '网络超时'
              break
            case 505:
              error.message = 'http版本不支持该请求'
              break
            default:
              error.message = `连接错误${error.response.status}`
          }

          Toast.fail(error.message)
        } else {
          Toast.fail('未知错误!')
        }

        // doing something when response error
        return Promise.resolve(error)
      }
    )
  }

  request(options) {
    let instance = axios.create()
    options = Object.assign(this.config, options)
    this.setupIntercetors(instance)

    return instance(options)
  }

  get(url, options) {
    return this.request({
      method: 'get',
      url,
      params: {
        ...options
      }
    })
  }

  post(url, options) {
    return this.request({
      method: 'post',
      url,
      data: {
        ...options
      }
    })
  }
}

let soumnsHttp = new SoumnsHttp({
  baseURL: 'http://localhost:3000',
  timeout: '10000',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default soumnsHttp
