import { getSubMenuEventIcon, useMenu } from '@nx-next-app/features/F0001/hooks'
import { MenuKeyEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import process from 'process'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { uniqueId } from 'lodash-es'

interface ISubMenuProps {
	menuKey: keyof typeof MenuKeyEnum | ''
}

const SubMenu = ({ menuKey }: ISubMenuProps) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { menuData, onMenuOpen } = useMenu()

	const renderSubMenu = (key: string) => {
		const menu = menuData[key as MenuKeyEnum]
		if (!menu) return null

		const {
			h5: { subMenuClassName },
			subMenu,
		} = menu

		return (
			<div
				key={key}
				className={classNames(subMenuClassName, { active: key === menuKey })}
			>
				{subMenu?.map(item => {
					const {
						h5: { className, headerMenuImgList, img } = {},
						eventIcons,
						productKey,
					} = item

					const subMenuEventIcon = getSubMenuEventIcon(eventIcons)

					return (
						<button
							style={{
								// * 如果維護中取消點擊事件
								pointerEvents: item.isTpMaintain ? 'none' : 'auto',
							}}
							key={productKey || uniqueId()}
							className={classNames('gamelist-item', className, {
								under: item.isTpMaintain,
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
								<i className={classNames(subMenuEventIcon?.icon)}>
									{subMenuEventIcon?.text}
								</i>
							)}

							<div className='gamelist-img'>
								{img && (
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/${img}`}
										alt={productKey || 'menu-item-img'}
									/>
								)}

								{headerMenuImgList?.map(img => (
									<img
										key={img.imgUrl}
										className={classNames(img.className)}
										alt={img.imgUrl}
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dropdown/${img.imgUrl}`}
									/>
								))}

								<div className='gamelist-title'>
									{t(item.displayKey || '') || item.displayText}
								</div>
							</div>
						</button>
					)
				})}
			</div>
		)
	}

	return (
		<div className='home-gamelist'>
			{Object.keys(menuData).map(key => renderSubMenu(key))}
		</div>
	)
}

export default SubMenu
