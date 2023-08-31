import { paths } from '@nx-next-app/constants'

export enum PrevPageEnum {
	'Withdrawal' = 'withdrawal',
	'Promotion' = 'promotion',
	'Deposit' = 'deposit',
}

type IPrevPage = {
	[key in PrevPageEnum]: {
		path: string
		contentKey: string
		submitKey: string
	}
}

export const PREV_PAGE: IPrevPage = {
	[PrevPageEnum.Deposit]: {
		path: paths.deposit.root,
		contentKey: 'Label_Profile_GoDepositPage',
		submitKey: 'Label_Profile_DepositNow',
	},
	[PrevPageEnum.Promotion]: {
		path: paths.promotion.root,
		// path:`${paths.promotion.root}/${
		// 	paths.promotion.sub.promotionInfo.root
		// }?BonusCode=${getUrlParameter("BonusCode")}`
		contentKey: 'Label_Profile_GoPromotionPage',
		submitKey: 'Label_Profile_GoNow',
	},
	[PrevPageEnum.Withdrawal]: {
		path: paths.withdrawal.root,
		contentKey: 'Label_Profile_GoWithdrawalPage',
		submitKey: 'Label_Profile_WithdrawalNow',
	},
}

export enum OtpErrorCodeEnum {
	'WrongPhoneNumber' = 5002,
	'OtpInvalid' = 1000,
}
