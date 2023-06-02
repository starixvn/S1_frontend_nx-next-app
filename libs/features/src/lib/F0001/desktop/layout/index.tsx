import { ReactNode } from 'react'

import {
	BackTop,
	Footer,
	GlobalModal,
	MetaData,
	useGlobalModal,
} from '@nx-next-app/components/D0001'
import { ISEOData } from 'libs/web/src/data-access/type'
import { useAffiliateReferralEffect } from '@nx-next-app/hooks'
import LayoutHeader from './header'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
}

export function Layout({ children, persistSEOData }: ILayoutProps) {
	const { globalModal, closeModal } = useGlobalModal()

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />

			<LayoutHeader />

			{children}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />

			<Footer />

			<BackTop />
		</>
	)
}

export default Layout
