import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useAuth,
	IDepositMobilePayBankQRModalProps,
	IDepositLocalPayEWalletQRModalProps,
	useDepositSavedLocalStorage,
} from '@nx-next-app/data-access'
import { useBoolean, useDebounce } from 'usehooks-ts'
import {
	IAxiosError,
	IPaymentMobilePayData,
	IDepositCashierQRCodeInfo,
	useGetCustEWalletInfoQuery,
	useGetPaymentCustBankInfoQuery,
	useGetChannelMobilePayListQuery,
	usePostDepositLocalPayReqMutation,
	useLazyCheckDepositSpecialCodeQuery,
	useLazyGetDepositReqMobilePayInfoQuery,
} from '@nx-next-app/service'
import {
	CurrenciesEnum,
	DepositActionModeEnum,
	DepositExtraDataTypeEnum,
} from '@nx-next-app/types'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { every, find, head, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useDepositContext } from './DepositContext'

export interface IMobilePayForm {
	mode?: number
	amount?: number
	groupName?: string
	channelId?: number
	bonusCode?: string
	promoCode?: string
	UPIPayAccount?: string // * 顯示條件為 INR && payName = 'TenPay'
	minAmount?: number
	maxAmount?: number
	payName?: string | null
	channelName?: string
	amountRule?: number
	amountList?: number[] | null
	custEWalletAccount?: string
	custBankAccount?: string
}

