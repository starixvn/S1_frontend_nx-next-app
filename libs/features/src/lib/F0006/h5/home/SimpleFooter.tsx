import { useTranslation } from 'next-i18next'
import { upperFirst } from 'lodash-es'

const SimpleFooter = () => {
	const { t } = useTranslation()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'])
	return (
		<div className='footerModule'>
			<div className='aff'>
				<p>{t('Label_Footer_Copyright', { year, site })}</p>
			</div>
		</div>
	)
}

export { SimpleFooter }
