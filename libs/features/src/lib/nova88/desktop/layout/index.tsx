import { ReactNode } from 'react'
import {
	Footer,
	GlobalModal,
	useGlobalModal,
} from '@nx-next-app/components/D0001'
import LayoutHeader from './Header'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	const { globalModal, resetModal } = useGlobalModal()

	return (
		<>
			<LayoutHeader />

			{children}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} resetModal={resetModal} />

			<Footer />
		</>
	)
}

export default Layout
