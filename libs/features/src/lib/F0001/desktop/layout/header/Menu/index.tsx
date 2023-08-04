import classNames from 'classnames'
import dynamic from 'next/dynamic'
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
							desktop: { className, eventIcons },
							pathname = '/',
							displayKey,
							displayText,
							subMenu,
							menuActionType,
							product,
							query,
						},
					]) => {
						// * 只顯示 all | desktop 類別
						if (display === 'h5' || !display) return null

						const { icon, text } =
							getMainEventIcon({ eventIcons, subMenu }) ?? {}

						return (
							<a
								onClick={() =>
									onMenuOpen(
										{ menuActionType, pathname, query, product },
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
										// * 主選單的 icon 如果是 new 要替換成 star-full
										icon === 'icon icon-new' ? 'icon icon-star-full' : icon
									)}
								>
									{text}
								</div>

								{displayKey ? t(displayKey) : displayText}
							</a>
						)
					}
				)}

				<SubMenu debouncedMenuKey={debouncedMenuKey} setMenuKey={setMenuKey} />
			</div>
		</div>
	)
}

export default Menu
