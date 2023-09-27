import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { numberFormat } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { InputBox } from '@nx-next-app/components/D0001'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'

const Amount = () => {
	const {
		userInfo: { currencyId, phoneVerified },
	} = useAuth()
	const { t } = useTranslation()

	const {
		selectedBankInfo,
		withdrawalBalance,
		withdrawalLimit,
		handleSubmitAmount,
		amountForm,
		checkAmount,
	} = useWithdrawal()

	const { register, formState, getValues, handleSubmit } = amountForm

	const { touchedFields, errors } = formState

	const { type } = selectedBankInfo

	const isEWalletSelected = type === WithdrawalBankCardEnum.EWallet

	const {
		balance = 0,
		deduction = 0,
		availableBalance = 0,
	} = withdrawalBalance ?? {}

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
			type === WithdrawalBankCardEnum.Crypto
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
		!touchedFields['amount'] ||
		(currencyId === CurrenciesEnum.INR && !phoneVerified) ||
		(maxTimes > 0 && withdrawalTimes >= maxTimes)

	return (
		<div className='subModule'>
			<div className='subModuleBody'>
				<div className='calculation'>
					<div>
						<div>{t('Label_Withdrawal_Balance')}</div>
						<div>
							{t(`Label_General_Currency_${currencyId}`)}
							<span>{numberFormat(balance, currencyId)}</span>
						</div>
					</div>
					<div>-</div>
					<div>
						<div>{t('Label_Withdrawal_Deduction')}</div>
						<div>
							{t(`Label_General_Currency_${currencyId}`)}
							<span>{numberFormat(deduction, currencyId)}</span>
						</div>
					</div>
					<div>=</div>
					<div>
						<div>{t('Label_Withdrawal_EligibleWithdrawalAmount')}</div>
						<div>
							{t(`Label_General_Currency_${currencyId}`)}
							<span>{numberFormat(availableBalance, currencyId)}</span>
						</div>
					</div>
				</div>
				<form
					className='inputModuleRow'
					onSubmit={handleSubmit(() => {
						const { amount } = getValues()
						handleSubmitAmount(amount)
					})}
				>
					<InputBox
						register={register('amount', {
							required: {
								value: true,
								message: t('Label_Withdrawal_Insufficientbalance'),
							},
							onChange: checkAmount,
							onBlur: checkAmount,
						})}
						touched={!!touchedFields['amount']}
						title={t('Label_Withdrawal_Amount') ?? ''}
						type='number'
						placeholder={
							isEWalletSelected
								? `${t('Label_Withdrawal_MinMaxAmount')} ${numberFormat(
										eWalletWithdrawalMin,
										currencyId
								  )} / ${
										unlimited
											? t('Label_General_Unlimited')
											: numberFormat(
													eWalletWithdrawalAvailableAmount,
													currencyId
											  )
								  }`
								: ''
						}
						error={!!errors['amount']}
						errorMessage={errors['amount']?.message as string}
					/>
					<div className='tip active'>
						<span>
							{t('Label_General_Times')}:{' '}
							{`${withdrawalTimes} / ${
								maxTimes === 0 ? t('Label_General_Unlimited') : maxTimes
							}`}
						</span>
						{withdrawalMinMaxLimitHint}
					</div>
					<div className='btnGroup'>
						<button
							type='submit'
							className='btn-check'
							disabled={isButtonDisabled}
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export { Amount }
