import axios from 'axios'
import { Message } from 'element-ui'
import md5 from 'js-md5'
import {getToken} from '@/utils/auth'
import qs from 'qs'
import {deepClone} from '@/utils'
//  生成token关键字
const TOKEN_KEY = 'AZ-FN-CODEC-KEY'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})
const request = (config) => {
  const params = deepClone(config.params)
  params.accessToken = getToken('accessToken') || ''
  params.timestamp = new Date().getTime()
  params.token = getValidToken(params)
  if (config.method === 'post') {
    config.data = qs.stringify(params)
    delete config.params
  } else {
    config.params = params
  }
  return new Promise((resolve, reject) => {
    service(config).then(res => {
      resolve(res)
    }).catch(err => {
      if (config.catch) {
        reject(err)
      }
    })
  })
}
// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.status === 100) {
      return response.data
    }
    // 有错但是不直接报
    if (res.status > 1000 && res.status < 2000) {
      return Promise.reject(res.error)
    }
    Message({
      message: res.error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.error)
  },
  error => {
    console.log('err' + error) // for debug
    if (error.message === 'Network Error') {
      error.message = '连接服务器异常'
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 根据请求参数生成token
 * @param params
 * @returns {token}
 */
export function getValidToken(params) {
  if (!params) {
    return
  }
  const arr = []
  let str = ''
  for (const key in params) {
    arr.push(key)
  }
  arr.sort()
  arr.map(item => {
    if (params[item] !== undefined && params[item] != null) {
      str += params[item]
    }
  })
  // console.log(str.toUpperCase() + TOKEN_KEY)
  return md5(str.toUpperCase() + TOKEN_KEY)
}

export default request
