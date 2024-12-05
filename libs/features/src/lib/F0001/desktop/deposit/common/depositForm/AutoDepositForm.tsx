import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/D0001'
import {
	useAuth,
	useAutoDepositForm,
	useDepositContext,
} from '@nx-next-app/data-access'
import { useManageCards } from '@nx-next-app/features/F0001/providers/withdrawal-context/useManageCards'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { IPaymentAutoDepositData } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	generateShortcutList,
	isConvert,
	limitedShortcutAmountList,
	numFormatToDigits,
	numberFormat,
	revertNumberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const { IDR } = CurrenciesEnum

interface IAutoDepositFormProps {
	dataSource: IPaymentAutoDepositData[]
}

const AutoDepositForm = ({ dataSource }: IAutoDepositFormProps) => {
	const {
		userInfo: { currencyId, accountName },
	} = useAuth()
	const { t } = useTranslation()
	const { getCustPromotionOptions } = useDepositContext()

	const {
		formMethods: {
			trigger,
			handleSubmit,
			setValue,
			watch,
			register,
			clearErrors,
			formState: { touchedFields, errors, isValid },
		},
		custBankInfo,
		supportBanks,
		bankCardOptions,
		bankCardRequired,
		onAutoDepositFormSubmit,
	} = useAutoDepositForm({
		dataSource,
	})

	const bankData = { bankInfoDetail: custBankInfo }

	const { handleAddCards } = useManageCards({
		accountName: String(accountName),
		bankData,
	})

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchCustBankAccount = watch('custBankAccount')
	const watchAmountRule = watch('amountRule')
	const watchAmountList = watch('amountList')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0
	const showShortcutList = watchAmountRule === 3
	const depositAmountText = `${t('Label_General_DepositAmount')} ${
		currencyId === IDR ? t('Label_Deposit_IDRAmountHint') : ''
	}`

	return (
		<>
			<div />

			<DepositModule
				title={t('Label_Payment_Method')}
				layout='vertical'
				required
				hasAdditionalInfo
			>
				<DepositModule.SubModuleButtonGroup matchKey='channelId'>
					{dataSource.map(item => {
						const {
							minAmount,
							maxAmount,
							channelName,
							displayChannelName,
							channelId,
						} = item
						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={displayChannelName}
								imgName={`${toLower(channelName)}.png`}
								matchValue={String(channelId)}
								key={channelId}
							>
								<div>{`${min} ~ ${max}`}</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			{supportBanks.length > 0 && (
				<DepositModule
					title={t('Label_BankInfo_SelectBank')}
					layout='horizontal'
					required
					hasAdditionalInfo
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{supportBanks.map(item => {
							const { bankName, bankLogo, minAmount, maxAmount, sysId } = item
							const min = numberFormat(minAmount, currencyId, 0, false)
							const max = numberFormat(maxAmount, currencyId, 0, false)
							return (
								<DepositModule.SubModuleButton
									label={bankName}
									imgName={`square/${toLower(bankLogo)}`}
									matchValue={String(sysId)}
									key={sysId}
								>
									<div>{`${min} ~ ${max}`}</div>
								</DepositModule.SubModuleButton>
							)
						})}
					</DepositModule.SubModuleButtonGroup>
				</DepositModule>
			)}

			{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
				<DepositModule title={depositAmountText} required>
					<div className='column' />
					{!showShortcutList && (
						<InputBox
							type='number'
							className='inputBox-white'
							register={register('amount', {
								valueAsNumber: true,
								required: {
									value: true,
									message: t('Label_General_AmountLessThan', {
										value1: numberFormat(convertedMinAmount, currencyId, 0),
									}),
								},
								min: {
									value: watchMinAmount,
									message: t('Label_General_AmountLessThan', {
										value1: numberFormat(convertedMinAmount, currencyId, 0),
									}),
								},
								max: {
									value: watchMaxAmount,
									message: t('Label_General_NotInLimit'),
								},
							})}
							format={isConvert(currencyId)}
							placeholder={
								t('Label_General_AmountMinMaxLimit', {
									value1: numFormatToDigits(watchMinAmount),
									value2: numFormatToDigits(watchMaxAmount),
								}) || ''
							}
							touched={!!touchedFields['amount']}
							errorMessage={errors['amount']?.message || ''}
							error={!!errors['amount']}
						/>
					)}

					{/* // ! 加這行 tip 用來防止 InputBox 與 ShortcutList 跑版 */}
					<div className='tip' />

					{showShortcutList ? (
						<DepositModule.ShortcutList
							minAmount={watchMinAmount}
							maxAmount={watchMaxAmount}
							shortcut={Number(watchAmount)}
							shortcutList={limitedShortcutAmountList({
								minAmount: watchMinAmount,
								maxAmount: watchMaxAmount,
								amountList: watchAmountList,
							})}
							onChange={value => {
								setValue('amount', value)
								trigger('amount')
							}}
						/>
					) : (
						<DepositModule.ShortcutList
							minAmount={watchMinAmount}
							maxAmount={watchMaxAmount}
							shortcut={Number(watchAmount)}
							shortcutList={generateShortcutList({
								minAmount: watchMinAmount,
							})}
							onChange={value => {
								setValue('amount', value)
								trigger('amount')
							}}
						/>
					)}
				</DepositModule>
			)}

			{bankCardRequired && (
				<DepositModule title={t('Label_Deposit_DepositChannel')} required>
					<Select
						value={watchCustBankAccount}
						options={bankCardOptions}
						onChange={value => {
							trigger('custBankAccount')
							setValue('custBankAccount', String(value))
							clearErrors('custBankAccount')
						}}
						errorMessage={errors['custBankAccount']?.message as string}
					/>
					{custBankInfo.length < 3 && (
						<div className='btnGroup'>
							<button
								className='btn-check'
								onClick={() => handleAddCards(WithdrawalBankCardEnum.LocalBank)}
							>
								+
							</button>
						</div>
					)}
					<div
						className={classNames('tip', {
							active: errors['custBankAccount'],
						})}
					>
						{errors['custBankAccount']?.message}
					</div>
				</DepositModule>
			)}

			<DepositModule title={t('Label_Deposit_ChooseAvailablePromotion')}>
				<Select
					value={watchBonusCode}
					options={getCustPromotionOptions(watchAmount)}
					onChange={value => {
						setValue('bonusCode', String(value))
						setValue('promoCode', undefined)
					}}
				/>

				<InputBox
					className='inputBox-white'
					register={register('promoCode')}
					placeholder={t('Label_Promotions_PromoCode') || ''}
					touched={!!touchedFields['promoCode']}
					onChange={() => {
						setValue('bonusCode', undefined)
					}}
				/>
			</DepositModule>

			<Form onSubmit={handleSubmit(onAutoDepositFormSubmit)}>
				<div className='btnGroup'>
					<button
						type='submit'
						style={{ pointerEvents: isValid && watchAmount ? 'auto' : 'none' }}
						className={classNames({
							darkGray: !(isValid && watchAmount),
							'btn-check': isValid && watchAmount,
						})}
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			</Form>
		</>
	)
}

export default AutoDepositForm
