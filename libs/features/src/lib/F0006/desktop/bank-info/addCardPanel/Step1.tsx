import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBankInfo } from '@nx-next-app/features/F0006/providers'

const Step1 = () => {
	const { t } = useTranslation()

	const { bankInfoDetail, setStep } = useBankInfo()

	const cardNumber = bankInfoDetail.length

	return (
		<div className='walletModule'>
			<div className='addBank'>
				<div
					className={classNames('addBankName noBank', {
						'custom-cursor-on-hover': cardNumber === 3,
					})}
					onClick={() => {
						if (cardNumber !== 3) setStep(2)
					}}
				>
					{cardNumber === 3 ? (
						<>
							<div className='icon icon-warning' />
							<div>{t('Label_BankInfo_BankCardsFull')}</div>
						</>
					) : (
						<>
							<div className='icon icon-plus' />
							<div>{t('Label_BankInfo_AddBankAccount')}</div>
						</>
					)}
				</div>
				<div className='remainder'>
					{t('Label_BankInfo_NumberOfBankAccounts')}: {cardNumber}/3
				</div>
			</div>
		</div>
	)
}

export { Step1 }
