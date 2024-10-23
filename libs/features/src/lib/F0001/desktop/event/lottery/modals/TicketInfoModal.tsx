import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ChineseZodiacStickerId, ILotteryRoundData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import LotterySticker from '../LotterySticker'

const TicketInfoModal = ({
	data,
	totalTickets,
	stickerId,
}: {
	data: ILotteryRoundData
	totalTickets?: number
	stickerId?: ChineseZodiacStickerId
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	return (
		<div className='event-lottery-popup ticket'>
			<div className='icon icon-close' onClick={closeModal} />
			<div className='popup-content'>
				<div className='ticket sticker'>
					<div className='ticket-top'>
						<div className='title'>{t('Label_Event_JackpotSticker')}</div>
						{stickerId ? (
							<div className='sticker-result'>
								<LotterySticker stickerId={stickerId} />
							</div>
						) : null}
					</div>
					<hr />
					<div className='ticket-bottom'>
						{typeof totalTickets === 'number' && (
							<div className='total'>
								<div className='title'>{t('Label_Event_TotalTickets')}</div>
								<div className='quantity'>{totalTickets}</div>
							</div>
						)}
					</div>
				</div>
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
	)
}

export default TicketInfoModal
