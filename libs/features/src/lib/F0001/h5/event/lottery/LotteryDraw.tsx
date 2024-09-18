import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Drawing3rd1st2nd from './stages/Drawing3rd1st2nd'
import DrawingConsolation from './stages/DrawingConsolation'
import DrawingJackpot from './stages/DrawingJackpot'
import DrawingSmall from './stages/DrawingSmall'
import DrawingTop3 from './stages/DrawingTop3'
import FinalResult from './stages/FinalResult'

const TicketInfoModal = dynamic(() => import('./modals/TicketInfoModal'), {
	ssr: false,
})

const LotteryDraw = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { winnerList, drawingRound } = useLotteryDataContext()
	const { stage, remainingTickets, winning } = useLotteryProgressContext()

	const renderDrawing = () => {
		if (stage.has(StageEvent.BeforeStart)) {
			return <div className='standby'>{t('Label_Event_NotStartedYet')}</div>
		}

		if (stage.has(StageEvent.DrawingTop3)) return <DrawingTop3 />
		if (stage.has(StageEvent.DrawingConsolation)) return <DrawingConsolation />
		if (stage.has(StageEvent.DrawingSmall)) return <DrawingSmall />
		if (stage.has(StageEvent.Drawing3rd1st2nd)) return <Drawing3rd1st2nd />
		if (stage.has(StageEvent.DrawingJackpot)) return <DrawingJackpot />
		if (stage.has(StageEvent.FinalResult)) return <FinalResult />

		return null
	}

	return (
		<div className='lottery-div'>
			<div className='title' style={{ textTransform: 'uppercase' }}>
				{process.env['NEXT_PUBLIC_SITE_NAME']}
			</div>
			<div className='wrapper'>
				<div className='lottery-content'>{renderDrawing()}</div>
				<div className='lottery-footer'>
					{winnerList && (
						<>
							{winning ? (
								<div className='consolation-prize'>
									<div className='title'>{t('Label_Event_YouWin')}</div>
									<div className='prize'>
										<span className='title'>{winning.prize}</span>
										<span className='number'>{winning.ticket}</span>
									</div>
								</div>
							) : (
								<div className='ticket-total'>
									<div className='title'>{t('Label_Event_ChanceToWin')}</div>
									<div className='ticket-container'>
										<span className='number'>{remainingTickets.length}</span>
										<span>{t('Label_Event_Tickets')}</span>
									</div>
								</div>
							)}
							{drawingRound && (
								<button
									onClick={() =>
										modal.open(
											<TicketInfoModal
												data={drawingRound}
												stickerId={winnerList.custStickerId}
												totalTickets={winnerList.ticketNo?.length}
											/>,
											{ className: 'event-lottery-popup-mask' }
										)
									}
								>
									{t('Label_Event_TicketInfo')}
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default LotteryDraw
