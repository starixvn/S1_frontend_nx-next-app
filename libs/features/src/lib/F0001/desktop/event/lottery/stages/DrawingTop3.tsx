import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { sortBy } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import SlotNumber from '../SlotNumber'

const DrawingTop3 = () => {
	const { t } = useTranslation()
	const { winnerList } = useLotteryDataContext()
	const {
		runningNumberIndex,
		winning,
		stage,
		handleSlotNumberChange,
		handleSlotNumberFinish,
	} = useLotteryProgressContext()

	const top3 = useMemo(() => {
		if (!winnerList) return []

		return sortBy([
			...winnerList.firstPrize,
			...winnerList.secondPrize,
			...winnerList.thirdPrize,
		])
	}, [winnerList])

	return stage.has(StageEvent.RunningNumbers) ? (
		<div className='top3'>
			<div className='wrapper'>
				<div className='title'>{t('Label_Event_Top3PrizeTicket')}</div>
				<div className='ticket-group'>
					{top3.map((number, index) => (
						<div key={number}>
							<SlotNumber
								numberString={number}
								isAnimated={index === runningNumberIndex}
								isRevealed={index <= runningNumberIndex}
								isWinning={winning?.ticket === number}
								onNumberChange={handleSlotNumberChange}
								onFinish={handleSlotNumberFinish}
							/>
						</div>
					))}
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

export default DrawingTop3
