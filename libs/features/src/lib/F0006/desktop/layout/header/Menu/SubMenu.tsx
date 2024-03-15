import Link from 'next/link'
import { includes } from 'lodash-es'
import { paths } from '@nx-next-app/constants'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import { isEventPeriod, isUrl } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	ALLOWED_CURRENCIES,
	desktopSubMenuVipImageList,
	desktopSubMenuLeaderBoardImageList,
	desktopSunMenuReferralImageList,
	type IHeaderSubMenuImg,
	type ISunMenuNpcImage,
} from '@nx-next-app/site/yashbet'
import type { IMergedMenuData } from '@nx-next-app/features/F0006/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'

const LoginModal = dynamic(() => import('../../../modal/LoginModal'), {
	ssr: false,
})

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
							desktop,
							productName,
							isTpMaintain,
							tpGameIdNo,
						} = subMenuItem || {}

						const { headerMenuImgList } = desktop || {}

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
								className={classNames(submenuIcon, { active: isTpMaintain })}
								onMouseEnter={() => setMenuKey(debouncedMenuKey)}
								onMouseLeave={() => setMenuKey(undefined)}
								onClick={() => {
									onMenuOpen(subMenuItem, {
										loginCallback: () => modal.open(<LoginModal />),
										messageCallBack: message => modal.error(message),
									})
								}}
							>
								{headerMenuImgList?.map(img => {
									const isNpc = (
										img: IHeaderSubMenuImg
									): img is ISunMenuNpcImage => {
										return includes(img?.className, 'npc')
									}

									if (isNpc(img)) {
										return (
											<img
												key={img.remoteImgUrl}
												className={classNames(img.className)}
												alt={img.remoteImgUrl}
												src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${img.remoteImgUrl}`}
											/>

											// TODO : 目前使用 nova 資料的圖片，之後需更換成 yashbet
											// isUrl(suBMenuImage) ? (
											// 	<Image
											// 		className='List-npc'
											// 		src={suBMenuImage}
											// 		width={150}
											// 		height={150}
											// 		alt={productName}
											// 	/>
											// ) : (
											// 	<img src={suBMenuImage} alt='productName' />
											// )
										)
									}
									return (
										<img
											key={img.imgUrl}
											className={classNames(img.className)}
											alt={img.imgUrl}
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${img.imgUrl}`}
										/>
									)
								})}

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
			<button
				className={classNames(`rankingList ${langId}`, {
					active: debouncedMenuKey === 'LeaderBoard',
				})}
				onClick={() => push(paths.leaderBoard.root)}
			>
				<div />
			</button>
		</div>
	)
}

export default SubMenu
