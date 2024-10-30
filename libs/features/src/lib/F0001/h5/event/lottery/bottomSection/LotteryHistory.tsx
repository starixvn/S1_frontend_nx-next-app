import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import {
	ILotteryRoundData,
	useGetLotteryHistoryWinnerListQuery,
} from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'
import LotterySticker from '../LotterySticker'

const Collapsable = ({
	children,
	title,
}: {
	children: ReactNode
	title: string
}) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className={`card collapse ${isOpen ? 'active' : ''}`}>
			<button className='title-group' onClick={() => setIsOpen(prev => !prev)}>
				<div className='title'>{title}</div>
				<div className='arrow' />
			</button>
			{isOpen && children}
		</div>
	)
}

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
			<div className='grid grid-cols-4'>
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
								{dayjs(selectedRound.startDate).format('D MMM YYYY')}
								{' - '}
								{dayjs(selectedRound.endDate).format('D MMM YYYY')})
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
										{t('Label_Event_Round')} {round.roundId} (
										{dayjs(round.startDate).format('D MMM YYYY')}
										{' - '}
										{dayjs(round.endDate).format('D MMM YYYY')})
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
									<div className='title'>{t('Label_Event_1stPrize')}</div>
								</div>
								<div className='lucky-number'>
									<span className='title'>{t('Label_Event_LuckyNumber')}</span>
									<span>{roundData.firstPrize}</span>
								</div>
							</div>
							<div className='trophy-img'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/lottery/trophy.png`}
									alt='trophy'
								/>
							</div>
						</div>
						<div className='card second'>
							<div className='title-group'>
								<div className='ranking'>
									<div className='title'>{t('Label_Event_2ndPrize')}</div>
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
									<div className='title'>{t('Label_Event_3rdPrize')}</div>
								</div>
								<div className='lucky-number'>
									<span className='title'>{t('Label_Event_LuckyNumber')}</span>
									<span>{roundData.thirdPrize}</span>
								</div>
							</div>
						</div>
						<Collapsable title={t('Label_Event_ConsolationPrize')}>
							<div className='card consolation'>
								<div className='grid grid-cols-2'>
									{roundData.consolationPrize.map(prize => (
										<div key={prize}>{prize}</div>
									))}
								</div>
							</div>
						</Collapsable>
						<Collapsable title={t('Label_Event_SmallPrize')}>
							<div className='card small-prize'>
								<div className='grid grid-cols-2'>
									{roundData.smallPrize.map(prize => (
										<div key={prize}>{prize}</div>
									))}
								</div>
							</div>
						</Collapsable>
						<Collapsable title={t('Label_Event_JackpotSticker')}>
							<div className='card sticker'>
								<div className='sticker-result'>
									<LotterySticker stickerId={roundData.stickerId} />
								</div>
							</div>
						</Collapsable>
					</>
				)}
			</div>
		</div>
	)
}

export default LotteryHistory
