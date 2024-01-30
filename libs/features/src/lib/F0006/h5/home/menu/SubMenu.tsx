import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuKeyEnum, MenuIconTypeEnum } from '@nx-next-app/types'
import { type IMergedMenuData } from '@nx-next-app/features/F0006/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'

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
					const { hasDesktopLink } = h5 || {}

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

							<img src={suBMenuImage} alt={productName} />

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
