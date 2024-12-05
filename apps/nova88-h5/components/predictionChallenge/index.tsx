import { Loading } from '@n88-h5/components/common'
import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { usePredictionChallengeContext } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import PredictionBanner from './PredictionBanner'
import PredictionIntroduce from './PredictionIntroduce'
import PredictionResult from './PredictionResult'
import PredictionBoard from './predictionBoard'

const PredictionChallenge = () => {
	const { t } = useTranslation()
	const { isLoading } = usePredictionChallengeContext()
	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<Header className='header'>
				<Header.Tag
					title={t('Label_Event_Prediction_Challenge') as string}
					back={paths.home.root}
				/>
			</Header>
			<main className='prediction'>
				<PredictionBanner />
				<div className='prediction-container'>
					<PredictionIntroduce />
					<PredictionBoard />
					<PredictionResult />
				</div>
				<div className='bottom-graphic'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/prediction/bottom-background.png`}
						alt='bottom-background'
					/>
				</div>
			</main>
		</>
	)
}

export default PredictionChallenge
