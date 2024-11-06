import { useAuth } from '@nx-next-app/data-access'
import { IFooterData } from 'libs/web/src/app/types/footer'
import { useTranslation } from 'next-i18next'

const QuickLinks = ({
	quickLinks = [],
}: {
	quickLinks: IFooterData['quickLinks']
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div>
			{quickLinks.map(({ displayKey, href }) =>
				displayKey === 'Label_General_Milestone' ? (
					<a key={displayKey} href={href}>
						{t(displayKey)}
					</a>
				) : (
					<a
						key={displayKey}
						href={`${href}?url=${process.env['NEXT_PUBLIC_ENV_URL']}/${langId}`}
						target='_blank'
						rel='noreferrer'
					>
						{t(displayKey)}
					</a>
				)
			)}
		</div>
	)
}

export default QuickLinks
