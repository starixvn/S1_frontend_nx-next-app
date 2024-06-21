import { paths } from '@nx-next-app/constants'
import { OLYMPIC_EVENT_PERIOD } from '@nx-next-app/site/nova88/constants/olympicPeriod'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'
import Reward from './Reward'
import Footer from './Footer'
import RedemptionHistory from './RedemptionHistory'
import Terms from './Terms'
import Banner from './Banner'

const Olympic = () => {
	const { push } = useRouter()

	// 不在活動時間倒回首頁
	useLayoutEffect(() => {
		if (!isEventPeriod(OLYMPIC_EVENT_PERIOD)) push(paths.home.root)
	}, [])
	return (
		<main className='olympic'>
			<Banner />
			<Reward />
			<div className='olympic-bottom'>
				<div className='olympic-bottom-wrapper'>
					<RedemptionHistory />
					<Terms />
				</div>
			</div>
			<Footer />
		</main>
	)
}

export default Olympic
