import request from '@/utils/request'

const POST = 'post'
const GET = 'get'
const DELETE = 'delete'

const user = {
  login(params) {
    console.log(params)
    return request({url: '/user/login', params, method: POST})
  },
  loginout(params) {
    return request({url: '/user/logout', params, method: POST})
  },
  getInfo(params) {
    return request({url: '/user/info', params, method: GET})
  },
}
const table = {
  getList(params) {
    return request({url: '/table/list', params, method: GET})
  },
}
const img = {
  getImage(params) {
    return request({url: '/common/image/url', params})
  },
  deleteImage(params) {
    return request({url: '/common/image/upload', params, method: DELETE, catch: true})
  },
}
export default {
  ...user,
  ...img,
  ...table
}
