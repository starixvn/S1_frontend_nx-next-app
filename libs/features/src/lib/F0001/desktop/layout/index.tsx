import {
	BackTop,
	GlobalModal,
	MetaData,
	Survey,
} from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISEOData } from '@nx-next-app/data-access'
import LayoutFooter from '@nx-next-app/features/F0001/desktop/layout/common/footer'
import LayoutHeader from '@nx-next-app/features/F0001/desktop/layout/common/header'
import {
	useAffiliateReferralEffect,
	useChangePasswordModalEffect,
} from '@nx-next-app/hooks'
import { IFooterData } from '@nx-next-app/types'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

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

export function Layout({
	children,
	persistSEOData,
	footerData,
	showFooter = true, // * 判斷是否顯示 footer
	hasGoTopBtn = true,
}: ILayoutProps) {
	const { globalModal, closeModal, modal } = useGlobalModal()

	useChangePasswordModalEffect(() => modal.open(<ChangePasswordModal />))

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />

			<LayoutHeader />

			{children}

			{showFooter && !!footerData && <LayoutFooter footerData={footerData} />}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />
			<div className='group-fixed'>
				{hasGoTopBtn && <BackTop />}
				<Survey />
				<div className='icon-line-fixed'>
					<a
						href='https://line.me/ti/p/FKGAY68Tse'
						target='_blank'
						className='live-chat'
						rel='noreferrer'
					>
						<span className='icon icon-line-chat' />
					</a>
				</div>
			</div>
		</>
	)
}

export default Layout
