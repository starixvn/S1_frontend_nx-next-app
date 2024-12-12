import { useTranslation } from 'next-i18next'

const PredictionIntroduce = () => {
	const { t } = useTranslation()

	return (
		<div className='prediction-introduce'>
			<div className='title'>{t('Label_Prediction_Challenge_League')}</div>
			<div className='text'>{t('Label_Prediction_Challenge_Notice')}</div>
		</div>
	)
}

export default PredictionIntroduce
