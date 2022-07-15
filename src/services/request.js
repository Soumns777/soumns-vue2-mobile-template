/**
 * 封装的请求api
 */

import soumnsHttp from '@/libs/http'
import { FORM_DATA_HEADER } from '@/utils/constant'

/**
 * 上传图片
 */

export const uploadImgs = (params) => {
  return soumnsHttp.post('/api/upload-images', params, FORM_DATA_HEADER)
}

export const Login = (params) => {
  return soumnsHttp.get('/api/login', params)
}
