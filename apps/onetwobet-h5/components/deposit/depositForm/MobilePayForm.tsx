import { Form } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { IMobilePayForm, useAuth } from '@nx-next-app/data-access'
import { useDepositContext, useMobilePayForm } from '@nx-next-app/operations'
import { IPaymentMobilePayData } from '@nx-next-app/service'
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
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { InputBox, Select } from '../../common'
import DepositModule from '../ui/deposit-module'

const { IDR } = CurrenciesEnum

interface IMobilePayFormProps {
	dataSource: IPaymentMobilePayData[]
}

const DepositQRCodeModal = dynamic(
	() => import('@12b-h5/components/deposit/modal/DepositQRCodeModal'),
	{ ssr: false }
)

const DepositMobilePayEWalletQRModal = dynamic(
	() =>
		import('@12b-h5/components/deposit/modal/DepositMobilePayEWalletQRModal'),
	{ ssr: false }
)

const DepositMobilePayBankQRModal = dynamic(
	() => import('@12b-h5/components/deposit/modal/DepositMobilePayBankQRModal'),
	{ ssr: false }
)

const MobilePayForm = ({ dataSource }: IMobilePayFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()
	const { promotionOptions } = useDepositContext()

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
					)}.png`}
					alt='img-bank-logo'
				/>
				<div>
					<span>{t('Label_General_DepositAmount')}：</span>{' '}
					{numberFormat(convertedAmount, currencyId, 0)}
				</div>
			</>,
			{
				footer: [
					<button className='white' onClick={closeModal}>
						{t('Label_General_Cancel')}
					</button>,
					<button
						className='orange'
						onClick={() => {
							onMobilePayFormSubmit(values, errorMessage =>
								modal.error(errorMessage)
							)
							closeModal()
						}}
					>
						{t('Label_General_Submit')}
					</button>,
				],
			}
		)
	}
	return (
		<>
			<DepositModule
				title={t('Label_Payment_Method')}
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
					<div className='infoModule'>
						<InputBox
							icon='icon icon-pencil'
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
				<DepositModule title={depositAmountText} required>
					<div className='infoModule'>
						{!showShortcutList && (
							<InputBox
								type='number'
								icon='icon icon-pencil'
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
								infoMessage={
									t('Label_General_AmountLessThan', {
										value1: numberFormat(convertedMinAmount, currencyId, 0),
									}) || ''
								}
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
					</div>
				</DepositModule>
			)}

			{bankCardRequired && (
				<DepositModule title={t('Label_Deposit_DepositChannel')} required>
					<div className='infoModule'>
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
						{custBankInfo.length < 3 && (
							<div className='btn-group'>
								<Link href={paths.bankInfo.root}>
									<a>+</a>
								</Link>
							</div>
						)}
					</div>
				</DepositModule>
			)}

			{eWalletRequired && (
				<DepositModule title={t('Label_Deposit_DepositChannel')} required>
					<div className='infoModule'>
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
						{custEWalletList.length < 3 && (
							<div className='btn-group'>
								<Link href={paths.eWallet.root}>
									<a>+</a>
								</Link>
							</div>
						)}
					</div>
				</DepositModule>
			)}

			<DepositModule title={t('Label_Deposit_ChooseAvailablePromotion')}>
				<div className='infoModule'>
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
				<div className='btn-group'>
					<button
						type='submit'
						style={{ pointerEvents: isValid ? 'auto' : 'none' }}
						className={classNames({
							'gray primary': !isValid,
							primary: isValid,
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
