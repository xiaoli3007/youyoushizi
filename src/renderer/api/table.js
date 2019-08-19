import request from '@/utils/request'

export function getbookshow(params) {
  return request({
    url: '?act=ebook_show',
    method: 'get',
    params
  })
}

export function getList(params) {
  return request({
    url: '?act=list',
    method: 'get',
    params
  })
}

export function getbookrecommendlist(params) {
  return request({
    url: '?act=getbookrecommendlist',
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

export function review_list(params) {
  return request({
    url: '?act=review_list',
    method: 'get',
    params
  })
}

export function index_count(params) {
  return request({
    url: '?act=index_count',
    method: 'get',
    params
  })
}

export function setting_info(params) {
  return request({
    url: '?act=setting_info',
    method: 'get',
    params
  })
}