import QRCode from 'qrcode.react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useAuth } from '@nx-next-app/data-access'
import { getSubMenuEventIcon, useMenu } from '@nx-next-app/features/F0001/hooks'
import { upperCase } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { useGetAppDownloadLinksQuery } from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuKeyEnum } from '@nx-next-app/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
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
		if (key === MenuKeyEnum.AppDownload) {
			return (
				<a
					key={key}
					className={classNames(subMenuClassName, {
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
					<div>
						<div className='txt-orange'>
							{upperCase(process.env['NEXT_PUBLIC_SITE_NAME'])}
						</div>
						<div>{t('Label_APP_DOWNLOAD_Title')}</div>
						<div className='appListQrcode'>
							{appDownloadLinks?.map(item => (
								<div key={item.downloadLink}>
									<QRCode
										value={item.downloadLink}
										renderAs='svg'
										size={112}
										includeMargin
									/>
									{item.appTypeName === 'Andriod' && (
										<img
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/appdownload_and.jpg`}
											alt='Andriod Download'
										/>
									)}

									{item.appTypeName === 'IOS' && (
										<img
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/appdownload_ios.jpg`}
											alt='IOS Download'
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</a>
			)
		}

		if (menuType === 'banner') {
			return (
				<div
					key={key}
					onMouseEnter={() => setMenuKey(key)}
					onMouseLeave={() => setMenuKey(undefined)}
				>
					<a
						className={classNames(subMenuClassName, langId, {
							active: key === debouncedMenuKey,
						})}
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
				</div>
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
						<a
							style={{
								// * 如果維護中取消點擊事件
								pointerEvents: item.isTpMaintain ? 'none' : 'auto',
							}}
							key={productKey}
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
							<img
								className='ListBG-left'
								alt='ListBG-left'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/subMenu-Wrapper-ListBG-left.png`}
							/>

							<img
								className='ListBG-right'
								alt='ListBG-right'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/subMenu-Wrapper-ListBG-right.png`}
							/>
							<img
								className='ListBG-center'
								alt='ListBG-center'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/subMenu-Wrapper-ListBG-center.png`}
							/>
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
						</a>
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
