import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useOlympic, UseOlympicProps } from '@nx-next-app/features/F0001/hooks'
import BonusList from './BonusList'
import SignificantModal from '../modal/SignificantModal'

const Reward = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyName },
		auth: { isLogin },
	} = useAuth()

	// 取得從api來的相關資訊
	const {
		olympicEventTicketData,
		userMoneyData,
		missionTotal,
		progressPercentage,
		errorCode,
	} = useOlympic() as UseOlympicProps
	const { availableGoldMetals } = olympicEventTicketData

	const handleDeposit = () => {
		if (!isLogin) {
			push(paths.login.root)
			return
		}
		push(paths.deposit.root)
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
				<div className='medal'>
					<div>{t('Label_Olympic_Gold_Medal')}</div>
					{/* 接後端api隨時更新目前玩家擁有金牌數量 */}
					<div>{availableGoldMetals ?? 0}</div>
				</div>
				<div className='tasks-title'>{t('Label_Olympic_Activity_Desp')}</div>
				<div className='tasks'>
					<div className='tasks-content'>
						<div className='tasks-content-item'>
							<div>
								<div>{t('Label_General_Deposit')}</div>
								<div className='progress'>
									{/* 使用width來控制目前存款數量長度 */}
									<div
										className='progress-bar'
										style={{
											width: `${
												errorCode === 104 || !isLogin
													? 0
													: progressPercentage.deposit
											}%`,
										}}
									/>
								</div>
								{/* 接後端api隨時更新玩家存款進度 */}
								<div>
									{currencyName} {userMoneyData.deposit} /{' '}
									{missionTotal.totalDeposit}
								</div>
							</div>
							<button onClick={handleDeposit}>{t('Label_Deposit_Now')}</button>
						</div>
						<div className='tasks-content-item'>
							<div>
								<div>{t('Label_General_Turnover')}</div>
								<div className='progress'>
									{/* 使用width來控制目前有效流水長度 */}
									<div
										className='progress-bar'
										style={{
											width: `${
												errorCode === 104 || !isLogin
													? 0
													: progressPercentage.turnover
											}%`,
										}}
									/>
								</div>
								{/* 接後端api隨時更新玩家有效流水進度 */}
								<div>
									{currencyName} {userMoneyData.turnover} /{' '}
									{missionTotal.totalTurnover}
								</div>
							</div>
							<button>{t('Label_General_BetNow')}</button>
						</div>
					</div>
					<a onClick={onOpenSignificantModal}>
						{t('Label_Olympic_Significant_Condition')}
					</a>
				</div>

				<BonusList />
			</div>
			<img
				className='olympic-center-bn'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/olympic/background-b.jpg`}
				alt='olympic event background pic'
			/>
		</div>
	)
}

export default Reward
