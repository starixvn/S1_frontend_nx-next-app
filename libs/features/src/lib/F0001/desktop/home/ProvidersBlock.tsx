import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useHome } from '../../providers'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const ProvidersBlock = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()
	// * platformList 共用於桌機手機
	const { platformList = [] } = useHome()

	const showPlatFormList = menuList.flatMap(mainMenuItem => {
		const { subMenu } = mainMenuItem || {}

		// * 並非所有的產品都存在 platformList
		return subMenu?.flatMap(subMenuItem => {
			const defPlatformList = find(platformList, {
				tpGameIdNo: subMenuItem?.tpGameIdNo,
			})

			if (defPlatformList) {
				return {
					...subMenuItem,
					...defPlatformList,
				}
			}

			return []
		})
	})

	return (
		<>
			<div className='partner-title'>{t('Label_Home_HonorablePartner')}</div>
			<div className='partner-logo'>
				{showPlatFormList?.map(prodictItem => {
					const { imgName } = prodictItem || {}
					return (
						imgName && (
							<button
								onClick={() =>
									onMenuOpen(prodictItem, {
										loginCallback: () => modal.open(<LoginModal />),
										messageCallBack: message => modal.error(message),
										liveStreamingCallback: () =>
											modal.open(<LiveStreamingModalDesktop />),
									})
								}
								key={imgName}
							>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/providers-logo/${imgName}.png`}
									alt={imgName}
								/>
							</button>
						)
					)
				})}
			</div>
		</>
	)
}

export default ProvidersBlock
