import axios from 'axios'
import { AxiosCanceler } from './helper/axiosCancel'

import { checkStatus } from './helper/checkStatus'

const axiosCanceler = new AxiosCanceler()

const config = {
  // 默认地址
  baseURL: 'http://localhost:3001',
  // 设置超时时间（10s）
  timeout: '10000',
  // 跨域时候允许携带凭证(需要后台配置)
  withCredentials: true
}

class RequestHttp {
  service
  constructor(config) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
     */
    this.service.interceptors.request.use(
      (config) => {
        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config)
        return { ...config }
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response) => {
        const { data, config } = response
        // * 在请求结束后，移除本次请求
        axiosCanceler.removePending(config)

        // * 成功请求
        return data
      },
      async (error) => {
        const { response } = error
        // 根据响应的错误状态码，做不同的处理
        if (response) return checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        // if (!window.navigator.onLine) return router.replace({ path: '/500' });
        return Promise.reject(error)
      }
    )
  }

  // * 常用请求方法封装
  get(url, params, _object = {}) {
    return this.service.get(url, { params, ..._object })
  }
  post(url, params, _object = {}) {
    return this.service.post(url, params, _object)
  }
  put(url, params, _object = {}) {
    return this.service.put(url, params, _object)
  }
  delete(url, params, _object = {}) {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
