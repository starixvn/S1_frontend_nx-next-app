// 僅用於前端判斷卡片類型使用的 enum
export enum WithdrawalBankCardEnum {
	Undefined,
	LocalBank,
	EWallet,
	Crypto,
}

// 僅用於前端判斷 kyc 狀態的 enum
export enum KycStatusEnum {
	Normal,
	KycUpload,
	KycPending,
}

// 前端用來管理 withdrawal 介面狀態的 enum
export enum WithdrawalPanelStatusEnum {
	Init,
	Confirm,
}

export enum WithdrawalStatusEnum {
	Pending = 1,
	OnHold,
	Verify,
	Process,
	Cancelled,
	Approved,
	Rejected,
	ToKyc,
}

export const statusClassNames: { [status: number]: string } = {
	[WithdrawalStatusEnum.Pending]: 'pending',
	[WithdrawalStatusEnum.OnHold]: 'pending',
	[WithdrawalStatusEnum.Verify]: 'pending',
	[WithdrawalStatusEnum.Process]: 'pending',
	[WithdrawalStatusEnum.Cancelled]: 'cancel',
	[WithdrawalStatusEnum.Approved]: 'approved',
	[WithdrawalStatusEnum.Rejected]: 'reject',
	[WithdrawalStatusEnum.ToKyc]: 'pending',
}
