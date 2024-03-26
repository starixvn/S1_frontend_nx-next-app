import { find } from 'lodash-es'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { numberFormat } from '@nx-next-app/utils'
import { CurrenciesEnum } from '@nx-next-app/types'
import { Form, InputBox } from '@nx-next-app/components/H0001'

const SubmitAmount = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, phoneVerified },
	} = useAuth()
	const {
		selectedBankInfo,
		withdrawalLimit,
		handleSubmitAmount,
		amountForm,
		checkAmount,
		withdrawalType,
	} = useWithdrawal()

	const { register, formState, getValues, handleSubmit } = amountForm

	const { errors, dirtyFields } = formState

	const isEWalletSelected = withdrawalType === WithdrawalBankCardEnum.EWallet

	const {
		withdrawalTimes = 0,
		maxTimes = 0,
		usdtList = [],
		withdrawalMin = 0,
		unlimited = false,
		withdrawalAvailableAmount = 0,
		eWalletWithdrawalMin = 0,
		eWalletWithdrawalAvailableAmount = 0,
	} = withdrawalLimit ?? {}

	// 如果是 crypto 類型，先找出該 crypto 的 limit 資料
	const cryptoLimit = find(
		usdtList,
		({ currencyId, network }) =>
			currencyId === selectedBankInfo.currencyId &&
			network === selectedBankInfo.network
	)

	const withdrawalMinMaxLimitHint = `${t('Label_Withdrawal_DailyMinMaxAmount', {
		min: numberFormat(
			withdrawalType === WithdrawalBankCardEnum.Crypto
				? cryptoLimit?.withdrawalMin ?? 0
				: withdrawalMin,
			currencyId,
			2
		),
		max: unlimited
			? t('Label_General_Unlimited')
			: numberFormat(withdrawalAvailableAmount, currencyId, 2),
	})}`

	const isButtonDisabled =
		!!errors['amount'] ||
		!dirtyFields['amount'] ||
		(currencyId === CurrenciesEnum.INR && !phoneVerified) ||
		(maxTimes > 0 && withdrawalTimes >= maxTimes)

	return (
		<Form
			onSubmit={handleSubmit(() => {
				const { amount } = getValues()
				handleSubmitAmount(amount)
			})}
		>
			<InputBox
				icon='icon-pencil'
				register={register('amount', {
					required: {
						value: true,
						message: t('Label_Withdrawal_Insufficientbalance'),
					},
					onChange: checkAmount,
					onBlur: checkAmount,
				})}
				type='number'
				touched={!!dirtyFields['amount']}
				infoMessage={withdrawalMinMaxLimitHint}
				placeholder={
					isEWalletSelected
						? `${t('Label_Withdrawal_MinMaxAmount')} ${numberFormat(
								eWalletWithdrawalMin,
								currencyId
						  )} / ${
								unlimited
									? t('Label_General_Unlimited')
									: numberFormat(eWalletWithdrawalAvailableAmount, currencyId)
						  }`
						: t('Label_General_Amount') ?? ''
				}
				error={!!errors['amount']}
				errorMessage={errors['amount']?.message as string}
			/>
			<div className='text-org'>
				<span>
					{t('Label_General_Times')}:{' '}
					{`${withdrawalTimes} / ${
						maxTimes === 0 ? t('Label_General_Unlimited') : maxTimes
					}`}
				</span>
				{withdrawalMinMaxLimitHint}
			</div>
			<div className='btn-group'>
				<button type='submit' className='btn-check' disabled={isButtonDisabled}>
					{t('Label_General_Submit')}
				</button>
			</div>
		</Form>
	)
}

export { SubmitAmount }
