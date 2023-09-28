import classNames from 'classnames'
import { ReactNode } from 'react'
import DepositBankAccount from './DepositBankAccount'
import DepositBankSlipButton from './DepositBankSlipButton'
import DepositShortcutList from './DepositShortcutList'
import DepositSubModuleButton from './DepositSubModuleButton'
import DepositSubModuleButtonGroup from './DepositSubModuleButtonGroup'

export interface IDepositModuleProps {
	children: ReactNode
	title: string
	extra?: ReactNode
	layout?: 'horizontal' | 'vertical'
	required?: boolean
	className?: string
}

const DepositModule = ({
	children,
	title,
	extra,
	layout,
	required = false,
	className = '',
}: IDepositModuleProps) => {
	return (
		<>
			<div className='subModuleTitle'>
				{required && <i className='txt-blue'>*</i>}

				{title}
				{extra}
			</div>
			<div
				className={classNames('subModule', className, {
					selectBank: layout === 'horizontal',
				})}
			>
				{children}
			</div>
		</>
	)
}

export default DepositModule

DepositModule.SubModuleButton = DepositSubModuleButton
DepositModule.SubModuleButtonGroup = DepositSubModuleButtonGroup
DepositModule.BankAccount = DepositBankAccount
DepositModule.BankSlipButton = DepositBankSlipButton
DepositModule.ShortcutList = DepositShortcutList
