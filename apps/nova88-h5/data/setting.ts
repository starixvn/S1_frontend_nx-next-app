import { paths } from '@nx-next-app/constants'
import { ALLOWED_CURRENCIES } from './allowCurrency'

export const SETTING_OPTIONS = [
	{
		displayKey: 'Label_Profile',
		href: paths.profile.root,
	},
	{
		displayKey: 'lbl_BankInfo',
		href: paths.bankInfo.root,
		allowCurrencies: ALLOWED_CURRENCIES.WITHDRAWAL_METHOD.BANK_CARD,
	},
	{
		displayKey: 'Label_CryptoWallet',
		href: paths.cryptoWallet.root,
	},
	{
		displayKey: 'Label_ReferFriends',
		href: paths.referral.root,
		// eventIcons: [
		// 	showEventIcon({
		// 		icon: defEventIcon.new,
		// 		period: defEventPeriod.referral,
		// 	}),
		// ],
	},
	{
		displayKey: 'Label_ChangePassword',
		href: paths.changePassword.root,
	},
]
