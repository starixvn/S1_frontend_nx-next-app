import { QuickPickEnum } from '@nx-next-app/types'

export const QUICK_PICK_LIST = [
	// 配合Select元件,故displayKey改為label
	{ value: QuickPickEnum.Today, label: 'Label_History_Today' },
	{ value: QuickPickEnum.Yesterday, label: 'Label_History_Yesterday' },
	{ value: QuickPickEnum.ThisWeek, label: 'Label_History_ThisWeek' },
	{ value: QuickPickEnum.LastWeek, label: 'Label_History_LastWeek' },
	{ value: QuickPickEnum.ThisMonth, label: 'Label_History_ThisMonth' },
	{ value: QuickPickEnum.LastMonth, label: 'Label_History_LastMonth' },
]
