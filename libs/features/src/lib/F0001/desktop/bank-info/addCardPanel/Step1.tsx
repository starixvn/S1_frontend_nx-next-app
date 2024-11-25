import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const Step1 = ({ step }: any) => {
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
							<div className='icon icon-alert-fill' />
							<div className='txt-blue'>
								{t('Label_BankInfo_BankCardsFull')}
							</div>
						</>
					) : (
						<>
							<div className='icon icon-plus-add' />
							<div className='txt-blue'>
								{t('Label_BankInfo_AddBankAccount')}
							</div>
						</>
					)}
				</div>
				{step === 1 && (
					<div className='remainder'>
						{t('Label_BankInfo_NumberOfBankAccounts')}: {cardNumber}/3
					</div>
				)}
			</div>
		</div>
	)
}

export { Step1 }
