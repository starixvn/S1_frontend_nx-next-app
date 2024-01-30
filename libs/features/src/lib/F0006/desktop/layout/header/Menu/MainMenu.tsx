import Link from 'next/link'
import { useState } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useDebounce } from 'usehooks-ts'
import { includes, toUpper } from 'lodash-es'
import { isEventPeriod } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	LobbyCategoryEnum,
	MainMenuIcon,
	MenuIconTypeEnum,
} from '@nx-next-app/types'
import { paths, PRODUCTS } from '@nx-next-app/constants'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/yashbet'
import type { IMergedMenuData } from '@nx-next-app/features/F0006/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import SubMenu from './SubMenu'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0006/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const mainMenuIcon = {
	// * 舊的版本沒有 i18n 後來碩要支援在加
	[MainMenuIcon.newTag]: <div className='icon'>NEW</div>,
	[MainMenuIcon.hotTag]: <div className='icon mediafire'>Hot</div>,
} as const

export interface IMenuProps {
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
	const { modal } = useGlobalModal()
	const [menuKey, setMenuKey] = useState<string>()
	const debouncedMenuKey = useDebounce(menuKey, 150)
	const {
		userInfo: { currencyId },
	} = useAuth()

	const menus = menuList.map(mainMenuItem => {
		const {
			displayKey,
			subMenu,
			lobbyCategoryId,
			pathname,
			category,
			display,
		} = mainMenuItem || {}

		if (display === 'h5') return null
		const active = debouncedMenuKey === String(category)

		const switchMainMenuIcon = (iconType: MainMenuIcon) => {
			return mainMenuIcon[iconType] || null
		}

		// * 查看 subMenu 是否有在顯示範圍的 New Icon
		const hasNewIcon = subMenu.some(subMenuItem => {
			const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

			return (
				isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
				iconType === MenuIconTypeEnum.New
			)
		})

		const menuText = toUpper((displayKey && t(displayKey)) || '')

		// * 目前動態 menu 只支援 New
		const icon = (hasNewIcon && switchMainMenuIcon(MainMenuIcon.newTag)) || null

		// * 特例 Sport Soccer
		if (lobbyCategoryId === LobbyCategoryEnum.Sports) {
			const soccerItem = subMenu?.find(
				sportSubItem => sportSubItem.tpGameIdNo === PRODUCTS.Soccer.tpGameIdNo
			)

			return (
				<button
					key={lobbyCategoryId}
					type='button'
					aria-label='menu-item'
					onClick={() =>
						onMenuOpen(soccerItem, {
							loginCallback: () => modal.open(<LoginModal />),
							messageCallBack: message => modal.error(message),
						})
					}
					onMouseEnter={() => setMenuKey(category)}
				>
					{icon}
					{menuText}
				</button>
			)
		}

		// * 特例 EXCHANGE 沒有導轉功能
		if (lobbyCategoryId === LobbyCategoryEnum.Exchange) {
			return (
				<a
					className={classNames({ active })}
					key={lobbyCategoryId}
					onMouseEnter={() => setMenuKey(category)}
				>
					{icon}
					{menuText}
				</a>
			)
		}

		return (
			<Link href={pathname!} key={lobbyCategoryId}>
				<a onMouseEnter={() => setMenuKey(category)}>
					{icon}
					{menuText}
				</a>
			</Link>
		)
	})

	return (
		<div className='menu'>
			<div>
				<Link href={paths.home.root} passHref>
					<a className='icon icon-home' onMouseEnter={() => setMenuKey('Home')}>
						{' '}
					</a>
				</Link>
				{includes(ALLOWED_CURRENCIES.REWARDS, Number(currencyId)) && (
					<a
						className='reward'
						href={paths.rewards.root}
						target='_blank'
						rel='noreferrer'
					>
						{' '}
					</a>
				)}
				{menus}

				{/* lobbyHeader api 若是壞了就顯示 slots， 讓使用者可以進入 slot 遊玩 */}
				{isLobbyHeaderError && (
					<Link
						key='slot'
						href={paths.slots.root}
						onMouseEnter={() => setMenuKey('Slot')}
					>
						{t('Label_General_Slots')}
					</Link>
				)}

				<Link href={paths.promotion.root} passHref>
					<a
						className={classNames({
							active: debouncedMenuKey === 'Promotion',
						})}
						onMouseEnter={() => setMenuKey('Promotion')}
					>
						{isEventPeriod({ start: '2020-00-01T00:00:00', end: null }) &&
							mainMenuIcon.hotTag}
						{t('Label_General_Promos')}
					</a>
				</Link>
				{includes(ALLOWED_CURRENCIES.VIP, Number(currencyId)) && (
					<Link href={paths.vip.root} passHref>
						<a
							className={classNames({
								active: debouncedMenuKey === 'VIP',
							})}
							onMouseEnter={() => setMenuKey('VIP')}
						>
							{t('VIP')}
						</a>
					</Link>
				)}
				{includes(ALLOWED_CURRENCIES.LEADER_BOARD, Number(currencyId)) && (
					<Link href={paths.leaderBoard.root} passHref>
						<a
							className={classNames({
								active: debouncedMenuKey === 'LeaderBoard',
							})}
							onMouseEnter={() => setMenuKey('LeaderBoard')}
						>
							{t('Label_LeaderBoard')}
						</a>
					</Link>
				)}

				<SubMenu
					debouncedMenuKey={debouncedMenuKey}
					setMenuKey={setMenuKey}
					menuList={menuList}
					onMenuOpen={onMenuOpen}
				/>
			</div>
		</div>
	)
}

export default MainMenu
