import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const LiveStreamingModalDesktop = dynamic(
	() => import('@12b-desktop/components/modal/LiveStreamingModal'),
	{ ssr: false }
)

interface ISubMenuProps {
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const subMenuIcon: { [p: number]: ReactNode | null } = {
	[MenuIconTypeEnum.NO_ICON as number]: null,
	[MenuIconTypeEnum.New as number]: <div className='new-icon'>NEW</div>,
}

const SubMenu = ({ debouncedMenuKey, setMenuKey }: ISubMenuProps) => {
	const { t } = useTranslation()
	const { menuList = [], onMenuOpen } = useMenu()
	const { getBannerUrl } = useGlobalData()
	const {
		userInfo: { langId },
	} = useAuth()
	const { modal } = useGlobalModal()

	const menus = menuList.map(mainMenuItem => {
		const { lobbyCategoryId, subMenu, category } = mainMenuItem || {}

		const active = debouncedMenuKey === String(category)

		if (!subMenu) return

		return (
			<div
				key={lobbyCategoryId}
				className={classNames(`${category.toLowerCase()}-list ${langId}`, {
					active,
				})}
				onMouseLeave={() => setMenuKey(undefined)}
			>
				<div className='container'>
					{subMenu?.map(subMenuItem => {
						// * 後端這裡是字串格式 需做處理
						const subMenuImage =
							subMenuItem?.pcHeaderPicUrl &&
							JSON.parse(subMenuItem?.pcHeaderPicUrl)[0]

						const displayName =
							subMenuItem?.currencyGameName &&
							subMenuItem?.currencyGameName[langId] &&
							subMenuItem?.currencyGameName[langId]

						const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

						const switchSubMenuIcon = (iconType: MenuIconTypeEnum) => {
							return subMenuIcon[iconType] || null
						}

						const submenuIcon =
							(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
								switchSubMenuIcon(iconType)) ||
							null
						return (
							<button
								key={subMenuItem?.tpGameIdNo}
								className={classNames({
									active: subMenuItem?.isTpMaintain,
								})}
								onMouseEnter={() => setMenuKey(debouncedMenuKey)}
								onClick={() => {
									onMenuOpen(subMenuItem, {
										loginCallback: () => modal.open(<LoginModal />),
										messageCallBack: message => modal.error(message),
										liveStreamingCallback: () =>
											modal.open(<LiveStreamingModalDesktop />),
									})
								}}
							>
								{submenuIcon}
								<img
									className='List-npc'
									src={subMenuImage}
									alt={subMenuItem?.productName}
								/>
								<span>{displayName || subMenuItem?.productName}</span>
								{subMenuItem?.isTpMaintain && (
									<div className='under'>
										{t('Label_General_UnderMaintenance')}
									</div>
								)}
							</button>
						)
					})}
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					{/* TODO: i18n */}
					<ul>
						<li>
							<img
								src={getBannerUrl('/desktop/img/lc-icon.png')}
								alt='official betting partner icon'
							/>
							{t('Label_Official_Betting_Partner')}
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src={getBannerUrl('/desktop/img/trophy-icon.png')}
								alt='trophy icon'
							/>
							{t('Label_Best_Odds')}！
						</li>
						<li>
							<img
								src={getBannerUrl('/desktop/img/fast-and-safe.png')}
								alt='safe payment icon'
							/>
							{t('Label_Safe_Payment_Method')}
						</li>
					</ul>
				</div>
			</div>
		)
	})

	return <div className='nav-container'>{menus}</div>
}

export default SubMenu
