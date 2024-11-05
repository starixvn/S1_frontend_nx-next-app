import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PRODUCTS } from '@nx-next-app/constants'
import { useMenu } from '@nx-next-app/operations'
import {
	IDynamicSubMenuItem,
	LobbyCategoryEnum,
	MenuActionTypeEnum,
} from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const LoginModal = dynamic(
	() => import('@12b-indo-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const LiveStreamingModalDesktop = dynamic(
	() => import('@12b-indo-desktop/components/modal/LiveStreamingModal'),
	{ ssr: false }
)

const Products = () => {
	const { t } = useTranslation()
	const { menuList = [], onMenuOpen } = useMenu()

	const { modal } = useGlobalModal()
	return (
		<>
			<div className='footer-center-title'>{t('Label_General_Product')}</div>
			<ul>
				{menuList.map(item => {
					const { lobbyCategoryId, category, pathname, subMenu, displayKey } =
						item
					// * 特例 Sport Soccer (需轉 EnterPage)
					if (lobbyCategoryId === LobbyCategoryEnum.Sports) {
						const soccerItem = subMenu?.find(
							sportSubItem =>
								sportSubItem.tpGameIdNo === PRODUCTS.Soccer.tpGameIdNo
						)
						return (
							<li key={lobbyCategoryId}>
								<a
									className=''
									type='button'
									onClick={() =>
										onMenuOpen(
											{
												...soccerItem,
												desktop: {
													menuActionType: MenuActionTypeEnum.EnterPage,
												},
											} as IDynamicSubMenuItem,
											{
												loginCallback: () => modal.open(<LoginModal />),
												messageCallBack: message => modal.error(message),
												liveStreamingCallback: () =>
													modal.open(<LiveStreamingModalDesktop />),
											}
										)
									}
								>
									{t(displayKey)}
								</a>
							</li>
						)
					}

					// * 特例 EXCHANGE 沒有導轉功能
					if (lobbyCategoryId === LobbyCategoryEnum.Exchange) {
						return (
							<li key={lobbyCategoryId}>
								<a className='nav-btn' key={lobbyCategoryId}>
									{t(displayKey)}
								</a>
							</li>
						)
					}

					return (
						<li key={category}>
							<Link href={pathname}>
								<a>{t(displayKey)}</a>
							</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default Products
