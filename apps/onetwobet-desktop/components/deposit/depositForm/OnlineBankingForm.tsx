import DepositModule from '@12b-desktop/components/deposit/ui/deposit-module'
import { Form, Loading } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	useDepositContext,
	useManageCards,
	useOnlineBankingForm,
	type IAddBankCardModalProps,
} from '@nx-next-app/operations'
import { IPaymentOnlineBankingData } from '@nx-next-app/service'
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

const DepositQRCodeModal = dynamic(
	() => import('@12b-desktop/components/deposit/modal/DepositQRCodeModal'),
	{ ssr: false }
)

const AddBankCardModal = dynamic(() => import('../../modal/AddBankCardModal'), {
	ssr: false,
})

interface IOnlineBankingFormProps {
	dataSource: IPaymentOnlineBankingData[]
}

const OnlineBankingForm = ({ dataSource }: IOnlineBankingFormProps) => {
	const {
		userInfo: { currencyId, accountName },
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
		loading,
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

	const bankData = { bankInfoDetail: custBankInfo }

	const addBankCardModalCallBack = ({
		type,
		bankData,
		bankDropDown,
		onSubmitCard,
	}: IAddBankCardModalProps) => {
		modal.open(
			<AddBankCardModal
				type={type}
				bankData={bankData}
				bankDropDown={bankDropDown}
				onSubmitCard={onSubmitCard}
			/>
		)
	}

	const { handleAddBankCard } = useManageCards({
		accountName: String(accountName),
		bankData,
		addBankCardModalCallBack,
	})

	const watchAmount = watch('amount')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchBonusCode = watch('bonusCode')
	const watchCustBankAccount = watch('custBankAccount')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	return (
		<>
			{loading && <Loading />}
			<DepositModule
				title={t('Label_Payment_Method')}
				layout='vertical'
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
					layout='horizontal'
					required
					hasAdditionalInfo
				>
					<DepositModule.SubModuleButtonGroup matchKey='sysId'>
						{paymentOnlineBankInfoSysList.map(item => {
							const { bankName, bankLogo, minAmount, maxAmount, sysId } = item
							const min = numberFormat(minAmount, currencyId, 0, false)
							const max = numberFormat(maxAmount, currencyId, 0, false)
							return (
								<DepositModule.SubModuleButton
									label={bankName}
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
								value1: numFormatToDigits(watchMinAmount),
								value2: numFormatToDigits(watchMaxAmount),
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

			{bankCardRequired && (
				<DepositModule title={t('Label_Deposit_DepositChannel')} required>
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
					{custBankInfo.length < 3 && (
						<div className='btnGroup'>
							<button
								className='btn-check secondary'
								onClick={() =>
									handleAddBankCard({
										errorCallback: errorMessage => modal.error(errorMessage),
									})
								}
							>
								+
							</button>
						</div>
					)}
					<div
						className={classNames('tip', {
							active: errors['custBankAccount'],
						})}
					>
						{errors['custBankAccount']?.message}
					</div>
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

			<Form
				onSubmit={handleSubmit(values =>
					onOnlineBankingFormSubmit(values, errorMessage =>
						modal.error(errorMessage)
					)
				)}
			>
				<div className='btnGroup primary'>
					<button
						type='submit'
						style={{ pointerEvents: isValid && !loading ? 'auto' : 'none' }}
						className={classNames({
							darkGray: !isValid,
							'btn-check primary': isValid,
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
