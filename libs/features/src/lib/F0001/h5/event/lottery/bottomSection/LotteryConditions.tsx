import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const RulesModal = dynamic(() => import('../modals/RulesModal'), { ssr: false })

const LotteryConditions = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { lotteryInfo } = useLotteryDataContext()
	const tierList = lotteryInfo?.lotteryTierList

	return (
		<div className='tab-content-conditions'>
			<div className='info'>
				<div className='trophy-img'>
					<img
						alt='trophy'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/lottery/trophy.png`}
					/>
				</div>
				<div className='info-content'>
					<h3>{t('Label_Event_Lottery_GameObjective')}</h3>
					<p>{t('Label_Event_Lottery_GameObjective_Content')}</p>
					<button
						onClick={() =>
							modal.open(<RulesModal />, {
								className: 'event-lottery-popup-mask',
							})
						}
					>
						{t('Label_Event_Rules')}
					</button>
				</div>
			</div>
			{/* Jackpot of the Round */}
			<div className='wrapper'>
				{/* title-group */}
				<div className='title-group bonus'>
					<span className='title'>{t('Label_Event_JackpotOfTheRound')}</span>
					<div className='total'>
						<div className='icon money' />
						<div>{lotteryInfo?.jackpotAmount?.toLocaleString()}</div>
					</div>
				</div>
				{/* prize info */}
				<div className='prize-info'>
					{/* tier 開關為.active */}
					<div className='card tier active'>
						<div className='title'>
							{t('Label_Event_ValidTurnoverTotal')}
							<div className='icon arrow' />
						</div>
						{tierList?.map(({ level, turnOverStart, turnOverEnd }) => (
							<div key={level} className='tier-items'>
								<span className='title'>
									{t('Label_Vip_Tier')} {level}
								</span>
								{turnOverEnd > 0 ? (
									<span className='prize-total'>
										{turnOverStart?.toLocaleString()}
										{' - '}
										{turnOverEnd?.toLocaleString()}
									</span>
								) : (
									<span className='prize-total'>
										{turnOverStart?.toLocaleString()} up
									</span>
								)}
							</div>
						))}
					</div>
					{/* 1st Prize */}
					<div className='wrapper'>
						{/* 1st Prize */}
						<div className='card prize'>
							<div className='title'>{t('Label_Event_1stPrize')}</div>
							<div>500</div>
							<div>2,000</div>
							<div>3,000</div>
						</div>
						{/* 2nd Prize */}
						<div className='card prize'>
							<div className='title'>{t('Label_Event_2ndPrize')}</div>
							<div>250</div>
							<div>1,000</div>
							<div>2,000</div>
						</div>
						<div className='card prize'>
							<div className='title'>{t('Label_Event_3rdPrize')}</div>
							<div>125</div>
							<div>500</div>
							<div>1,000</div>
						</div>
						<div className='card prize'>
							<div className='title'>{t('Label_Event_ConsolationPrize')}</div>
							<div>50</div>
							<div>100</div>
							<div>200</div>
						</div>
						{/* Consolation Prize */}
						<div className='card prize'>
							<div className='title'>{t('Label_Event_SmallPrize')}</div>
							<div>25</div>
							<div>500</div>
							<div>100</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LotteryConditions
