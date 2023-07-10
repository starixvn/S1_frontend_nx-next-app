import Link from 'next/link'
import QRCode from 'qrcode.react'
import classNames from 'classnames'
import { useAuth } from '@nx-next-app/data-access'
import { IMenuData, MenuKeyEnum } from '@nx-next-app/features/F0001/types'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { uniqueId, upperCase } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { useGetAppDownloadLinksQuery } from '@nx-next-app/service'

interface ISubMenuProps {
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const SubMenu = ({ debouncedMenuKey, setMenuKey }: ISubMenuProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	const { menuData, onMenuOpen } = useMenu<IMenuData>({
		langId,
	})

	const { data: { data: appDownloadLinks } = {} } =
		useGetAppDownloadLinksQuery(null)

	const renderSubMenu = (key: string) => {
		const { subMenu, subMenuClassName, pathname, menuType } =
			menuData[key as MenuKeyEnum]

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
				>
					<div>
						<div className='txt-orange'>
							{upperCase(process.env['NEXT_PUBLIC_SITE_NAME'])}
						</div>
						<div>The Most User Friendly APP</div>
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
					<Link href={pathname || '/'}>
						<a
							className={classNames(subMenuClassName, langId, {
								active: key === debouncedMenuKey,
							})}
						>
							<div />
						</a>
					</Link>
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
				{subMenu?.map(item => (
					<a
						key={uniqueId()}
						className={classNames(item.className)}
						onClick={() => {
							onMenuOpen(item, {
								loginCallback: () => console.log('need login'),
								messageCallBack: message => console.log(message),
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

						{item.headerMenuImgList?.map(img => (
							<img
								key={img.imgUrl}
								className={classNames(img.className)}
								alt={img.imgUrl}
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${img.imgUrl}`}
							/>
						))}
						<span>
							{item.displayKey ? t(item.displayKey) : item.displayText}
						</span>

						<div className='under'>Under Maintenance</div>
					</a>
				))}
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
