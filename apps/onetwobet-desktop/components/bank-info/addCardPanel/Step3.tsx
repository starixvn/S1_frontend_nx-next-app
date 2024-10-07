import { BANK_ACCOUNT_REGEX, IFSC_CODE_REGEX } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useBankInfo } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { InputBox, Loading } from '../../common'

const Step3 = () => {
	const { t } = useTranslation()
	const { trigger, register, handleSubmit, getValues, formState } = useForm()
	const { errors, touchedFields } = formState

	const {
		userInfo: { currencyId },
	} = useAuth()

	const { selBank, setStep, handleSetCustBankInfo } = useBankInfo()

	if (!selBank) return <Loading />

	const { bankLogo, bankName } = selBank

	const handleSubmitForm = async () => {
		const { accountNo, ifscCode } = getValues()

		handleSetCustBankInfo({
			accountNo,
			ifscCode,
			successCallback: () => setStep(1),
		})
	}

	return (
		<>
			<div className='platformName'>
				<div className='icon icon-arrow-right2' />
				<div>
					<div>{t('Label_BankInfo_EnterAccountNumber')}</div>
				</div>
				<button className='icon icon-arrow-left2' onClick={() => setStep(2)} />
			</div>
			<div className='subModuleList'>
				<div className='subModule'>
					{/* 設計稿裡原本就有的 form，直接使用 */}
					<form
						className='subModuleBody column'
						onSubmit={handleSubmit(handleSubmitForm)}
					>
						<div>
							<div className='bankName'>
								<img
									src={`${
										process.env['NEXT_PUBLIC_PAYMENT_HOST']
									}/square/${bankLogo.toLowerCase()}`}
									alt={bankName}
								/>
							</div>
						</div>
						<div className='inputModule'>
							<InputBox
								register={register('accountNo', {
									required: {
										value: true,
										message: t('Label_BankInfo_NeedAccountNo'),
									},
									pattern: {
										value: BANK_ACCOUNT_REGEX,
										message: t('Label_BankInfo_AccountWrongFormat'),
									},
									onBlur: () => trigger('accountNo'),
								})}
								title={t('Label_BankInfo_AccountNumber') || ''}
								touched={!!touchedFields['accountNo']}
								errorMessage={errors['accountNo']?.message as string}
								error={!!errors['accountNo']}
								infoMessage={t('Label_BankInfo_EnterAccountNumber') as string}
							/>
							{currencyId === CurrenciesEnum.INR && (
								<InputBox
									register={register('ifscCode', {
										required: {
											value: true,
											message: t('Label_BankInfo_PleaseEnterIFSCCode'),
										},
										pattern: {
											value: IFSC_CODE_REGEX,
											message: t('Label_BankInfo_IFSCCodeLength') || '',
										},
										onBlur: () => trigger('ifscCode'),
									})}
									title={t('Label_BankInfo_IFSCCode') || ''}
									touched={!!touchedFields['ifscCode']}
									errorMessage={errors['ifscCode']?.message as string}
									error={!!errors['ifscCode']}
									infoMessage={
										t('Label_BankInfo_PleaseEnterIFSCCode') as string
									}
								/>
							)}
							<div className='btnGroup'>
								<button className='btn-check primary' type='submit'>
									{t('Label_General_Submit')}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export { Step3 }
