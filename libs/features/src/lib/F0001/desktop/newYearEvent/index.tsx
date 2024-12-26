import { EVENT_PERIOD, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import Blessing from '@nx-next-app/features/F0001/desktop/newYearEvent/blessing'
import History from '@nx-next-app/features/F0001/desktop/newYearEvent/history'
import Info from '@nx-next-app/features/F0001/desktop/newYearEvent/info'
import Task from '@nx-next-app/features/F0001/desktop/newYearEvent/task'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88/data/allowCurrency'
import { isEventPeriod } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'

const NewYearEvent = () => {
	const {
		auth: { isLogin },
		userInfo: { langId, currencyId },
	} = useAuth()

	const { push } = useRouter()

	// 不在活動時間 / 支援幣別 倒回首頁
	useLayoutEffect(() => {
		if (
			!isEventPeriod(EVENT_PERIOD.NEW_YEAR_EVENT) ||
			!includes(ALLOWED_CURRENCIES['NewYearEvent'], currencyId)
		) {
			push(paths.home.root)
		}
	}, [])

	return (
		<main className={`dragonegg-event ${langId}`}>
			{isLogin && (
				<>
					<Task />
					<Blessing />
					<History />
				</>
			)}
			<Info />
		</main>
	)
}

export default NewYearEvent
