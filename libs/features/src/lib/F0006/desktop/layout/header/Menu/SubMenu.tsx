import Link from 'next/link'
import { includes } from 'lodash-es'
import { paths } from '@nx-next-app/constants'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { Dispatch, SetStateAction } from 'react'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	ALLOWED_CURRENCIES,
	desktopSubMenuVipImageList,
	desktopSubMenuLeaderBoardImageList,
	desktopSunMenuReferralImageList,
} from '@nx-next-app/site/yashbet'
import type { IMergedMenuData } from '@nx-next-app/features/F0006/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
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
		}
	) => void
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const subMenuIcon: { [p: number]: string } = {
	[MenuIconTypeEnum.NO_ICON]: '',
	[MenuIconTypeEnum.New]: 'icon icon-new',
} as const

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

	const menus = menuList.map(mainMenuItem => {
		const { lobbyCategoryId, desktop, subMenu, category } = mainMenuItem || {}
		const { subMenuClassName } = desktop || {}

		const active = debouncedMenuKey === String(category)

		if (subMenu) {
			return (
				<div
					key={lobbyCategoryId}
					className={classNames(`${subMenuClassName}`, {
						active,
					})}
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

						const {
							iconType,
							iconStartTime,
							iconEndTime,
							productName,
							isTpMaintain,
							tpGameIdNo,
						} = subMenuItem || {}

						const switchSubMenuIcon = (iconType: MenuIconTypeEnum) => {
							return subMenuIcon[iconType] || ''
						}

						const submenuIcon =
							(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
								switchSubMenuIcon(iconType)) ||
							''

						return (
							<button
								key={tpGameIdNo}
								className={classNames({
									active: subMenuItem?.isTpMaintain,
								})}
								onMouseEnter={() => setMenuKey(debouncedMenuKey)}
								onMouseLeave={() => setMenuKey(undefined)}
								onClick={() => {
									onMenuOpen(subMenuItem, {
										loginCallback: () => modal.open(<LoginModal />),
										messageCallBack: message => modal.error(message),
									})
								}}
							>
								{submenuIcon}
								<img
									className='List-npc'
									src={suBMenuImage}
									alt={productName}
								/>
								<span>{displayName || productName}</span>
								{isTpMaintain && (
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
			>
				{includes(ALLOWED_CURRENCIES.VIP, Number(currencyId)) && (
					<Link href={paths.vip.root}>
						<a>
							{desktopSubMenuVipImageList.map(({ imgUrl, className }) => {
								return (
									<img
										className={className}
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${imgUrl}`}
										alt='vip'
									/>
								)
							})}
							<span>{t('VIP')}</span>
						</a>
					</Link>
				)}
				{includes(ALLOWED_CURRENCIES.LEADER_BOARD, Number(currencyId)) && (
					<Link href={paths.leaderBoard.root}>
						<a>
							{desktopSubMenuLeaderBoardImageList.map(
								({ imgUrl, className }) => {
									return (
										<img
											className={className}
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${imgUrl}`}
											alt='leaderBoard'
										/>
									)
								}
							)}
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
					{desktopSunMenuReferralImageList.map(({ imgUrl, className }) => {
						return (
							<img
								className={className}
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${imgUrl}`}
								alt='referral'
							/>
						)
					})}

					<span>{t('Label_General_Referral')}</span>
				</button>
			</div>

			{menus}

			<button
				className={classNames(`promoList ${langId}`, {
					active: debouncedMenuKey === 'Promotion',
				})}
				onClick={() => push(paths.promotion.root)}
			>
				<div />
			</button>
			<div
				className={classNames(`vipList ${langId}`, {
					active: debouncedMenuKey === 'VIP',
				})}
			>
				<div />
			</div>
		</div>
	)
}

export default SubMenu
