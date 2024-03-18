import classNames from 'classnames'
import { ReactNode } from 'react'
import { isConvert } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'react-i18next'
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
	hasAdditionalInfo?: boolean
}

const DepositModule = ({
	children,
	title,
	required = false,
	className = 'selectModule',
	hasAdditionalInfo = false,
}: IDepositModuleProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	return (
		<>
			<div className='title'>
				{required && <span>*</span>}

				{title}

				{isConvert(currencyId) && hasAdditionalInfo && (
					<div className='info'>{t('Label_Deposit_AdditionalInfo')}</div>
				)}
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
