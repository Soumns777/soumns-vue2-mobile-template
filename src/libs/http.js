import axios from 'axios'
import { CancelToken,isCancel } from 'axios';


switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://api.zhufeng.cn',
    break;
    case 'test':
    axios.defaults.baseURL = 'http://192.168.20.12:8080',
    break;

  default:
    axios.defaults.baseURL = 'http://127.0.0.1:3000',
}

// 取消请求
let cancal;



/*
 * create instance
 */
const instance = axios.create({
  baseURL: '/api',
  timeout: '10000',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

/*
 * add request interceptors
 */
instance.interceptors.request.use((config) => {
  // doing something before request
  if(cancal) cancal()
  config.cancelToken = new CancelToken( (c)=> {
      cancal = c
  })

  return config
}),
  (error) => {
    console.log(error, '--->error')
    // doing something when request error
    return Promise.reject(error)
  }

/*
 * add response interceptors
 */
instance.interceptors.response.use((response) => {
  // doing something when get response data
  return response
}),
  (error) => {
    // doing something when response error

    if(isCancel(error)) {
  console.log(error.message);
    }else {
      return Promise.reject(error)
    }
  }

export { instance }
