import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import {
	// IOnlineBankingForm,
	useAuth,
	useDepositContext,
	useOnlineBankingForm,
} from '@nx-next-app/data-access'
import { IPaymentOnlineBankingData } from '@nx-next-app/service'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
	revertNumberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'

const DepositQRCodeModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/deposit/common/modal/DepositQRCodeModal'
		),
	{ ssr: false }
)

interface IOnlineBankingFormProps {
	dataSource: IPaymentOnlineBankingData[]
}

const OnlineBankingForm = ({ dataSource }: IOnlineBankingFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { promotionOptions } = useDepositContext()

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
	const watchAmount = watch('amount') || 0
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchBonusCode = watch('bonusCode')
	const watchCustBankAccount = watch('custBankAccount')
	// const watchBankLogo = watch('bankLogo')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	// * 手機版邏輯修正：直接另開視窗，沒有彈窗確認
	// const handleOnlineBankingFormSubmit = (values: IOnlineBankingForm) => {
	// 	const convertedAmount = isConvert(currencyId)
	// 		? watchAmount * 1000
	// 		: watchAmount

	// 	modal.confirm(
	// 		<>
	// 			<p>{t('Label_Deposit_ConfirmDeposit')}</p>
	// 			<img
	// 				className='bankimg'
	// 				src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/square/${toLower(
	// 					watchBankLogo
	// 				)}`}
	// 				alt='img-bank-logo'
	// 			/>
	// 			<div>
	// 				<span>{t('Label_General_DepositAmount')}：</span>{' '}
	// 				{numberFormat(convertedAmount, currencyId, 0)}
	// 			</div>
	// 		</>,
	// 		{
	// 			footer: [
	// 				<button className='white' onClick={closeModal}>
	// 					{t('Label_General_Cancel')}
	// 				</button>,
	// 				<button
	// 					className='orange'
	// 					onClick={() => {
	// 						onOnlineBankingFormSubmit(values)
	// 						closeModal()
	// 					}}
	// 				>
	// 					{t('Label_General_Submit')}
	// 				</button>,
	// 			],
	// 		}
	// 	)
	// }

	return (
		<>
			<DepositModule
				title={t('Label_Payment_Method')}
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
					required
					hasAdditionalInfo
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{paymentOnlineBankInfoSysList.map(item => {
							const { bankCode, bankLogo, minAmount, maxAmount, sysId } = item
							const min = numberFormat(minAmount, currencyId, 0, false)
							const max = numberFormat(maxAmount, currencyId, 0, false)
							return (
								<DepositModule.SubModuleButton
									label={bankCode}
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
					<div className='infoModule'>
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

						{/* // ! 加這行 tip 用來防止 InputBox 與 ShortcutList 跑版 */}
						<div className='tip' />

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

			<DepositModule title={t('Label_Deposit_ChooseAvailablePromotion')}>
				<div className='infoModule'>
					<Select
						value={watchBonusCode}
						options={promotionOptions}
						onChange={value => {
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

			<Form onSubmit={handleSubmit(onOnlineBankingFormSubmit)}>
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

export default OnlineBankingForm
