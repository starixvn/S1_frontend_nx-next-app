import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { HistoryTabsEnum, QuickPickEnum } from 'libs/web/src/app/types/history'

export const HISTORY_TABS = [
	{
		displayKey: 'Label_History_Transfer',
		id: HistoryTabsEnum.Transfer,
		allowCurrencies: ALLOWED_CURRENCIES['TRANSFER'],
	},
	{
		displayKey: 'Label_History_Deposit',
		id: HistoryTabsEnum.Deposit,
	},
	{
		displayKey: 'Label_History_Withdrawal',
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

export const QUICK_PICK_LIST = [
	// 配合Select元件,故displayKey改為label
	{ value: QuickPickEnum.Today, label: 'Label_History_Today' },
	{ value: QuickPickEnum.Yesterday, label: 'Label_History_Yesterday' },
	{ value: QuickPickEnum.ThisWeek, label: 'Label_History_ThisWeek' },
	{ value: QuickPickEnum.LastWeek, label: 'Label_History_LastWeek' },
	{ value: QuickPickEnum.ThisMonth, label: 'Label_History_ThisMonth' },
	{ value: QuickPickEnum.LastMonth, label: 'Label_History_LastMonth' },
]
