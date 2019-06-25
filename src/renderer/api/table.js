import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '?act=list',
    method: 'get',
    params
  })
}
export function getjiaocaiList(params) {
  return request({
    url: '?act=jiaocailist',
    method: 'get',
    params
  })
}
