import { HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { useBoolean } from 'usehooks-ts'

interface ISettingCollapseItemProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	header: string | ReactNode
	prefixIcon: string
}

const SettingCollapseItem = ({
	children,
	header,
	prefixIcon,
	...props
}: ISettingCollapseItemProps) => {
	const { value: isActive, toggle } = useBoolean()

	return (
		<div {...props}>
			{children ? (
				<button
					onClick={toggle}
					className={classNames(prefixIcon, {
						active: isActive,
					})}
				>
					{header}

					<i className='icon icon-keyboard_arrow_down' />
				</button>
			) : (
				<a className={classNames(prefixIcon)}>{header}</a>
			)}

			{children}
		</div>
	)
}

export default SettingCollapseItem
