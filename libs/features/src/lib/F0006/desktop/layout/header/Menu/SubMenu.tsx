import QRCode from 'qrcode.react'
import Image from 'next/future/image'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useAuth } from '@nx-next-app/data-access'
import { getSubMenuEventIcon, useMenu } from '@nx-next-app/features/F0006/hooks'
import { uniqueId, upperCase } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { useGetAppDownloadLinksQuery } from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuKeyEnum } from '@nx-next-app/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0006/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
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
	const { data: { data: appDownloadLinks } = {} } =
		useGetAppDownloadLinksQuery(null)

	const renderSubMenu = (key: string) => {
		const {
			desktop: { menuType, subMenuClassName, menuActionType },
			subMenu,
			pathname,
			product,
			query,
		} = menuData[key as MenuKeyEnum]

		// * AppDownload 的元件較獨特，非 menu 也非 banner, 因此先獨立出來實作
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
		// 								<Image
		// 									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/appdownload_and.jpg`}
		// 									alt='Andriod Download'
		// 									height={100}
		// 									width={100}
		// 								/>
		// 							)}

		// 							{item.appTypeName === 'IOS' && (
		// 								<Image
		// 									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/appdownload_ios.jpg`}
		// 									alt='IOS Download'
		// 									height={100}
		// 									width={100}
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
							className={classNames(className, subMenuEventIcon?.icon, {
								active: item.isTpMaintain,
							})}
							onClick={() => {
								onMenuOpen(item, {
									loginCallback: () => modal.open(<LoginModal />),
									messageCallBack: message => modal.error(message),
								})
							}}
						>
							{headerMenuImgList?.map(img => (
								<img
									key={img.imgUrl}
									className={classNames(img.className)}
									alt={img.imgUrl}
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${img.imgUrl}`}
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
