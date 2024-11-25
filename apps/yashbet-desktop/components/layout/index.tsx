import { BackTop, GlobalModal, MetaData } from '@nx-next-app/components/D0006'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISEOData, useAuth } from '@nx-next-app/data-access'
import LayoutFooter from '@nx-next-app/features/F0006/desktop/layout/footer'
import LayoutHeader from '@nx-next-app/features/F0006/desktop/layout/header'
import {
	useAffiliateReferralEffect,
	useChangePasswordModalEffect,
} from '@nx-next-app/hooks'
import {
	LIVE_CHAT_ID_BY_LANG_ID,
	ThirdPartyJS,
} from '@nx-next-app/site/yashbet'
import { IFooterData } from '@nx-next-app/types'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
	footerData?: IFooterData
	showFooter?: boolean
	isFullFooter?: boolean
	hasGoTopBtn?: boolean
}

const ChangePasswordModal = dynamic(
	() => import('@yashbet-desktop/components/modal/ChangePasswordModal'),
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
	const {
		userInfo: { langId },
	} = useAuth()
	const { globalModal, closeModal, modal } = useGlobalModal()

	useChangePasswordModalEffect(() => modal.open(<ChangePasswordModal />))

	const { LiveChatScript } = ThirdPartyJS

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

			<LiveChatScript liveChatId={LIVE_CHAT_ID_BY_LANG_ID[langId] || 12} />
		</>
	)
}

export default Layout
