import { ajaxGet, ajaxPut, ajaxPost, ajaxDelete, closeWindow, ajaxPost1 } from '@/core/mxApi'
import { BASE_URL } from '@/core/api/baseUrl.js'

/**
 * @description 示范接口
 * @param {string}
 * @param {string}
 * @param {string}
 */

export const getBaoxiaoNumber = (params) => {
  return ajaxPost(`${BASE_URL}/getUserMsg`, params)
}
