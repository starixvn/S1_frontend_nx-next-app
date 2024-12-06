import { Form, InputBox, Loading, Select } from '@nx-next-app/components/H0001'
import { E_WALLET_SYSID, TOUCH_GO_REGEX } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useEWallet } from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import { head } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

const AddWallet = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { eWalletInfoSysList, setIsShowCards, handleSetCustEWallet } =
		useEWallet()

	const { trigger, register, handleSubmit, getValues, setValue, formState } =
		useForm<{
			sysId: number
			accountNo: string
		}>({
			defaultValues: {
				sysId: head(eWalletInfoSysList)?.sysId,
			},
		})
	const { errors, touchedFields } = formState

	if (!eWalletInfoSysList) return <Loading />

	const isTouchNGoIsValid =
		currencyId === CurrenciesEnum.MYR &&
		getValues('sysId') === E_WALLET_SYSID.TouchNGO

	const eWalletSysOptions = eWalletInfoSysList.map(
		({ eWalletLogo, eWalletName, sysId }) => ({
			value: sysId,
			label: eWalletName,
			prefixOptionIcon: (
				<div className='bankLogo'>
					<img
						src={`${
							process.env['NEXT_PUBLIC_PAYMENT_HOST']
						}/square/${eWalletLogo.toLowerCase()}`}
						alt={eWalletName}
					/>
				</div>
			),
		})
	)

	const handleSubmitForm = async () => {
		const { accountNo, sysId } = getValues()
		handleSetCustEWallet({ sysId, accountNo })
	}

	return (
		<Form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className='group-dropdown'>
				<div className='inputBox-blue'>
					<div className='dropdown'>
						<Select
							value={getValues('sysId')}
							options={eWalletSysOptions}
							placeholder={t('Label_BankInfo_SelectBank') as string}
							errorMessage={errors['sysId']?.message as string}
							defaultValue={head(eWalletSysOptions)?.value}
							onChange={sysId => setValue('sysId', sysId as number)}
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
					pattern: isTouchNGoIsValid
						? {
								value: TOUCH_GO_REGEX,
								message: t('Label_Withdrawal_TouchGo_Validation'),
						  }
						: undefined,
					onBlur: () => trigger('accountNo'),
				})}
				type='number'
				error={!!errors['accountNo']}
				touched={!!touchedFields['accountNo']}
				placeholder={t('Label_BankInfo_AccountNumber') as string}
				infoMessage={t('Label_BankInfo_EnterAccountNumber') as string}
				errorMessage={errors['accountNo']?.message as string}
			/>
			<div className='btnGroup'>
				<button
					type='button'
					className='btn-secondary'
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

export { AddWallet }
