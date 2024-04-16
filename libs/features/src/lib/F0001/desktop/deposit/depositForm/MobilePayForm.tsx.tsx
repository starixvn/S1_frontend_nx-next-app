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
	useMobilePayForm,
} from '@nx-next-app/data-access'
import dynamic from 'next/dynamic'
import { IPaymentMobilePayData } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
	revertNumberFormat,
	limitedShortcutAmountList,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IMobilePayFormProps {
	dataSource: IPaymentMobilePayData[]
}

const { IDR } = CurrenciesEnum

const DepositQRCodeModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/modal/DepositQRCodeModal'
		),
	{ ssr: false }
)

const DepositMobilePayEWalletQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/modal/DepositMobilePayEWalletQRModal'
		),
	{ ssr: false }
)

const DepositMobilePayBankQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/modal/DepositMobilePayBankQRModal'
		),
	{ ssr: false }
)

const MobilePayForm = ({ dataSource }: IMobilePayFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { promotionOptions } = useDepositContext()

	const {
		loading,
		formMethods: {
			trigger,
			handleSubmit,
			setValue,
			watch,
			register,
			clearErrors,
			formState: { touchedFields, errors, isValid },
		},
		eWalletOptions,
		eWalletRequired,
		channelMobilePayList = [],
		bankCardOptions,
		bankCardRequired,
		onMobilePayFormSubmit,
	} = useMobilePayForm({
		dataSource,
		onQRCodeModalCallback: values =>
			modal.open(<DepositQRCodeModal {...values} />),
		onDepositMobilePayEWalletQRModalCallback: values =>
			modal.open(<DepositMobilePayEWalletQRModal {...values} />),
		onDepositMobilePayBankQRModalCallback: values =>
			modal.open(<DepositMobilePayBankQRModal {...values} />),
	})

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchPayName = watch('payName')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchAmountRule = watch('amountRule')
	const watchCustBankAccount = watch('custBankAccount')
	const watchCustEWalletAccount = watch('custEWalletAccount')
	const watchAmountList = watch('amountList')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const showShortcutList = watchAmountRule === 3

	const showUPI = currencyId === CurrenciesEnum.INR && watchPayName === 'TenPay'

	const depositAmountText = `${t('Label_General_DepositAmount')} ${
		currencyId === IDR ? t('Label_Deposit_IDRAmountHint') : ''
	}`

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
						const { groupName, minAmount, maxAmount } = item
						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={groupName}
								imgName={`${toLower(groupName)}.png`}
								matchValue={groupName}
								key={groupName}
							>
								<div>{`${min} ~ ${max}`}</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			<DepositModule
				title={t('Label_Deposit_SelectChannel')}
				layout='vertical'
				required
				hasAdditionalInfo
			>
				<DepositModule.SubModuleButtonGroup matchKey='channelId'>
					{channelMobilePayList.map(item => {
						const { channelId, channelName, minAmount, maxAmount } = item
						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={channelName}
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

			{showUPI && (
				<DepositModule title='UPI' required>
					<div className='column' />
					<InputBox
						className='inputBox-white'
						register={register('UPIPayAccount', {
							required: {
								value: true,
								message: t('Label_Deposit_PleaseEnterUPI'),
							},
						})}
						placeholder={t('Label_Deposit_EnterYourUPI') || ''}
						touched={!!touchedFields['UPIPayAccount']}
						errorMessage={errors['UPIPayAccount']?.message || ''}
						error={!!errors['UPIPayAccount']}
					/>
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
									value1: watchMinAmount,
									value2: watchMaxAmount,
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
					<div
						className={classNames('tip', {
							active: errors['custBankAccount'],
						})}
					>
						{errors['custBankAccount']?.message}
					</div>
				</DepositModule>
			)}

			{eWalletRequired && (
				<DepositModule title={t('Label_Deposit_DepositChannel')} required>
					<Select
						value={watchCustEWalletAccount}
						options={eWalletOptions}
						onChange={value => {
							trigger('custEWalletAccount')
							setValue('custEWalletAccount', String(value))
							clearErrors('custEWalletAccount')
						}}
						errorMessage={errors['custEWalletAccount']?.message as string}
					/>
					<div
						className={classNames('tip', {
							active: errors['custEWalletAccount'],
						})}
					>
						{errors['custEWalletAccount']?.message}
					</div>
				</DepositModule>
			)}

			<DepositModule title={t('Label_Deposit_ChooseAvailablePromotion')}>
				<Select
					value={watchBonusCode}
					options={promotionOptions}
					onChange={value => {
						// * bonusCode 與 promoCode 擇一使用因此清空 promoCode
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

			<Form onSubmit={handleSubmit(onMobilePayFormSubmit)}>
				<div className='btnGroup'>
					<button
						type='submit'
						style={{ pointerEvents: isValid ? 'auto' : 'none' }}
						className={classNames({
							darkGray: !isValid,
							'btn-check': isValid,
						})}
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			</Form>
		</>
	)
}

export default MobilePayForm
