import request from '@/utils/request'

export function taskin(name, status, type, userid) {
	return request({
		url: '?s=User.YouYouMain.taskin',
		method: 'post',
		data: {
			name,
			status,
			type,
			userid
		},
		// params: { username ,password}
	})
}

export function taskindata(taskid,taskdata) {
	return request({
		url: '?s=User.YouYouMain.taskindata',
		method: 'post',
		data: {
			taskid,
			taskdata
		},
		// params: { username ,password}
	})
}
