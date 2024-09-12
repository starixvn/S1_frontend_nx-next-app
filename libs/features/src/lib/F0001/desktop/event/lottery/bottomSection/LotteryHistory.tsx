import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import {
	ILotteryRoundData,
	useGetLotteryHistoryWinnerListQuery,
} from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import LotterySticker from '../LotterySticker'

const LotteryHistory = () => {
	const { t } = useTranslation()
	const { roundList } = useLotteryDataContext()
	const [isSelecting, setIsSelecting] = useState(false)
	const [selectedRound, setSelectedRound] = useState<ILotteryRoundData | null>(
		roundList?.[0] ?? null
	)

	const { data: { data: roundData } = {} } =
		useGetLotteryHistoryWinnerListQuery({
			roundId: selectedRound?.roundId ?? 0,
		})

	return (
		<div className='tab-content-history'>
			{/* grid */}
			<div className='grid grid-cols-6'>
				<div
					className={`inputBox lottery-select ${isSelecting ? 'active' : ''}`}
				>
					<div
						className='dropdown'
						onClick={() => setIsSelecting(prev => !prev)}
					>
						{selectedRound && (
							<button type='button' className='btn'>
								{t('Label_Event_Round')} {selectedRound.roundId} (
								{dayjs(selectedRound.startDate).format('YYYY/M/D')}
								{' - '}
								{dayjs(selectedRound.endDate).format('YYYY/M/D')})
							</button>
						)}
						<div className='wrapper'>
							<div className='dropdown-container'>
								{roundList?.map(round => (
									<div
										key={round.roundId}
										className='dropdown-item'
										onClick={() => setSelectedRound(round)}
									>
										Round {round.roundId} (
										{dayjs(round.startDate).format('YYYY/M/D')}
										{' - '}
										{dayjs(round.endDate).format('YYYY/M/D')})
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				{roundData && selectedRound?.roundId === roundData.roundId && (
					<>
						<div className='card first'>
							<div className='title-group'>
								<div className='ranking'>
									<div className='title'>01</div>
									<span>{t('Label_Event_1stPrize')}</span>
								</div>
								<div className='lucky-number'>
									<span className='title'>{t('Label_Event_LuckyNumber')}</span>
									<span>{roundData.firstPrize}</span>
								</div>
							</div>
							<div className='trophy-img'>
								<img
									src='https://banner.0814media.net/desktop/img/event/lottery/trophy.png'
									alt='trophy'
								/>
							</div>
						</div>
						<div className='card second'>
							<div className='title-group'>
								<div className='ranking'>
									<div className='title'>02</div>
									<span>{t('Label_Event_2ndPrize')}</span>
								</div>
								<div className='lucky-number'>
									<span className='title'>{t('Label_Event_LuckyNumber')}</span>
									<span>{roundData.secondPrize}</span>
								</div>
							</div>
						</div>
						<div className='card third'>
							<div className='title-group'>
								<div className='ranking'>
									<div className='title'>03</div>
									<span>{t('Label_Event_3rdPrize')}</span>
								</div>
								<div className='lucky-number'>
									<span className='title'>{t('Label_Event_LuckyNumber')}</span>
									<span>{roundData.thirdPrize}</span>
								</div>
							</div>
						</div>
						<div className='card sticker'>
							<div className='sticker-result'>
								<LotterySticker stickerId={roundData.stickerId} />
							</div>
							<div className='title'>{t('Label_Event_JackpotSticker')}</div>
						</div>
						<div className='card consolation'>
							<div className='title'>{t('Label_Event_ConsolationPrize')}</div>
							<div className='grid grid-cols-2'>
								{roundData.consolationPrize.map(prize => (
									<div key={prize}>{prize}</div>
								))}
							</div>
						</div>
						<div className='card small-prize'>
							<div className='title'>{t('Label_Event_SmallPrize')}</div>
							<div className='grid grid-cols-4'>
								{roundData.smallPrize.map(prize => (
									<div key={prize}>{prize}</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default LotteryHistory
