import { EVENT_PERIOD, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import Blessing from '@nx-next-app/features/F0001/h5/newYearEvent/blessing'
import History from '@nx-next-app/features/F0001/h5/newYearEvent/history'
import Info from '@nx-next-app/features/F0001/h5/newYearEvent/info'
import Task from '@nx-next-app/features/F0001/h5/newYearEvent/task'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { isEventPeriod } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import router, { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'

const NewYearEvent = () => {
	const {
		auth: { isLogin },
		userInfo: { langId, currencyId },
	} = useAuth()

	const { t } = useTranslation()
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
			<div className='event-back'>
				<i className='icon-back' />
				<button className='back' onClick={() => router.back()}>
					{t('Label_General_Back')}
				</button>
			</div>
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
