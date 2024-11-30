import { BackTop } from '@nx-next-app/components/D0001'
import { GlobalModal, MetaData } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { ISEOData, useAuth } from '@nx-next-app/data-access'
import LayoutFooter from '@nx-next-app/features/F0001/h5/layout/footer'
import { useAffiliateReferralEffect } from '@nx-next-app/hooks'
import { useChangePasswordModalEffect } from 'libs/web/src/hooks/useChangePasswordModalEffect'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import RotationHint from './RotationHint'

interface ILayoutProps {
	children: ReactNode
	persistSEOData: ISEOData
}

const Layout = ({ children, persistSEOData }: ILayoutProps) => {
	const { globalModal, closeModal } = useGlobalModal()

	const router = useRouter()
	const {
		auth: { isLogin },
	} = useAuth()

	useChangePasswordModalEffect(() => router.push(paths.changePassword.root))

	useAffiliateReferralEffect({ expireDay: 7 })

	return (
		<>
			<MetaData persistSEOData={persistSEOData} />
			<RotationHint />
			{children}

			{isLogin && <LayoutFooter />}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} closeModal={closeModal} />

			<BackTop />
		</>
	)
}

export default Layout
