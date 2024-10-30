import { includes } from 'lodash-es'
import classNames from 'classnames'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { Dispatch, SetStateAction, ReactNode } from 'react'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IMergedMenuData } from '@nx-next-app/features/F0001/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const LiveStreamingModalDesktop = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LiveStreamingModal'),
	{ ssr: false }
)

interface ISubMenuProps {
	menuList: IMergedMenuData[]
	onMenuOpen: (
		item: IDynamicSubMenuItem,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: () => void
			messageCallBack?: (message: string) => void | undefined
			liveStreamingCallback: () => void
		}
	) => void
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const subMenuIcon: { [p: number]: ReactNode | null } = {
	[MenuIconTypeEnum.NO_ICON as number]: null,
	[MenuIconTypeEnum.New as number]: <div className='new-icon'>NEW</div>,
}

const SubMenu = ({
	debouncedMenuKey,
	setMenuKey,
	menuList,
	onMenuOpen,
}: ISubMenuProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId, currencyId },
		auth: { isLogin },
	} = useAuth()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { ALLOWED_CURRENCIES } = useStaticData()

	const menus = menuList.map(mainMenuItem => {
		const { lobbyCategoryId, desktop, subMenu, category } = mainMenuItem || {}
		const { subMenuClassName } = desktop || {}

		const active = debouncedMenuKey === String(category)

		if (subMenu) {
			return (
				<div
					key={lobbyCategoryId}
					className={classNames(`${subMenuClassName} ${langId}`, {
						active,
					})}
					onMouseLeave={() => setMenuKey(undefined)}
				>
					{subMenu?.map(subMenuItem => {
						// * 後端這裡是字串格式 需做處理
						const suBMenuImage =
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
									src={suBMenuImage}
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
			)
		}

		return null
	})

	return (
		<div className='subMenu-Wrapper-new'>
			<div
				className={classNames(`homeList ${langId}`, {
					active: debouncedMenuKey === 'Home',
				})}
				onMouseLeave={() => setMenuKey(undefined)}
			>
				{includes(ALLOWED_CURRENCIES.VIP, Number(currencyId)) && (
					<Link href={paths.vip.root}>
						<a>
							<img
								className='List-npc'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-vip.png`}
								alt='vip'
							/>
							<span>{t('VIP')}</span>
						</a>
					</Link>
				)}
				{includes(ALLOWED_CURRENCIES.LEADER_BOARD, Number(currencyId)) && (
					<Link href={paths.leaderBoard.root}>
						<a>
							<img
								className='List-npc'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-ranking.png`}
								alt='leaderBoard'
							/>
							<span>{t('Label_General_LeaderBoard')}</span>
						</a>
					</Link>
				)}
				<button
					onClick={
						!isLogin
							? () => modal.open(<LoginModal />)
							: () => push(`/${langId}/${paths.referral.root}`)
					}
				>
					<img
						className='List-npc'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-refer.png`}
						alt='referral'
					/>
					<span>{t('Label_General_Referral')}</span>
				</button>
			</div>

			{menus}

			<a
				className={classNames(`promoList ${langId}`, {
					active: debouncedMenuKey === 'Promotion',
				})}
				onClick={() => push(paths.promotion.root)}
				onMouseEnter={() => setMenuKey('Promotion')}
			>
				<div />
			</a>
			<div
				className={classNames(`vipList ${langId}`, {
					active: debouncedMenuKey === 'VIP',
				})}
				onMouseEnter={() => setMenuKey('VIP')}
			>
				<div />
			</div>
			<a
				className={classNames(`rankingList ${langId}`, {
					active: debouncedMenuKey === 'LeaderBoard',
				})}
				onClick={() => push(paths.leaderBoard.root)}
				onMouseEnter={() => setMenuKey('LeaderBoard')}
			>
				<div />
			</a>
		</div>
	)
}

export default SubMenu
