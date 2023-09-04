import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useHistory } from '@nx-next-app/features/F0001/providers/history-context'

const HistoryTabs = () => {
	const { activeTab, onTabChange, HISTORY_TABS } = useHistory()
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div className='btnGroup historyTag'>
			{HISTORY_TABS.filter(item => {
				if (item.allowCurrencies) {
					return item.allowCurrencies.includes(currencyId as number)
				}
				return true
			}).map(({ id, displayKey }) => (
				<button
					key={id}
					onClick={() => onTabChange(id)}
					className={classNames({ active: activeTab === id })}
				>
					{t(displayKey)}
				</button>
			))}
		</div>
	)
}

export default HistoryTabs
