import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '?act=login',
    method: 'post',
    data: {
      username,
      password
    },
		 // params: { username ,password}
  })
}

export function getInfo(token) {
  return request({
    url: '?act=userinfo',
    method: 'post',
		data: {
		  token
		},
    // params: { token }
  })
}

export function logout(token) {
  return request({
    url: '?act=logout',
    method: 'post',
		data: {
		  token
		},
		// params: { token }
  })
}
