import React, { HTMLAttributes, ReactNode } from 'react'
import { useBoolean } from 'usehooks-ts'

interface ISettingCollapseItemProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	header: (isActive?: boolean) => ReactNode
}

const SettingCollapseItem = ({
	children,
	header,
	...props
}: ISettingCollapseItemProps) => {
	const { value, toggle } = useBoolean()

	return (
		<div {...props} onClick={toggle}>
			{/* 有子元件才將 toggle 往上傳 */}
			{header(children ? value : undefined)}

			{children}
		</div>
	)
}

export default SettingCollapseItem
