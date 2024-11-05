import { useLeftMenu } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

interface ILeftMenuProps {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const LeftMenu = ({ withdrawalBlockSetting }: ILeftMenuProps) => {
	const { t } = useTranslation()
	const { menuList, handleMenuClick } = useLeftMenu({
		withdrawalBlockSetting,
	})

	return (
		<div id='leftMenu'>
			{/* 父菜單渲染 */}
			{menuList.map(({ displayKey, submenuList }) => (
				<div className='menuModule' key={displayKey}>
					<button className='menuHeader' style={{ cursor: 'auto' }}>
						{t(displayKey)}
					</button>
					{/* 子菜單渲染 */}
					{submenuList.map(
						({ displayKey, pathname, isActive, isVisible }) =>
							isVisible && (
								<a
									key={displayKey}
									className={classNames('menuSelect', { active: isActive })}
									onClick={() => handleMenuClick(pathname)}
								>
									<span className=''>{t(displayKey)}</span>
								</a>
							)
					)}
				</div>
			))}
		</div>
	)
}

export default LeftMenu
