import classNames from 'classnames'
import { ReactNode } from 'react'
import DepositBankAccount from './DepositBankAccount'
import DepositScanQR from './DepositScanQR'
import DepositShortcutList from './DepositShortcutList'
import DepositSubModuleButton from './DepositSubModuleButton'
import DepositSubModuleButtonGroup from './DepositSubModuleButtonGroup'

export interface IDepositModuleProps {
	children: ReactNode
	title: string
	required?: boolean
	className?: string
}

const DepositModule = ({
	children,
	title,
	required = false,
	className = 'selectModule',
}: IDepositModuleProps) => {
	return (
		<>
			<div className='title'>
				{required && <span>*</span>}

				{title}
			</div>
			<div className={classNames(className)}>{children}</div>
		</>
	)
}

export default DepositModule

DepositModule.SubModuleButton = DepositSubModuleButton
DepositModule.SubModuleButtonGroup = DepositSubModuleButtonGroup
DepositModule.BankAccount = DepositBankAccount
DepositModule.ShortcutList = DepositShortcutList
DepositModule.ScanQR = DepositScanQR
