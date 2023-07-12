import React, { ReactNode } from 'react'
import { BackTop, GlobalModal, MetaData } from '@nx-next-app/components/D0001'
import { ISEOData } from 'libs/web/src/data-access/type'
import { useAffiliateReferralEffect } from '@nx-next-app/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import LayoutHeader from '@nx-next-app/features/F0001/desktop/layout/header'
import LayoutFooter from '@nx-next-app/features/F0001/desktop/layout/footer'
import { IResponseConvertedFooterData } from 'libs/web/src/app/types/footer'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
	footerData: IResponseConvertedFooterData
}

export function Layout({ children, persistSEOData, footerData }: ILayoutProps) {
	const { globalModal, closeModal } = useGlobalModal()
	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />

			<LayoutHeader />

			{children}

			<LayoutFooter footerData={footerData} isFullFooter />

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />

			<BackTop />
		</>
	)
}

export default Layout
