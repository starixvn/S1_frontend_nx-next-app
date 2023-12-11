import classNames from 'classnames'
import { find, includes, isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
	DepositModule,
	Form,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import {
	useAuth,
	useDepositBankTransferForm,
	useDepositContext,
} from '@nx-next-app/data-access'
import { IPaymentBankTransferData } from '@nx-next-app/service'
import { DepositChannelIdEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
	revertNumberFormat,
} from '@nx-next-app/utils'

const DepositBankSlipModal = dynamic(
	() =>
		import('@nx-next-app/features/F0006/h5/history/modal/DepositBankSlipModal'),
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
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { DEPOSIT_CHANNEL_OPTIONS, promotionOptions } = useDepositContext()

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
		bankInfoDetail,
		bankInfoDetailOptions,
		onBankTransferFormSubmit,
	} = useDepositBankTransferForm({ dataSource })

	const watchAmount = watch('amount')
	const watchFromChannel = watch('fromChannel')
	const watchFromSysId = watch('fromSysId')
	const watchBonusCode = watch('bonusCode')
	const watchCanSubmit = watch('canSubmit')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchQrCodeUrl = watch('qrCodeUrl')
	const watchReceipt = watch('receipt')

	const convertedMinAmount = revertNumberFormat(watchMinAmount, currencyId) || 0

	const onOpenBankSlipModal = () => {
		if (bankAccountInfo?.bankName && bankAccountInfo?.bankSite) {
			modal.open(
				<DepositBankSlipModal
					defaultReceipt={watchReceipt}
					bankName={bankAccountInfo?.bankName}
					bankSite={bankAccountInfo?.bankSite}
					accountName={bankAccountInfo?.accountName}
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
			<DepositModule title={t('Label_BankInfo_SelectBank')} required>
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

						return (
							<DepositModule.SubModuleButton
								label={bankName}
								imgName={`square/${toLower(bankLogo)}`}
								matchValue={String(sysId)}
								key={sysId}
								canSubmit={canSubmit}
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

				{bankAccountInfo && (
					<DepositModule.BankAccount
						bankLogo={bankAccountInfo.bankLogo}
						bankName={bankAccountInfo.bankName}
						accountName={bankAccountInfo.accountName}
						accountNumber={bankAccountInfo.accountNo}
					/>
				)}

				{watchQrCodeUrl && <DepositModule.ScanQR qrCode={watchQrCodeUrl} />}

				<DepositModule
					title={t('Label_Deposit_DepositChannel')}
					className='infoModule'
					required
				>
					<Select
						value={Number(watchFromChannel)}
						placeholder={t('Label_Deposit_SelectChannel') || ''}
						options={DEPOSIT_CHANNEL_OPTIONS}
						onChange={value => {
							setValue('fromChannel', String(value))
						}}
					/>
				</DepositModule>

				{includes(
					[DepositChannelIdEnum.OnlineBanking, DepositChannelIdEnum.ATM],
					Number(watchFromChannel)
				) && (
					<DepositModule
						title={t('Label_General_BankDetails')}
						required
						className='selectModule inner'
					>
						<div className='infoModule parts active'>
							<Select
								value={watchFromSysId}
								placeholder={t('Label_BankInfo_SelectBank') || ''}
								options={bankInfoDetailOptions}
								onChange={value => {
									const { sysId: fromSysId, accountNo: fromAccountNum } =
										find(bankInfoDetail, {
											sysId: Number(value),
										}) ?? {}

									setValue('fromSysId', fromSysId)
									setValue('fromAccountNum', String(fromAccountNum))
								}}
							/>

							<div className='btn-group'>
								<a className='orange' onClick={() => push(paths.bankInfo.root)}>
									+
								</a>
							</div>
						</div>
					</DepositModule>
				)}

				<div className='btn-group'>
					<button onClick={onOpenBankSlipModal}>
						{t('Label_General_UploadReceipt')}
					</button>
				</div>
				{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
					<DepositModule
						title={t('Label_General_DepositAmount')}
						className='infoModule'
						required
					>
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
