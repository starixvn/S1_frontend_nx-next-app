import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import MenuCollapseItem from './MenuCollapseItem'

interface ICollapseProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

const MenuCollapse = ({ children, className, ...props }: ICollapseProps) => {
	return (
		<div {...props} className={classNames('menu-bottom', className)}>
			{children}
		</div>
	)
}

MenuCollapse.Item = MenuCollapseItem

export default MenuCollapse
