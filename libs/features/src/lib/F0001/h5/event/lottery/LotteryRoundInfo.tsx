import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import LotteryProgressBar from './LotteryProgressBar'
import LotterySticker from './LotterySticker'

const PurchaseStickerModal = dynamic(
	() => import('./modals/PurchaseStickerModal'),
	{ ssr: false }
)

const LotteryRoundInfo = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { currencyName } = useAuth().userInfo
	const { lotteryInfo, stickerInfo } = useLotteryDataContext()
	const [tab, setTab] = useState<'tickets' | 'sticker'>('tickets')

	if (!lotteryInfo) return null

	const {
		ticketNo,
		lotteryRoundInfo,
		custTurnoverSummary,
		lotteryTierList,
		custTurnoverProccessing,
		turnoverGoal,
		ticketCount,
	} = lotteryInfo

	if (!lotteryRoundInfo) return null

	const totalTurnover = custTurnoverSummary ?? 0

	const currentTier = lotteryTierList?.find(
		({ turnOverStart, turnOverEnd }) =>
			totalTurnover >= turnOverStart &&
			(totalTurnover <= turnOverEnd || turnOverEnd === 0) // 0 代表無上限
	)

	const tierMap = new Map(lotteryTierList?.map(tier => [tier.level, tier]))

	const nextTier = tierMap.get((currentTier?.level ?? 0) + 1)

	return lotteryInfo ? (
		<div className='lottery-info'>
			<div className='round'>
				{lotteryRoundInfo && (
					<div className='title'>
						<div className='round-number'>
							{t('Label_Event_Round')} {lotteryRoundInfo.roundId}
						</div>
						<div className='date'>
							{dayjs(lotteryRoundInfo.startDate).format('D MMM YYYY')}
							<span>-</span>
							{dayjs(lotteryRoundInfo.endDate).format('D MMM YYYY')}
						</div>
					</div>
				)}
				<div className='ticket-img'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/lottery/tickets.png`}
						alt='tickets'
					/>
				</div>
				<div className='progress-group turnover'>
					<div className='title'>
						<div className=''>{t('Label_Event_ValidTurnover')}</div>
					</div>
					<LotteryProgressBar
						ratio={(custTurnoverProccessing % turnoverGoal) / turnoverGoal}
					/>
					<div className='total'>
						<div>{t('Label_Event_Tickets')}</div>
						<div>
							{currencyName}{' '}
							{(custTurnoverProccessing % turnoverGoal)?.toLocaleString()}
							{' / '}
							{turnoverGoal?.toLocaleString()}
						</div>
					</div>
				</div>
				<div className='progress-group Tier'>
					<div className='title'>
						<div className='info'>
							{t('Label_Vip_Tier')} {currentTier?.level || ''}
						</div>
						{nextTier ? (
							<div className='info'>
								{t('Label_Vip_Tier')} {nextTier.level}
							</div>
						) : null}
					</div>
					<LotteryProgressBar
						ratio={totalTurnover / (nextTier?.turnOverStart ?? totalTurnover)}
					/>
					<div className='total'>
						<div>{t('Label_Event_ValidTurnoverTotal')}</div>
						<div>
							{currencyName} {totalTurnover?.toLocaleString()}
							{nextTier?.turnOverStart
								? ` / ${nextTier.turnOverStart.toLocaleString()}`
								: null}
						</div>
					</div>
				</div>
			</div>
			<div className='tab-group ticket'>
				<ul className='nav nav-tabs'>
					<li className='nav-item'>
						<button
							onClick={() => setTab('tickets')}
							className={`nav-link ${tab === 'tickets' ? 'active' : ''}`}
						>
							{t('Label_Event_Tickets')}
						</button>
					</li>
					<li className='nav-item'>
						<button
							onClick={() => setTab('sticker')}
							className={`nav-link ${tab === 'sticker' ? 'active' : ''}`}
						>
							{t('Label_Event_JackpotSticker')}
						</button>
					</li>
				</ul>
				<div className='tab-content'>
					{tab === 'tickets' && (
						<div className='tab-content-tickets'>
							<div className='ticket-group'>
								<div className='ticket'>
									<div className='ticket-top'>
										<div className='table-container'>
											<table className='table'>
												<thead>
													<tr>
														<th scope='col' className='number'>
															NO
														</th>
														<th scope='col' className='title'>
															{t('Label_Event_LuckyNumber')}
														</th>
													</tr>
												</thead>
												<tbody>
													{ticketNo?.map((ticketNumber, index) => (
														<tr key={ticketNumber}>
															<th scope='row'>{index + 1}</th>
															<td>{ticketNumber}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
									<hr />
									<div className='ticket-bottom'>
										<div className='total'>
											<div className='title'>
												{t('Label_Event_TotalTickets')}
											</div>
											<div className='quantity'>{ticketCount}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{stickerInfo && tab === 'sticker' && (
						<div className='tab-content-sticker'>
							<div className='ticket-group'>
								<div className='ticket sticker'>
									<div className='ticket-top'>
										<div className='title'>
											{t('Label_Event_JackpotSticker')}
										</div>
										<div className='sticker-result'>
											<LotterySticker
												stickerId={stickerInfo.stickerId || 1}
												active={!stickerInfo.canBuy}
											/>
										</div>
									</div>
									<hr />
									<div className='ticket-bottom'>
										<button
											disabled={!stickerInfo.canBuy}
											onClick={() =>
												modal.open(
													<PurchaseStickerModal
														price={stickerInfo.stickerPrize}
														currency={currencyName}
													/>,
													{ className: 'event-lottery-popup-mask' }
												)
											}
										>
											{stickerInfo.canBuy
												? t('Label_General_Purchase')
												: t('Label_General_Bought')}
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	) : null
}

export default LotteryRoundInfo
