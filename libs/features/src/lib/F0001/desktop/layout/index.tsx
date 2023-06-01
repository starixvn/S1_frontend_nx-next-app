import { ReactNode } from 'react'
import {
	BackTop,
	Footer,
	GlobalModal,
	useGlobalModal,
} from '@nx-next-app/components/D0001'

import { useAffiliateReferralEffect } from '@nx-next-app/hooks'
import LayoutHeader from './header'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	const { globalModal, closeModal } = useGlobalModal()

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
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
