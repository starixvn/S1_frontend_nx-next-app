import { useGlobalModal } from '@nx-next-app/components/config-provider'

import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import {
	IMobilePayForm,
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
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const { IDR } = CurrenciesEnum

interface IMobilePayFormProps {
	dataSource: IPaymentMobilePayData[]
}

const DepositQRCodeModal = dynamic(
	() =>
		import('@nx-next-app/features/F0002/h5/deposit/modal/DepositQRCodeModal'),
	{ ssr: false }
)

const DepositMobilePayEWalletQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0002/h5/deposit/modal/DepositMobilePayEWalletQRModal'
		),
	{ ssr: false }
)

const DepositMobilePayBankQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0002/h5/deposit/modal/DepositMobilePayBankQRModal'
		),
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
			formState: { touchedFields, errors, isValid },
		},
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

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const showShortcutList = watchAmountRule !== 3

	const showUPI = currencyId === CurrenciesEnum.INR && watchPayName === 'TenPay'

	const depositAmountText = `${t('Label_General_DepositAmount')} ${
		currencyId === IDR ? t('Label_Deposit_IDRAmountHint') : ''
	}`

	// * 手機版邏輯：送出前打開確認彈窗
	const handleMobilePayFormSubmit = (values: IMobilePayForm) => {
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
							onMobilePayFormSubmit(values)
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
			<DepositModule title={t('Label_Payment_Method')} required>
				<DepositModule.SubModuleButtonGroup matchKey='paymentName'>
					{dataSource.map(item => {
						const { groupName, minAmount, maxAmount } = item

						return (
							<DepositModule.SubModuleButton
								label={groupName}
								imgName={`${toLower(groupName)}.png`}
								matchValue={groupName}
								key={groupName}
							>
								<div>
									{t('Label_General_Min')}：
									{numberFormat(minAmount, currencyId, 0)}
								</div>
								<div>
									{t('Label_General_Min')}：
									{numberFormat(maxAmount, currencyId, 0)}
								</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			<DepositModule title={t('Label_Deposit_SelectChannel')} required>
				<DepositModule.SubModuleButtonGroup matchKey='channelId'>
					{channelMobilePayList.map(item => {
						const { channelId, channelName, minAmount, maxAmount } = item

						return (
							<DepositModule.SubModuleButton
								label={channelName}
								imgName={`${toLower(channelName)}.png`}
								matchValue={String(channelId)}
								key={channelId}
							>
								<div>
									{t('Label_General_Min')}：
									{numberFormat(minAmount, currencyId, 0)}
								</div>
								<div>
									{t('Label_General_Min')}：
									{numberFormat(maxAmount, currencyId, 0)}
								</div>
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
									value1: watchMinAmount,
									value2: watchMaxAmount,
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

						{showShortcutList && (
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
							gray: !isValid,
							orange: isValid,
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
