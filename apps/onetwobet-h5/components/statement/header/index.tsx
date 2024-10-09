import { Header } from '@12b-h5/components/common'
import Breadcrumb from '@nx-next-app/components/H0001/breadcrumb'
import { useStatement } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const StatementHeader = () => {
	const { t } = useTranslation()
	const {
		HEADER_TAGS,
		activeTab,
		breadcrumbs,
		activePeriod,
		onTabChange,
		QUICK_PICK_LIST,
		tabsRef,
		onQuickPickChange,
		onTabsScroll,
	} = useStatement()

	const tags = HEADER_TAGS.map(item => ({
		href: item.href,
		label: t(item.label),
	}))

	const quickSelect = QUICK_PICK_LIST.map(item => ({
		key: item.value,
		label: t(item.label),
	}))

	return (
		<header className='header'>
			<Header.Tags tags={tags} />
			<Header.Tag
				quickSelect={quickSelect}
				activeQuickSelect={activePeriod}
				onQuickSelectChange={key => onQuickPickChange(key as number, true)}
				onTabsScroll={onTabsScroll}
				ref={tabsRef}
			/>
			<Breadcrumb
				items={breadcrumbs}
				activeItem={activeTab}
				onClick={onTabChange as (value: string | number | null) => void}
			/>
		</header>
	)
}

export default StatementHeader
