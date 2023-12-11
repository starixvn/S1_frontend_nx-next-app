import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
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
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
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
		onAutoDepositFormSubmit,
	} = useAutoDepositForm({
		dataSource,
	})

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const depositAmountText = `${t('Label_General_DepositAmount')} ${
		currencyId === IDR ? t('Label_Deposit_IDRAmountHint') : ''
	}`

	return (
		<>
			<DepositModule title={t('Label_BankInfo_SelectBank')} required>
				<DepositModule.SubModuleButtonGroup matchKey='sysId'>
					{dataSource.map(item => {
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

			{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
				<DepositModule title={depositAmountText} required>
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

export default AutoDepositForm
