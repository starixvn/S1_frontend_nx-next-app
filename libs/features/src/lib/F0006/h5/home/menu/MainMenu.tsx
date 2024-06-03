import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isEventPeriod } from '@nx-next-app/utils'
import { paths } from '@nx-next-app/constants'
import { useState, useEffect, startTransition } from 'react'
import { MenuIconTypeEnum, MenuKeyEnum } from '@nx-next-app/types'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import type { IMergedMenuData } from '@nx-next-app/features/F0006/hooks'
import SubMenu from '@nx-next-app/features/F0006/h5/home/menu/SubMenu'

interface IMenuProps {
	menuList: IMergedMenuData[]
	onMenuOpen: (
		item: IDynamicSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: () => void
			messageCallBack?: (message: string) => void | undefined
		}
	) => void
	isLobbyHeaderError: boolean
}

const MainMenu = ({ menuList, onMenuOpen, isLobbyHeaderError }: IMenuProps) => {
	const { t } = useTranslation()
	const {
		query: { prevPageRecord },
		push,
	} = useRouter()
	const [menuKey, setMenuKey] = useState<keyof typeof MenuKeyEnum | undefined>(
		'Sports'
	)

	const menus = menuList.map(mainMenuItem => {
		const { display, category, h5, displayKey, subMenu } = mainMenuItem || {}
		if (display === 'desktop') return null
		const { icon } = h5 || {}

		// * 查看 subMenu 是否有在顯示範圍的 New Icon( 手機貌似只有 New Tag )
		const hasNewIcon = subMenu.some(subMenuItem => {
			const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

			return (
				isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
				iconType === MenuIconTypeEnum.New
			)
		})

		const menuText = (displayKey && t(displayKey)) || ''

		return (
			<button
				className={classNames({
					active: menuKey === category,
				})}
				key={category}
				onClick={() => {
					startTransition(() => {
						setMenuKey(category)
					})
				}}
			>
				<i className={icon} />
				<div>{menuText}</div>
				{hasNewIcon && <i className='icon icon-new' />}
			</button>
		)
	})

	// * 若是之前進入過 slot 頁面 ，點左上角返回後 main Menu 須在 Slot
	useEffect(() => {
		if (prevPageRecord === MenuKeyEnum.Slot) {
			startTransition(() => {
				setMenuKey(prevPageRecord)
			})
		}
	}, [])

	return (
		<>
			<div className='sideBar'>
				{menus}

				{isLobbyHeaderError && (
					<button
						className='active'
						key='Slot'
						onClick={() => {
							push(paths.slots.root)
						}}
					>
						<i className='icon icon-icon_777' />
						<div>{t('Label_General_Slots')}</div>
					</button>
				)}
			</div>

			<SubMenu menuKey={menuKey} menuList={menuList} onMenuOpen={onMenuOpen} />
		</>
	)
}

export default MainMenu
