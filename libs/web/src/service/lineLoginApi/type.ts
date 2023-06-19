export enum LineLoginDirectTypeEnum {
	Register = 1,
	Login = 2,
	Binding = 3,
}

export interface IGetLineUserIdTypeArgs {
	langId?: string
	lineLoginResponse: {
		code?: string
		state?: string
		error?: string
		description?: string
		errormessage?: string
	}
	loginData: {
		isPersistent?: boolean
		url?: string
		platform?: string
		userAgent?: string
		screen?: string
		di?: string
	}
}

export interface ILineRegisterData {
	type: 0 | LineLoginDirectTypeEnum
	userId: null | number
}
