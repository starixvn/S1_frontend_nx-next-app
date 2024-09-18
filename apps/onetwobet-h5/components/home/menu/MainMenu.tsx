import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { type IMergedMenuData } from '@nx-next-app/features/F0001/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
import {
	CurrenciesEnum,
	MenuIconTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { startTransition, useEffect, useState } from 'react'
import SubMenu from './SubMenu'

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

	const {
		userInfo: { currencyId },
	} = useAuth()

	// 7/16/24 因應 hotfix遮蔽saba sport,根據語系設定初始 menuKey
	const defaultMenuKey =
		currencyId === CurrenciesEnum.USD || currencyId === CurrenciesEnum.CNY
			? 'Casino'
			: 'Sports'

	const [menuKey, setMenuKey] = useState<keyof typeof MenuKeyEnum | undefined>(
		defaultMenuKey
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
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/${icon}-icon.png`}
									alt={icon}
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
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/slots-icon.png`}
								alt='Slots'
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
