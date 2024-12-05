import { Carousel } from '@n88-h5/components/common'
import { usePredictionChallengeContext } from '@nx-next-app/operations'
import { ReactIdSwiperProps } from 'react-id-swiper'
import EmptyMatchItem from './EmptyMatchItem'
import MatchItem from './MatchItem'

const PredictionBoard = () => {
	const { predictMatches = [], isNoPredictionActivity } =
		usePredictionChallengeContext()

	const config: ReactIdSwiperProps = {
		slidesPerView: 1,
		autoplay: false,
		loop: false,
		rebuildOnUpdate: false,
		navigation: false,
	}

	return (
		<div className='prediction-board'>
			{isNoPredictionActivity ? (
				<div className='card-swiper'>
					<EmptyMatchItem />
				</div>
			) : (
				<div className='card-swiper'>
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
