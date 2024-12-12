import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const PredictionBanner = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	return (
		<div className='prediction-banner'>
			<div className='banner-content'>
				<div className='banner-logo'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/prediction/logo.png`}
						alt='banner-logo'
					/>
				</div>
				<div className='banner-caption'>
					<div className='title'>{t('Label_Prediction_Challenge_Title')}</div>
					<div className='subtitle'>
						{t(`Label_Prediction_Challenge_Subtitle_${currencyId}`)}
					</div>
				</div>
			</div>
			<img
				className='banner-top'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/prediction/banner.jpg`}
				alt='banner-top'
			/>
		</div>
	)
}

export default PredictionBanner
