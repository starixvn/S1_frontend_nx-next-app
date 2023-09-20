export enum DepositStatusClassNameEnum {
	Pending = 1,
	Paid,
	Approved,
	Reject,
	Cancel,
}

export enum WithdrawalStatusClassNameEnum {
	Pending = 1,
	InProgress,
	Approved,
	Reject,
	Cancel,
}

export enum DepositStatusEnum {
	Draft,
	Pending,
	Paid,
	Approved,
	Rejected,
	Cancelled,
	Expired,
	OnHold,
	Processing,
}

export enum WithdrawalStatusEnum {
	pending = 1,
	onHold,
	verify,
	process,
	cancelled,
	approved,
	rejected,
	toKyc,
}

export enum HistoryTabsEnum {
	Transfer,
	Deposit,
	Withdrawal,
	Financial,
	Referral,
}

export enum QuickPickEnum {
	Today,
	Yesterday,
	ThisWeek,
	LastWeek,
	ThisMonth,
	LastMonth,
}

export enum DepositTypeEnum {
	OnlineBanking = 1,
	MobilePayment,
	BankTransfer,
	CryptoPay,
	TopUpCard,
	QRPay,
	CryptoWallet = 8,
}

export const DepositStatusClassName: Record<
	DepositStatusClassNameEnum,
	string
> = {
	[DepositStatusClassNameEnum.Pending]: 'pending',
	[DepositStatusClassNameEnum.Paid]: 'paid',
	[DepositStatusClassNameEnum.Approved]: 'approved',
	[DepositStatusClassNameEnum.Reject]: 'reject',
	[DepositStatusClassNameEnum.Cancel]: 'cancel',
}

export const WithdrawalStatusClassName: Record<
	WithdrawalStatusClassNameEnum,
	string
> = {
	[WithdrawalStatusClassNameEnum.Pending]: 'pending',
	[WithdrawalStatusClassNameEnum.InProgress]: 'pending',
	[WithdrawalStatusClassNameEnum.Approved]: 'approved',
	[WithdrawalStatusClassNameEnum.Reject]: 'reject',
	[WithdrawalStatusClassNameEnum.Cancel]: 'cancel',
}

export const WithdrawalStatusClassNameForMobile: Record<number, string> = {
	1: 'pending',
	2: 'pending',
	3: 'pending',
	4: 'pending',
	5: 'cancelled',
	6: 'approved',
	7: 'reject',
	8: 'pending',
}

export const ReferralStatusClassNameForMobile: Record<number, string> = {
	0: 'approved',
	1: 'pending',
	2: 'cancelled',
}
