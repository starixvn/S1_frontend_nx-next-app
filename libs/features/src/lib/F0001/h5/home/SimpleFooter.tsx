import { upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const SimpleFooter = () => {
	const { t } = useTranslation()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_BRAND_NAME'])
	return (
		<div className='footerModule' style={{ paddingBottom: '3vw' }}>
			<div className='aff' style={{ textAlign: 'center' }}>
				<p>{t('Label_Footer_Copyright', { year, site })}</p>
			</div>
		</div>
	)
}

export default SimpleFooter
