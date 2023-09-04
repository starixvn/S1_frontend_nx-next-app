import React from 'react'
import classNames from 'classnames'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const HistoryTabs = () => {
	const {
		activePeriod,
		QUICK_PICK_LIST,
		tabsRef,
		onQuickPickChange,
		onTabsScroll,
	} = useHistory()
	const { t } = useTranslation()

	return (
		<div className='quickSelect' ref={tabsRef}>
			{QUICK_PICK_LIST.map(({ value, label }) => (
				<button
					key={value}
					onClick={() => onQuickPickChange(value)}
					className={classNames({ active: activePeriod === value })}
				>
					{t(label)}
				</button>
			))}
			<i className='icon icon-keyboard_arrow_right' onClick={onTabsScroll} />
		</div>
	)
}

export default HistoryTabs
