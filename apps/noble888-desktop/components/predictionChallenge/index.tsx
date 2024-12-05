import { Loading } from '@apps/noble888-desktop/components/common'
import { usePredictionChallengeContext } from '@nx-next-app/operations'
import PredictionBanner from './PredictionBanner'
import PredictionIntroduce from './PredictionIntroduce'
import PredictionResult from './PredictionResult'
import PredictionBoard from './predictionBoard'

const PredictionChallenge = () => {
	const { isLoading } = usePredictionChallengeContext()

	return (
		<main className='prediction'>
			<PredictionBanner />
			<div className='prediction-container'>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<PredictionIntroduce />
						<PredictionBoard />
						<PredictionResult />
					</>
				)}
			</div>
			<div className='bottom-graphic'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/prediction/bottom-background.png`}
					alt='bottom-background'
				/>
			</div>
		</main>
	)
}

export default PredictionChallenge
