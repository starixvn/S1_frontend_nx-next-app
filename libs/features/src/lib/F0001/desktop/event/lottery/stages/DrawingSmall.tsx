import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { LotteryPrizeCategory } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import SlotNumber from '../SlotNumber'

const DrawingSmall = () => {
	const { t } = useTranslation()
	const { winnerList } = useLotteryDataContext()
	const smallPrizeList = winnerList?.smallPrize ?? []
	const {
		runningNumberIndex,
		winning,
		stage,
		handleSlotNumberChange,
		handleSlotNumberFinish,
	} = useLotteryProgressContext()

	const handleFinish = (ticketNumber: string) => {
		handleSlotNumberFinish(ticketNumber, LotteryPrizeCategory.SmallPrize)
	}

	return stage.has(StageEvent.RunningNumbers) ? (
		<div className='prize consolation'>
			<div className='title-group'>
				<span className='title'>{t('Label_Event_SmallPrize')}</span>
				<span>
					{smallPrizeList.length} {t('Label_Event_LuckyPlaces')}
				</span>
			</div>
			<div className='grid grid-cols-5'>
				{smallPrizeList.map((number, index) => (
					<div key={number}>
						<SlotNumber
							numberString={number}
							isAnimated={index === runningNumberIndex}
							isRevealed={index <= runningNumberIndex}
							isWinning={winning?.ticket === number}
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
			<span>{t('Label_Event_SmallPrize')}</span>
		</div>
	)
}

export default DrawingSmall
