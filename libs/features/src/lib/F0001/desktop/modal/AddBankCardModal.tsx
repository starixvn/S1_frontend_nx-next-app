import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	Form,
	InputBox,
	ISelectProps,
	Select,
} from '@nx-next-app/components/D0001'
import {
	E_WALLET_SYSID,
	PAYMENT_BANK_ACCOUNT_REGEX,
	TOUCH_GO_REGEX,
} from '@nx-next-app/constants'

import { useAuth } from '@nx-next-app/data-access'
import { WrapperModal } from '@nx-next-app/features/F0001/desktop/modal/styles'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import {
	IBankInfoData,
	IEWalletData,
	IPaymentCustBankInfoData,
	IUsdtDetailData,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { find, head } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

interface IAddBankCardForm {
	sysId: number
	accountNo: string
	isfcCode: string
}

const AddBankCardModal = ({
	type,
	bankData,
	bankDropDown,
	onSubmitCard,
}: {
	type: WithdrawalBankCardEnum
	bankData: {
		custEWalletInfo?: IEWalletData[]
		bankInfoDetail?: IBankInfoData[] | IPaymentCustBankInfoData[]
		usdtDetail?: IUsdtDetailData[]
	}
	bankDropDown: ISelectProps['options']
	onSubmitCard: ({
		value,
		type,
	}: {
		value: {
			sysId: number
			accountNo: string
			isfcCode?: string
		}
		type: WithdrawalBankCardEnum
	}) => void
}) => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()
	const { accountName, currencyId } = userInfo

	const isLocal = type === WithdrawalBankCardEnum.LocalBank
	// 判斷是否顯示 isIf
	const isIfscRequired =
		type === WithdrawalBankCardEnum.LocalBank &&
		currencyId === CurrenciesEnum.INR

	const { bankInfoDetail, custEWalletInfo } = bankData ?? {}

	const {
		register,
		trigger,
		formState,
		getValues,
		setValue,
		reset,
		getFieldState,
		setError,
		handleSubmit,
	} = useForm<IAddBankCardForm>({
		defaultValues: {
			sysId: head(bankDropDown)?.value as number,
		},
	})
	const { touchedFields, errors } = formState
	const { closeModal } = useGlobalModal()

	const isTouchNGoIsValid =
		currencyId === CurrenciesEnum.MYR &&
		getValues('sysId') === E_WALLET_SYSID.TouchNGO

	const handleSelectBankCard = (sysId: ISelectProps['value']) => {
		const currentSysId = getValues('sysId')
		if (sysId !== currentSysId) {
			setValue('sysId', sysId as number)
		}
	}

	const checkAccountNo = async () => {
		await trigger('accountNo')
		const { error } = getFieldState('accountNo')
		if (error) return

		const { accountNo, sysId } = getValues()
		const isDuplicate = isLocal
			? find(
					bankInfoDetail,
					item => item.accountNo === accountNo && item.sysId === sysId
			  )
			: find(
					custEWalletInfo,
					item => item.accountNo === accountNo && item.sysId === sysId
			  )

		// 重複新增
		if (isDuplicate) {
			setError('accountNo', {
				type: 'duplicate',
				message: t('Label_Withdrawal_DuplicateBankAccount') ?? '',
			})
		}
	}

	const checkIsfcCode = async () => {
		await trigger('isfcCode')
		const { error } = getFieldState('isfcCode')
		if (error) return
		const { isfcCode } = getValues()
		// 長度不對
		if (isfcCode.length !== 11) {
			setError('isfcCode', {
				type: 'lengthError',
				message: t('Label_Withdrawal_IFSCCodeLength') ?? '',
			})
		}
	}

	const onSubmit = async (value: IAddBankCardForm) => {
		await checkAccountNo()
		if (isIfscRequired) {
			await checkIsfcCode()
		}
		// validate
		const { error: accountError } = getFieldState('accountNo')
		const { error: isfcCodeError } = getFieldState('isfcCode')

		if (accountError || isfcCodeError) return
		onSubmitCard({ type, value })
	}

	return (
		<WrapperModal>
			<div className='pop'>
				<div className='addBankpop active'>
					<i
						className='close-popup icon-close-line'
						onClick={() => {
							reset()
							closeModal()
						}}
					/>
					<span className='title'>
						{isLocal
							? t('Label_Withdrawal_AddBankAccount')
							: t('Label_Withdrawal_AddEAccount')}
					</span>
					<div className='slogan'>{t('Label_Withdrawal_UpdateBankInfo')}</div>
					<Form onSubmit={handleSubmit(onSubmit)}>
						{/* 經稽查，現在註冊強制需要輸入 realName , 原新增卡片欄位的 realName 欄位應沒可能再\出現 */}
						<div className='info-user inputBox-blue'>
							<div className='user-group'>
								<div>{t('Label_Withdrawal_BankAccountName')}</div>
								<div>{accountName}</div>
							</div>
						</div>
						<Select
							options={bankDropDown}
							placeholder=''
							onChange={sysId => handleSelectBankCard(sysId)}
							value={getValues('sysId')}
							defaultValue={head(bankDropDown)?.value as number}
						/>
						<InputBox
							register={register('accountNo', {
								required: {
									value: true,
									message: t('Label_Withdrawal_NeedAccountNo'),
								},
								minLength: {
									value: 8,
									message: t('Label_BankInfo_AccountLength'),
								},
								pattern: isTouchNGoIsValid
									? {
											value: TOUCH_GO_REGEX,
											message: t('Label_Withdrawal_TouchGo_Validation'),
									  }
									: {
											value: PAYMENT_BANK_ACCOUNT_REGEX,
											message: t('Label_BankInfo_AccountWrongFormat'),
									  },
								onBlur: checkAccountNo,
							})}
							title={
								isLocal
									? t('Label_Withdrawal_AccountNumber') ?? ''
									: t('Label_Withdrawal_EWalletAccountNumber') ?? ''
							}
							touched={!!touchedFields['accountNo']}
							error={!!errors['accountNo']}
							errorMessage={errors['accountNo']?.message}
							infoMessage={t('Label_Withdrawal_AccountNumber')}
						/>
						{isIfscRequired && (
							<InputBox
								register={register('isfcCode', {
									required: {
										value: true,
										message: t('Label_Withdrawal_PleaseEnterIFSCCode'),
									},
									onBlur: checkIsfcCode,
								})}
								title={t('Label_Withdrawal_IFSCCode') ?? ''}
								touched={!!touchedFields['isfcCode']}
								error={!!errors['isfcCode']}
								errorMessage={errors['isfcCode']?.message as string}
							/>
						)}
						<div className='btnGroup'>
							<button
								className='btn-secondary'
								onClick={() => {
									reset()
									closeModal()
								}}
							>
								{t('Label_General_Cancel')}
							</button>
							<button className='btn-primary' type='submit'>
								{t('Label_General_Submit')}
							</button>
						</div>
					</Form>
				</div>
			</div>
		</WrapperModal>
	)
}

export default AddBankCardModal
