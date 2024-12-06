import { Form, InputBox, Select } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useTransferFunds } from '@nx-next-app/features/F0001/providers'
import { isConvert } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const Transfer = () => {
	const { t } = useTranslation()

	const {
		userInfo: { currencyId },
	} = useAuth()

	const {
		walletOptions,
		isFormValid,
		formMethods: { formState, register, getValues, handleSubmit },
		handleSelectWallet,
		handleCheckAmount,
		handleSubmitForm,
	} = useTransferFunds()
	const { errors, touchedFields } = formState

	return (
		<div className='subModuleList'>
			<Form onSubmit={handleSubmit(handleSubmitForm)}>
				<div className='walletTransfer'>
					<div className='walletModule transferModule'>
						<Select
							options={walletOptions}
							value={getValues('walletFrom')}
							prefixIcon={t('Label_TransferFunds_From')}
							onChange={tpId =>
								handleSelectWallet({ tpId, wallet: 'walletFrom' })
							}
						/>
						<Select
							options={walletOptions}
							value={getValues('walletTo')}
							prefixIcon={t('Label_TransferFunds_To')}
							onChange={tpId =>
								handleSelectWallet({ tpId, wallet: 'walletTo' })
							}
						/>
					</div>
					<div className='inputModuleRow'>
						<InputBox
							register={register('amount', {
								valueAsNumber: true,
								required: {
									value: true,
									message: t('Label_General_AmountLessThan', { value1: 1 }),
								},
								onBlur: handleCheckAmount,
							})}
							type='number'
							title={t('Label_General_Amount') as string}
							error={!!errors['amount']}
							format={isConvert(currencyId)}
							touched={!!touchedFields['amount']}
							infoMessage={
								t('Label_General_AmountLessThan', { value1: 1 }) as string
							}
							errorMessage={errors['amount']?.message as string}
						/>
						<div className='btnGroup'>
							<button
								type='submit'
								className={classNames({
									'btn-primary': isFormValid,
									'btn-disable': !isFormValid,
								})}
								style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
							>
								{t('Label_General_Submit')}
							</button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}

export { Transfer }
