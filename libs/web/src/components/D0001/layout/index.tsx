import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	const {
		i18n: { language },
	} = useTranslation()

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${
		language === 'cs' ? 'logo_cs' : 'logo_en'
	}.png`

	return (
		<>
			<Header logoUrl={logoUrl} />
			{children}
		</>
	)
}

export default Layout
