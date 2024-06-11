import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import BonusList from './BonusList'
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
		userInfo: { currencyId },
		auth: { isLogin },
	} = useAuth()

	const handleDeposit = () => {
		if (!isLogin) {
			modal.open(<LoginModal />)
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
				<div className='tasks-title'>{t('Label_Olympic_Activity_Desp')}</div>
				<div className='tasks'>
					<div className='tasks-content'>
						<div className='progress'>
							<div className='progress-title'>
								{/* TODO: 待翻譯提供 */}
								<div>Game tasks</div>
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
											{/* TODO: 接後端api隨時更新玩家存款進度 */}
											<span>MYR 0/4000</span>
										</div>
										<div className='progress-bar'>
											<div
												className='progress-bar-inside'
												style={{ width: '20%' }}
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
											{/* TODO: 接後端api隨時更新玩家有效流水進度 */}
											<span>MYR 0/4000</span>
										</div>
										<div className='progress-bar'>
											<div
												className='progress-bar-inside'
												style={{ width: '20%' }}
											/>
										</div>
									</div>
									<button
										onClick={() =>
											push({
												pathname: paths.sports.root,
											})
										}
									>
										{t('Label_General_BetNow')}
									</button>
								</div>
							</div>
						</div>
						<div className='medal'>
							<div>
								<span>{t('Label_Olympic_Gold_Medal')}</span>
								{/* TODO: 接後端api隨時更新目前玩家擁有金牌數量 */}
								<span>108</span>
							</div>
						</div>
					</div>
				</div>

				<BonusList currencyId={currencyId} />
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
