import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBankInfo } from '@nx-next-app/features/F0002/providers'

const StepBar = () => {
	const { t } = useTranslation()

	const { step } = useBankInfo()

	return (
		<div className='stepBar'>
			<div className='stepLine' style={{ width: `${(100 / 3) * step}%` }} />
			<div className='active'>
				<span>01</span>
				<span>{t('Label_BankInfo_AddBankAccount')}</span>
			</div>
			<div className={classNames('active', step > 1)}>
				<span>02</span>
				<span>{t('Label_BankInfo_SelectBank')}</span>
			</div>
			<div className={classNames('active', step > 2)}>
				<span>03</span>
				<span>{t('Label_BankInfo_EnterAccountNumber')}</span>
			</div>
		</div>
	)
}

export { StepBar }
