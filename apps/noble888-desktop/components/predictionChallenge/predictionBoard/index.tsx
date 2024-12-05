import { Carousel } from '@apps/noble888-desktop/components/common'
import { usePredictionChallengeContext } from '@nx-next-app/operations'
import { useState } from 'react'
import { ReactIdSwiperProps } from 'react-id-swiper'
import EmptyMatchItem from './EmptyMatchItem'
import MatchItem from './MatchItem'

const PredictionBoard = () => {
	const [showNavigation, setShowNavigation] = useState(false)
	const { predictMatches = [], isNoPredictionActivity } =
		usePredictionChallengeContext()

	const config: ReactIdSwiperProps = {
		slidesPerView: 1,
		autoplay: false,
		loop: false,
		rebuildOnUpdate: false,
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-prev'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-next'
			/>
		),
	}

	return (
		<div className='prediction-board'>
			{isNoPredictionActivity ? (
				<div className='card-swiper'>
					<EmptyMatchItem />
				</div>
			) : (
				<div
					className='card-swiper'
					onMouseOver={() => setShowNavigation(true)}
					onMouseOut={() => setShowNavigation(false)}
					onFocus={() => 0}
					onBlur={() => 0}
				>
					<Carousel {...config}>
						{predictMatches?.map(matchData => (
							<MatchItem key={matchData.matchId} data={matchData} />
						))}
					</Carousel>
				</div>
			)}
		</div>
	)
}

export default PredictionBoard
