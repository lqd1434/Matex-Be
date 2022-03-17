export interface MatexRes<T> {
	statusCode: number
	desc: string
	data: T
}

export interface MetaDate {
	version: string
	size: string
	os: 'mac' | 'win'
}
