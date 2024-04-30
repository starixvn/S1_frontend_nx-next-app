import { useLayoutEffect } from 'react'
import { EUROPE_EVENT_PERIOD } from '@nx-next-app/site/nova88'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import Banner from './Banner'
import Tabs from './Tabs'
import Reward from './Reward'
import ExtraRewardAndTerms from './ExtraRewardAndTerms'

const EuroCup = () => {
	const { push } = useRouter()

	// 不在活動時間倒回首頁
	useLayoutEffect(() => {
		if (!isEventPeriod(EUROPE_EVENT_PERIOD)) push(paths.home.root)
	}, [])

	return (
		<main className='euro'>
			<Banner />
			<Tabs />
			<Reward />
			<ExtraRewardAndTerms />
		</main>
	)
}

export default EuroCup
