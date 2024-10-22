import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import {
	useAuth,
	useDepositContext,
	useDigitalWalletForm,
} from '@nx-next-app/data-access'
import { IPayInfoDigitalWalletData } from '@nx-next-app/service'
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

interface IDigitalWalletFormProps {
	dataSource: IPayInfoDigitalWalletData[]
}

const DigitalWalletForm = ({ dataSource }: IDigitalWalletFormProps) => {
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
		onDigitalWalletFormSubmit,
		supportChannels,
	} = useDigitalWalletForm({ dataSource })

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	return (
		<>
			{supportChannels.length > 0 && (
				<DepositModule
					title={t('Label_Deposit_SelectChannel')}
					required
					hasAdditionalInfo
				>
					<DepositModule.SubModuleButtonGroup matchKey='channelId'>
						{supportChannels.map(item => {
							const {
								channelId,
								displayChannelName,
								channelName,
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

			<Form onSubmit={handleSubmit(onDigitalWalletFormSubmit)}>
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

export default DigitalWalletForm
