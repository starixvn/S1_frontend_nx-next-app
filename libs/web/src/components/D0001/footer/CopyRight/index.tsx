import { useTranslation } from 'next-i18next'
import { IFooterData } from 'libs/web/src/app/types/footer'

const QuickLinks = ({
	quickLinks = [],
}: {
	quickLinks: IFooterData['quickLinks']
}) => {
	const { t } = useTranslation()

	return (
		<div>
			{quickLinks.map(({ displayKey, href }) =>
				displayKey === 'Label_General_Milestone' ? (
					<a key={displayKey} href={href}>
						{t(displayKey)}
					</a>
				) : (
					<a key={displayKey} href={href} target='_blank' rel='noreferrer'>
						{t(displayKey)}
					</a>
				)
			)}
		</div>
	)
}

export default QuickLinks
