import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	useDepositContext,
	useQuickTransferForm,
} from '@nx-next-app/operations'
import { IDepositQuickTransferData } from '@nx-next-app/service'
import {
	generateShortcutList,
	isConvert,
	numFormatToDigits,
	numberFormat,
	revertNumberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { Form, InputBox, Select } from '../../common'
import DepositModule from '../ui/deposit-module'

interface IQQuickTransferFormProps {
	dataSource: IDepositQuickTransferData[]
}

const QuickTransferForm = ({ dataSource }: IQQuickTransferFormProps) => {
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
			formState: { touchedFields, errors },
		},
		supportBanks,
		isFormValid,
		onFormSubmit,
	} = useQuickTransferForm({ dataSource })

	const watchAmount = watch('amount') || 0
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	return (
		<>
			<DepositModule
				title={t('Label_Deposit_SelectChannel')}
				required
				hasAdditionalInfo
			>
				<DepositModule.SubModuleButtonGroup matchKey='channelId'>
					{dataSource.map(item => {
						const {
							channelName,
							displayChannelName,
							channelId,
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
								key={channelName}
							>
								<div>{`${min} ~ ${max}`}</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			{supportBanks.length > 0 && (
				<DepositModule
					title={t('Label_BankInfo_SelectBank')}
					required
					hasAdditionalInfo
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{supportBanks.map(item => {
							const { sysId, bankName, minAmount, maxAmount } = item
							const min = numberFormat(minAmount, currencyId, 0, false)
							const max = numberFormat(maxAmount, currencyId, 0, false)
							return (
								<DepositModule.SubModuleButton
									label={bankName}
									imgName={`square/${toLower(bankName)}.png`}
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

			<Form
				onSubmit={handleSubmit(values =>
					onFormSubmit(values, errorMessage => modal.error(errorMessage))
				)}
			>
				<div className='btn-group'>
					<button
						type='submit'
						style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
						className={classNames({
							'gray primary': !isFormValid,
							primary: isFormValid,
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
