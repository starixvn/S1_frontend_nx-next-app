import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import SettingCollapseItem from './SettingCollapseItem'

interface ICollapseProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

const SettingCollapse = ({ children, className, ...props }: ICollapseProps) => {
	return (
		<div {...props} className={classNames('menu-bottom', className)}>
			{children}
		</div>
	)
}

SettingCollapse.Item = SettingCollapseItem

export default SettingCollapse
