import { useTranslation } from 'next-i18next'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { find, isUndefined } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useHome } from '../../providers'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const ProvidersBlock = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { menuData, onMenuOpen } = useMenu()
	// * platformList 共用於桌機手機
	const { platformList = [] } = useHome()

	const allSubMenu = Object.values(menuData).flatMap(item => item.subMenu)

	return (
		<>
			<div className='partner-title'>{t('Label_Home_HonorablePartner')}</div>
			<div className='partner-logo'>
				{platformList.map(provider => {
					const { imgName, productKey } = provider
					const item = find(allSubMenu, { productKey })

					// * 當被幣別過濾掉之後不做渲染
					if (isUndefined(item)) return null

					return (
						<a
							onClick={() => {
								const item = find(allSubMenu, { productKey })
								if (item) {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore

									onMenuOpen(item, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
							}}
							key={imgName}
						>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/providers-logo/${imgName}.png`}
								alt={`img-${imgName}`}
							/>
						</a>
					)
				})}
			</div>
		</>
	)
}

export { ProvidersBlock }
