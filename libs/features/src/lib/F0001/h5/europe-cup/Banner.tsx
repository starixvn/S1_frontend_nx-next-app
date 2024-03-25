import React from 'react'
import { useTranslation } from 'next-i18next'

const Banner = () => {
	const { t } = useTranslation()
	return (
		<div className='wrapper'>
			<div className='euro-banner'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/logo.png`}
					alt='eurocup-logo'
					className='logo'
				/>
				<div className='event-title'>
					{t('Label_EuropeCup_Event_Title')}
					<span className='event-date'>
						{t('Label_EuropeCup_Event_Period')}
					</span>
				</div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/top-bn.png`}
					alt='eurocup-banner'
					className='banner'
				/>
			</div>
		</div>
	)
}

export default Banner
