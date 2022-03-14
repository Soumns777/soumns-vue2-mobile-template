import { axiosGet } from '@/services/request'

/*
 * 获取随机的笑话
 */
function getSuiJiJokes() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: '/joke/randJoke.php',
      data: {
        page: 7,
        pagesize: 7
      },
      success(res) {
        resolve(res.data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

/*
 * 获取指定时间之前的的笑话
 */
function getLastJokes() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: '/joke/content/list.php',
      data: {
        sort: 'desc',
        page: 7,
        pagesize: 7,
        time: new Date().getTime().toString().slice(0, 10)
      },
      success(res) {
        resolve(res.data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

export { getSuiJiJokes, getLastJokes }
