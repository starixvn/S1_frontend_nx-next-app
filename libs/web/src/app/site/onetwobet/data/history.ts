import { HistoryTabsEnum } from '@nx-next-app/types'

import { ALLOWED_CURRENCIES } from './allowCurrency'

export const HISTORY_TABS = [
	{
		displayKey: 'Label_History_Transfer',
		id: HistoryTabsEnum.Transfer,
		allowCurrencies: ALLOWED_CURRENCIES['TRANSFER'],
	},
	{
		displayKey: 'Label_General_Deposit',
		id: HistoryTabsEnum.Deposit,
	},
	{
		displayKey: 'Label_General_Withdrawal',
		id: HistoryTabsEnum.Withdrawal,
	},
	{
		displayKey: 'Label_History_Financial',
		id: HistoryTabsEnum.Financial,
	},
	{
		displayKey: 'Label_History_Referral',
		id: HistoryTabsEnum.Referral,
	},
]
