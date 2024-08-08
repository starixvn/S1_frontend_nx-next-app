export interface IAppDownloadLinks {
	appType: number
	appTypeName: 'Android' | 'IOS'
	downloadLink: string
}

export enum NotificationTypeEnum {
	Deposit = 1,
	Withdrawal,
}

export enum SetCustNotificationEnum {
	Success = 1,
	Fail,
}

export type TCustNotificationArgs =
	| NotificationTypeEnum.Deposit
	| NotificationTypeEnum.Withdrawal

export interface IGetCustNotificationArgs {
	notificationType: TCustNotificationArgs
}

export type TGetCustNotificationData = string[]

export interface ISetCustNotificationArgs {
	notificationType: TCustNotificationArgs
	transId: string
}

export type TSetCustNotificationData =
	| SetCustNotificationEnum.Success
	| SetCustNotificationEnum.Fail
