import { getSubMenuEventIcon, useMenu } from '@nx-next-app/features/F0001/hooks'
import { DeviceTypeEnum, MenuKeyEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import process from 'process'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { uniqueId } from 'lodash-es'
import Image from 'next/future/image'

interface ISubMenuProps {
	menuKey: keyof typeof MenuKeyEnum | ''
}

const SubMenu = ({ menuKey }: ISubMenuProps) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { menuData, onMenuOpen } = useMenu()

	const renderSubMenu = (key: string) => {
		const {
			h5: { subMenuClassName },
			subMenu,
		} = menuData[key as MenuKeyEnum]

		return (
			<div
				key={key}
				className={classNames(subMenuClassName, { active: key === menuKey })}
			>
				{subMenu?.map(item => {
					const {
						h5: { className, img, hasDesktopLink } = {},
						eventIcons,
						displayKey,
						displayText,
						productKey,
					} = item

					const subMenuEventIcon = getSubMenuEventIcon(eventIcons)

					return (
						<div
							style={{
								// * 如果維護中取消點擊事件
								pointerEvents: item.isTpMaintain ? 'none' : 'auto',
							}}
							key={productKey || uniqueId()}
							className={classNames(className, {
								active: item.isTpMaintain,
							})}
							onClick={() => {
								onMenuOpen(item, {
									loginCallback: () => {
										push(paths.login.root)
									},
									messageCallBack: message => null,
								})
							}}
						>
							{eventIcons && (
								<i className={classNames(subMenuEventIcon?.icon)} />
							)}
							{img && (
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}${img}`}
									alt={productKey || 'menu-item-img'}
									width={101}
									height={135}
								/>
							)}

							<div>{displayKey ? t(displayKey) : displayText}</div>
							{hasDesktopLink && (
								<div className='switchbtn'>
									<button
										disabled={item.isTpMaintain}
										onClick={e => {
											e.stopPropagation()
											onMenuOpen(
												{
													...item,
													appType: DeviceTypeEnum.Desktop,
												},
												{
													loginCallback: () => {
														push(paths.login.root)
													},
													messageCallBack: message => null,
												}
											)
										}}
									>
										{t('Label_General_Desktop')}
									</button>
									<button>{t('Label_General_PlayNow')}</button>
								</div>
							)}
							<div className='under'>{t('Label_General_UnderMaintenance')}</div>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className='gameList'>
			{Object.keys(menuData).map(key => renderSubMenu(key))}
		</div>
	)
}

export default SubMenu
