import React from 'react'
import { useTranslation } from 'next-i18next'

const Reward = () => {
	const { t } = useTranslation()

	return (
		<>
			<div className='title'>{t('Label_EuropeCup_Reward_Prize')}</div>
			<div className='euro-reward'>
				<div className='euro-reward-item'>
					<div className='euro-reward-top first'>
						<div className='title'>
							<span>{t('Label_EuropeCup_Winner_Tier')}</span>
							{t('Label_EuropeCup_Champions')}
						</div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/crown.png`}
							alt='eurocup-crown'
						/>
					</div>
					<div className='euro-reward-content'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/watch.jpg`}
							alt='eurocup-watch'
						/>
						<div className='euro-reward-info'>
							<div>
								<div className='subtitle'>{t('Label_EuropeCup_Prize')}</div>
								<div className='reward'>
									{t('Label_EuropeCup_Rolex_Timepiece')}
								</div>
							</div>
							<div>
								<div className='subtitle'>
									{t('Label_EuropeCup_Prize_Count')}
								</div>
								<div className='reward'>1</div>
							</div>
						</div>
					</div>
					{/* TODO 僅有一名得獎人時 +one 開啟時 + active */}
					<div className='euro-reward-result'>
						<div>
							<div>{t('Label_EuropeCup_Winners')}</div>
							<span>{t('Label_EuropeCup_Drawn_Out_Time')}</span>
						</div>
					</div>
				</div>
				<div className='euro-reward-item'>
					<div className='euro-reward-top second'>
						<div className='title'>
							<span>{t('Label_EuropeCup_Winner_Tier')}</span>
							{t('Label_EuropeCup_2nd_Place')}
						</div>
					</div>
					<div className='euro-reward-content'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/bali.jpg`}
							alt='eurocup-bali'
						/>
						<div className='euro-reward-info'>
							<div>
								<div className='subtitle'>{t('Label_EuropeCup_Prize')}</div>
								<div className='reward'>
									{t('Label_EuropeCup_Nights_In_Bali')}
								</div>
							</div>
							<div>
								<div className='subtitle'>
									{t('Label_EuropeCup_Prize_Count')}
								</div>
								<div className='reward'>1</div>
							</div>
						</div>
					</div>
					{/* TODO 僅有一名得獎人時 +one 開啟時 + active */}
					<div className='euro-reward-result'>
						<div>
							<div>{t('Label_EuropeCup_Winners')}</div>
							<span>{t('Label_EuropeCup_Drawn_Out_Time')}</span>
						</div>
					</div>
				</div>
				<div className='euro-reward-item'>
					<div className='euro-reward-top third'>
						<div className='title'>
							<span>{t('Label_EuropeCup_Winner_Tier')}</span>
							{t('Label_EuropeCup_Semi_Finals')}
						</div>
					</div>
					<div className='euro-reward-content'>
						<img
							src='https://banner.0814media.net/h5/img/event/eurocup/cost.jpg'
							alt='eurocup-cost'
						/>
						<div className='euro-reward-info'>
							<div>
								<div className='subtitle'>{t('Label_EuropeCup_Prize')}</div>
								<div className='reward'>
									{t('Label_EuropeCup_FreeBet_Worth')}
								</div>
							</div>
							<div>
								<div className='subtitle'>
									{t('Label_EuropeCup_Prize_Count')}
								</div>
								<div className='reward'>1</div>
							</div>
						</div>
					</div>
					{/* TODO 僅有一名得獎人時 +one 開啟時 + active */}
					<div className='euro-reward-result'>
						<div>
							<div>{t('Label_EuropeCup_Winners')}</div>
							<span>{t('Label_EuropeCup_Drawn_Out_Time')}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Reward
