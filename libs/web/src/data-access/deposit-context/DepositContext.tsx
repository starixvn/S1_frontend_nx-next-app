import { useAuth, IDepositSavedInfo } from '@nx-next-app/data-access'
import {
	useGetDepositPromotionListQuery,
	useGetPaymentBankTransferListQuery,
	useGetPaymentCryptoPayListQuery,
	useGetPaymentLinePayInfoQuery,
	useGetPaymentMobilePayListQuery,
	useGetPaymentOnlineBankingListQuery,
	useGetPaymentQRPayListQuery,
	useGetPaymentTopUpCardPayListQuery,
	IPaymentBankTransferData,
	IPaymentOnlineBankingData,
	IPaymentMobilePayData,
	IPaymentCryptoPayData,
	IPaymentLinePayInfo,
	IPaymentQRPayData,
	IPaymentTopUpCardPayData,
	useGetAutoDepositGroupListQuery,
	IPaymentAutoDepositData,
	useGetDepositQuickTransferQuery,
	IDepositQuickTransferData,
	useGetDepositChatTransferQuery,
	IDepositChatTransferData,
} from '@nx-next-app/service'
import {
	CurrenciesEnum,
	DepositPaymentEnum,
	DeviceTypeEnum,
	IDepositPaymentOption,
	SelectOptionType,
} from '@nx-next-app/types'
import { head, includes, isArray, isUndefined } from 'lodash-es'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import dynamic from 'next/dynamic'
import { ENV_LOCAL_STORAGE_NAMES, paths } from '@nx-next-app/constants'
import { OperaPixelTracker, MetaPixelTracker } from '@nx-next-app/utils'

const DesktopUpdateProfileModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/UpdateProfileModal'),
	{ ssr: false }
)

const H5UpdateProfileModal = dynamic(
	() => import('@nx-next-app/features/F0001/h5/modal/UpdateProfileModal'),
	{ ssr: false }
)

interface DepositContextInterface {
	DEPOSIT_PAYMENT_OPTIONS: {
		[DepositPaymentEnum.AutoDeposit]?: IDepositPaymentOption
		[DepositPaymentEnum.BankTransfer]?: IDepositPaymentOption
		[DepositPaymentEnum.LinePay]?: IDepositPaymentOption
		[DepositPaymentEnum.OnlineBanking]?: IDepositPaymentOption
		[DepositPaymentEnum.MobilePay]?: IDepositPaymentOption
		[DepositPaymentEnum.CryptoPay]?: IDepositPaymentOption
		[DepositPaymentEnum.QRPay]?: IDepositPaymentOption
		[DepositPaymentEnum.TopUpCardPay]?: IDepositPaymentOption
		[DepositPaymentEnum.QuickTransfer]?: IDepositPaymentOption
		[DepositPaymentEnum.ChatTransfer]?: IDepositPaymentOption
	}
	loading: boolean
	payments: {
		[DepositPaymentEnum.AutoDeposit]?: IPaymentAutoDepositData[]
		[DepositPaymentEnum.BankTransfer]?: IPaymentBankTransferData[]
		[DepositPaymentEnum.LinePay]?: IPaymentLinePayInfo
		[DepositPaymentEnum.OnlineBanking]?: IPaymentOnlineBankingData[]
		[DepositPaymentEnum.MobilePay]?: IPaymentMobilePayData[]
		[DepositPaymentEnum.CryptoPay]?: IPaymentCryptoPayData[]
		[DepositPaymentEnum.QRPay]?: IPaymentQRPayData[]
		[DepositPaymentEnum.TopUpCardPay]?: IPaymentTopUpCardPayData[]
		[DepositPaymentEnum.QuickTransfer]?: IDepositQuickTransferData[]
		[DepositPaymentEnum.ChatTransfer]?: IDepositChatTransferData[]
	}
	promotionOptions: SelectOptionType[]
	getCustPromotionOptions: (minAmount?: number) => SelectOptionType[] 
	refetchPaymentBankTransferList: () => void
	refetchPaymentOnlineBankingList: () => void
	refetchPaymentMobilePayList: () => void
	refetchPaymentCryptoPayList: () => void
	refetchPaymentQRPayList: () => void
	refetchPaymentTopUpCardPayList: () => void
	refetchPaymentAutoDepositList: () => void
	refetchDepositQuickTransfer: () => void
	refetchDepositChatTransfer: () => void
	handleDepositTracker: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DepositContext = createContext<DepositContextInterface>(null!)

export const useDepositContext = () => {
	return useContext(DepositContext)
}

interface IDepositProviderProps {
	children: ReactNode
	DEPOSIT_PAYMENT_OPTIONS: {
		[DepositPaymentEnum.AutoDeposit]?: IDepositPaymentOption
		[DepositPaymentEnum.BankTransfer]?: IDepositPaymentOption
		[DepositPaymentEnum.LinePay]?: IDepositPaymentOption
		[DepositPaymentEnum.OnlineBanking]?: IDepositPaymentOption
		[DepositPaymentEnum.MobilePay]?: IDepositPaymentOption
		[DepositPaymentEnum.CryptoPay]?: IDepositPaymentOption
		[DepositPaymentEnum.QRPay]?: IDepositPaymentOption
		[DepositPaymentEnum.TopUpCardPay]?: IDepositPaymentOption
		[DepositPaymentEnum.QuickTransfer]?: IDepositPaymentOption
		[DepositPaymentEnum.ChatTransfer]?: IDepositPaymentOption
	}

