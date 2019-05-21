import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '?s=User.Member.login',
    method: 'post',
    // data: {
    //   username,
    //   password
    // }
		params: { username ,password}
  })
}

export function getInfo(token) {
  return request({
    url: '?s=User.Member.userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '?s=User.Member.logout',
    method: 'post',
		params: { token }
  })
}
