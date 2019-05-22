import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '?s=User.YouYouMain.list',
    method: 'get',
    params
  })
}
export function getjiaocaiList(params) {
  return request({
    url: '?s=User.YouYouMain.jiaocaiList',
    method: 'get',
    params
  })
}
