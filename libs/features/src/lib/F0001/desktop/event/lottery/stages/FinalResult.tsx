import { PRIZE_CATEGORY_I18N_KEYS } from '@nx-next-app/constants'
import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

const FinalResult = () => {
	const { t } = useTranslation()
	const { winnerList, drawingRound } = useLotteryDataContext()
	const winningTicket = winnerList?.custWinTicketNo
	return (
		<div className='prize lottery-result '>
			<div className='title-group'>
				<span className='title'>
					{t('Label_Event_Round')} {winnerList?.roundId}
				</span>
				{drawingRound && (
					<span>
						{dayjs(drawingRound.startDate).format('D MMM')}
						{' - '}
						{dayjs(drawingRound.endDate).format('D MMM YYYY')}
					</span>
				)}
			</div>
			{winningTicket ? (
				<div className='result'>
					<div className='sub-title'>{t('Label_Event_YouWin')}</div>
					<span>
						{t(PRIZE_CATEGORY_I18N_KEYS[winningTicket.lotteryPrizeCategory])}
					</span>
				</div>
			) : (
				<div className='result'>
					<span>{t('Label_Event_YouHaveNotWonAnyPrize')}</span>
				</div>
			)}
		</div>
	)
}

export default FinalResult