	// * 排序與開關
	depositPaymentOrders: DepositPaymentEnum[]
}

// * api 使用 isLoading 使初次 fetch  loading
// * 使用 refetch api 不使用 tags 的原因為：只會在特定 function 更新 refetch，並不需要跨組件更新狀態。
export const DepositProvider = ({
	children,
	DEPOSIT_PAYMENT_OPTIONS,
	depositPaymentOrders,
}: IDepositProviderProps) => {
	const { modal } = useGlobalModal()
	const { pathname, query, push } = useRouter()

	const {
		userInfo: { langId, currencyId, userName, accountName, phoneNo, email },
		auth: { isLogin },
	} = useAuth()

	// * 確保 userName 不是訪客
	if (!accountName) return null

	const {
		data: { data: paymentAutoDepositList = [] } = {},
		isLoading: isGetPaymentAutoDepositListLoading,
		refetch: refetchPaymentAutoDepositList,
	} = useGetAutoDepositGroupListQuery(undefined, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.AutoDeposit),
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: paymentBankTransferList = [] } = {},
		isLoading: isGetPaymentBankTransferListLoading,
		refetch: refetchPaymentBankTransferList,
	} = useGetPaymentBankTransferListQuery(undefined, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.BankTransfer),
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: paymentOnlineBankingList = [] } = {},
		isLoading: isGetPaymentOnlineBankingListLoading,
		refetch: refetchPaymentOnlineBankingList,
	} = useGetPaymentOnlineBankingListQuery(null, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.OnlineBanking),
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: paymentMobilePayList = [] } = {},
		isLoading: isGetPaymentMobilePayListLoading,
		refetch: refetchPaymentMobilePayList,
	} = useGetPaymentMobilePayListQuery(null, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.MobilePay),
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: paymentCryptoPayList = [] } = {},
		isLoading: isGetPaymentCryptoPayListLoading,
		refetch: refetchPaymentCryptoPayList,
	} = useGetPaymentCryptoPayListQuery(null, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.CryptoPay),
		refetchOnMountOrArgChange: true,
	})

	// * LinePay support THB only
	const {
		data: { data: paymentLinePayInfo } = {},
		isLoading: isGetPaymentLinePayInfoLoading,
	} = useGetPaymentLinePayInfoQuery(undefined, {
		skip: currencyId !== CurrenciesEnum.THB,
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: paymentQRPayList } = {},
		isLoading: isGetPaymentQRPayListLoading,
		refetch: refetchPaymentQRPayList,
	} = useGetPaymentQRPayListQuery(undefined, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.QRPay),
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: paymentTopUpCardPayList } = {},
		isLoading: isGetPaymentTopUpCardPayListLoading,
		refetch: refetchPaymentTopUpCardPayList,
	} = useGetPaymentTopUpCardPayListQuery(undefined, {
		skip: !includes(depositPaymentOrders, DepositPaymentEnum.TopUpCardPay),
		refetchOnMountOrArgChange: true,
	})

	const {
		data: depositQuickTransferResponse,
		isLoading: isGetDepositQuickTransferLoading,
		refetch: refetchDepositQuickTransfer,
	} = useGetDepositQuickTransferQuery()
	const quickTransferPayList =
		depositQuickTransferResponse?.data?.QuickTransfer?.data || []

	const {
		data: depositChatTransferResponse,
		isLoading: isGetDepositChatTransferLoading,
		refetch: refetchDepositChatTransfer,
	} = useGetDepositChatTransferQuery()
	const chatTransferPayList =
		depositChatTransferResponse?.data?.ChatTransfer?.data || []

	// * 用於 'Choose Available Promotion'
	const { data: { data: depositPromotionList = [] } = {} } =
		useGetDepositPromotionListQuery({ langId })

	// * 格式化成符合 SelectOptionType 的型態
	const promotionOptions: SelectOptionType[] = depositPromotionList.map(
		({ title, bonusCode }) => ({
			label: title,
			value: String(bonusCode),
		})
	)

	const getCustPromotionOptions = (minAmount?: number) => {
		if (!minAmount) {
			return promotionOptions
		}
		
		const custPromotionOptions = depositPromotionList.filter(
			option => option.tierAmountList.some(tierAmount => minAmount >= tierAmount.requiredAmount)
		)
		
		return custPromotionOptions.map(({ title, bonusCode }) => ({
			label: title,
			value: String(bonusCode),
		}))
	}

	const originPayments: DepositContextInterface['payments'] = {
		[DepositPaymentEnum.AutoDeposit]: paymentAutoDepositList,
		[DepositPaymentEnum.BankTransfer]: paymentBankTransferList,
		[DepositPaymentEnum.OnlineBanking]: paymentOnlineBankingList,
		[DepositPaymentEnum.MobilePay]: paymentMobilePayList,
		[DepositPaymentEnum.CryptoPay]: paymentCryptoPayList,
		[DepositPaymentEnum.LinePay]: paymentLinePayInfo,
		[DepositPaymentEnum.QRPay]: paymentQRPayList,
		[DepositPaymentEnum.TopUpCardPay]: paymentTopUpCardPayList,
		[DepositPaymentEnum.QuickTransfer]: quickTransferPayList,
		[DepositPaymentEnum.ChatTransfer]: chatTransferPayList,
	}

	const defaultSavedInfo = (useReadLocalStorage(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedInfo(userName)
	) || {}) as IDepositSavedInfo

	// * 依據 depositPaymentOrders 排序 && 沒資料會過濾掉
	const payments: DepositContextInterface['payments'] =
		depositPaymentOrders.reduce((acc, cur) => {
			const paymentData: object | any[] | undefined = originPayments[cur]

			if (!paymentData || (isArray(paymentData) && paymentData.length === 0))
				return acc

			return { ...acc, [cur]: paymentData }
		}, {})

	// 廣告商用的事件記錄器，綁在所有 deposit submit 底下
	const handleDepositTracker = () => {
		/* eslint no-underscore-dangle: 0 */
		if ((window as any)._yuri_track) {
			;(window as any)._yuri_track('Purchase')
		}

		// opera and meta pixel tracker
		OperaPixelTracker('deposit')
		MetaPixelTracker('depositSubmit')
	}

	const loading =
		isGetPaymentBankTransferListLoading ||
		isGetPaymentOnlineBankingListLoading ||
		isGetPaymentMobilePayListLoading ||
		isGetPaymentCryptoPayListLoading ||
		isGetPaymentLinePayInfoLoading ||
		isGetPaymentQRPayListLoading ||
		isGetPaymentTopUpCardPayListLoading ||
		isGetPaymentAutoDepositListLoading ||
		isGetDepositQuickTransferLoading ||
		isGetDepositChatTransferLoading

	const value: DepositContextInterface = {
		DEPOSIT_PAYMENT_OPTIONS,
		loading,
		payments,
		promotionOptions,
		getCustPromotionOptions,
		refetchPaymentBankTransferList,
		refetchPaymentOnlineBankingList,
		refetchPaymentMobilePayList,
		refetchPaymentCryptoPayList,
		refetchPaymentQRPayList,
		refetchPaymentTopUpCardPayList,
		refetchPaymentAutoDepositList,
		refetchDepositQuickTransfer,
		refetchDepositChatTransfer,
		handleDepositTracker,
	}

	// * 初始資料完後，設定默認 Deposit Payment
	useEffect(() => {
		if (loading) return
		const defaultPaymentType =
			defaultSavedInfo['paymentType'] ||
			query['paymentType'] ||
			head(Object.keys(payments))

		if (!query['paymentType']) {
			push(
				{ pathname, query: { paymentType: defaultPaymentType } },
				undefined,
				{ shallow: true }
			)
		}
	}, [loading, query['paymentType']])

	useEffect(() => {
		// 初始化檢查用戶狀態，缺少資料則導去 Profile 頁面更新資料
		const checkUserInfo = () => {
			const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])
			if (isLogin) {
				if (
					(!accountName && !isUndefined(accountName)) ||
					(!phoneNo && !isUndefined(phoneNo)) ||
					(!email && !isUndefined(email))
				) {
					if (deviceType === DeviceTypeEnum.Desktop) {
						modal.open(
							<DesktopUpdateProfileModal prevPage={paths.deposit.root} />
						)
					} else if (deviceType === DeviceTypeEnum.Mobile) {
						modal.open(<H5UpdateProfileModal prevPage={paths.deposit.root} />)
					}
				}
			}
		}

		checkUserInfo()
	}, [])

	return (
		<DepositContext.Provider value={value}>{children}</DepositContext.Provider>
	)
}
