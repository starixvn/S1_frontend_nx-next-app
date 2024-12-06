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
import { useManageCards } from '@nx-next-app/features/F0001/providers/withdrawal-context/useManageCards'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { IPaymentMobilePayData } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
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

interface IMobilePayFormProps {
	dataSource: IPaymentMobilePayData[]
}

const { IDR } = CurrenciesEnum

const DepositQRCodeModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/common/modal/DepositQRCodeModal'
		),
	{ ssr: false }
)

const DepositMobilePayEWalletQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/common/modal/DepositMobilePayEWalletQRModal'
		),
	{ ssr: false }
)

const DepositMobilePayBankQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/common/modal/DepositMobilePayBankQRModal'
		),
	{ ssr: false }
)

const MobilePayForm = ({ dataSource }: IMobilePayFormProps) => {
	const {
		userInfo: { currencyId, accountName },
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { getCustPromotionOptions } = useDepositContext()

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
		custBankInfo,
		eWalletOptions,
		custEWalletList,
		eWalletRequired,
		bankCardOrEWalletRequired,
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

	const bankData = {
		bankInfoDetail: custBankInfo,
		custEWalletInfo: custEWalletList,
	}

	const { handleAddCards } = useManageCards({
		accountName: String(accountName),
		bankData,
	})

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchPayName = watch('payName')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchAmountRule = watch('amountRule')
	const watchAmountList = watch('amountList')
	const watchCustBankAccount = watch('custBankAccount')
	const watchCustEWalletAccount = watch('custEWalletAccount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const showShortcutList = watchAmountRule === 3

	const showUPI = currencyId === CurrenciesEnum.INR && watchPayName === 'TenPay'

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
			{loading && <Loading />}
			<DepositModule
				title={t('Label_Payment_Method')}
				layout='vertical'
				required
				hasAdditionalInfo
				depositTitle={t('Label_Payment_Method', {
					lng: 'en',
				})}
			>
				<DepositModule.SubModuleButtonGroup matchKey='paymentName'>
					{dataSource.map(item => {
						const { groupName, displayGroupName, minAmount, maxAmount } = item
						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={displayGroupName}
								imgName={`${toLower(groupName)}.webp`}
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
				depositTitle={t('Label_Deposit_SelectChannel', {
					lng: 'en',
				})}
			>
				<DepositModule.SubModuleButtonGroup matchKey='channelId'>
					{channelMobilePayList.map(item => {
						const {
							channelId,
							channelName,
							displayChannelName,
							minAmount,
							maxAmount,
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

			{showUPI && (
				<DepositModule title='UPI' required>
					<div className='column' />
					<InputBox
						className='inputBox-blue'
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
				<DepositModule
					title={depositAmountText}
					depositTitle={depositAmountTextEng}
					required
				>
					<div className='column' />
					{!showShortcutList && (
						<InputBox
							type='number'
							className='inputBox-blue'
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
				<DepositModule
					title={t('Label_Deposit_DepositChannel')}
					depositTitle={t('Label_Deposit_DepositChannel', { lng: 'en' })}
					required
				>
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
								className='btn-primary'
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

			{(eWalletRequired || bankCardOrEWalletRequired) && (
				<DepositModule
					title={t('Label_Deposit_DepositChannel')}
					depositTitle={t('Label_Deposit_DepositChannel', { lng: 'en' })}
					required
				>
					<div className='subModule-item'>
						<Select
							value={watchCustEWalletAccount}
							options={eWalletOptions}
							onChange={value => {
								if (bankCardOrEWalletRequired) {
									setValue('custBankAccount', undefined)
								}
								trigger('custEWalletAccount')
								setValue('custEWalletAccount', String(value))
								clearErrors('custEWalletAccount')
							}}
							errorMessage={errors['custEWalletAccount']?.message as string}
						/>
						{custEWalletList.length < 3 && (
							<div className='btnGroup'>
								<button
									className='btn-primary'
									onClick={() => handleAddCards(WithdrawalBankCardEnum.EWallet)}
								>
									+
								</button>
							</div>
						)}
						<div
							className={classNames('tip', {
								active: errors['custEWalletAccount'],
							})}
						>
							{errors['custEWalletAccount']?.message}
						</div>
					</div>
					<div className='subModule-item'>
						{bankCardOrEWalletRequired && (
							<>
								<Select
									value={watchCustBankAccount}
									options={bankCardOptions}
									onChange={value => {
										trigger('custBankAccount')
										clearErrors('custBankAccount')
										setValue('custBankAccount', String(value))
										setValue('custEWalletAccount', undefined)
									}}
									errorMessage={errors['custBankAccount']?.message as string}
								/>
								{custBankInfo.length < 3 && (
									<div className='btnGroup'>
										<button
											className='btn-primary'
											onClick={() =>
												handleAddCards(WithdrawalBankCardEnum.LocalBank)
											}
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
							</>
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

			<Form onSubmit={handleSubmit(onMobilePayFormSubmit)}>
				<div
					className='btnGroup'
					style={{ cursor: isValid ? 'pointer' : 'no-drop' }}
				>
					<button
						type='submit'
						style={{ pointerEvents: isValid && watchAmount ? 'auto' : 'none' }}
						className={classNames({
							'btn-disable': !(isValid && watchAmount),
							'btn-primary': isValid && watchAmount,
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
