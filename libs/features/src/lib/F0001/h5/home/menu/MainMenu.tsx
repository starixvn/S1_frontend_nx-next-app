import classNames from 'classnames'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState, useEffect, startTransition } from 'react'
import { useTranslation } from 'next-i18next'
import { isEventPeriod } from '@nx-next-app/utils'
import { paths } from '@nx-next-app/constants'
import { MenuIconTypeEnum, MenuKeyEnum } from '@nx-next-app/types'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
import { type IMergedMenuData } from '@nx-next-app/features/F0001/hooks'
import SubMenu from '@nx-next-app/features/F0001/h5/home/menu/SubMenu'

interface IMenuProps {
	menuList: IMergedMenuData[]
	onMenuOpen: (
		item: IDynamicSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
			liveStreamingCallback,
		}: {
			loginCallback: () => void
			messageCallBack?: (message: string) => void | undefined
			liveStreamingCallback: () => void
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
			<div className='home-sidebar'>
				{menuList.map(mainMenuItem => {
					const { display, category, h5, displayKey, subMenu } =
						mainMenuItem || {}
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
							className={classNames(`btn-${icon}`, {
								active: menuKey === category,
							})}
							key={category}
							onClick={() => {
								startTransition(() => {
									setMenuKey(category)
								})
							}}
						>
							{hasNewIcon && <div className='new-icon'>New</div>}
							<div className='btn-circle'>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/${icon}-icon.png`}
									// @ts-expect-error: every category must has icon
									alt={icon}
									width={30}
									height={30}
								/>
							</div>
							<div>{menuText}</div>
						</button>
					)
				})}

				{isLobbyHeaderError && (
					<button
						className='btn-slots active'
						key='Slot'
						onClick={() => {
							push(paths.slots.root)
						}}
					>
						<div className='btn-circle'>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/slots-icon.png`}
								alt='Slots'
								width={30}
								height={30}
							/>
						</div>
						<div>{t('Label_General_Slots')}</div>
					</button>
				)}
			</div>

			<SubMenu menuKey={menuKey} menuList={menuList} onMenuOpen={onMenuOpen} />
		</>
	)
}

export default MainMenu
