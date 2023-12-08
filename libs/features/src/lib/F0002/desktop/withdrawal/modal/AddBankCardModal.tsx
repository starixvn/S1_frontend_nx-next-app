import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useForm } from 'react-hook-form'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0002/types'
import {
	Form,
	InputBox,
	ISelectProps,
	Select,
} from '@nx-next-app/components/D0002'
import { find, head } from 'lodash-es'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	IBankInfoData,
	IEWalletData,
	IUsdtDetailData,
} from '@nx-next-app/service'

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
		custEWalletInfo: IEWalletData[]
		bankInfoDetail: IBankInfoData[]
		usdtDetail: IUsdtDetailData[]
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
		<div className='pop'>
			<div className='addBankpop active'>
				<span className='title'>
					{isLocal
						? t('Label_Withdrawal_AddBankAccount')
						: t('Label_Withdrawal_AddEAccount')}
				</span>
				<div className='txt-lightgray'>
					{t('Label_Withdrawal_UpdateBankInfo')}
				</div>
				<Form onSubmit={handleSubmit(onSubmit)}>
					{/* 經稽查，現在註冊強制需要輸入 realName , 原新增卡片欄位的 realName 欄位應沒可能再\出現 */}
					<div className='txt'>
						<div>
							<span className='txt-blue'>
								{t('Label_Withdrawal_BankAccountName')}
							</span>
							<span>{accountName}</span>
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
							className='btn-cancel'
							onClick={() => {
								reset()
								closeModal()
							}}
						>
							{t('Label_General_Cancel')}
						</button>
						<button className='btn-check' type='submit'>
							{t('Label_General_Submit')}
						</button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default AddBankCardModal
