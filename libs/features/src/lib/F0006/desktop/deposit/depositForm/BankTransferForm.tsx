import classNames from 'classnames'
import { find, includes, isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
	DepositModule,
	Form,
	InputBox,
	Loading,
	Select,
} from '@nx-next-app/components/D0002'
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
		import(
			'@nx-next-app/features/F0006/desktop/history/modal/DepositBankSlipModal'
		),
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
		loading,
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
			{loading && <Loading />}
			<DepositModule
				title={t('Label_BankInfo_SelectBank')}
				layout='horizontal'
				required
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
			</DepositModule>
			{bankAccountInfo && (
				<DepositModule
					title={t('Label_General_BankAccount')}
					className='bankQR'
					required
				>
					<DepositModule.BankAccount
						bankName={bankAccountInfo.bankName}
						bankHref={bankAccountInfo.bankSite}
						accountName={bankAccountInfo.accountName}
						accountNumber={bankAccountInfo.accountNo}
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
			<DepositModule title={t('Label_Deposit_DepositChannel')} required>
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
				<DepositModule title={t('Label_General_BankDetails')} required>
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

					<div className='btnGroup'>
						<button
							className='btn-check'
							onClick={() => push(paths.bankInfo.root)}
						>
							+
						</button>
					</div>
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
			<Form onSubmit={handleSubmit(onBankTransferFormSubmit)}>
				{watchCanSubmit ? (
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
				) : (
					<div className='btnGroup'>
						<button className='btn-org' style={{ pointerEvents: 'none' }}>
							{t('Label_General_Pending')}
						</button>
					</div>
				)}
			</Form>
			<div className='text-center'>
				{t('Label_Deposit_ProcessingDescription')}
			</div>
		</>
	)
}

export default BankTransferForm