const useMobilePayForm = ({
	dataSource,
	onQRCodeModalCallback,
	onDepositMobilePayEWalletQRModalCallback,
	onDepositMobilePayBankQRModalCallback,
}: {
	dataSource: IPaymentMobilePayData[]
	onQRCodeModalCallback: ({
		title,
		convertedAmount,
		info,
	}: {
		title: string
		convertedAmount: number
		info: IDepositCashierQRCodeInfo
	}) => void
	onDepositMobilePayEWalletQRModalCallback: (
		props: IDepositLocalPayEWalletQRModalProps
	) => void
	onDepositMobilePayBankQRModalCallback: (
		props: IDepositMobilePayBankQRModalProps
	) => void
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

	const {
		loading: contextLoading,
		refetchPaymentMobilePayList,
		handleYuriPurchaseClick,
	} = useDepositContext()

	const formMethods = useForm<IMobilePayForm>({ mode: 'all' })

	const { setValue, setError, resetField } = formMethods

	const { data: { data: custEWalletList = [] } = {} } =
		useGetCustEWalletInfoQuery(null)

	const {
		data: { data: custBankInfo = [] } = {},
		isFetching: isGetCustBankInfoFetching,
	} = useGetPaymentCustBankInfoQuery(
		{ channelId: Number(queryChannelId) },
		{ skip: !queryChannelId }
	)

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const [getDepositReqMobilePayInfo] = useLazyGetDepositReqMobilePayInfoQuery()

	const [
		postDepositLocalPayReq,
		{ isLoading: isPostDepositLocalPayReqLoading },
	] = usePostDepositLocalPayReqMutation()

	// * 當 groupId 已選擇才 call api
	const groupId = Number(
		find(dataSource, { groupName: String(queryPaymentName) })?.groupId
	)
	const {
		data: { data: channelMobilePayList = [] } = {},
		isFetching: isGetChannelMobilePayListFetching,
	} = useGetChannelMobilePayListQuery({ groupId }, { skip: !groupId })

	const selectedChannel = find(channelMobilePayList, {
		channelId: Number(queryChannelId),
	})

	const eWalletRequired =
		selectedChannel?.extraDataType === DepositExtraDataTypeEnum.eWallt

	const eWalletOptions = custEWalletList.map(({ eWalletName, accountNo }) => ({
		label: `${eWalletName} - ${accountNo}`,
		value: accountNo,
	}))

	const bankCardRequired =
		selectedChannel?.extraDataType === DepositExtraDataTypeEnum.bankCard

	const bankCardOptions = custBankInfo
		.filter(({ disabled }) => !disabled)
		.map(({ bankName, accountNo }) => ({
			label: `${bankName} - ${accountNo}`,
			value: accountNo,
		}))

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. channelId = -1 (假渠道), fetch postDepositLocalPayReq 並打開 QRcode 彈窗
	// * 3. mode = 3，開啟 QR CODE modal
	// * 4. mode = 其他，window.open()
	// * 5. savedChecked = true 時記住銀行資訊
	const onMobilePayFormSubmit = async (values: IMobilePayForm) => {
		handleYuriPurchaseClick()
		try {
			const {
				mode,
				amount = 0,
				groupName,
				channelId,
				channelName,
				custBankAccount,
				custEWalletAccount,
				bonusCode: originBonusCode = '',
				UPIPayAccount = '',
				promoCode,
			} = values
			const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

			// * 如果需選擇銀行卡但未選需跳錯誤提醒
			if (bankCardRequired && !custBankAccount) {
				setError('custBankAccount', {
					message: t('Label_Withdrawal_SelectBankRequired') as string,
				})
				return
			}

			// * 如果需選擇 E-Wallet 但未選需跳錯誤提醒
			if (eWalletRequired && !custEWalletAccount) {
				setError('custEWalletAccount', {
					message: t('Label_Withdrawal_SelectBankRequired') as string,
				})
				return
			}

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

			// * 如有 UPI 或 銀行卡 或 EWallet 需選擇，則需傳用戶 Account 進去，銀行卡 或 EWallet 會需要再傳 sysId
			let sysId = '0'
			let payAccount = UPIPayAccount
			if (eWalletRequired) {
				payAccount = String(custEWalletAccount)
				sysId = String(
					find(custEWalletList, { accountNo: String(payAccount) })?.sysId
				)
			} else if (bankCardRequired) {
				payAccount = String(custBankAccount)
				sysId = String(
					find(custBankInfo, { accountNo: String(payAccount) })?.sysId
				)
			}

			const errorUrl = `${dbHost}/404/index_${langId}.html`
			const searchParams = new URLSearchParams({
				ChannelId: String(channelId),
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
				PayAccount: payAccount,
				SysId: String(sysId),
				errorUrl,
			})
			const paramsUrl = searchParams.toString()

			if (
				channelId === -1 // * -1:假渠道
			) {
				const {
					data: { returnUrl, transId },
				} = await postDepositLocalPayReq({
					groupId,
					amount: convertedAmount,
					bonusCode,
				}).unwrap()

				if (currencyId === CurrenciesEnum.THB) {
					onDepositMobilePayEWalletQRModalCallback({
						convertedAmount,
						qrUrl: returnUrl,
						transId,
					})
				} else {
					onDepositMobilePayBankQRModalCallback({
						convertedAmount,
						qrUrl: returnUrl,
						channelName,
					})
				}
			} else if (mode === DepositActionModeEnum.QrCode) {
				const { data: depositReqMobilePayInfo } =
					await getDepositReqMobilePayInfo({ langId, paramsUrl }).unwrap()

				onQRCodeModalCallback({
					title: t('Label_DepositType2'),
					convertedAmount,
					info: depositReqMobilePayInfo,
				})
			} else {
				const baseUrl = `${dbHost}/${langId}/Cashier/DepositReq`
				window.open(`${baseUrl}?${paramsUrl}`)
			}

			resetField('amount')
			scrollToTop()
			refetchPaymentMobilePayList()
			if (isDepositLocalStorageSavedChecked) {
				onSavedDepositLocalStorageSavedInfo({
					paymentType: queryPaymentType,
					groupName,
					channelId,
				})
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage, message } = error as IAxiosError

			modal.error(rawMessage || message)
		}
	}

	const loading =
		contextLoading ||
		isCheckDepositSpecialCodeFetching ||
		isPostDepositLocalPayReqLoading ||
		isGetChannelMobilePayListFetching ||
		isGetCustBankInfoFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading && isGetChannelMobilePayListFetching) return
		// * 清空 amount
		resetField('amount')

		// * 有異動時即清空 UPIPayAccount 狀態 (因只會在特定情境出現)
		resetField('UPIPayAccount')

		const { mode, groupName } =
			find(dataSource, { groupName: String(queryPaymentName) }) ||
			head(dataSource) ||
			{}

		const {
			payName,
			channelId,
			channelName,
			minAmount = 0,
			maxAmount = 0,
			amountRule,
			amountList = [],
		} = find(channelMobilePayList, { channelId: Number(queryChannelId) }) ||
		head(channelMobilePayList) ||
		{}

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		const convertMinAmount = minAmount / (isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount = maxAmount / (isConvert(currencyId) ? 1000 : 1)

		setValue('mode', mode)
		setValue('channelId', channelId)
		setValue('groupName', groupName)
		setValue('channelName', channelName)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)
		setValue('payName', payName)
		setValue('amountRule', amountRule)
		setValue('amountList', amountList)

		let url = {
			pathname,
			query: {
				paymentType: queryPaymentType,
				paymentName: groupName,
				channelId,
			},
		}

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值
		// * isFirstEffect: 設定過一次後將 isFirstEffect 由 true 變為 false
		// * isPrepared: url 都有值，才算準備好，如果進到 localStorage 裡要把初始值蓋過去
		const isPrepared = every([
			queryPaymentType,
			queryPaymentName,
			queryChannelId,
		])
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
					paymentName: depositLocalStorageSavedInfo.groupName,
					channelId: depositLocalStorageSavedInfo.channelId,
				},
			}
			toggleIsFirstEffect()
		}

		push(url, undefined, { shallow: true })
	}, [
		debouncedLoading,
		isGetChannelMobilePayListFetching,
		queryPaymentType,
		queryPaymentName,
		queryChannelId,
	])

	return {
		formMethods,
		custBankInfo,
		eWalletOptions,
		custEWalletList,
		bankCardOptions,
		eWalletRequired,
		bankCardRequired,
		loading: debouncedLoading,
		channelMobilePayList,
		onMobilePayFormSubmit,
	}
}

export { useMobilePayForm }
