import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { ISEOData } from '@nx-next-app/data-access'
import { MetaData, GlobalModal } from '@nx-next-app/components/H0006'
import { useAffiliateReferralEffect } from '@nx-next-app/hooks'
import { useChangePasswordModalEffect } from 'libs/web/src/hooks/useChangePasswordModalEffect'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { BackTop } from '@nx-next-app/components/D0006'
import LayoutFooter from './footer'
import RotationHint from './RotationHint'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
}

const Layout = ({ children, persistSEOData }: ILayoutProps) => {
	const { globalModal, closeModal } = useGlobalModal()
	const router = useRouter()

	useChangePasswordModalEffect(() => router.push(paths.changePassword.root))

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />
			<RotationHint />
			{children}
			<LayoutFooter />

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />

			<BackTop />
		</>
	)
}

export default Layout
