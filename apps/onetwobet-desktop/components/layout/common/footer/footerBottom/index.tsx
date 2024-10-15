import { useTranslation } from 'next-i18next'

const FooterBottom = () => {
	const { t } = useTranslation()

	return (
		<div className='footer-bottom'>
			<div className='copyright'>
				<span>{t('Label_Footer_Content')}</span>
				<span>
					{t('Label_Footer_Copyright', {
						year: `2008 - ${new Date().getFullYear().toString()}`,
						site: '12BET',
					})}
				</span>
			</div>
		</div>
	)
}

export default FooterBottom
