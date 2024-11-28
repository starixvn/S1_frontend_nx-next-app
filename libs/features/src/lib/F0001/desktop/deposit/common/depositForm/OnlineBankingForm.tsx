import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	DepositModule,
	Form,
	InputBox,
	Loading,
	Select,
} from '@nx-next-app/components/D0001'
import {
	useAuth,
	useDepositContext,
	useOnlineBankingForm,
} from '@nx-next-app/data-access'
import { useManageCards } from '@nx-next-app/features/F0001/providers/withdrawal-context/useManageCards'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { IPaymentOnlineBankingData } from '@nx-next-app/service'
import {
	generateShortcutList,
	isConvert,
	limitedShortcutAmountList,
	numberFormat,
	numFormatToDigits,
	revertNumberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const DepositQRCodeModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/common/modal/DepositQRCodeModal'
		),
	{ ssr: false }
)

interface IOnlineBankingFormProps {
	dataSource: IPaymentOnlineBankingData[]
}

const OnlineBankingForm = ({ dataSource }: IOnlineBankingFormProps) => {
	const {
		userInfo: { currencyId, accountName },
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
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
		loading,
		selBank,
		paymentOnlineBankInfoSysList,
		custBankInfo,
		bankCardOptions,
		bankCardRequired,
		onOnlineBankingFormSubmit,
	} = useOnlineBankingForm({
		dataSource,
		onQRCodeModalCallback: values =>
			modal.open(<DepositQRCodeModal {...values} />),
	})

	const bankData = { bankInfoDetail: custBankInfo }

	const { handleAddCards } = useManageCards({
		accountName: String(accountName),
		bankData,
	})

	const watchAmount = watch('amount')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchBonusCode = watch('bonusCode')
	const watchCustBankAccount = watch('custBankAccount')
	const watchAmountRule = watch('amountRule')
	const watchAmountList = watch('amountList')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0
	const showShortcutList = watchAmountRule === 3
	return (
		<>
			{loading && <Loading />}
			<DepositModule
				title={t('Label_Payment_Method')}
				layout='vertical'
				required
				hasAdditionalInfo
			>
				<DepositModule.SubModuleButtonGroup matchKey='paymentName'>
					{dataSource.map(item => {
						const { payName, displayChannelName, minAmount, maxAmount } = item
						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={displayChannelName}
								imgName={`${toLower(payName)}.png`}
								matchValue={payName}
								key={payName}
							>
								<div>{`${min} ~ ${max}`}</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			{selBank && (
				<DepositModule
					title={t('Label_BankInfo_SelectBank')}
					layout='horizontal'
					required
					hasAdditionalInfo
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{paymentOnlineBankInfoSysList.map(item => {
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
				<DepositModule title={t('Label_General_DepositAmount')} required>
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
						// * bonusCode 與 promoCode 擇一使用因此清空 promoCode
						setValue('bonusCode', String(value))
						setValue('promoCode', undefined)
					}}
				/>

				<InputBox
					className='inputBox-blue'
					register={register('promoCode')}
					placeholder={t('Label_Promotions_PromoCode') || ''}
					touched={!!touchedFields['promoCode']}
					onChange={() => {
						setValue('bonusCode', undefined)
					}}
				/>
			</DepositModule>

			<Form onSubmit={handleSubmit(onOnlineBankingFormSubmit)}>
				<div
					className='btnGroup'
					style={{ cursor: isValid ? 'pointer' : 'no-drop' }}
				>
					<button
						type='submit'
						style={{
							pointerEvents:
								isValid && watchAmount && !loading ? 'auto' : 'none',
						}}
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

export default OnlineBankingForm
