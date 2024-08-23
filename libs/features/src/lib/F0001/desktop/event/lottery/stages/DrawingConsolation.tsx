import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { LotteryPrizeCategory } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import SlotNumber from '../SlotNumber'

const DrawingConsolation = () => {
	const { t } = useTranslation()
	const { winnerList } = useLotteryDataContext()
	const consolationPrizeList = winnerList?.consolationPrize ?? []

	const {
		runningNumberIndex,
		winning,
		stage,
		handleSlotNumberChange,
		handleSlotNumberFinish,
	} = useLotteryProgressContext()

	const handleFinish = (ticketNumber: string) =>
		handleSlotNumberFinish(ticketNumber, LotteryPrizeCategory.ConsolationPrize)

	return stage.has(StageEvent.RunningNumbers) ? (
		<div className='prize consolation'>
			<div className='title-group'>
				<span className='title'>{t('Label_Event_ConsolationPrize')}</span>
				<span>
					{consolationPrizeList.length} {t('Label_Event_LuckyPlaces')}
				</span>
			</div>
			<div className='grid grid-cols-5'>
				{consolationPrizeList.map((ticketNumber, index) => (
					<div key={ticketNumber}>
						<SlotNumber
							numberString={ticketNumber}
							isAnimated={index === runningNumberIndex}
							isRevealed={index <= runningNumberIndex}
							isWinning={winning?.ticket === ticketNumber}
							onNumberChange={handleSlotNumberChange}
							onFinish={handleFinish}
						/>
					</div>
				))}
			</div>
		</div>
	) : (
		<div className='progress'>
			<div className='sub-title'>{t('Label_Event_LotteryProgress')}</div>
			<span>{t('Label_Event_ConsolationPrize')}</span>
		</div>
	)
}

export default DrawingConsolation
