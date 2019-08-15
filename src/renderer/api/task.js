import request from '@/utils/request'

export function taskin(userid, status, type, relation_id, relation_type,gid,wcell_type) {
	return request({
		url: '?act=taskin',
		method: 'post',
		data: {
			userid,
			status,
			type,
			relation_id,
			relation_type,
			gid,
			wcell_type
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

export function setting(userid,voicetype,autoplay_time,autoplay_repeat) {
	return request({
		url: '?act=setting',
		method: 'post',
		data: {
			userid,
			voicetype,
			autoplay_time,
			autoplay_repeat
		},
		// params: { username ,password}
	})
}

export function taskinwcell_super(userid, task_wcell_id, day,quality,factor ) {
	return request({
		url: '?act=taskinwcell_super',
		method: 'post',
		data: {
			userid,
			task_wcell_id,
			day,
			quality,
			factor
		},
		// params: { username ,password}
	})
}


export function taskintime(taskid, userid, duration,review) {
	return request({
		url: '?act=taskintime',
		method: 'post',
		data: {
			taskid,
			userid,
			duration,
			review
		},
		// params: { username ,password}
	})
}