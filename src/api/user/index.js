/** User */
import $http from '@/service/index.js'

// 获取数据接口
export const getList = (params) => $http.get('/getList', { params })
