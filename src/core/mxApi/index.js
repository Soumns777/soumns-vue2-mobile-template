// @ts-nocheck
// import queryString from 'query-string';
import { takeFile, takeAPicture } from './mx_api'

function MXApi(callbacks) {
  var deviceReady = false
  var taskQueue = []
  document.addEventListener(
    'deviceready',
    function deviceReadyHandler() {
      deviceReady = true
      taskQueue.forEach(function (task) {
        applyApi.apply(null, task)
      })
      callbacks.ready && callbacks.ready()
      document.removeEventListener('deviceready', deviceReadyHandler, false)
    },
    false
  )

  function applyApi(namespace, api, args) {
    if (window[namespace] && window[namespace][api]) {
      callbacks.beforeApply && callbacks.beforeApply(namespace, api, args)
      window[namespace][api].apply(null, args)
    } else if (!deviceReady) {
      taskQueue.push([namespace, api, args])
    } else {
      callbacks.error && callbacks.error(['该终端没有', namespace, '.', api, '方法!'].join(''), namespace, api)
      throw new Error(['该终端没有', namespace, '.', api, '方法!'].join(''))
    }
  }
  return applyApi
}

const applyApi = MXApi({
  ready: function () {
    console.log('device ready!!')
  },
  error: function (err) {
    console.log(err)
  },
  beforeApply: function (namespace, api, args) {}
})

const makeApi =
  (namespace) =>
  (api, ...args) =>
    applyApi(namespace, api, args)
const MXCommon = makeApi('MXCommon')
const MXWebui = makeApi('MXWebui')
const MXContacts = makeApi('MXContacts')

export const showOptionMenu = () => {
  return MXWebui('showOptionMenu')
}
export const iphoneXBottomSetAside = (...args) => {
  return MXWebui('iphoneXBottomSetAside', ...args)
}
export const hideOptionMenu = () => {
  return MXWebui('hideOptionMenu')
}

export const setCustomHeaderMenu = (...args) => {
  return MXWebui('setCustomHeaderMenu', ...args)
}
/**
 * 设置页面头部title
 */
export const setWebViewTitle = (...args) => {
  return MXWebui('setWebViewTitle', ...args)
}

export const getCurrentUser = (callback) => {
  return new Promise((resolve, reject) => {
    MXCommon('getCurrentUser', resolve)
  })
}

export const MXSelectUsers = (userIds) => {
  return new Promise((resolve, reject) => {
    MXContacts(
      'selectUsers',
      function (result) {
        resolve(result)
      },
      {
        customUserIDS: userIds,
        enableSelectDept: false,
        canSelectSelf: true
      }
    )
  })
}
export const MXSelectUser = (userIds) => {
  return new Promise((resolve, reject) => {
    MXContacts(
      'selectUser',
      function (result) {
        resolve(result)
      },
      {}
    )
  })
}
export const MXUploadFile = (...args) => {
  return MXCommon('uploadFile', ...args)
}
export const MXChooseFile = (...args) => {
  return MXCommon('chooseFile', ...args)
}
export const MXBrowseImages = (...args) => {
  return MXCommon('browseImages', ...args)
}

export const MXOpenUrlPage = (...args) => {
  return MXCommon('openUrlPage', ...args)
}

/**
 * 调用客户端接口-拍照
 */
export async function takePhoto() {
  let cf
  await takeAPicture().then((res) => {
    cf = JSON.parse(res)
  })
  // const cf = await mobileUtils.chooseFile(1, ["camera"]);
  // const [uf] = await mobileUtils.uploadFile(cf.localIds, true);
  // return { cf, uf };
  return { cf }
}

/**
 * 调用客户端接口-选图
 */
export async function chooseFile() {
  let cf
  await takeFile().then((res) => {
    cf = JSON.parse(res)
  })
  return { cf }
}

export const ajax = (params) => {
  return new Promise((resolve, reject) => {
    params = Object.assign({}, params, {
      url: `${params.url}`,
      async: true,
      success: function (data, status, xhr) {
        resolve({
          data: JSON.parse(data),
          status
        })
      },
      error: function (data, status, xhr) {
        reject({
          data,
          status
        })
      }
    })
    // console.log(params, '---传递的参数')
    MXCommon('api', params)
  })
}

export const ajax1 = (params) => {
  return new Promise((resolve, reject) => {
    params = Object.assign({}, params, {
      url: `${params.url}`,
      async: true,
      success: function (data, status, xhr) {
        resolve({
          data,
          status
        })
      },
      error: function (data, status, xhr) {
        reject({
          data,
          status
        })
      }
    })
    MXCommon('api', params)
  })
}

const queryString = function (obj) {
  var str = Object.keys(obj).reduce(function (acc, cur) {
    return (acc = acc + cur + '=' + obj[cur] + '&')
  }, '')
  str = str.substring(0, str.length - 1)
  return str
}
export const ajaxGet = (url, query) => {
  url = query ? `${url}?${queryString(query)}` : url
  const params = {
    type: 'GET',
    url
  }
  return ajax(params)
}

export const ajaxPost = (url, data) => {
  return ajax({
    type: 'POST',
    url,
    data
  })
}

export const ajaxPut = (url, data) => {
  return ajax({
    type: 'PUT',
    url,
    data
  })
}

export const ajaxDelete = (url, id) => {
  return ajax({
    type: 'DELETE',
    url: `${url}/${id}`
  })
}
