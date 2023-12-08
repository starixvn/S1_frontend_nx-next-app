import React, { Children, cloneElement, ReactElement, ReactNode } from 'react'

interface IDepositSubModuleButtonGroupProps {
	children: ReactNode
	matchKey: string
}

const DepositSubModuleButtonGroup = ({
	children,
	matchKey,
}: IDepositSubModuleButtonGroupProps) => {
	return (
		<>
			{Children.map(children, child => {
				return cloneElement(child as ReactElement, {
					matchKey,
				})
			})}
		</>
	)
}

export default DepositSubModuleButtonGroup
