import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import Countdown from './Countdown'

const LotterySlotMachineDisplay = () => {
	const { t } = useTranslation()
	const { drawTime } = useLotteryDataContext()
	const { stage } = useLotteryProgressContext()

	const renderDisplay = () => {
		if (stage.has(StageEvent.BeforeStart)) {
			if (drawTime && dayjs().isBefore(drawTime))
				return (
					<div className='screen reciprocal'>
						<div className='title'>{t('Label_Event_NextLotteryDraw')}</div>
						<Countdown to={drawTime} />
					</div>
				)

			return (
				<div className='screen standby' style={{ textTransform: 'uppercase' }}>
					<div className='title'>{t('Label_Event_ComingSoon')}</div>
				</div>
			)
		}

		if (stage.has(StageEvent.DrawingConsolation)) {
			return (
				<div className='screen progress'>
					<div className='subtitle'>{t('Label_Event_LotteryProgress')}</div>
					<div className='title'>{t('Label_Event_ConsolationPrize')}</div>
				</div>
			)
		}

		if (stage.has(StageEvent.DrawingSmall)) {
			return (
				<div className='screen progress'>
					<div className='subtitle'>{t('Label_Event_LotteryProgress')}</div>
					<div className='title'>{t('Label_Event_SmallPrize')}</div>
				</div>
			)
		}

		if (stage.has(StageEvent.DrawingTop3)) {
			return (
				<div className='screen progress'>
					<div className='subtitle'>{t('Label_Event_LotteryProgress')}</div>
					<div className='title'>{t('Label_Event_Top3PrizeTicket')}</div>
				</div>
			)
		}

		if (stage.has(StageEvent.DrawingJackpot)) {
			return (
				<div className='screen progress'>
					<div className='subtitle'>{t('Label_Event_LotteryProgress')}</div>
					<div className='title'>{t('Label_Event_Jackpot')}</div>
				</div>
			)
		}

		return null
	}

	return (
		<div className='lottery-screen' id='screenDiv'>
			{renderDisplay()}
		</div>
	)
}

export default LotterySlotMachineDisplay
