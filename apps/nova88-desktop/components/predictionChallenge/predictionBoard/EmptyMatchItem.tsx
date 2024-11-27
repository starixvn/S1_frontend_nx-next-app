import { useTranslation } from 'next-i18next'

const EmptyMatchItem = () => {
	const { t } = useTranslation()

	return (
		<div className='swiper-container'>
			<div className='swiper-wrapper'>
				<div className='swiper-slide'>
					<div className='match-card'>
						<div className='card-content'>
							<div className='card-top'>
								<div className='match'>
									{t('Label_Prediction_Challenge_Game_Title')}
								</div>
								<div className='time'>
									<span>{t('Label_Prediction_Challenge_Game_SubTitle')}</span>
								</div>
							</div>

							<div className='card-predict'>
								<div className='team'>
									<div className='team-badge'>
										<div className='team-img' />
									</div>
									<div className='team-name'>{t('Label_General_HomeTeam')}</div>
									<div className='number-box'>
										<input type='number' placeholder='-' disabled />
									</div>
								</div>
								<div className='center-txt disabled'>VS</div>
								<div className='team'>
									<div className='team-badge'>
										<div className='team-img' />
									</div>
									<div className='team-name'>{t('Label_General_AwayTeam')}</div>
									<div className='number-box'>
										<input type='number' placeholder='-' disabled />
									</div>
								</div>
							</div>
						</div>
						<button className='btn-submit' disabled>
							{t('Label_General_Submit')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmptyMatchItem
