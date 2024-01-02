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
	useQuickTransferForm,
} from '@nx-next-app/data-access'

import { IDepositQuickTransferData } from '@nx-next-app/service'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
	revertNumberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'react-i18next'

interface IQuickTransferFormProps {
	dataSource: IDepositQuickTransferData[]
}

const QuickTransferForm = ({ dataSource }: IQuickTransferFormProps) => {
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
			formState: { touchedFields, errors },
		},
		supportBanks,
		loading,
		isFormValid,
		onFormSubmit,
	} = useQuickTransferForm({ dataSource })

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	return (
		<>
			{loading && <Loading />}
			<DepositModule
				title={t('Label_Deposit_SelectChannel')}
				layout='vertical'
				required
			>
				<DepositModule.SubModuleButtonGroup matchKey='channelId'>
					{dataSource.map(item => {
						const { channelName, channelId, minAmount, maxAmount } = item

						return (
							<DepositModule.SubModuleButton
								label={channelName}
								imgName={`${toLower(channelName)}.png`}
								matchValue={String(channelId)}
								key={channelName}
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

			{supportBanks.length > 0 && (
				<DepositModule
					title={t('Label_BankInfo_SelectBank')}
					layout='horizontal'
					required
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{supportBanks.map(item => {
							const { sysId, bankName, minAmount, maxAmount } = item

							return (
								<DepositModule.SubModuleButton
									label={bankName}
									imgName={`square/${toLower(bankName)}.png`}
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

			<Form onSubmit={handleSubmit(onFormSubmit)}>
				<div className='btnGroup'>
					<button
						type='submit'
						style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
						className={classNames({
							darkGray: !isFormValid,
							'btn-check': isFormValid,
						})}
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			</Form>
		</>
	)
}

export default QuickTransferForm
