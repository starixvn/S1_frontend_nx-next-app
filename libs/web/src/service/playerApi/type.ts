export interface IAppDownloadLinks {
	appType: number
	appTypeName: 'Android' | 'IOS'
	downloadLink: string
}

/**
 * 所有財務通知類型
 * @DepositSuccess 存款成功
 * @WithdrawalSuccess 提款成功
 * @DepositFail 存款失敗
 * @WithdrawalFail 提款失敗 */
export enum NotificationTypeEnum {
	DepositSuccess = 1,
	WithdrawalSuccess,
	DepositFail,
	WithdrawalFail,
}

export enum SetCustNotificationEnum {
	Success = 1,
	Fail,
}

export type TCustNotificationArgs =
	| NotificationTypeEnum.DepositSuccess
	| NotificationTypeEnum.WithdrawalSuccess
	| NotificationTypeEnum.DepositFail
	| NotificationTypeEnum.WithdrawalFail

export interface IGetCustNotificationArgs {
	notificationType: TCustNotificationArgs
}

export type TGetCustNotificationData = {
	transId: string
	isoCode: string
	firstDeposit: boolean
	amount: number
}[]

export interface ISetCustNotificationArgs {
	notificationType: TCustNotificationArgs
	transId: string
}

export type TSetCustNotificationData =
	| SetCustNotificationEnum.Success
	| SetCustNotificationEnum.Fail
