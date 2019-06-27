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

export function getjiaocai_cat_List(params) {
  return request({
    url: '?act=getjiaocai_cat_List',
    method: 'get',
    params
  })
}


export function tasklist(params) {
  return request({
    url: '?act=tasklist',
    method: 'get',
    params
  })
}


export function taskone(params) {
  return request({
    url: '?act=taskone',
    method: 'get',
    params
  })
}