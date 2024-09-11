// export { default } from '@nx-next-app/features/F0001/desktop/event/lottery/stages/DrawingJackpot'

import { CHINESE_ZODIAC_STICKER_IDS } from '@nx-next-app/constants'
import {
	StageEvent,
	useLotteryDataContext,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import LotterySticker from '../LotterySticker'

const signs = Object.values(CHINESE_ZODIAC_STICKER_IDS)

const DrawingAnimation = () => {
	const [activeSignIndex, setActiveSignIndex] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => {
			setActiveSignIndex(prev => {
				const next = Math.floor(Math.random() * signs.length)
				return next === prev ? (next + 6) % signs.length : next
			})
		}, 200)
		return () => clearTimeout(timer)
	}, [activeSignIndex])

	return (
		<div className='grid grid-cols-4'>
			{signs.map(value => (
				<LotterySticker
					key={value}
					stickerId={value}
					active={activeSignIndex === value}
				/>
			))}
		</div>
	)
}

const JackpotResult = () => {
	const { winnerList } = useLotteryDataContext()

	if (!winnerList) return null

	return (
		<div className='jackpot-win'>
			<LotterySticker stickerId={winnerList?.stickerId} active />
		</div>
	)
}

const DrawingJackpot = () => {
	const { t } = useTranslation()
	const { stage } = useLotteryProgressContext()

	if (stage.has(StageEvent.JackpotResult)) {
		return (
			<div className='jackpot-group'>
				<div className='title'>{t('Label_General_Jackpot')}</div>
				<JackpotResult />
			</div>
		)
	}

	if (stage.has(StageEvent.RunningNumbers)) {
		return (
			<div className='jackpot-group'>
				<div className='title'>{t('Label_General_Jackpot')}</div>
				<DrawingAnimation />
			</div>
		)
	}

	return (
		<div className='progress'>
			<div className='sub-title'>{t('Label_Event_LotteryProgress')}</div>
			<span>{t('Label_Event_Jackpot')}</span>
		</div>
	)
}

export default DrawingJackpot
