import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
	UseOlympicProps,
	useOlympic,
} from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import BonusList from './bonusList'
import SignificantModal from '../modal/SignificantModal'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const Reward = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { push } = useRouter()
	const {
		userInfo: { currencyName, currencyId, langId },
		auth: { isLogin },
	} = useAuth()

	// 取得從api來的相關資訊
	const {
		availableGoldMetals,
		userMoneyData,
		missionTotal,
		progressPercentage,
	} = useOlympic() as UseOlympicProps

	// 按下deposit now按鈕
	const handleDeposit = () => {
		if (!isLogin) {
			modal.open(<LoginModal />)
			return
		}
		push(paths.deposit.root)
	}

	// 按下bet now按鈕
	const handleBetNow = () => {
		if (!isLogin) {
			modal.open(<LoginModal />)
			return
		}
		push(paths.sports.root)
	}

	// significant condition的彈窗
	const onOpenSignificantModal = () => {
		modal.open(<SignificantModal />, {
			className: 'olympic-rule',
		})
	}
	return (
		<div className='olympic-center'>
			<div className='olympic-center-wrapper'>
				<div className='tasks-title'>{t('Label_Olympic_Activity_Desp')}</div>
				<div className='tasks'>
					<div className='tasks-content'>
						<div className='progress'>
							<div className='progress-title'>
								<div>{t('Label_Olympic_Event_Mission')}</div>
								<div
									onClick={onOpenSignificantModal}
									style={{ cursor: 'pointer' }}
								>
									{t('Label_Olympic_Significant_Condition')}
								</div>
							</div>
							<div className='progress-box'>
								<div>
									<div className='progress-box-item'>
										<div className='text'>
											<span>{t('Label_General_Deposit')}</span>
											{/* 接後端api隨時更新玩家存款進度 */}
											{currencyId === CurrenciesEnum.THB && langId === 'th' ? (
												<span>
													{userMoneyData.deposit} / {missionTotal.totalDeposit}{' '}
													บาท
												</span>
											) : (
												<span>
													{currencyName} {userMoneyData.deposit} /{' '}
													{missionTotal.totalDeposit}
												</span>
											)}
										</div>
										<div className='progress-bar'>
											<div
												className='progress-bar-inside'
												style={{
													width: `${progressPercentage.deposit}%`,
												}}
											/>
										</div>
									</div>
									<button onClick={handleDeposit}>
										{t('Label_Deposit_Now')}
									</button>
								</div>
								<div>
									<div className='progress-box-item'>
										<div className='text'>
											<span>{t('Label_General_Turnover')}</span>
											{/* 接後端api隨時更新玩家有效流水進度 */}
											{currencyId === CurrenciesEnum.THB && langId === 'th' ? (
												<span>
													{userMoneyData.turnover} /{' '}
													{missionTotal.totalTurnover} บาท
												</span>
											) : (
												<span>
													{currencyName} {userMoneyData.turnover} /{' '}
													{missionTotal.totalTurnover}
												</span>
											)}
										</div>
										<div className='progress-bar'>
											<div
												className='progress-bar-inside'
												style={{
													width: `${progressPercentage.turnover}%`,
												}}
											/>
										</div>
									</div>
									<button onClick={handleBetNow}>
										{t('Label_General_BetNow')}
									</button>
								</div>
							</div>
						</div>
						<div className='medal'>
							<div>
								<span>{t('Label_Olympic_Gold_Medal')}</span>
								{/* 接後端api隨時更新目前玩家擁有金牌數量 */}
								<span>{availableGoldMetals ?? 0}</span>
							</div>
						</div>
					</div>
				</div>

				<BonusList />
			</div>
			<img
				className='olympic-center-bn'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/background-b.jpg`}
				alt=''
			/>
		</div>
	)
}

export default Reward
