export interface MatexRes<T> {
	statusCode: number
	desc: string
	data: T
}

export interface ReceivedMetaDate {
	version: string
	size: string
	os: 'win' | 'mac'
	update_time: string
}
