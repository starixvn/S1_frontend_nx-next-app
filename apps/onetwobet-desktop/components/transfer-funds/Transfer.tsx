import { Form } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useTransferFunds } from '@nx-next-app/operations'
import { isConvert } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { InputBox, Select } from '../common'
import { TurnoverModal } from './TurnoverModal'

const Transfer = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

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

	const showModal = (
		turnover: number,
		rollover: number,
		percentage: number
	) => {
		modal.open(
			<TurnoverModal
				turnover={turnover}
				rollover={rollover}
				percentage={percentage}
			/>
		)
	}

	const errorCallback = (message: string) => {
		modal.confirm(message)
	}

	const selectSendWalletModal = () => {
		modal.error(t('Label_TransferFunds_PleaseSelectFromWallet'))
	}
	// Label_TransferFunds_PleaseSelectFromWallet
	const selectReceiveWalletModal = () => {
		modal.error(t('Label_TransferFunds_PleaseSelectToWallet'))
	}

	const handleTransferFormSubmit = handleSubmit(() => {
		handleSubmitForm(
			selectSendWalletModal,
			selectReceiveWalletModal,
			showModal,
			errorCallback
		)
	})

	return (
		<div className='subModuleList'>
			<Form onSubmit={handleTransferFormSubmit}>
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
									'btn-check primary': isFormValid,
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
