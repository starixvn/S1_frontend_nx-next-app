import React from 'react'
import { useRouter } from 'next/router'
import { Header } from '@nx-next-app/components/H0001'
import { useTranslation } from 'react-i18next'
import { paths } from '@nx-next-app/constants'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useAuth } from '@nx-next-app/data-access'

const RetentionContent = () => {
	const {
		userInfo: { langId },
	} = useAuth()

	const { push } = useRouter()

	const { t } = useTranslation()

	const handleWheelClick = () => {
		push(paths.luckyWheel.root)
	}

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

			<main className='retention'>
				<div className='eventpage-tap' style={{ zIndex: '5' }}>
					<button onClick={handleWheelClick}>
						{t('Label_LuckyWheel_Title')}
					</button>
					<button className='active'>
						{t('Label_Retention_SurpriseReward')}
					</button>
				</div>
				<div className='retention-wrapper'>
					<div className='top'>
						<img
							className='top-item'
							src='https://banner.0814media.net/h5/img/event/retention/top-item.webp'
							alt='banner-retention'
						/>
						<button className='top-btn '>
							{t('Label_Promotion_ClaimNow')}
						</button>
					</div>
					<div className='retention-title'>
						{t('Label_Retention_Title')}
						<div>{t('Label_Retention_Content')}</div>
					</div>
					<div className='turnover-progress'>
						<div className='turnover-title'>Turnover Accumulated</div>
						<div className='turnover-item'>
							<div>
								<div className='number'>
									<div>THB 10,000</div>
									<div>/ Req. THB 300</div>
								</div>
								<div className='progress'>
									<div className='progress-bar' style={{ width: '25%' }}></div>
								</div>
								<div className='percent'>1.05%</div>
							</div>
						</div>
					</div>
					<div className='bonus-list'>
						<div className='title'>
							<div>Bonus Play Conditions</div>
							<div></div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default RetentionContent
