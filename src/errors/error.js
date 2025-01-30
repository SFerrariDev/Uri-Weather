export class ApiError extends Error {
	constructor(message) {
		super(message)
		this.name = 'Api Error'
		this.stack = ''
	}
}
