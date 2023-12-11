import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useEWallet } from '@nx-next-app/features/F0006/providers'
import { Form, Select, InputBox, Loading } from '@nx-next-app/components/H0001'

const AddWallet = () => {
	const { t } = useTranslation()

	const { trigger, register, handleSubmit, getValues, setValue, formState } =
		useForm()
	const { errors, touchedFields } = formState

	const { eWalletInfoSysList, setIsShowCards, handleSetCustEWallet } =
		useEWallet()

	if (!eWalletInfoSysList) return <Loading />

	const eWalletSysOptions = eWalletInfoSysList.map(
		({ eWalletLogo, eWalletName, sysId }) => ({
			value: sysId,
			label: eWalletName,
			prefixOptionIcon: (
				<div className='bankLogo'>
					<Image
						src={`${
							process.env['NEXT_PUBLIC_PAYMENT_HOST']
						}/square/${eWalletLogo.toLowerCase()}`}
						alt={eWalletName}
						width={45}
						height={45}
					/>
				</div>
			),
		})
	)

	const handleSubmitForm = async () => {
		const { accountNo, sysId } = getValues()
		handleSetCustEWallet({ sysId, accountNo })
	}

	useEffect(() => {
		setValue('sysId', eWalletSysOptions[0].value)
	}, [])

	return (
		<Form onSubmit={handleSubmit(handleSubmitForm)}>
			<Select
				value={getValues('sysId')}
				options={eWalletSysOptions}
				placeholder={t('Label_BankInfo_SelectBank') as string}
				errorMessage={errors['sysId']?.message as string}
				defaultValue={eWalletSysOptions[0].value}
				onChange={sysId => setValue('sysId', sysId)}
			/>
			<InputBox
				register={register('accountNo', {
					required: {
						value: true,
						message: t('Label_BankInfo_NeedAccountNo'),
					},
					onBlur: () => trigger('accountNo'),
				})}
				type='number'
				icon='icon-newspaper'
				error={!!errors['accountNo']}
				touched={!!touchedFields['accountNo']}
				placeholder={t('Label_BankInfo_AccountNumber') as string}
				infoMessage={t('Label_BankInfo_EnterAccountNumber') as string}
				errorMessage={errors['accountNo']?.message as string}
			/>
			<div className='btn-group'>
				<button
					type='button'
					className='white'
					onClick={() => setIsShowCards(true)}
				>
					{t('Label_General_Cancel')}
				</button>
				<button className='orange' type='submit'>
					{t('Label_General_Submit')}
				</button>
			</div>
		</Form>
	)
}

export { AddWallet }
