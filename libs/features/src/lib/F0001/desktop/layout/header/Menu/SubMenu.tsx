import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useAuth } from '@nx-next-app/data-access'
import { getSubMenuEventIcon, useMenu } from '@nx-next-app/features/F0001/hooks'
import { toLower, uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'

import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuKeyEnum } from '@nx-next-app/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)
const LiveStreamingModalDesktop = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LiveStreamingModal'),
	{ ssr: false }
)

interface ISubMenuProps {
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const SubMenu = ({ debouncedMenuKey, setMenuKey }: ISubMenuProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { modal } = useGlobalModal()
	const { menuData, onMenuOpen } = useMenu()

	const renderSubMenu = (key: string) => {
		const menu = menuData[key as MenuKeyEnum]
		if (!menu) return null

		const {
			desktop: { menuType, subMenuClassName, menuActionType },
			subMenu,
			pathname,
			product,
			query,
		} = menu

		// * AppDownload 的元件較獨特，非 menu 也非 banner, 因此先獨立出來實作
		// * 更新：關閉此功能
		// if (key === MenuKeyEnum.AppDownload) {
		// 	return (
		// 		<button
		// 			key={key}
		// 			className={classNames(subMenuClassName, {
		// 				active: key === debouncedMenuKey,
		// 			})}
		// 			onMouseEnter={() => setMenuKey(key)}
		// 			onMouseLeave={() => setMenuKey(undefined)}
		// 			onClick={() =>
		// 				onMenuOpen(
		// 					{
		// 						desktop: { menuActionType },
		// 						pathname,
		// 						query,
		// 						product,
		// 					},
		// 					{
		// 						loginCallback: () => modal.open(<LoginModal />),
		// 						messageCallBack: message => modal.error(message),
		// 					}
		// 				)
		// 			}
		// 		>
		// 			<div>
		// 				<div className='txt-orange'>
		// 					{upperCase(process.env['NEXT_PUBLIC_SITE_NAME'])}
		// 				</div>
		// 				<div>{t('Label_APP_DOWNLOAD_Title')}</div>
		// 				<div className='appListQrcode'>
		// 					{appDownloadLinks?.map(item => (
		// 						<div key={item.downloadLink}>
		// 							<QRCode
		// 								value={item.downloadLink}
		// 								renderAs='svg'
		// 								size={112}
		// 								includeMargin
		// 							/>
		// 							{item.appTypeName === 'Andriod' && (
		// 								<img
		// 									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/appdownload_and.jpg`}
		// 									alt='Andriod Download'
		//
		// 								/>
		// 							)}

		// 							{item.appTypeName === 'IOS' && (
		// 								<img
		// 									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/appdownload_ios.jpg`}
		// 									alt='IOS Download'
		// 								/>
		// 							)}
		// 						</div>
		// 					))}
		// 				</div>
		// 			</div>
		// 		</button>
		// 	)
		// }

		if (menuType === 'banner') {
			return (
				<a
					role='link'
					aria-hidden
					key={key}
					className={classNames(subMenuClassName, langId, {
						active: key === debouncedMenuKey,
					})}
					onMouseEnter={() => setMenuKey(key)}
					onMouseLeave={() => setMenuKey(undefined)}
					onClick={() =>
						onMenuOpen(
							{
								desktop: { menuActionType },
								pathname,
								query,
								product,
							},
							{
								loginCallback: () => modal.open(<LoginModal />),
								messageCallBack: message => modal.error(message),
								liveStreamingCallback: () =>
									modal.open(<LiveStreamingModalDesktop />),
							}
						)
					}
				>
					<div />
				</a>
			)
		}

		return (
			<div
				key={key}
				className={classNames(subMenuClassName, {
					active: key === debouncedMenuKey,
				})}
				onMouseEnter={() => setMenuKey(key)}
				onMouseLeave={() => setMenuKey(undefined)}
			>
				{subMenu?.map(item => {
					const {
						desktop: { className, headerMenuImgList } = {},
						eventIcons,
						displayKey,
						displayText,
						productKey,
					} = item

					const subMenuEventIcon = getSubMenuEventIcon(eventIcons)

					return (
						<button
							style={{
								// * 如果維護中取消點擊事件
								pointerEvents: item.isTpMaintain ? 'none' : 'auto',
							}}
							key={productKey || uniqueId()}
							className={classNames(className, {
								active: item.isTpMaintain,
							})}
							onClick={() => {
								onMenuOpen(item, {
									loginCallback: () => modal.open(<LoginModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{subMenuEventIcon && (
								<div className={subMenuEventIcon?.icon}>
									{subMenuEventIcon?.text}
								</div>
							)}

							{headerMenuImgList?.map(img => (
								<img
									key={img.imgUrl}
									className={classNames(img.className)}
									alt={img.imgUrl}
									src={`${
										process.env['NEXT_PUBLIC_BANNER_HOST']
									}/desktop/img/4.0/dropdown/${toLower(key)}/${img.imgUrl}`}
								/>
							))}

							<span>{displayKey ? t(displayKey) : displayText}</span>
							<div className='under'>{t('Label_General_UnderMaintenance')}</div>
						</button>
					)
				})}
			</div>
		)
	}

	return (
		<div className='subMenu-Wrapper-new'>
			{Object.keys(menuData).map(key => renderSubMenu(key))}
		</div>
	)
}

export default SubMenu
