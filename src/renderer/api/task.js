import request from '@/utils/request'

export function taskin(userid, status, type, relation_id, relation_type) {
	return request({
		url: '?act=taskin',
		method: 'post',
		data: {
			userid,
			status,
			type,
			relation_id,
			relation_type
		},
		// params: { username ,password}
	})
}

export function taskinwcell(taskid, userid, wcellid, status) {
	return request({
		url: '?act=taskinwcell',
		method: 'post',
		data: {
			taskid,
			userid,
			wcellid,
			status
		},
		// params: { username ,password}
	})
}

export function taskindata(taskid,taskdata) {
	return request({
		url: '?act=taskindata',
		method: 'post',
		data: {
			taskid,
			taskdata
		},
		// params: { username ,password}
	})
}
