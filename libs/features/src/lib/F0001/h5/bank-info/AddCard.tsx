import { Loading } from '@nx-next-app/components/D0001'
import { Form, InputBox, Select } from '@nx-next-app/components/H0001'
import { BANK_ACCOUNT_REGEX, IFSC_CODE_REGEX } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddCard = () => {
	const { t } = useTranslation()

	const { trigger, register, handleSubmit, getValues, setValue, formState } =
		useForm()
	const { errors, touchedFields } = formState

	const {
		userInfo: { currencyId },
	} = useAuth()

	const { bankInfoSysList, setIsShowCards, handleSetCustBankInfo } =
		useBankInfo()

	if (!bankInfoSysList) return <Loading />

	const bankSysOptions = bankInfoSysList.map(
		({ bankLogo, bankName, sysId }) => ({
			value: sysId,
			label: bankName,
			prefixOptionIcon: (
				<div className='bankLogo'>
					<img
						src={`${
							process.env['NEXT_PUBLIC_PAYMENT_HOST']
						}/square/${bankLogo?.toLowerCase()}`}
						alt={bankName}
					/>
				</div>
			),
		})
	)

	const handleSubmitForm = async () => {
		const { accountNo, ifscCode, sysId } = getValues()
		handleSetCustBankInfo({ sysId, accountNo, ifscCode })
	}

	useEffect(() => {
		setValue('sysId', bankSysOptions[0].value)
	}, [])

	return (
		<Form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className='group-dropdown'>
				<div className='inputBox-blue'>
					<div className='dropdown'>
						<Select
							options={bankSysOptions}
							value={getValues('sysId')}
							placeholder={t('Label_BankInfo_SelectBank') as string}
							onChange={sysId => setValue('sysId', sysId)}
							errorMessage={errors['sysId']?.message as string}
							defaultValue={bankSysOptions[0].value}
							btnClassName='dropdownbank'
						/>
					</div>
				</div>
			</div>

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
				placeholder={t('Label_BankInfo_AccountNumber') as string}
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
							message: t('Label_BankInfo_IFSCCodeLength'),
						},
						onBlur: () => trigger('ifscCode'),
					})}
					placeholder={t('Label_BankInfo_IFSCCode') as string}
					touched={!!touchedFields['ifscCode']}
					errorMessage={errors['ifscCode']?.message as string}
					error={!!errors['ifscCode']}
					infoMessage={t('Label_BankInfo_PleaseEnterIFSCCode') as string}
				/>
			)}
			<div className='btnGroup'>
				<button
					className='btn-secondary'
					type='button'
					onClick={() => setIsShowCards(true)}
				>
					{t('Label_General_Cancel')}
				</button>
				<button className='btn-primary' type='submit'>
					{t('Label_General_Submit')}
				</button>
			</div>
		</Form>
	)
}

export { AddCard }
