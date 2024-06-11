import React, { useLayoutEffect } from 'react'
import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { EUROPE_EVENT_PERIOD } from '@nx-next-app/site/nova88'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import Banner from './Banner'
import RedemptionHistory from './RedemptionHistory'
import Terms from './Terms'
import Footer from './Footer'
import Reward from './Reward'

const Olympic = () => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()

	// 不在活動時間倒回首頁
	useLayoutEffect(() => {
		if (!isEventPeriod(EUROPE_EVENT_PERIOD)) push(paths.home.root)
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
		</>
	)
}

export default Olympic
