import { paths } from '@nx-next-app/constants'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { includes } from 'lodash-es'
import { useLayoutEffect } from 'react'
import { ALLOWED_CURRENCIES, EVENT_PERIOD } from '@nx-next-app/site/nova88'
import { useAuth } from '@nx-next-app/data-access'
import Reward from './reward'
import Footer from './Footer'
import RedemptionHistory from './RedemptionHistory'
import Terms from './Terms'
import Banner from './Banner'
import { useOlympic } from '../../providers'

const Olympic = () => {
	const { push } = useRouter()
	const {
		userInfo: { currencyId },
	} = useAuth()

	// 不在活動時間或currency是CNY or USD 導回首頁
	useLayoutEffect(() => {
		if (
			!isEventPeriod(EVENT_PERIOD.OLYMPIC) ||
			!includes(ALLOWED_CURRENCIES.OLYMPIC, currencyId)
		)
			push(paths.home.root)
	}, [])

	// 判斷是否有兌換紀錄 並 取得玩家的兌換紀錄
	const { custRedeemHistoryList } = useOlympic()
	const hasRedeemHistory =
		custRedeemHistoryList &&
		custRedeemHistoryList.length > 0 &&
		custRedeemHistoryList !== undefined
	return (
		<main className='olympic'>
			<Banner />
			<Reward />
			<div className='olympic-bottom'>
				<div className='olympic-bottom-wrapper'>
					{hasRedeemHistory && (
						<RedemptionHistory custRedeemHistoryList={custRedeemHistoryList} />
					)}
					<Terms />
				</div>
			</div>
			<Footer />
		</main>
	)
}

export default Olympic
