import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import {
	IMobilePayForm,
	useAuth,
	useDepositContext,
	useMobilePayForm,
} from '@nx-next-app/data-access'
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
import Link from 'next/link'

const { IDR } = CurrenciesEnum

interface IMobilePayFormProps {
	dataSource: IPaymentMobilePayData[]
}

const DepositQRCodeModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/deposit/common/modal/DepositQRCodeModal'
		),
	{ ssr: false }
)

const DepositMobilePayEWalletQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/deposit/common/modal/DepositMobilePayEWalletQRModal'
		),
	{ ssr: false }
)

const DepositMobilePayBankQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/deposit/common/modal/DepositMobilePayBankQRModal'
		),
	{ ssr: false }
)

const MobilePayForm = ({ dataSource }: IMobilePayFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()
	const { getCustPromotionOptions, getBonusCodeIfExist } = useDepositContext()

	const {
		formMethods: {
			trigger,
			handleSubmit,
			setValue,
			watch,
			register,
			clearErrors,
			setError,
			formState: { touchedFields, errors, isValid },
		},
		custBankInfo,
		eWalletOptions,
		eWalletRequired,
		custEWalletList,
		bankCardOptions,
		bankCardRequired,
		bankCardOrEWalletRequired,
		channelMobilePayList = [],
		onMobilePayFormSubmit,
	} = useMobilePayForm({
		dataSource,
		onQRCodeModalCallback: values => {
			modal.open(<DepositQRCodeModal {...values} />, {
				className: 'dragonPayPop',
			})
		},
		onDepositMobilePayEWalletQRModalCallback: values => {
			modal.open(<DepositMobilePayEWalletQRModal {...values} />, {
				className: 'thiaPop',
			})
		},
		onDepositMobilePayBankQRModalCallback: values => {
			modal.open(<DepositMobilePayBankQRModal {...values} />, {
				className: 'duitnowPayPop',
			})
		},
	})

	const watchAmount = watch('amount') || 0
	const watchBonusCode = watch('bonusCode')
	const watchPayName = watch('payName')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchAmountRule = watch('amountRule')
	const watchGroupName = watch('groupName')
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

	// * 手機版邏輯：送出前打開確認彈窗
	const handleMobilePayFormSubmit = (values: IMobilePayForm) => {
		// * 如果需選擇 E-Wallet 但未選需跳錯誤提醒
		if (eWalletRequired && !watchCustEWalletAccount) {
			setError('custEWalletAccount', {
				message: t('Label_Withdrawal_SelectBankRequired') as string,
			})
			return
		}

		// * 如果需選擇銀行卡但未選需跳錯誤提醒
		if (bankCardRequired && !watchCustBankAccount) {
			setError('custBankAccount', {
				message: t('Label_Withdrawal_SelectBankRequired') as string,
			})
			return
		}

		const convertedAmount = isConvert(currencyId)
			? watchAmount * 1000
			: watchAmount

		modal.confirm(
			<>
				<p>{t('Label_Deposit_ConfirmDeposit')}</p>
				<img
					className='bankimg'
					src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/${toLower(
						watchGroupName
					)}.webp`}
					alt='img-bank-logo'
				/>
				<div>
					<span>{t('Label_General_DepositAmount')}：</span>{' '}
					{numberFormat(convertedAmount, currencyId, 0)}
				</div>
			</>,
			{
				footer: [
					<>
						<button className='btn-secondary' onClick={closeModal}>
							{t('Label_General_Cancel')}
						</button>
						<button
							className='btn-primary'
							onClick={() => {
								onMobilePayFormSubmit(values)
								closeModal()
							}}
						>
							{t('Label_General_Submit')}
						</button>
					</>,
				],
			}
		)
	}
	return (
		<div className='mobile-payform'>
			<DepositModule
				title={t('Label_Payment_Method')}
				depositTitle={t('Label_Payment_Method', { lng: 'en' })}
				required
				hasAdditionalInfo
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
				depositTitle={t('Label_Deposit_SelectChannel', { lng: 'en' })}
				required
				hasAdditionalInfo
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
				<DepositModule
					title='UPI'
					depositTitle={t('UPI', { lng: 'en' })}
					required
				>
					<div className='infoModule'>
						<InputBox
							icon=''
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
							infoMessage={t('Label_Deposit_UPIEtc') || ''}
						/>
					</div>
				</DepositModule>
			)}

			{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
				<DepositModule
					title={depositAmountText}
					depositTitle={depositAmountTextEng}
					required
				>
					<div className='infoModule'>
						<InputBox
							type='number'
							icon=''
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
									setValue(
										'bonusCode',
										String(getBonusCodeIfExist(value, watchBonusCode))
									)
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
									setValue(
										'bonusCode',
										String(getBonusCodeIfExist(value, watchBonusCode))
									)
									setValue('amount', value)
									trigger('amount')
								}}
							/>
						)}
					</div>
				</DepositModule>
			)}

			{(bankCardRequired || bankCardOrEWalletRequired) && (
				<DepositModule
					title={t('Label_Deposit_DepositChannel')}
					depositTitle={t('Label_Deposit_DepositChannel', { lng: 'en' })}
					required
				>
					<div className='infoModule'>
						<div className='group-dropdown'>
							<div className='inputBox-blue spacing-input-0'>
								<div className='dropdown'>
									<Select
										value={watchCustBankAccount}
										options={bankCardOptions}
										onChange={value => {
											if (bankCardOrEWalletRequired) {
												setValue('custEWalletAccount', undefined)
											}
											trigger('custBankAccount')
											setValue('custBankAccount', String(value))
											clearErrors('custBankAccount')
										}}
										errorMessage={errors['custBankAccount']?.message as string}
									/>
								</div>
							</div>
						</div>
						{custBankInfo.length < 3 && (
							<div className='btn-group'>
								<Link href={paths.bankInfo.root}>
									<a>
										<i className='icon  icon-add-fill' />
									</a>
								</Link>
							</div>
						)}
					</div>
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
					<div className='infoModule'>
						<div className='group-dropdown'>
							<div className='inputBox-blue spacing-input-0'>
								<div className='dropdown'>
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
										errorMessage={
											errors['custEWalletAccount']?.message as string
										}
									/>
								</div>
							</div>
						</div>

						{custEWalletList.length < 3 && (
							<div className='btn-group'>
								<Link href={paths.eWallet.root}>
									<a>
										<i className='icon  icon-add-fill' />
									</a>
								</Link>
							</div>
						)}
					</div>
					<div
						className={classNames('tip', {
							active: errors['custEWalletAccount'],
						})}
					>
						{errors['custEWalletAccount']?.message}
					</div>
				</DepositModule>
			)}

			<DepositModule
				title={t('Label_Deposit_ChooseAvailablePromotion')}
				depositTitle={t('Label_Deposit_ChooseAvailablePromotion', {
					lng: 'en',
				})}
			>
				<div className='infoModule'>
					<div className='group-dropdown'>
						<div className='inputBox-blue spacing-input-0'>
							<div className='dropdown'>
								<Select
									value={getBonusCodeIfExist(watchAmount, watchBonusCode)}
									options={getCustPromotionOptions(watchAmount)}
									onChange={value => {
										// * bonusCode 與 promoCode 擇一使用因此清空 promoCode
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

			<Form onSubmit={handleSubmit(handleMobilePayFormSubmit)}>
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
		</div>
	)
}

export default MobilePayForm
