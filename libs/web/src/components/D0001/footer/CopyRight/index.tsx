import { useTranslation } from 'next-i18next'
import { ICopyRightListData } from 'libs/web/src/app/types/footer'
import { upperFirst } from 'lodash-es'

const CopyRight = ({
	copyRightList,
}: {
	copyRightList: ICopyRightListData[]
}) => {
	const { t } = useTranslation()
	return (
		<div className='copyright'>
			{copyRightList.map(({ displayName, href }) => {
				return (
					<a key={displayName} href={href} target='_blank' rel='noreferrer'>
						{t(displayName)}
					</a>
				)
			})}
			<span>
				{t('Label_Footer_Copyright', {
					year: new Date().getFullYear(),
					site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME']),
				})}
			</span>
		</div>
	)
}

export default CopyRight
