import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { useBoolean } from 'usehooks-ts'

interface ISettingCollapseItemProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	header: string | ReactNode
	imgName: string
	defaultActive?: boolean
}

const SettingCollapseItem = ({
	children,
	header,
	imgName,
	defaultActive,
	...props
}: ISettingCollapseItemProps) => {
	const { value: isActive, toggle } = useBoolean(defaultActive)

	return (
		<div
			{...props}
			className={classNames('menu-bottom-item', { active: isActive })}
		>
			<div onClick={toggle} className='info'>
				<i className={`icon ${imgName}`} />
				<div>{header}</div>
			</div>
			<div className='option'>
				<div className='option-item'>{children}</div>
			</div>
		</div>
	)
}

export default SettingCollapseItem
