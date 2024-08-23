import { useLotteryDataContext } from '@nx-next-app/features/F0001/providers'
import {
	ILotteryRoundData,
	useGetLotteryHistoryWinnerListQuery,
} from '@nx-next-app/service'
import dayjs from 'dayjs'
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
			<div className='grid grid-cols-4'>
				{/* select 開關.active */}
				<div
					className={`inputBox lottery-select ${isSelecting ? 'active' : ''}`}
				>
					<div
						className='dropdown'
						onClick={() => setIsSelecting(prev => !prev)}
					>
						{selectedRound && (
							<button type='button' className='btn'>
								Round {selectedRound.roundId} (
								{dayjs(selectedRound.startDate).format('YYYY/M/D')} -{' '}
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
										{dayjs(round.startDate).format('YYYY/M/D')} -{' '}
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
									<span>1st Prize</span>
								</div>
								<div className='lucky-number'>
									<span className='title'>Lucky Number</span>
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
									<div className='title'>02</div>
									<span>2nd Prize</span>
								</div>
								<div className='lucky-number'>
									<span className='title'>Lucky Number</span>
									<span>{roundData.secondPrize}</span>
								</div>
							</div>
						</div>
						<div className='card third'>
							<div className='title-group'>
								<div className='ranking'>
									<div className='title'>03</div>
									<span>{roundData.thirdPrize}</span>
								</div>
								<div className='lucky-number'>
									<span className='title'>Lucky Number</span>
									<span>000000000</span>
								</div>
							</div>
						</div>
						<Collapsable title='Consolation Prize'>
							<div className='card consolation'>
								<div className='grid grid-cols-2'>
									{roundData.consolationPrize.map(prize => (
										<div key={prize}>{prize}</div>
									))}
								</div>
							</div>
						</Collapsable>
						<Collapsable title='Small Prize'>
							<div className='card small-prize'>
								<div className='grid grid-cols-2'>
									{roundData.smallPrize.map(prize => (
										<div key={prize}>{prize}</div>
									))}
								</div>
							</div>
						</Collapsable>
						<Collapsable title='Jackpot prize'>
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
