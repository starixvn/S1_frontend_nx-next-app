import { useTranslation } from 'next-i18next'
import { isConvert } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { Form, Select, InputBox } from '@nx-next-app/components/D0006'
import { useTransferFunds } from '@nx-next-app/features/F0006/providers'
import classNames from 'classnames'

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
									'btn-check': isFormValid,
									darkGray: !isFormValid,
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
