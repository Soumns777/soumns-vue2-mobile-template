import axios, { CancelToken, isCancel } from 'axios'

class SoumnsHttp {
  cancal = ''
  constructor(config) {
    this.config = config
  }

  setupIntercetors(instance) {
    instance.interceptors.request.use((config) => {
      // 重复点击取消请求
      if (SoumnsHttp.cancal) SoumnsHttp.cancal('取消请求了!')
      config.cancelToken = new CancelToken((c) => {
        SoumnsHttp.cancal = c
      })

      return config
    }),
      (error) => {
        return Promise.reject(error)
      }

    instance.interceptors.response.use(
      (response) => {
        // doing something when get response data

        return response.data
      },
      (error) => {
        if (isCancel(error)) {
          console.log('💙💛 用户取消了请求', error.message)
        } else {
          console.log('💙💛报错了亲', error)
        }

        // doing something when response error
        // return Promise.reject(error)
        return new Promise(() => {})
      }
    )
  }

  request(options) {
    let instance = axios.create()
    options = Object.assign(this.config, options)
    this.setupIntercetors(instance)

    return instance(options)
  }

  get(options) {
    return this.request({
      method: 'get',
      url: options.url,
      params: {
        ...options.data
      }
    })
  }

  post(options) {
    return this.request({
      method: 'post',
      url: options.url,
      data: {
        ...options.data
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
