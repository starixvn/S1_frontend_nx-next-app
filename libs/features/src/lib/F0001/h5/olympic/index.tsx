import React, { useLayoutEffect } from 'react'
import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { EVENT_PERIOD } from '@nx-next-app/site/nova88'
import Banner from './Banner'
import RedemptionHistory from './RedemptionHistory'
import Terms from './Terms'
import Footer from './Footer'
import Reward from './reward'
import { useOlympic } from '../../hooks'

const Olympic = () => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()

	// 不在活動時間倒回首頁
	useLayoutEffect(() => {
		if (!isEventPeriod(EVENT_PERIOD.OLYMPIC)) push(paths.home.root)
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

	// 判斷是否有兌換紀錄 並 取得玩家的兌換紀錄
	const { custRedeemHistoryList } = useOlympic()
	const hasRedeemHistory =
		custRedeemHistoryList &&
		custRedeemHistoryList.length > 0 &&
		custRedeemHistoryList !== undefined
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
						{hasRedeemHistory && (
							<RedemptionHistory
								custRedeemHistoryList={custRedeemHistoryList}
							/>
						)}
						<Terms />
					</div>
				</div>
				<Footer />
			</main>
		</>
	)
}

export default Olympic
