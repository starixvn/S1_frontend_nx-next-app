import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import LotteryProgressBar from './LotteryProgressBar'
import LotterySticker from './LotterySticker'
import PurchaseStickerModal from './modals/PurchaseStickerModal'

const LotteryRoundInfo = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyName },
	} = useAuth()
	const { lotteryInfo, stickerInfo } = useLotteryDataContext()
	const roundInfo = lotteryInfo?.lotteryRoundInfo
	const totalTurnover = lotteryInfo?.custTurnoverSummary ?? 0

	const currentTier = lotteryInfo?.lotteryTierList.find(
		({ turnOverStart, turnOverEnd }) =>
			totalTurnover >= turnOverStart &&
			(totalTurnover < turnOverEnd || turnOverEnd === 0)
	)

	const tierMap = new Map(
		lotteryInfo?.lotteryTierList.map(tier => [tier.level, tier])
	)

	const nextTier = tierMap.get((currentTier?.level ?? 0) + 1)

	return lotteryInfo ? (
		<div className='lottery-info'>
			<div className='round'>
				{roundInfo && (
					<div className='title'>
						<div className='round-number'>
							{t('Label_Event_Round')} {roundInfo.roundId}
						</div>
						<div className='date'>
							{dayjs(roundInfo.startDate).format('YYYY/M/D')}
							<span>-</span>
							{dayjs(roundInfo.endDate).format('YYYY/M/D')}
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
						ratio={
							lotteryInfo.custTurnoverProccessing / lotteryInfo.turnoverGoal
						}
					/>
					<div className='total'>
						<div>{t('Label_Event_Tickets')}</div>
						<div>
							{currencyName} {lotteryInfo.custTurnoverProccessing}
							{' / '}
							{lotteryInfo.turnoverGoal}
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
							{currencyName} {totalTurnover}
							{nextTier?.turnOverStart ? ` / ${nextTier?.turnOverStart}` : null}
						</div>
					</div>
				</div>
			</div>
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
									{lotteryInfo?.ticketNo?.map((ticketNumber, index) => (
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
							<div className='title'>{t('Label_Event_TotalTickets')}</div>
							<div className='quantity'>{lotteryInfo?.ticketCount}</div>
						</div>
					</div>
				</div>
				{stickerInfo && (
					<div className='ticket sticker'>
						<div className='ticket-top'>
							<div className='title'>{t('Label_Event_JackpotSticker')}</div>
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
										/>
									)
								}
							>
								{stickerInfo.canBuy
									? t('Label_General_Purchase')
									: t('Label_General_Bought')}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	) : null
}

export default LotteryRoundInfo
