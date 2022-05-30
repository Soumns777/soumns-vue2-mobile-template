import { instance as $http } from '@/libs/http'
import { JUHE_KEY } from '@/libs/key'

function axiosPost(options) {
  return new Promise(() => {
    $http({
      url: options.url,
      method: 'post',
      data: {
        ...options.data,
        key: JUHE_KEY
      }
    })
      .then((res) => {
        options.success(res)
      })
      .catch((err) => {
        options.error(err)
      })
  })
}

function axiosGet(options) {
  return new Promise(() => {
    $http({
      url: options.url,
      method: 'get',
      params: {
        ...options.data,
        key: JUHE_KEY
      }
    })
      .then((res) => {
        options.success(res)
      })
      .catch((err) => {
        options.error(err)
      })
  })
}

export { axiosPost, axiosGet }
