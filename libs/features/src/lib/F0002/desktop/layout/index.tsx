import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { ISEOData } from '@nx-next-app/data-access'
import {
	useAffiliateReferralEffect,
	useGlobalModalEffect,
} from '@nx-next-app/hooks'
import { BackTop, GlobalModal, MetaData } from '@nx-next-app/components/D0002'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import LayoutHeader from '@nx-next-app/features/F0002/desktop/layout/header'
import LayoutFooter from '@nx-next-app/features/F0002/desktop/layout/footer'
import { IFooterData } from '@nx-next-app/types'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
	footerData?: IFooterData
	showFooter?: boolean
	isFullFooter?: boolean
	hasGoTopBtn?: boolean
}

const ChangePasswordModal = dynamic(
	() => import('../modal/ChangePasswordModal'),
	{ ssr: false }
)

export function Layout({
	children,
	persistSEOData,
	footerData,
	showFooter = true, // * 判斷是否顯示 footer
	isFullFooter = false, // * 判斷是否顯示全版 footer
	hasGoTopBtn = true,
}: ILayoutProps) {
	const { globalModal, closeModal, modal } = useGlobalModal()

	useGlobalModalEffect(() => modal.open(<ChangePasswordModal />))

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />

			<LayoutHeader />

			{children}

			{showFooter && !!footerData && (
				<LayoutFooter footerData={footerData} isFullFooter={isFullFooter} />
			)}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />

			{hasGoTopBtn && <BackTop />}
		</>
	)
}

export default Layout
