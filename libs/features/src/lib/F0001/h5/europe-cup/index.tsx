import { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { isEventPeriod } from '@nx-next-app/utils'
import { paths, EVENT_PERIOD } from '@nx-next-app/constants'
import { Header } from '@nx-next-app/components/H0001'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import Banner from './Banner'
import Reward from './Reward'
import ExtraRewardAndTerms from './ExtraRewardAndTerms'
import Tabs from './Tabs'

const EventEuropeCup = () => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()

	// 不在活動時間倒回首頁
	useLayoutEffect(() => {
		if (!isEventPeriod(EVENT_PERIOD.EUROPE_CUP)) push(paths.home.root)
	}, [])

	const {
		isLoading: isTpWalletBalanceListLoading,
		isHideBalance,
		totalWalletBalance,
		mainWalletInfo,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTpWalletBalanceListFetcher({ langId })

	const [setHideBalance] = useSetHideBalanceMutation()

	return (
		<>
			<Header>
				<Header.HeaderModule
					isTpWalletBalanceListLoading={isTpWalletBalanceListLoading}
					originIsHideBalance={isHideBalance}
					totalWalletBalance={totalWalletBalance}
					mainWalletInfo={mainWalletInfo}
					custBonusWalletList={custBonusWalletList}
					tpWalletBalanceList={tpWalletBalanceList}
					onRefetchAllWallet={onRefetchAllWallet}
					onSetHideBalance={setHideBalance}
				/>
			</Header>
			<main className='euro'>
				<Banner />
				<Tabs />
				<Reward />
				<ExtraRewardAndTerms />
			</main>
		</>
	)
}

export default EventEuropeCup
