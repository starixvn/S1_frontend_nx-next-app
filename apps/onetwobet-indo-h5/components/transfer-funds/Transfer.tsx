import { Form } from '@12b-indo-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useTransferFunds } from '@nx-next-app/operations'
import { isConvert } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { InputBox } from '../common/input'
import Select from '../common/select'
import { TurnoverModal } from './TurnoverModal'

const Transfer = () => {
	const { t } = useTranslation()

	const {
		userInfo: { currencyId },
	} = useAuth()

	const {
		maxAmount,
		isFormValid,
		mainWalletInfo,
		walletOptions,
		formMethods: {
			formState,
			setValue,
			register,
			getValues,
			handleSubmit,
			watch,
			trigger,
		},
		handleSelectWallet,
		handleCheckAmount,
		handleSubmitForm,
	} = useTransferFunds()

	const { errors, touchedFields } = formState

	const { modal } = useGlobalModal()

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

	// maxAmount 取整數
	const removeDecimals = (value: number) => {
		return Math.trunc(value)
	}

	const amount = watch('amount')

	// amount 代表目前表單中的轉帳金額值。當使用者輸入金額或該欄位的值被更新時，watch 會讓這個值隨時反映最新的金額狀態

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
			<Form onSubmit={handleTransferFormSubmit}>
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
						className={classNames({
							'gray .primary': !!amount, // 有數字時變成灰色
							red: !amount, // 無數字時變成紅色 代表可按
						})}
						onClick={async () => {
							const maxAmountValue = mainWalletInfo?.balance || 0
							const integerAmount = removeDecimals(maxAmountValue)
							setValue(
								'amount',
								isConvert(currencyId)
									? removeDecimals(maxAmountValue / 1000)
									: integerAmount
							)
							// 手動觸發 更新表單狀態 確保 isFormValid 的狀態是正確的。transfer按鈕才會自動判斷顏色
							await trigger('amount')
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
