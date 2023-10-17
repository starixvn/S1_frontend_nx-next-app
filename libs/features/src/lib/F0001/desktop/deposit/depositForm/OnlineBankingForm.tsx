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

const DepositQRCodeModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/modal/DepositQRCodeModal'
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
			formState: { touchedFields, errors, isValid },
		},
		loading,
		selBank,
		paymentBankTransferList,
		onOnlineBankingFormSubmit,
	} = useOnlineBankingForm({
		dataSource,
		onQRCodeModalCallback: values =>
			modal.open(<DepositQRCodeModal {...values} />),
	})
	const watchAmount = watch('amount')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchBonusCode = watch('bonusCode')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	return (
		<>
			{loading && <Loading />}
			<DepositModule
				title={t('Label_Payment_Method')}
				layout='vertical'
				required
			>
				<DepositModule.SubModuleButtonGroup matchKey='paymentName'>
					{dataSource.map(item => {
						const { payName, minAmount, maxAmount } = item

						return (
							<DepositModule.SubModuleButton
								label={payName}
								imgName={`${toLower(payName)}.png`}
								matchValue={payName}
								key={payName}
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

			{selBank && (
				<DepositModule
					title={t('Label_BankInfo_SelectBank')}
					layout='horizontal'
					required
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{paymentBankTransferList.map(item => {
							const { bankName, bankLogo, minAmount, maxAmount, sysId } = item

							return (
								<DepositModule.SubModuleButton
									label={bankName}
									imgName={`square/${toLower(bankLogo)}`}
									matchValue={String(sysId)}
									key={sysId}
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
			)}

			{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
				<DepositModule title={t('Label_General_DepositAmount')} required>
					<div className='column' />
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

			<Form onSubmit={handleSubmit(onOnlineBankingFormSubmit)}>
				<div className='btnGroup'>
					<button
						type='submit'
						style={{ pointerEvents: isValid && !loading ? 'auto' : 'none' }}
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

export default OnlineBankingForm
