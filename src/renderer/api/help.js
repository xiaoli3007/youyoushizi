import request from '@/utils/request'

export function feedback(userid, content) {
	return request({
		url: '?act=feedback',
		method: 'post',
		data: {
			userid,
			content,
		},
		// params: { username ,password}
	})
}
