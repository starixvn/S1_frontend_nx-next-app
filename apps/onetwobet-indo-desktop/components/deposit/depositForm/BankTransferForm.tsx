import DepositModule from '@12b-indo-desktop/components/deposit/ui/deposit-module'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	useDepositBankTransferForm,
	useDepositContext,
} from '@nx-next-app/operations'
import { IPaymentBankTransferData } from '@nx-next-app/service'
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
import { Form, InputBox, Loading, Select } from '../../common'

const DepositBankSlipModal = dynamic(
	() =>
		import('@12b-indo-desktop/components/history/modal/DepositBankSlipModal'),
	{ ssr: false }
)

interface IBankTransferFormProps {
	dataSource: IPaymentBankTransferData[]
}

const BankTransferForm = ({ dataSource }: IBankTransferFormProps) => {
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
		loading,
		isFormValid,
		bankAccountInfo,
		onBankTransferFormSubmit,
	} = useDepositBankTransferForm({ dataSource })

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchCanSubmit = watch('canSubmit')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchQrCodeUrl = watch('qrCodeUrl')
	const watchReceipt = watch('receipt')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const onOpenBankSlipModal = () => {
		if (bankAccountInfo?.bankName) {
			modal.open(
				<DepositBankSlipModal
					defaultReceipt={watchReceipt}
					bankName={bankAccountInfo?.bankName}
					bankSite={bankAccountInfo?.bankSite}
					accountName={bankAccountInfo?.accountName}
					code={bankAccountInfo?.code}
					accountNo={bankAccountInfo?.accountNo}
					onSubmit={({ transId, receipt }) => {
						if (receipt) setValue('receipt', receipt)
					}}
				/>
			)
		}
	}

	return (
		<>
			{loading && <Loading />}
			<DepositModule
				title={t('Label_BankInfo_SelectBank')}
				layout='horizontal'
				required
				hasAdditionalInfo
			>
				<DepositModule.SubModuleButtonGroup matchKey='sysId'>
					{dataSource.map(item => {
						const {
							bankName,
							bankLogo,
							minAmount,
							maxAmount,
							sysId,
							canSubmit,
						} = item

						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={bankName}
								imgName={`square/${toLower(bankLogo)}`}
								matchValue={String(sysId)}
								key={sysId}
								canSubmit={canSubmit}
							>
								<div>{`${min} ~ ${max}`}</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			{bankAccountInfo && (
				<DepositModule
					title={t('Label_General_BankAccount')}
					className='bankQR'
					required
					hasAdditionalInfo
				>
					<DepositModule.BankAccount
						bankName={bankAccountInfo.bankName}
						bankHref={bankAccountInfo.bankSite}
						accountName={bankAccountInfo.accountName}
						accountNumber={bankAccountInfo.accountNo}
						code={bankAccountInfo.code}
						qrCode={watchQrCodeUrl}
					/>
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

			<DepositModule title={t('Label_General_SubmitBankSlip')} required>
				<DepositModule.BankSlipButton
					onClick={onOpenBankSlipModal}
					tip={t('Label_Deposit_SubmitBankSlipInfo')}
				>
					{t('Label_General_UploadReceipt')}
				</DepositModule.BankSlipButton>
			</DepositModule>
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
			<Form
				onSubmit={handleSubmit(values =>
					onBankTransferFormSubmit(values, errorMessage =>
						modal.error(errorMessage)
					)
				)}
			>
				{watchCanSubmit ? (
					<div className='btnGroup primary'>
						<button
							type='submit'
							style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
							className={classNames({
								darkGray: !isFormValid,
								'btn-check primary': isFormValid,
							})}
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				) : (
					<div className='btnGroup primary'>
						<button className='btn-org' style={{ pointerEvents: 'none' }}>
							{t('Label_General_Pending')}
						</button>
					</div>
				)}
			</Form>
			{!watchCanSubmit && (
				<div className='text-center' style={{ color: '#5574a7' }}>
					{t('Label_Deposit_ProcessingDescription')}
				</div>
			)}
		</>
	)
}

export default BankTransferForm
