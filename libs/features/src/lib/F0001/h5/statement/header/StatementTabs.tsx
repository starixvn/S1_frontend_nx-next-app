import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'

const StatementTabs = () => {
	const {
		activePeriod,
		QUICK_PICK_LIST,
		tabsRef,
		onQuickPickChange,
		onTabsScroll,
	} = useStatement()
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

export default StatementTabs
