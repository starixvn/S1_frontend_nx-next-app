import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useAuth,
	IDepositMobilePayBankQRModalProps,
	IDepositLocalPayEWalletQRModalProps,
	useDepositSavedLocalStorage,
} from '@nx-next-app/data-access'
import { useDebounce } from 'usehooks-ts'
import {
	IAxiosError,
	IPaymentMobilePayData,
	IDepositCashierQRCodeInfo,
	useGetChannelMobilePayListQuery,
	usePostDepositLocalPayReqMutation,
	useLazyCheckDepositSpecialCodeQuery,
	useLazyGetDepositReqMobilePayInfoQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum, DepositActionModeEnum } from '@nx-next-app/types'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { find, head } from 'lodash-es'
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
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
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

	const { loading: contextLoading, refetchPaymentMobilePayList } =
		useDepositContext()

	const formMethods = useForm<IMobilePayForm>({ mode: 'all' })

	const { setValue, resetField } = formMethods

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

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. channelId = -1 (假渠道), fetch postDepositLocalPayReq 並打開 QRcode 彈窗
	// * 3. mode = 3，開啟 QR CODE modal
	// * 4. mode = 其他，window.open()
	// * 5. savedChecked = true 時記住銀行資訊
	const onMobilePayFormSubmit = async (values: IMobilePayForm) => {
		try {
			const {
				mode,
				amount = 0,
				groupName,
				channelId,
				channelName,
				bonusCode: originBonusCode = '',
				UPIPayAccount = '',
				promoCode,
			} = values
			const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

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

			const searchParams = new URLSearchParams({
				ChannelId: String(channelId),
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
				PayAccount: UPIPayAccount,
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
				const baseUrl = `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/${langId}/Cashier/DepositReqMobilePay`
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
		isGetChannelMobilePayListFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		if (!debouncedLoading && queryPaymentType) {
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

			const url = {
				pathname,
				query: {
					paymentType: queryPaymentType,
					paymentName: groupName,
					channelId,
				},
			}

			push(url, undefined, {
				shallow: true,
			})
		}
	}, [
		debouncedLoading,
		queryPaymentType,
		queryPaymentName,
		queryChannelId,
		isGetChannelMobilePayListFetching,
	])

	// * 初始優先導向 local storage 的值
	useEffect(() => {
		const { groupName, channelId } = depositLocalStorageSavedInfo

		push(
			{
				pathname,
				query: {
					paymentType: queryPaymentType,
					paymentName: groupName,
					channelId,
				},
			},
			undefined,
			{ shallow: true }
		)
	}, [])

	return {
		formMethods,
		loading: debouncedLoading,
		channelMobilePayList,
		onMobilePayFormSubmit,
	}
}

export { useMobilePayForm }
