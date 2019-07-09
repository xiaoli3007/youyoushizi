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

export function taskinwcell_super(taskid, userid, wcellid, day) {
	return request({
		url: '?act=taskinwcell_super',
		method: 'post',
		data: {
			taskid,
			userid,
			wcellid,
			day
		},
		// params: { username ,password}
	})
}


export function taskindata(userid,taskid,taskdata) {
	return request({
		url: '?act=taskindata',
		method: 'post',
		data: {
			userid,
			taskid,
			taskdata
		},
		// params: { username ,password}
	})
}


export function task_delete(taskid) {
	return request({
		url: '?act=task_delete',
		method: 'post',
		data: {
			taskid
		},
		// params: { username ,password}
	})
}

export function setting(userid,voicetype,autoplay_time) {
	return request({
		url: '?act=setting',
		method: 'post',
		data: {
			userid,
			voicetype,
			autoplay_time
		},
		// params: { username ,password}
	})
}