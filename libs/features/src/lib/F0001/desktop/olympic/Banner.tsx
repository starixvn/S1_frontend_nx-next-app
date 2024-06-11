import { useTranslation } from 'next-i18next'

const Banner = () => {
	const { t } = useTranslation()
	return (
		<div className='olympic-top'>
			<img
				className='olympic-top-logo'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/logo-desktop.png`}
				alt='olympic logo'
			/>
			<div className='olympic-top-text'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/nova-logo.png`}
					alt='olympic banner'
				/>
				<div>{t('Label_Olympic_Medal_Rush')}</div>
				<div>{t('Label_Olympic_Game_Wide_Open')}</div>
				<div>{t('Label_Olympic_Event_Period')}</div>
			</div>
		</div>
	)
}

export default Banner
