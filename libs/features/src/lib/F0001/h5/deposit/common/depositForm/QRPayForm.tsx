import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import {
	IQRPayForm,
	useAuth,
	useDepositContext,
	useQRPayForm,
} from '@nx-next-app/data-access'
import { IPaymentQRPayData } from '@nx-next-app/service'
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

interface IQRPayFormProps {
	dataSource: IPaymentQRPayData[]
}

const DepositMobilePayBankQRModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/deposit/common/modal/DepositMobilePayBankQRModal'
		),
	{ ssr: false }
)

const QRPayForm = ({ dataSource }: IQRPayFormProps) => {
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
		channelQrPayList = [],
		onQRPayFormSubmit,
	} = useQRPayForm({
		dataSource,
		onDepositMobilePayBankQRModalCallback: values =>
			modal.open(<DepositMobilePayBankQRModal {...values} />, {
				className: 'duitnowPayPop',
			}),
	})

	const watchAmount = watch('amount') || 0
	const watchBonusCode = watch('bonusCode')
	const watchGroupName = watch('groupName')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	// * 手機版邏輯：送出前打開確認彈窗
	const handleQRPayFormSubmit = (values: IQRPayForm) => {
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
							onQRPayFormSubmit(values)
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
					{channelQrPayList.map(item => {
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

			<Form onSubmit={handleSubmit(handleQRPayFormSubmit)}>
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

export default QRPayForm
