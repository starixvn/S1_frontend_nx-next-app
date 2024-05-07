import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useAuth,
	IDepositQRCodeModalProps,
	useDepositSavedLocalStorage,
} from '@nx-next-app/data-access'
import { useBoolean, useDebounce } from 'usehooks-ts'
import {
	IPaymentOnlineBankingData,
	useGetPaymentCustBankInfoQuery,
	useGetPaymentOnlineBankInfoSysListQuery,
	useLazyCheckDepositSpecialCodeQuery,
	useLazyGetDepositOnlineBankingReqInfoQuery,
} from '@nx-next-app/service'
import {
	DepositActionModeEnum,
	DepositExtraDataTypeEnum,
} from '@nx-next-app/types'
import { every, find, head, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { useDepositContext } from './DepositContext'

export interface IOnlineBankingForm {
	amount?: number
	channelId?: number
	maxAmount?: number
	minAmount?: number
	mode?: DepositActionModeEnum
	payId?: number
	payName?: string
	sysId?: number
	bankId?: number
	bonusCode?: string
	promoCode?: string
	selBank?: boolean
	bankLogo?: string
	custBankAccount?: string
}

const useOnlineBankingForm = ({
	dataSource,
	onQRCodeModalCallback,
}: {
	dataSource: IPaymentOnlineBankingData[]
	onQRCodeModalCallback: (values: IDepositQRCodeModalProps) => void
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { value: isFirstEffect, toggle: toggleIsFirstEffect } = useBoolean(true)
	const {
		query: {
			paymentType: queryPaymentType,
			paymentName: queryPaymentName,
			sysId: querySysId,
			channelId: queryChannelId,
		},
		pathname,
		push,
	} = useRouter()

	const {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onSavedDepositLocalStorageSavedInfo,
	} = useDepositSavedLocalStorage()

	const formMethods = useForm<IOnlineBankingForm>({
		mode: 'all',
	})

	const { setValue, setError, resetField, getValues } = formMethods

	const {
		loading: contextLoading,
		refetchPaymentOnlineBankingList,
		handleYuriPurchaseClick,
	} = useDepositContext()

	const {
		data: { data: paymentOnlineBankInfoSysList = [] } = {},
		isFetching: isGetPaymentOnlineBankInfoSysListFetching,
	} = useGetPaymentOnlineBankInfoSysListQuery(
		{
			payId: getValues('payId'),
		},
		{ skip: !getValues('payId') }
	)

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const [
		getDepositOnlineBankingReqInfo,
		{ isFetching: isGetDepositOnlineBankingReqInfoFetching },
	] = useLazyGetDepositOnlineBankingReqInfoQuery()

	const {
		data: { data: custBankInfo = [] } = {},
		isFetching: isGetCustBankInfoFetching,
	} = useGetPaymentCustBankInfoQuery(
		{ channelId: Number(queryChannelId) },
		{ skip: !queryChannelId }
	)

	const bankCardOptions = custBankInfo
		.filter(({ disabled }) => !disabled)
		.map(({ bankName, accountNo }) => ({
			label: `${bankName} - ${accountNo}`,
			value: accountNo,
		}))

	const { extraDataType } =
		find(dataSource, { payName: String(queryPaymentName) }) ||
		head(dataSource) ||
		{}

	const bankCardRequired = extraDataType === DepositExtraDataTypeEnum.bankCard

	const loading =
		contextLoading ||
		isGetPaymentOnlineBankInfoSysListFetching ||
		isCheckDepositSpecialCodeFetching ||
		isGetDepositOnlineBankingReqInfoFetching ||
		isGetCustBankInfoFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. mode = 3，開啟 QR CODE modal
	// * 3. mode = 其他，window.open()
	// * 4. savedChecked = true 時記住銀行資訊
	const onOnlineBankingFormSubmit = (values: IOnlineBankingForm) => {
		handleYuriPurchaseClick()
		const {
			mode,
			sysId: bankSysId = 0,
			channelId,
			amount = 0,
			bonusCode: originBonusCode = '',
			promoCode,
			payName,
			custBankAccount,
		} = values

		// * 如果需選擇銀行卡但未選需跳錯誤提醒
		if (bankCardRequired && !custBankAccount) {
			setError('custBankAccount', {
				message: t('Label_Withdrawal_SelectBankRequired') as string,
			})
			return
		}

		const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

		const submit = async () => {
			try {
				let bonusCode: string = originBonusCode
				// * 如果有 promoCode，必須先透過 promoCode 來取得 bonusCode
				if (promoCode) {
					const { data } = await checkDepositSpecialCode({
						deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
						specialCode: promoCode,
					}).unwrap()
					if (data?.bonusCode) {
						bonusCode = data?.bonusCode
					}
				}

				// * 如果需要用戶提供銀行卡，則傳入該銀行卡的 sysId，否則傳入一般存款管道銀行 sysId
				let sysId = bankSysId
				if (bankCardRequired)
					sysId =
						find(custBankInfo, { accountNo: String(custBankAccount) })?.sysId ??
						0

				const errorUrl = `${dbHost}/404/index_${langId}.html`
				const searchParams = new URLSearchParams({
					sysId: String(sysId),
					payAccount: bankCardRequired ? String(custBankAccount) : '',
					channelId: String(channelId),
					amount: String(convertedAmount),
					bonusCode,
					errorUrl,
				})
				const paramsUrl = searchParams.toString()

				if (mode === DepositActionModeEnum.QrCode) {
					const { data: depositOnlineBankingReqInfo } =
						await getDepositOnlineBankingReqInfo({ langId, paramsUrl }).unwrap()

					onQRCodeModalCallback({
						title: t('LabelDepositType1'),
						convertedAmount,
						info: depositOnlineBankingReqInfo,
					})
				} else {
					const baseUrl = `${dbHost}/${langId}/Cashier/DepositReq`
					window.open(`${baseUrl}?${paramsUrl}`)
				}

				resetField('amount')
				scrollToTop()
				refetchPaymentOnlineBankingList()
				if (isDepositLocalStorageSavedChecked) {
					onSavedDepositLocalStorageSavedInfo({
						paymentType: queryPaymentType,
						payName,
						sysId,
					})
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		submit()
	}

	// * 任何選項異動時即時更新 form state
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading) return

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值

		// * 清空 amount
		resetField('amount')

		const {
			payName,
			payId,
			channelId,
			minAmount = 0,
			maxAmount = 0,
			mode,
			selBank = false,
		} = find(dataSource, { payName: String(queryPaymentName) }) ||
		head(dataSource) ||
		{}

		const {
			bankLogo,
			sysId,
			minAmount: selBankMinAmount = 0,
			maxAmount: selBankMaxAmount = 0,
		} = find(paymentOnlineBankInfoSysList, { sysId: Number(querySysId) }) ||
		head(paymentOnlineBankInfoSysList) ||
		{}

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		const convertMinAmount =
			(selBank ? selBankMinAmount : minAmount) /
			(isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount =
			(selBank ? selBankMaxAmount : maxAmount) /
			(isConvert(currencyId) ? 1000 : 1)

		setValue('payName', payName)
		setValue('payId', payId)
		setValue('sysId', sysId)
		setValue('channelId', channelId)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)
		setValue('mode', mode)
		setValue('selBank', selBank)
		setValue('bankLogo', bankLogo)

		let url = {
			pathname,
			query: {
				paymentType: queryPaymentType,
				paymentName: payName,
				sysId,
				channelId,
			},
		}

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值
		// * isFirstEffect: 設定過一次後將 isFirstEffect 由 true 變為 false
		// * isPrepared: url 都有值，才算準備好，如果進到 localStorage 裡要把初始值蓋過去
		const isPrepared = every([queryPaymentType, queryPaymentName])
		if (
			isPrepared &&
			isFirstEffect &&
			every([
				isDepositLocalStorageSavedChecked,
				!isEmpty(depositLocalStorageSavedInfo),
			])
		) {
			url = {
				pathname,
				query: {
					paymentType: queryPaymentType,
					paymentName: depositLocalStorageSavedInfo.payName,
					sysId: depositLocalStorageSavedInfo?.sysId,
					channelId: depositLocalStorageSavedInfo?.channelId,
				},
			}
			toggleIsFirstEffect()
		}

		push(url, undefined, { shallow: true })
	}, [debouncedLoading, queryPaymentType, queryPaymentName, querySysId])

	return {
		formMethods,
		loading: debouncedLoading,
		selBank: getValues('selBank'),
		paymentOnlineBankInfoSysList,
		custBankInfo,
		bankCardOptions,
		bankCardRequired,
		onOnlineBankingFormSubmit,
	}
}

export { useOnlineBankingForm }
