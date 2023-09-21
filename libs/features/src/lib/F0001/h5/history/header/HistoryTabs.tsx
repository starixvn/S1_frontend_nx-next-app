import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0001'
import { QuickPickEnum } from 'libs/web/src/app/types/history'

const HistoryTabs = () => {
	const { QUICK_PICK_LIST, tabsRef, onQuickPickChange, onTabsScroll } =
		useHistory()
	const { t } = useTranslation()

	const quickSelect = QUICK_PICK_LIST.map(item => ({
		key: item.value,
		label: t(item.label),
	}))

	return (
		<Header.Tag
			quickSelect={quickSelect}
			onQuickSelectChange={key => onQuickPickChange(key as QuickPickEnum)}
			onTabsScroll={onTabsScroll}
			ref={tabsRef}
		/>
	)
}

export default HistoryTabs
