import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { LotteryPrizeCategory } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import SlotNumber from '../SlotNumber'

const Drawing3rd1st2nd = () => {
	const { t } = useTranslation()
	const { winnerList } = useLotteryDataContext()
	const {
		runningNumberIndex,
		winning,
		stage,
		handleSlotNumberChange,
		handleSlotNumberFinish,
	} = useLotteryProgressContext()

	const firstPrizeNumber = winnerList?.firstPrize?.[0]
	const secondPrizeNumber = winnerList?.secondPrize?.[0]
	const thirdPrizeNumber = winnerList?.thirdPrize?.[0]

	const handleFinish =
		(prizeName: LotteryPrizeCategory) => (ticketNumber: string) =>
			handleSlotNumberFinish(ticketNumber, prizeName)

	return stage.has(StageEvent.RunningNumbers) ? (
		<div className='win'>
			<div className='wrapper'>
				<div className='ticket-group'>
					{secondPrizeNumber && (
						<div className='second'>
							<SlotNumber
								numberString={secondPrizeNumber}
								isAnimated={runningNumberIndex === 2}
								isRevealed={runningNumberIndex >= 2}
								isWinning={winning?.ticket === secondPrizeNumber}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleFinish(LotteryPrizeCategory.SecondPrize)}
							/>
						</div>
					)}
					{firstPrizeNumber && (
						<div className='first'>
							<SlotNumber
								numberString={firstPrizeNumber}
								isAnimated={runningNumberIndex === 1}
								isRevealed={runningNumberIndex >= 1}
								isWinning={winning?.ticket === firstPrizeNumber}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleFinish(LotteryPrizeCategory.FirstPrize)}
							/>
						</div>
					)}
					{thirdPrizeNumber && (
						<div className='third'>
							<SlotNumber
								numberString={thirdPrizeNumber}
								isAnimated={runningNumberIndex === 0}
								isRevealed={runningNumberIndex >= 0}
								isWinning={winning?.ticket === thirdPrizeNumber}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleFinish(LotteryPrizeCategory.ThirdPrize)}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	) : (
		<div className='progress'>
			<div className='sub-title'>{t('Label_Event_LotteryProgress')}</div>
			<span>{t('Label_Event_Top3PrizeTicket')}</span>
		</div>
	)
}

export default Drawing3rd1st2nd
