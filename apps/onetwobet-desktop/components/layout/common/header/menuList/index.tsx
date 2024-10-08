import SubMenu from '@12b-desktop/components/layout/common/header/menuList/SubMenu'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PRODUCTS, paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import {
	IDynamicSubMenuItem,
	LobbyCategoryEnum,
	MainMenuIcon,
	MenuActionTypeEnum,
	MenuIconTypeEnum,
} from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import { toUpper } from 'lodash-es'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'usehooks-ts'

const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const LiveStreamingModalDesktop = dynamic(
	() => import('@12b-desktop/components/modal/LiveStreamingModal'),
	{ ssr: false }
)

const mainMenuIcon = {
	// * 舊的版本沒有 i18n 後來說要支援再加
	[MainMenuIcon.newTag]: <div className='icon'>NEW</div>,
	[MainMenuIcon.hotTag]: <div className='icon mediafire'>Hot</div>,
} as const

const MenuList = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	const [menuKey, setMenuKey] = useState<string>()
	const debouncedMenuKey = useDebounce(menuKey, 150)

	const { menuList = [], onMenuOpen, isLobbyHeaderError } = useMenu()
	return (
		<div onMouseLeave={() => setMenuKey(undefined)}>
			<ul className='header-nav'>
				<Link href={paths.home.root} passHref>
					<li>
						<button className='nav-btn'>
							<img
								src={getBannerUrl('/desktop/img/home-icon.png')}
								alt='home icon'
							/>
						</button>
					</li>
				</Link>

				<li>
					<button className='nav-btn'>
						<img
							src={getBannerUrl('/desktop/img/mobile-icon.png')}
							alt='mobile icon'
						/>
					</button>
				</li>
				<Link href={paths.vip.root}>
					<li>
						<button className='nav-btn'>
							<img
								src={getBannerUrl('/desktop/img/12vip-icon.png')}
								alt='12vip icon'
							/>
						</button>
					</li>
				</Link>

				{/* 利用getLobbyHeader api取得的menu資料  */}
				{menuList.map(mainMenuItem => {
					const {
						displayKey,
						subMenu,
						lobbyCategoryId,
						pathname,
						category,
						display,
					} = mainMenuItem || {}

					if (display === 'h5') return null

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
					const icon =
						(hasNewIcon && switchMainMenuIcon(MainMenuIcon.newTag)) || null

					// * 特例 Sport Soccer (需轉 EnterPage)
					if (lobbyCategoryId === LobbyCategoryEnum.Sports) {
						const soccerItem = subMenu?.find(
							sportSubItem =>
								sportSubItem.tpGameIdNo === PRODUCTS.Soccer.tpGameIdNo
						)

						return (
							<li key={lobbyCategoryId}>
								<button
									className='nav-btn sports-btn'
									type='button'
									aria-label='menu-item'
									onClick={() =>
										onMenuOpen(
											{
												...soccerItem,
												desktop: {
													menuActionType: MenuActionTypeEnum.EnterPage,
												},
											} as IDynamicSubMenuItem,
											{
												loginCallback: () => modal.open(<LoginModal />),
												messageCallBack: message => modal.error(message),
												liveStreamingCallback: () =>
													modal.open(<LiveStreamingModalDesktop />),
											}
										)
									}
									onMouseEnter={() => setMenuKey(category)}
								>
									{icon}
									{menuText}
								</button>
							</li>
						)
					}

					// * 特例 EXCHANGE 沒有導轉功能
					if (lobbyCategoryId === LobbyCategoryEnum.Exchange) {
						return (
							<li key={lobbyCategoryId}>
								<button
									className='nav-btn'
									key={lobbyCategoryId}
									onMouseEnter={() => setMenuKey(category)}
								>
									{icon}
									{menuText}
								</button>
							</li>
						)
					}

					return (
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						<Link href={pathname} key={lobbyCategoryId}>
							<li key={lobbyCategoryId}>
								<button
									className={`nav-btn ${category.toLowerCase()}-btn`}
									onMouseEnter={() => setMenuKey(category)}
								>
									{icon}
									{menuText}
								</button>
							</li>
						</Link>
					)
				})}

				{/* lobbyHeader api 若是壞了就顯示 slots， 讓使用者可以進入 slot 遊玩 */}
				{isLobbyHeaderError && (
					<Link
						key='slot'
						href={paths.slots.root}
						onMouseEnter={() => setMenuKey('Slot')}
					>
						<li>
							<button className='nav-btn slot-btn'>
								{t('Label_General_Slots')}
							</button>
						</li>
					</Link>
				)}
			</ul>

			{/* <!-- nav-container --> */}
			<SubMenu debouncedMenuKey={debouncedMenuKey} setMenuKey={setMenuKey} />
		</div>
	)
}

export default MenuList
