import { useTranslation } from 'next-i18next'
import HistoryFilter from '@nx-next-app/features/F0002/h5/history/header/HistoryFilter'
import { Header } from '@nx-next-app/components/H0001'
import { useHistory } from '@nx-next-app/features/F0002/providers'
import { QuickPickEnum } from '@nx-next-app/types'

const HistoryHeader = () => {
	const { t } = useTranslation()
	const {
		HEADER_TAGS = [],
		QUICK_PICK_LIST,
		tabsRef,
		onQuickPickChange,
		onTabsScroll,
	} = useHistory()

	const tags = HEADER_TAGS.map(item => ({
		href: item.href,
		label: t(item.label),
	}))

	const quickSelect = QUICK_PICK_LIST.map(item => ({
		key: item.value,
		label: t(item.label),
	}))

	return (
		<Header className='header'>
			<Header.Tags tags={tags} />
			<Header.Tag
				quickSelect={quickSelect}
				onQuickSelectChange={key => onQuickPickChange(key as QuickPickEnum)}
				onTabsScroll={onTabsScroll}
				ref={tabsRef}
			/>
			<HistoryFilter />
		</Header>
	)
}

export default HistoryHeader
