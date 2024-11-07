import { useGlobalData } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { useBoolean } from 'usehooks-ts'

interface IMenuCollapseItemProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	header: string | ReactNode
	imgName: string
	defaultActive?: boolean
}

const MenuCollapseItem = ({
	children,
	header,
	imgName,
	defaultActive,
	...props
}: IMenuCollapseItemProps) => {
	const { value: isActive, toggle } = useBoolean(defaultActive)

	const { getBannerUrl } = useGlobalData()

	return (
		<div
			{...props}
			className={classNames('menu-bottom-item', { active: isActive })}
		>
			<div onClick={toggle} className='info'>
				<img src={getBannerUrl(`/h5/img/4.0/${imgName}.png`)} alt={imgName} />
				<div>{header}</div>
			</div>
			<div className='option'>
				<div className='option-item'>{children}</div>
			</div>
		</div>
	)
}

export default MenuCollapseItem
