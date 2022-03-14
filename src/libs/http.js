import axios from 'axios'

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
  console.log(config, '--->config')
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
    console.log(error, '--->报错提示')
    return Promise.reject(error)
  }

export { instance }
