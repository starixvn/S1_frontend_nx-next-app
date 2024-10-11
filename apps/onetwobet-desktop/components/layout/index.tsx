import { GlobalModal, MetaData } from '@12b-desktop/components/common'
import { BackTop } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISEOData } from '@nx-next-app/data-access'
import {
	useAffiliateReferralEffect,
	useChangePasswordModalEffect,
} from '@nx-next-app/hooks'
import { useResetPasswordEffect } from '@nx-next-app/operations'
import { IFooterData } from '@nx-next-app/types'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import LayoutFooter from './common/footer/index'
import LayoutHeader from './common/header/index'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
	footerData?: IFooterData
	showFooter?: boolean
	hasGoTopBtn?: boolean
}

const ChangePasswordModal = dynamic(
	() => import('../modal/ChangePasswordModal'),
	{ ssr: false }
)

const ResetPasswordModal = dynamic(
	() => import('../modal/ResetPasswordModal'),
	{ ssr: false }
)

export function Layout({
	children,
	persistSEOData,
	footerData,
	showFooter = true, // * 判斷是否顯示 footer
	hasGoTopBtn = true,
}: ILayoutProps) {
	const { globalModal, closeModal, modal } = useGlobalModal()

	useChangePasswordModalEffect(() => modal.open(<ChangePasswordModal />))
	useResetPasswordEffect(() => modal.open(<ResetPasswordModal />))

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />

			<LayoutHeader />

			{children}

			{showFooter && !!footerData && <LayoutFooter footerData={footerData} />}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />

			{hasGoTopBtn && <BackTop />}
		</>
	)
}

export default Layout
