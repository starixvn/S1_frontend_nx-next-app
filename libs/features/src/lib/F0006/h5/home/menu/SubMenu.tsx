import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod, isUrl } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuKeyEnum, MenuIconTypeEnum } from '@nx-next-app/types'
import { type IMergedMenuData } from '@nx-next-app/features/F0006/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import type {
	IHeaderSubMenuImg,
	ISunMenuNpcImage,
} from '@nx-next-app/site/yashbet'

interface ISubMenuProps {
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
	menuKey: keyof typeof MenuKeyEnum | undefined
}

const SubMenu = ({ menuList, onMenuOpen, menuKey }: ISubMenuProps) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const renderSubMenu = menuList.map(mainMenuItem => {
		const { h5, category, subMenu } = mainMenuItem || {}
		const { subMenuClassName } = h5 || {}
		return (
			<div
				key={category}
				className={classNames(subMenuClassName, {
					active: menuKey === category,
				})}
			>
				{subMenu?.map(subMenuItem => {
					const {
						tpGameIdNo,
						productName,
						iconType,
						iconStartTime,
						iconEndTime,
						isTpMaintain,
						mobileHeaderPicUrl,
						h5,
					} = subMenuItem || {}
					const { headerMenuImgList, hasDesktopLink } = h5 || {}

					const displayName =
						subMenuItem?.currencyGameName &&
						subMenuItem?.currencyGameName[langId] &&
						subMenuItem?.currencyGameName[langId]

					// * 後端這裡是字串格式 需做處理
					const suBMenuImage =
						mobileHeaderPicUrl && JSON.parse(mobileHeaderPicUrl)[0]

					const isNew =
						isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
						iconType === MenuIconTypeEnum.New
					return (
						<button
							key={tpGameIdNo}
							className={classNames({ active: isTpMaintain })}
							onClick={() => {
								onMenuOpen(subMenuItem, {
									loginCallback: () => {
										push(paths.login.root)
									},
									messageCallBack: message => modal.error(message),
								})
							}}
						>
							{isNew && <i className='icon icon-new' />}

							{headerMenuImgList?.map(image => {
								const isNpc = (
									img: IHeaderSubMenuImg
								): img is ISunMenuNpcImage => {
									return includes(img?.className, 'npc')
								}

								if (isNpc(image)) {
									return (
										<img
											key={image.remoteImgUrl}
											className={classNames(image.className)}
											alt={image.remoteImgUrl}
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dropdown/${image.remoteImgUrl}`}
										/>
										// TODO : 用 yashbet 資料時須改回來
										// isUrl(suBMenuImage) ?
										// <Image
										//   src={suBMenuImage}
										//   alt={productName}
										//   width={86}
										//   height={86}
										// /> : <img src={suBMenuImage} alt={productName} />
									)
								}

								return (
									<img
										key={image.imgUrl}
										className={classNames(image.className)}
										alt={image.imgUrl}
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dropdown/${image.imgUrl}`}
									/>
								)
							})}

							<div>{displayName || productName}</div>

							{hasDesktopLink && (
								<div className='switchbtn'>
									<button
										disabled={isTpMaintain}
										onClick={e => {
											e.stopPropagation()
											onMenuOpen(subMenuItem, {
												loginCallback: () => {
													push(paths.login.root)
												},
												messageCallBack: message => modal.error(message),
											})
										}}
									>
										{t('Label_General_Desktop')}
									</button>
									<button>{t('Label_General_PlayNow')}</button>
								</div>
							)}

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
	})

	return <div className='gameList'>{renderSubMenu}</div>
}

export default SubMenu
