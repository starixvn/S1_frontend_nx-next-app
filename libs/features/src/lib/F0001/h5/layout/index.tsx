import { ReactNode } from 'react'
import { ISEOData } from '@nx-next-app/data-access'
import { MetaData } from '@nx-next-app/components/H0001'
import { useAffiliateReferralEffect } from '@nx-next-app/hooks'
import LayoutFooter from './footer'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
}

const Layout = ({ children, persistSEOData }: ILayoutProps) => {
	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />

			{children}

			<LayoutFooter />
		</>
	)
}

export default Layout
