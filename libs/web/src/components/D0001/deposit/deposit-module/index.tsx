import { useAuth } from '@nx-next-app/data-access'
import { isConvert } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
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
	hasAdditionalInfo?: boolean
}

const DepositModule = ({
	children,
	title,
	extra,
	layout,
	required = false,
	className = '',
	hasAdditionalInfo = false,
}: IDepositModuleProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	return (
		<div className={`block-deposit ${title}`}>
			<div className='subModuleTitle'>
				<div className='heading'>
					{title} {required && <i className='txt-required'>*</i>}
				</div>

				{isConvert(currencyId) && hasAdditionalInfo && (
					<div className='info'>{t('Label_Deposit_AdditionalInfo')}</div>
				)}
				{extra}
			</div>
			<div
				className={classNames('subModule', className, {
					selectBank: layout === 'horizontal',
				})}
			>
				{children}
			</div>
		</div>
	)
}

export default DepositModule

DepositModule.SubModuleButton = DepositSubModuleButton
DepositModule.SubModuleButtonGroup = DepositSubModuleButtonGroup
DepositModule.BankAccount = DepositBankAccount
DepositModule.BankSlipButton = DepositBankSlipButton
DepositModule.ShortcutList = DepositShortcutList
