import { useAuth } from '@nx-next-app/data-access'
import { IFooterData } from 'libs/web/src/app/types/footer'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

const QuickLinks = ({
	quickLinks = [],
}: {
	quickLinks: IFooterData['quickLinks']
}) => {
	const { t } = useTranslation()
	const [rootUrl, setRootUrl] = useState('')
	const {
		userInfo: { currencyId },
	} = useAuth()

	useEffect(() => {
		setRootUrl(window.location.origin)
	}, quickLinks)

	return (
		<>
			{quickLinks.map(({ displayKey, href }) =>
				displayKey === 'Label_General_Milestone' ? (
					<a key={displayKey} href={href}>
						{t(displayKey)}
					</a>
				) : (
					<a
						key={displayKey}
						href={`${href}?currencyId=${currencyId}`}
						target='_blank'
						rel='noreferrer'
					>
						{t(displayKey)}
					</a>
				)
			)}
		</>
	)
}

export default QuickLinks
