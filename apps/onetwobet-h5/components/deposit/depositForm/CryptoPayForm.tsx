import { Form } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ICryptoForm, useAuth } from '@nx-next-app/data-access'
import { useCryptoPayForm, useDepositContext } from '@nx-next-app/operations'
import { IPaymentCryptoPayData } from '@nx-next-app/service'
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
import dynamic from 'next/dynamic'
import { InputBox, Select } from '../../common'
import DepositModule from '../ui/deposit-module'

interface ICryptoPayFormProps {
	dataSource: IPaymentCryptoPayData[]
}

const DepositQRCodeModal = dynamic(
	() => import('@12b-h5/components/deposit/modal/DepositQRCodeModal'),
	{ ssr: false }
)

const CryptoPayForm = ({ dataSource }: ICryptoPayFormProps) => {
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
		cryptoPaymentList,
		cryptoChannelList,
		onCryptoPayFormSubmit,
	} = useCryptoPayForm({
		dataSource,
		onQRCodeModalCallback: values =>
			modal.open(<DepositQRCodeModal {...values} />, {
				className: 'dragonPayPop',
			}),
	})
	const watchAmount = watch('amount') || 0
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchAmountRule = watch('amountRule')
	const watchChannelName = watch('channelName')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const showShortcutList = watchAmountRule !== 3

	// * 手機版邏輯：送出前打開確認彈窗
	const handleMobilePayFormSubmit = (values: ICryptoForm) => {
		const convertedAmount = isConvert(currencyId)
			? watchAmount * 1000
			: watchAmount

		modal.confirm(
			<>
				<p>{t('Label_Deposit_ConfirmDeposit')}</p>
				<img
					className='bankimg'
					src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/${toLower(
						watchChannelName
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
							onCryptoPayFormSubmit(values)
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
					{cryptoPaymentList.map(item => {
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
					{cryptoChannelList.map(item => {
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

					{showShortcutList && (
						<DepositModule.ShortcutList
							minAmount={watchMinAmount}
							maxAmount={watchMaxAmount}
							shortcut={Number(watchAmount)}
							shortcutList={generateShortcutList({
								minAmount: watchMinAmount,
								isConvert: false,
							})}
							onChange={value => {
								setValue('amount', value)
								trigger('amount')
							}}
						/>
					)}
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

export default CryptoPayForm
