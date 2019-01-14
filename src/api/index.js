import request from '@/utils/request'

const POST = 'post'
const GET = 'get'
const DELETE = 'delete'

const user = {
  getImage(params) {
    return request({url: '/common/image/url', params})
  },
  uploadImage(params) {
    return request({url: '/common/image/upload', params, method: POST})
  }
},
const a = {}
export default {
  ...user,
  ...a
}