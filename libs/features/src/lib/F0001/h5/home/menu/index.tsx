import { useState } from 'react'
import classNames from 'classnames'
import { getMainEventIcon, useMenu } from '@nx-next-app/features/F0001/hooks'

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
			<div className='home-sidebar'>
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

						// * 有 displayKey 可以避開以 icon 呈現的 menu
						// * subMenu 不能給預設值，用 ?. 的邏輯才能將 「以 icon 呈現」和 「submenu 沒有值」區隔開來
						if (displayKey && subMenu?.length === 0) return null

						const { icon: mainEventIcon, text: mainEventText } =
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
								{/* {icon && <i className={classNames(icon)} />} */}
								<i className={classNames(mainEventIcon)}>{mainEventText}</i>
								<div className='btn-circle'>
									{img && (
										<img
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/${img}`}
											alt={`img-${img}`}
										/>
									)}
								</div>

								<div>{displayKey ? t(displayKey) : displayText}</div>
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
