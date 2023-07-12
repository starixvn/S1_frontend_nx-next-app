import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { isEventPeriod } from '@nx-next-app/utils'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { head, isArray, uniqueId } from 'lodash-es'
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
	const { menuData, onMenuOpen } = useMenu()
	const [menuKey, setMenuKey] = useState<string>()
	const debouncedMenuKey = useDebounce(menuKey, 150)
	const { modal } = useGlobalModal()

	return (
		<div className='menu'>
			<div>
				{Object.entries(menuData).map(
					([
						key,
						{
							className,
							pathname = '/',
							displayKey,
							displayText,
							eventIcons,
							subMenu,
							menuActionType,
							product,
							query,
						},
					]) => {
						// * 渲染第一個活動期間的事件 icon，假設同時有 [NEW,HOT] ,會用前者
						const menuEventIcon =
							eventIcons &&
							head(eventIcons.filter(({ period }) => isEventPeriod(period)))

						// * 輪詢一次 subMenu，抓回遇到的第一個活動期間的 eventIcons 資訊
						const firstEventProduct = subMenu?.find(
							item =>
								isArray(item.eventIcons) &&
								head(
									item.eventIcons.filter(({ period }) => isEventPeriod(period))
								)
						)
						const subMenuEventIcon =
							firstEventProduct &&
							firstEventProduct?.eventIcons &&
							// * 拿第一個活動內的 eventIcons
							head(
								firstEventProduct.eventIcons.filter(({ period }) =>
									isEventPeriod(period)
								)
							)

						const eventIcon = subMenuEventIcon || menuEventIcon

						return (
							<a
								onClick={() =>
									onMenuOpen(
										{
											menuActionType,
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
								key={uniqueId()}
								className={classNames(className)}
								onMouseEnter={() => setMenuKey(key)}
								onMouseLeave={() => setMenuKey(undefined)}
							>
								<div
									className={classNames(
										// * 主選單的 icon 如果是 new 要替換成 star-full
										eventIcon?.icon === 'icon icon-new'
											? 'icon icon-star-full'
											: eventIcon?.icon
									)}
								>
									{eventIcon?.text}
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
