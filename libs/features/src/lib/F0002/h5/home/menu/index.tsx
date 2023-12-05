import { useState } from 'react'
import Image from 'next/future/image'
import classNames from 'classnames'
import { getMainEventIcon, useMenu } from '@nx-next-app/features/F0002/hooks'

import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { MenuActionTypeEnum, MenuKeyEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import SubMenu from './SubMenu'

const Menu = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { menuData, onMenuOpen } = useMenu()
	const [menuKey, setMenuKey] = useState<keyof typeof MenuKeyEnum | ''>(
		'Sports'
	)
	const { modal } = useGlobalModal()

	return (
		<>
			<div className='sideBar'>
				{Object.entries(menuData).map(
					([
						key,
						{
							display,
							h5: { eventIcons, className, icon, img, menuActionType },
							pathname = '/',
							displayKey,
							displayText,
							subMenu,
							product,
							query,
						},
					]) => {
						// * 只顯示 all | h5 類別
						if (display === 'desktop' || !display) return null

						const { icon: mainEventIcon } =
							getMainEventIcon({ eventIcons, subMenu }) ?? {}

						return (
							<button
								key={key}
								className={classNames(className, {
									active: menuKey === key,
								})}
								onClick={() => {
									if (
										key !== menuKey &&
										menuActionType === MenuActionTypeEnum.Null
									) {
										setMenuKey(key as keyof typeof MenuKeyEnum)
									}

									onMenuOpen(
										{ h5: { menuActionType }, pathname, query, product },
										{
											loginCallback: () => {
												push({
													pathname: paths.login.root,
													query: { from: paths.home.root },
												})
											},
											messageCallBack: message => modal.error(message),
										}
									)
								}}
							>
								{icon && <i className={classNames(icon)} />}
								{img && (
									<Image
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}${img}`}
										alt={`img-${img}`}
										width={30}
										height={30}
									/>
								)}

								<div>{displayKey ? t(displayKey) : displayText}</div>
								<i className={classNames(mainEventIcon)} />
							</button>
						)
					}
				)}
			</div>

			<SubMenu menuKey={menuKey} />
		</>
	)
}

export default Menu
