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

	const firstPrize = winnerList?.firstPrize?.[0]
	const secondPrize = winnerList?.secondPrize?.[0]
	const thirdPrize = winnerList?.thirdPrize?.[0]

	const handleFinish =
		(prize: LotteryPrizeCategory) => (ticketNumber: string) =>
			handleSlotNumberFinish(ticketNumber, prize)

	return stage.has(StageEvent.RunningNumbers) ? (
		<div className='win'>
			<div className='wrapper'>
				<div className='ticket-group'>
					{secondPrize && (
						<div className='second'>
							<SlotNumber
								numberString={secondPrize}
								isAnimated={runningNumberIndex > 0}
								isRevealed={runningNumberIndex > 0}
								isWinning={winning?.ticket === secondPrize}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleFinish(LotteryPrizeCategory.SecondPrize)}
								atOnce
							/>
						</div>
					)}
					{firstPrize && (
						<div className='first'>
							<SlotNumber
								numberString={firstPrize}
								isAnimated={runningNumberIndex > 0}
								isRevealed={runningNumberIndex > 0}
								isWinning={winning?.ticket === firstPrize}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleFinish(LotteryPrizeCategory.FirstPrize)}
								atOnce
							/>
						</div>
					)}
					{thirdPrize && (
						<div className='third'>
							<SlotNumber
								numberString={thirdPrize}
								isAnimated={runningNumberIndex === 0}
								isRevealed={runningNumberIndex >= 0}
								isWinning={winning?.ticket === thirdPrize}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleFinish(LotteryPrizeCategory.ThirdPrize)}
								atOnce
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
