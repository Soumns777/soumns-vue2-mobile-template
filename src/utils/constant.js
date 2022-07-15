/**
 * 手动设置axios请求的headers
 */

// json
export const JSON_HEADER = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

// form-data 一般配合qs传输 name=iu 格式数据
export const FORM_URLENCODED_HEADER = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

// form-data 上传图片
export const FORM_DATA_HEADER = {
  headers: {
    'Content-Type': 'multipart/form-data;charset=UTF-8'
  }
}
