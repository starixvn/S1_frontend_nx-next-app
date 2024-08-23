import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ILotteryRoundData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import LotterySticker from '../LotterySticker'

const TicketInfoModal = ({
	data,
	totalTickets,
}: {
	data: ILotteryRoundData
	totalTickets?: number
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	return (
		<div id='popup' className='event-lottery-popup-mask active'>
			<div className='event-lottery-popup ticket'>
				{/* close */}
				<div className='icon icon-close' onClick={closeModal} />
				{/* popup-content */}
				<div className='popup-content'>
					{/* ticket */}
					<div className='ticket sticker'>
						{/* ticket-top */}
						<div className='ticket-top'>
							{/* sticker-title */}
							<div className='title'>{t('Label_Event_JackpotSticker')}</div>
							{/* sticker-result */}
							<div className='sticker-result'>
								<LotterySticker stickerId={1} />
							</div>
						</div>
						{/* hr */}
						<hr />
						{/* ticket-bottom */}
						<div className='ticket-bottom'>
							{/* ticket-total */}
							{typeof totalTickets === 'number' && (
								<div className='total'>
									<div className='title'>{t('Label_Event_TotalTickets')}</div>
									<div className='quantity'>{totalTickets}</div>
								</div>
							)}
						</div>
					</div>
					{/* title-group */}
					<div className='title-group'>
						<div className='title'>
							{t('Label_Event_TicketInfo')}
							<br />
							{t('Label_Event_Round')} {data.roundId}
						</div>
						<p>
							{dayjs(data.startDate).format('YYYY/M/D')}
							{' - '}
							{dayjs(data.endDate).format('YYYY/M/D')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketInfoModal
