import Form from '@apps/yashbet-h5/components/common/form'
import InputBox from '@apps/yashbet-h5/components/common/input/InputBox'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { WithdrawalBankCardEnum, useWithdrawal } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { numberFormat } from '@nx-next-app/utils'
import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const WithdrawalConfirmModal = dynamic(
	() => import('../modal/WithdrawalConfirmModal'),
	{ ssr: false }
)

const SubmitAmount = () => {
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()
	const {
		userInfo: { currencyId, phoneVerified },
	} = useAuth()
	const {
		selectedBankInfo,
		withdrawalLimit,
		handleSubmitAmount,
		handleWithdrawalConfirm,
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
				handleSubmitAmount(
					amount,
					({ accountName, exchangeAmount, exchangeRate }) =>
						modal.open(
							<WithdrawalConfirmModal
								selectedBankInfo={selectedBankInfo}
								withdrawalAmount={amount}
								accountName={accountName}
								handleWithdrawalConfirm={() => {
									handleWithdrawalConfirm(
										{ amount, exchangeAmount, exchangeRate },
										{
											successCallback: onFinish => {
												closeModal()
												onFinish()
											},
											errorCallback: errorMessage => {
												modal.error(errorMessage)
											},
										}
									)
								}}
								exchangeAmount={exchangeAmount}
							/>
						)
				)
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
				<button type='submit' className='primary' disabled={isButtonDisabled}>
					{t('Label_General_Submit')}
				</button>
			</div>
		</Form>
	)
}

export { SubmitAmount }
