import { useTranslation } from 'next-i18next'
import { IFooterData } from 'libs/web/src/app/types/footer'
import { upperFirst } from 'lodash-es'

const CopyRight = ({
	copyRightList = [],
}: {
	copyRightList: IFooterData['copyRightList']
}) => {
	const { t } = useTranslation()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'])
	return (
		<div className='copyright'>
			{copyRightList.map(({ displayKey, href }) => {
				return (
					<a key={displayKey} href={href} target='_blank' rel='noreferrer'>
						{t(displayKey)}
					</a>
				)
			})}
			<span>{t('Label_Footer_Copyright', { year, site })}</span>
		</div>
	)
}

export default CopyRight
