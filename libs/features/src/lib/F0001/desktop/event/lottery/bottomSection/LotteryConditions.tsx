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
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/lottery/trophy.png`}
						alt='trophy'
					/>
				</div>
				<div className='info-content'>
					<h3>{t('Label_Event_Lottery_GameObjective')}</h3>
					<div>{t('Label_Event_Lottery_GameObjective_Content')}</div>
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
			<div className='table-group'>
				<table className='table conditions'>
					<thead>
						<tr>
							<th scope='col'>
								<div className='title-group bonus'>
									<span className='title'>
										{t('Label_Event_JackpotOfTheRound')}
									</span>
									<div className='total'>
										<div className='icon money' />
										<div>{lotteryInfo?.jackpotAmount.toLocaleString()}</div>
									</div>
								</div>
							</th>
							{tierList?.map(({ level, turnOverStart, turnOverEnd }) => (
								<th key={turnOverStart} scope='col'>
									<div className='title-group'>
										<span className='title'>
											{t('Label_Vip_Tier')} {level}
										</span>
										<span>{t('Label_Event_ValidTurnoverTotal')}</span>
										{turnOverEnd > 0 ? (
											<span>
												{turnOverStart?.toLocaleString()} -{' '}
												{turnOverEnd?.toLocaleString()}
											</span>
										) : (
											<span>{turnOverStart?.toLocaleString()} up</span>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope='row'>{t('Label_Event_1stPrize')}</th>
							<td>500</td>
							<td>2,000</td>
							<td>3,000</td>
						</tr>
						<tr>
							<th scope='row'>{t('Label_Event_2ndPrize')}</th>
							<td>250</td>
							<td>1,000</td>
							<td>2,000</td>
						</tr>
						<tr>
							<th scope='row'>{t('Label_Event_3rdPrize')}</th>
							<td>125</td>
							<td>500</td>
							<td>1,000</td>
						</tr>
						<tr>
							<th scope='row'>{t('Label_Event_ConsolationPrize')}</th>
							<td>50</td>
							<td>100</td>
							<td>200</td>
						</tr>
						<tr>
							<th scope='row'>{t('Label_Event_SmallPrize')}</th>
							<td>25</td>
							<td>50</td>
							<td>100</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default LotteryConditions
