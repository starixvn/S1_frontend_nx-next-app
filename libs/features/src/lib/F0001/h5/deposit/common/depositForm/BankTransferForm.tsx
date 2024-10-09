import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useAuth,
	useDepositBankTransferForm,
	useDepositContext,
} from '@nx-next-app/data-access'
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

const DepositBankSlipModal = dynamic(
	() =>
		import('@nx-next-app/features/F0001/h5/history/modal/DepositBankSlipModal'),
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
					accountNo={bankAccountInfo?.accountNo}
					code={bankAccountInfo?.code}
					onSubmit={({ transId, receipt }) => {
						if (receipt) setValue('receipt', receipt)
					}}
				/>
			)
		}
	}

	return (
		<>
			<DepositModule
				title={t('Label_BankInfo_SelectBank')}
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

				{bankAccountInfo && (
					<DepositModule.BankAccount
						bankLogo={bankAccountInfo.bankLogo}
						bankName={bankAccountInfo.bankName}
						accountName={bankAccountInfo.accountName}
						accountNumber={bankAccountInfo.accountNo}
						code={bankAccountInfo.code}
					/>
				)}

				{watchQrCodeUrl && <DepositModule.ScanQR qrCode={watchQrCodeUrl} />}

				<div className='infoModule'>
					<div className='btn-group'>
						<button onClick={onOpenBankSlipModal}>
							{t('Label_General_UploadReceipt')}
						</button>
					</div>
				</div>
				{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
					<DepositModule
						title={t('Label_General_DepositAmount')}
						className='infoModule'
						required
					>
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
						</div>
					</DepositModule>
				)}
			</DepositModule>

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
						onKeyDown={e => {
							if (e.key === 'Enter') {
								e.currentTarget.blur()
							}
						}}
					/>
				</div>
			</DepositModule>

			<Form onSubmit={handleSubmit(onBankTransferFormSubmit)}>
				{watchCanSubmit ? (
					<div className='btn-group'>
						<button
							type='submit'
							style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
							className={classNames({
								gray: !isFormValid,
								'btn-check': isFormValid,
							})}
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				) : (
					<div className='btn-group'>
						<button className='orange' style={{ pointerEvents: 'none' }}>
							{t('Label_General_Pending')}
						</button>
					</div>
				)}
			</Form>
		</>
	)
}

export default BankTransferForm
