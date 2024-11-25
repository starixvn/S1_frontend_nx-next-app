import { Header } from '@nx-next-app/components/H0006'
import { useHistory } from '@nx-next-app/operations'
import { QuickPickEnum } from '@nx-next-app/types'
import HistoryFilter from '@yashbet-h5/components/history/header/HistoryFilter'
import { useTranslation } from 'next-i18next'

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
