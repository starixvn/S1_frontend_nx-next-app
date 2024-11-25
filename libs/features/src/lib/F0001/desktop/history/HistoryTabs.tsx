import { useAuth } from '@nx-next-app/data-access'
import { useHistory } from '@nx-next-app/features/F0001/providers/history-context'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HistoryTabs = () => {
	const { activeTab, onTabChange, HISTORY_TABS } = useHistory()
	const { t } = useTranslation()
	const router = useRouter()
	const { queryTabId } = router.query || {}

	const {
		userInfo: { currencyId },
	} = useAuth()

	useEffect(() => {
		if (queryTabId) {
			onTabChange(Number(queryTabId))
		}
	}, [queryTabId])

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
					className={classNames('btn btn-tabs', {
						active: activeTab === id,
					})}
				>
					{t(displayKey)}
				</button>
			))}
		</div>
	)
}

export default HistoryTabs
