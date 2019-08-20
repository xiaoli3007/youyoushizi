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

export function askbook(userid, info) {
	return request({
		url: '?act=askbook',
		method: 'post',
		data: {
			userid,
			info,
		},
		// params: { username ,password}
	})
}