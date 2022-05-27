import axios, { CancelToken, isCancel } from 'axios'

class SoumnsHttp {
  cancal = () => {}
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

    instance.interceptors.response.use((response) => {
      // doing something when get response data

      return response
    }),
      (error) => {
        // doing something when response error

        if (isCancel(error)) {
          console.log(error.message, '💙💛 用户取消了请求')
        } else {
          return Promise.reject(error)
        }
      }
  }

  request(options) {
    let instance = axios.create()
    options = Object.assign(this.config, options)
    this.setupIntercetors(instance)

    return instance(options)
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

// 封装axiosGet请求
export const soumnsGet = (options) => {
  return soumnsHttp.request({
    method: 'get',
    url: options.url,
    data: {
      ...options.data
    }
  })
}
