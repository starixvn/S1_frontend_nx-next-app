import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import {
	useAuth,
	useAutoDepositForm,
	useDepositContext,
} from '@nx-next-app/data-access'
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
import Link from 'next/link'

const { IDR } = CurrenciesEnum

interface IAutoDepositFormProps {
	dataSource: IPaymentAutoDepositData[]
}

const AutoDepositForm = ({ dataSource }: IAutoDepositFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { getCustPromotionOptions, getBonusCodeIfExist } = useDepositContext()

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
		supportBanks,
		custBankInfo,
		bankCardOptions,
		bankCardRequired,
		onAutoDepositFormSubmit,
	} = useAutoDepositForm({
		dataSource,
	})

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchCustBankAccount = watch('custBankAccount')
	const watchAmountRule = watch('amountRule')
	const watchAmountList = watch('amountList')

	const showFixedAmountList = watchAmountRule === 3
	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const depositAmountText = `${t('Label_General_DepositAmount')} ${
		currencyId === IDR ? t('Label_Deposit_IDRAmountHint') : ''
	}`

	const depositAmountTextEng = `${t('Label_General_DepositAmount', {
		lng: 'en',
	})} ${
		currencyId === IDR ? t('Label_Deposit_IDRAmountHint', { lng: 'en' }) : ''
	}`

	return (
		<>
			<DepositModule
				title={t('Label_Payment_Method')}
				required
				hasAdditionalInfo
				depositTitle={t('Label_Payment_Method', { lng: 'en' })}
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
								imgName={`${toLower(channelName)}.webp`}
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
					depositTitle={t('Label_BankInfo_SelectBank', { lng: 'en' })}
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
				<DepositModule
					title={depositAmountText}
					depositTitle={depositAmountTextEng}
					required
				>
					<div className='infoModule'>
						<div className='column' />
						<InputBox
							type='number'
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
							onChange={event => {
								setValue(
									'bonusCode',
									String(
										getBonusCodeIfExist(
											Number(event.target.value),
											watchBonusCode
										)
									)
								)
							}}
							placeholder={
								t('Label_General_AmountMinMaxLimit', {
									value1: numFormatToDigits(watchMinAmount),
									value2: numFormatToDigits(watchMaxAmount),
								}) || ''
							}
							touched={!!touchedFields['amount']}
							errorMessage={errors['amount']?.message || ''}
							error={!!errors['amount']}
							infoMessage={
								t('Label_General_AmountLessThan', {
									value1: numberFormat(convertedMinAmount, currencyId, 0),
								}) || ''
							}
						/>

						{/* // ! 加這行 tip 用來防止 InputBox 與 ShortcutList 跑版 */}
						<div className='tip' />

						<DepositModule.ShortcutList
							minAmount={watchMinAmount}
							maxAmount={watchMaxAmount}
							shortcut={Number(watchAmount)}
							shortcutList={
								showFixedAmountList
									? limitedShortcutAmountList({
											minAmount: watchMinAmount,
											maxAmount: watchMaxAmount,
											amountList: watchAmountList,
									  })
									: generateShortcutList({
											minAmount: watchMinAmount,
									  })
							}
							onChange={value => {
								setValue(
									'bonusCode',
									String(getBonusCodeIfExist(value, watchBonusCode))
								)
								setValue('amount', value)
								trigger('amount')
							}}
						/>
					</div>
				</DepositModule>
			)}

			{bankCardRequired && (
				<DepositModule
					title={t('Label_Deposit_DepositChannel')}
					depositTitle={t('Label_Deposit_DepositChannel', { lng: 'en' })}
					required
				>
					<div className='infoModule'>
						<div className='group-dropdown'>
							<div className='inputBox-blue'>
								<div className='dropdown'>
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
								</div>
							</div>
							<div
								className={classNames('tip', {
									active: errors['custBankAccount'],
								})}
							>
								{errors['custBankAccount']?.message}
							</div>
						</div>
						{custBankInfo.length < 3 && (
							<div className='btn-group'>
								<Link href={paths.bankInfo.root}>
									<a>
										<i className='icon icon-plus-add' />
									</a>
								</Link>
							</div>
						)}
					</div>
				</DepositModule>
			)}

			<DepositModule
				title={t('Label_Deposit_ChooseAvailablePromotion')}
				depositTitle={t('Label_Deposit_ChooseAvailablePromotion', {
					lng: 'en',
				})}
			>
				<div className='group-dropdown'>
					<div className='inputBox-blue spacing-input-0'>
						<div className='dropdown'>
							<div className='infoModule'>
								<Select
									value={getBonusCodeIfExist(watchAmount, watchBonusCode)}
									options={getCustPromotionOptions(watchAmount)}
									onChange={value => {
										setValue('bonusCode', String(value))
										setValue('promoCode', undefined)
									}}
								/>
							</div>
						</div>
					</div>
					<InputBox
						register={register('promoCode')}
						placeholder={t('Label_Promotions_PromoCode') || ''}
						touched={!!touchedFields['promoCode']}
						onChange={() => {
							setValue('bonusCode', undefined)
						}}
					/>
				</div>
			</DepositModule>

			<Form onSubmit={handleSubmit(onAutoDepositFormSubmit)}>
				<div className='btnGroup'>
					<button
						type='submit'
						style={{ pointerEvents: isValid ? 'auto' : 'none' }}
						className={classNames({
							'btn-disable': !isValid,
							'btn-primary': isValid,
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
