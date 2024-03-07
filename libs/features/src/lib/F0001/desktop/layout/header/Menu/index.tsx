import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { toUpper } from 'lodash-es'
import { getMainEventIcon, useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import SubMenu from './SubMenu'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const Menu = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { menuData, onMenuOpen } = useMenu()
	const [menuKey, setMenuKey] = useState<string>()
	const debouncedMenuKey = useDebounce(menuKey, 150)

	return (
		<div className='menu'>
			<div>
				{Object.entries(menuData).map(
					([
						key,
						{
							display,
							desktop: { className, eventIcons, menuActionType },
							pathname = '/',
							displayKey,
							displayText,
							subMenu,
							product,
							query,
						},
					]) => {
						// * 只顯示 all | desktop 類別
						if (display === 'h5' || !display) return null

						// * 有 displayKey 可以避開以 icon 呈現的 menu
						// * subMenu 不能給預設值，用 ?. 的邏輯才能將 「以 icon 呈現」和 「submenu 沒有值」區隔開來
						if (displayKey && subMenu?.length === 0) return null

						const { icon, text } =
							getMainEventIcon({ eventIcons, subMenu }) ?? {}
						const menuText = toUpper(
							(displayKey ? t(displayKey) : displayText) || ''
						)

						return (
							<button
								type='button'
								aria-label='menu-item'
								onClick={() =>
									onMenuOpen(
										{ desktop: { menuActionType }, pathname, query, product },
										{
											loginCallback: () => modal.open(<LoginModal />),
											messageCallBack: message => modal.error(message),
										}
									)
								}
								key={key}
								className={classNames(className)}
								onMouseEnter={() => setMenuKey(key)}
								onMouseLeave={() => setMenuKey(undefined)}
							>
								<div
									className={classNames(
										// * 主選單的 icon 如果是 new 要替換成 icon
										icon === 'new-icon' ? 'icon' : icon
									)}
								>
									{text}
								</div>

								{menuText}
							</button>
						)
					}
				)}

				<SubMenu debouncedMenuKey={debouncedMenuKey} setMenuKey={setMenuKey} />
			</div>
		</div>
	)
}

export default Menu
