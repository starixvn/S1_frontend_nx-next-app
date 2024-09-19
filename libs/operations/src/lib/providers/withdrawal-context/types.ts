// 僅用於前端判斷卡片類型使用的 enum
import { ISelectProps } from '@nx-next-app/components/D0001'
import {
	IBankInfoData,
	IEWalletData,
	IPaymentCustBankInfoData,
	IUsdtDetailData,
} from '@nx-next-app/service'

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

export type IAddBankCardModalProps = {
	type: WithdrawalBankCardEnum
	bankData: {
		custEWalletInfo?: IEWalletData[]
		bankInfoDetail?: IBankInfoData[] | IPaymentCustBankInfoData[]
		usdtDetail?: IUsdtDetailData[]
	}
	bankDropDown: ISelectProps['options']
	onSubmitCard: ({
		value,
		type,
		successCallback,
		errorCallback,
	}: {
		value: {
			sysId: number
			accountNo: string
			isfcCode?: string
		}
		type: WithdrawalBankCardEnum
		successCallback: () => void
		errorCallback: (errorMessage: string) => void
	}) => void
}
