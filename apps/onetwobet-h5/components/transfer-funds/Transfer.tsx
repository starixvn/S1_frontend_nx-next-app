import { Form, InputBox, Select } from '@nx-next-app/components/H0001'
import { useAuth } from '@nx-next-app/data-access'
import { useTransferFunds } from '@nx-next-app/features/F0001/providers'
import { isConvert } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

const Transfer = () => {
	const { t } = useTranslation()

	const {
		userInfo: { currencyId },
	} = useAuth()

	const {
		maxAmount,
		isFormValid,
		walletOptions,
		formMethods: { formState, setValue, register, getValues, handleSubmit },
		handleSelectWallet,
		handleCheckAmount,
		handleSubmitForm,
		handleSetMaxAmount,
	} = useTransferFunds()

	const { errors, touchedFields } = formState

	useEffect(() => {
		if (maxAmount) {
			let convertedAmount = maxAmount
			if (isConvert(currencyId)) convertedAmount = maxAmount / 1000
			setValue('amount', convertedAmount)
		}
	}, [maxAmount])

	return (
		<>
			<div className='text-org title'>{t('Label_TransferFunds_From')}</div>
			<Form onSubmit={handleSubmit(handleSubmitForm)}>
				<Select
					options={walletOptions}
					value={getValues('walletFrom')}
					onChange={tpId => handleSelectWallet({ tpId, wallet: 'walletFrom' })}
				/>
				<div className='text-org title'>{t('Label_TransferFunds_To')}</div>
				<Select
					options={walletOptions}
					value={getValues('walletTo')}
					onChange={tpId => handleSelectWallet({ tpId, wallet: 'walletTo' })}
				/>
				<InputBox
					register={register('amount', {
						valueAsNumber: true,
						required: {
							value: true,
							message: t('Label_General_AmountLessThan', { value1: 1 }),
						},
						onBlur: handleCheckAmount,
					})}
					icon='icon icon-pencil'
					type='number'
					error={!!errors['amount']}
					format={isConvert(currencyId)}
					touched={!!touchedFields['amount']}
					placeholder={t('Label_General_Amount') as string}
					infoMessage={
						t('Label_General_AmountLessThan', { value1: 1 }) as string
					}
					errorMessage={errors['amount']?.message as string}
				/>
				<div className='btn-group'>
					<button
						type='button'
						className='white'
						onClick={() => {
							const walletFrom = getValues('walletFrom')
							if (walletFrom) {
								handleSetMaxAmount(walletFrom)
							}
						}}
					>
						{t('Label_TransferFunds_MaxAmount')}
					</button>
					<button
						type='submit'
						className={classNames({
							primary: isFormValid,
							'gray .primary': !isFormValid,
						})}
						style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
					>
						{t('Label_General_Transfer')}
					</button>
				</div>
			</Form>
		</>
	)
}

export { Transfer }
