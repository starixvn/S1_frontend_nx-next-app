import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { find, head, isUndefined } from 'lodash-es'
import {
	IAxiosError,
	IBankInfoData,
	IDeleteBankCardArgs,
	IDeleteEWalletCardArgs,
	IEWalletData,
	IGetExchangeInfoArgs,
	IUsdtDetailData,
	IWithdrawalAvailableBalanceData,
	IWithdrawalLimitData,
	IWithdrawalRecentInfoData,
	IWithdrawalSetting,
	IWithdrawalTypeEnum,
	useGetCustBankInfoQuery,
	useGetCustEWalletInfoQuery,
	useGetWithdrawalAvailableBalanceQuery,
	useGetWithdrawalLimitQuery,
	useLazyGetExchangeInfoQuery,
	useLazyKycCheckQuery,
	useSubmitCryptoWithdrawalMutation,
	useSubmitEWalletWithdrawalMutation,
	useSubmitWithdrawalMutation,
	useUploadCustPhotoMutation,
} from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	KycStatusEnum,
	WithdrawalBankCardEnum,
	WithdrawalPanelStatusEnum,
} from '@nx-next-app/features/F0001/types'
import { useTranslation } from 'next-i18next'
import { isConvert, numberFormat } from '@nx-next-app/utils'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useManageCards } from '@nx-next-app/features/F0001/providers/withdrawal-context/useManageCards'
import { useWithdrawalHistory } from '@nx-next-app/features/F0001/providers/withdrawal-context/useWithdrawalHistory'

const WithdrawalSuccessModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/withdrawal/modal/WithdrawalSuccessModal'
		),
	{ ssr: false }
)

const WithdrawalConfirmModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/withdrawal/components/modal/WithdrawalConfirmModal'
		),
	{ ssr: false }
)

interface IWithdrawalProviderProps {
	children: ReactNode
	withdrawalBlockSetting: IWithdrawalSetting[]
}

export type ISelectedBankInfo = {
	bankName?: string
	accountNo?: string
	sysId?: number
	ifscCode?: string
	usdtAddress?: string
	nickName?: string
	currencyId?: number
	network?: string
	currencyName?: string
	type: WithdrawalBankCardEnum
}

interface WithdrawalContextInterface {
	loading: boolean
	accountName: string
	withdrawalAmount: number
	amountForm: UseFormReturn<{ amount: number }>
	withdrawalType: WithdrawalBankCardEnum
	selectedBankInfo: ISelectedBankInfo
	withdrawalStatus: WithdrawalPanelStatusEnum
	kycStatus: KycStatusEnum
	bankData: {
		custEWalletInfo: IEWalletData[]
		bankInfoDetail: IBankInfoData[]
		usdtDetail: IUsdtDetailData[]
	}
	exchangeInfo: {
		exchangeRate: number
		exchangeAmount: number
	}
	withdrawalAllowed: {
		bankCardAllowed: boolean
		eWalletCardAllowed: boolean
		cryptoCardAllowed: boolean
	}
	// 這樣寫是為了表示 api response 本身存在 undefined 而非此資料為 optional
	withdrawalLimit: IWithdrawalLimitData | undefined
	withdrawalBalance: IWithdrawalAvailableBalanceData | undefined
	withdrawalRecentInfo: IWithdrawalRecentInfoData[]
	restoreAll: () => void
	checkAmount: () => void
	refetchWithdrawalBalance: () => void
	refetchWithdrawalRecentInfo: () => void
	handleUploadKyc: (file: File) => void
	handleWithdrawalConfirm: ({ amount }: { amount?: number }) => void
	handleCancelSubmit: () => void
	handleSubmitAmount: (amount: number) => void
	handleSelectCard: (bankInfo: ISelectedBankInfo) => void
	handleDeleteBankCard: (args: IDeleteBankCardArgs) => void
	handleAddCards: (type: WithdrawalBankCardEnum) => void
	cancelWithdrawal: (transId: string) => void
	handleDeleteEWalletCard: (args: IDeleteEWalletCardArgs) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const WithdrawalContext = createContext<WithdrawalContextInterface>(null!)

export const useWithdrawal = () => {
	return useContext(WithdrawalContext)
}

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

export const WithdrawalProvider = ({
	children,
	withdrawalBlockSetting,
}: IWithdrawalProviderProps) => {
	const { t } = useTranslation()
	const { pathname } = useRouter()
	const { modal, closeModal } = useGlobalModal()
	const { push } = useRouter()

	// 手機使用的，用來監測當前 path 來判斷 withdrawalType , 桌機用不到
	const withdrawalType = (() => {
		if (pathname === `${paths.eWalletWithdrawal.root}`)
			return WithdrawalBankCardEnum.EWallet
		if (pathname === `${paths.cryptoWithdrawal.root}`)
			return WithdrawalBankCardEnum.Crypto
		return WithdrawalBankCardEnum.LocalBank
	})()

	const {
		userInfo,
		auth: { isLogin },
	} = useAuth()
	const { currencyId } = userInfo

	const converted = isConvert(currencyId)

	// 當前選擇的卡片資訊
	const [selectedBankInfo, setSelectedBankInfo] = useState<ISelectedBankInfo>({
		type: WithdrawalBankCardEnum.Undefined,
	})
	// 出金金額暫存，桌機在 UI 轉換時需使用到
	const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0)
	// 桌機 UI 轉換時使用的狀態管理
	const [withdrawalStatus, setWithdrawalStatus] =
		useState<WithdrawalPanelStatusEnum>(WithdrawalPanelStatusEnum.Init)

	// 頁面 kyc 狀態
	const [kycStatus, setKycStatus] = useState<KycStatusEnum>(
		KycStatusEnum.Normal
	)

	// 手控 cryptoExchange 的值
	const [cryptoExchange, setCryptoExchange] = useState({
		exchangeRate: 0,
		exchangeAmount: 0,
	})

	// amount form instance
	const amountForm = useForm<{
		amount: number
	}>()

	/* <--Api--> */
	// 檢查 kyc
	const [kycCheck, { isLoading: isCheckKycLoading }] = useLazyKycCheckQuery()
	// kyc 上傳圖片
	const [uploadCustPhoto] = useUploadCustPhotoMutation()

	const {
		data: { data: withdrawalBalance } = {},
		isLoading: isGetWithdrawalAvailableBalanceLoading,
		refetch: refetchWithdrawalBalance,
	} = useGetWithdrawalAvailableBalanceQuery(null, {
		refetchOnMountOrArgChange: true,
	})

	const {
		data: { data: withdrawalLimit } = {},
		isFetching: isGetWithdrawalLimitLoading,
		refetch: refetchWithdrawalLimit,
	} = useGetWithdrawalLimitQuery(null)

	const {
		data: { data: custBankInfo } = {},
		isFetching: isCustBankInfoFetching,
		refetch: refetchCustBankInfo,
	} = useGetCustBankInfoQuery(undefined, { refetchOnMountOrArgChange: true })

	const {
		bankInfoDetail = [],
		uSDTDetail: usdtDetail = [],
		accountName = '',
	} = custBankInfo ?? {}

	const {
		data: { data: custEWalletInfo = [] } = {},
		isFetching: isCustEWalletInfoFetching,
		refetch: refetchEWalletInfo,
	} = useGetCustEWalletInfoQuery(null, { refetchOnMountOrArgChange: true })

	const [getExchangeInfo] = useLazyGetExchangeInfoQuery()

	const [submitWithdrawal] = useSubmitWithdrawalMutation()

	const [submitEWalletWithdrawal] = useSubmitEWalletWithdrawalMutation()

	const [submitCryptoWithdrawal] = useSubmitCryptoWithdrawalMutation()

	/* <--頁面資料初始化邏輯--> */
	const bankData = {
		custEWalletInfo,
		bankInfoDetail,
		usdtDetail,
	}

	/* <-- 判斷能否使用該出款方式 --> */
	// withdrawal 邏輯與 wallet 略有差異，故單獨撰寫
	const bankCardAllowed = !!find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.BankCard
	)?.status

	const eWalletCardAllowed =
		!!find(
			withdrawalBlockSetting,
			({ type }) => type === IWithdrawalTypeEnum.EWallet
		)?.status && !!withdrawalLimit?.eWalletStatus

	const cryptoCardAllowed = !!find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.Crypto
	)?.status

	const withdrawalAllowed = {
		bankCardAllowed,
		eWalletCardAllowed,
		cryptoCardAllowed,
	}

	/* <--用戶卡片管理邏輯--> */
	/* <--這裡刻意從此 context return 出去，使其保持同源並易於管理--> */
	const { handleAddCards, handleDeleteEWalletCard, handleDeleteBankCard } =
		useManageCards({ accountName, bankData })

	/* <--出金紀錄管理邏輯--> */
	/* <--這裡刻意從此 context return 出去，使其保持同源並易於管理--> */

	const {
		cancelWithdrawal,
		refetchWithdrawalRecentInfo,
		withdrawalRecentInfo,
		isGetWithdrawalRecentInfoLoading,
	} = useWithdrawalHistory()

	/* <-- CheckKyc Status --> */
	/* checkKyc function 必須對 kycStatus 進行狀態控制，因 kycStatus 必須保持在生命週期之內，才可以確保其他元件使用 kycStatus 時判斷正確，故撰寫於此 */
	const checkKyc = async () => {
		try {
			await kycCheck(null).unwrap()
			setKycStatus(KycStatusEnum.Normal)
		} catch (error) {
			if ((error as IAxiosError).errorCode === 1) {
				setKycStatus(KycStatusEnum.KycUpload)
				if (deviceType === DeviceTypeEnum.Mobile) {
					// 手機版要導轉至指定頁
					push(paths.kyc.root)
				}
			} else if ((error as IAxiosError).errorCode === 2) {
				setKycStatus(KycStatusEnum.KycPending)
				if (deviceType === DeviceTypeEnum.Mobile) {
					// 手機版要導轉至指定頁
					push(paths.kycWaiting.root)
				}
			} else {
				modal.error((error as Error)?.message)
			}
		}
	}

	// 上傳 kyc 圖片
	const handleUploadKyc = async (file: File) => {
		const formData = new FormData()
		formData.append('PhotoId', file)
		try {
			await uploadCustPhoto(formData).unwrap()
			await checkKyc()
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	/* <--資料初始化管理--> */
	const restoreAll = async () => {
		refetchWithdrawalBalance()
		refetchWithdrawalRecentInfo()
		refetchWithdrawalLimit()
		refetchCustBankInfo()
		refetchEWalletInfo()
		await checkKyc()
	}
	// 初始化暫存於前端的資料
	const handleInitData = () => {
		setSelectedBankInfo({ type: WithdrawalBankCardEnum.Undefined })
		setCryptoExchange({ exchangeRate: 0, exchangeAmount: 0 })
		setWithdrawalAmount(0)
	}

	// 初始化檢查用戶狀態，缺少資料則導去 Profile 頁面更新資料
	const checkUserInfo = () => {
		const { accountName, phoneNo, email } = userInfo
		if (isLogin) {
			if (
				(!accountName && !isUndefined(accountName)) ||
				(!phoneNo && !isUndefined(phoneNo)) ||
				(!email && !isUndefined(email))
			) {
				modal.confirm(t('Label_General_UpdatePersonalInfoWithdrawal'), {
					okText: t('Label_General_UpdatePersonalDetail'),
					onOK: () => {
						push(paths.profile.root)
					},
				})
			}
		}
	}

	/* <--出款邏輯--> */
	// 選卡片
	const handleSelectCard = (bankInfo: ISelectedBankInfo) => {
		setSelectedBankInfo(bankInfo)
	}

	// 檢查金額
	const checkAmount = async () => {
		const { trigger, getFieldState, getValues, setError } = amountForm
		await trigger('amount')
		const { error } = getFieldState('amount')
		// early return
		if (error) return

		const { type } = selectedBankInfo
		const {
			usdtList = [],
			eWalletWithdrawalMin = 0,
			withdrawalMin = 0,
			unlimited = false,
			eWalletWithdrawalAvailableAmount = 0,
			withdrawalAvailableAmount = 0,
		} = withdrawalLimit ?? {}

		const { availableBalance = 0 } = withdrawalBalance ?? {}

		let realWithdrawalMin: number
		const amount = getValues('amount')
		const isEWalletSelected = type === WithdrawalBankCardEnum.EWallet
		const realAmount = converted ? Number(amount) * 1000 : Number(amount)

		// 撈取真實的 withdrawalMin
		if (type === WithdrawalBankCardEnum.Crypto) {
			const { currencyId, network } = selectedBankInfo
			const cryptoInfo = find(
				usdtList,
				item => item.currencyId === currencyId && item.network === network
			)
			realWithdrawalMin = cryptoInfo?.withdrawalMin ?? 0
		} else {
			realWithdrawalMin = isEWalletSelected
				? eWalletWithdrawalMin
				: withdrawalMin
		}

		if (
			!unlimited &&
			isEWalletSelected &&
			realAmount > eWalletWithdrawalAvailableAmount
		) {
			// ewallet
			setError('amount', {
				type: 'notInLimit',
				message: t('Label_General_NotInLimit') ?? '',
			})
		} else if (!unlimited && realAmount > withdrawalAvailableAmount) {
			// localBank
			setError('amount', {
				type: 'dailyLimit',
				message: t('Label_Withdrawal_DailyReached') ?? '',
			})
		} else if (
			realAmount <= 0 ||
			(realWithdrawalMin !== 0 && realAmount < realWithdrawalMin)
		) {
			// 低於最小值
			setError('amount', {
				type: 'lessThanMin',
				message:
					t('Label_General_AmountLessThan', {
						value1: numberFormat(realWithdrawalMin, currencyId, 0),
					}) ?? '',
			})
		} else if (
			realWithdrawalMin !== 0 &&
			availableBalance !== 0 &&
			(realAmount > availableBalance || realAmount < realWithdrawalMin)
		) {
			// not in range
			setError('amount', {
				type: 'InsufficientBalance',
				message: `${numberFormat(realAmount, currencyId, 0)} ${t(
					'Label_Withdrawal_Insufficientbalance'
				)}`,
			})
		}
	}

	// crypto 卡片類型取得 exchange 資料
	const handleGetExchangeInfo = async ({
		amount,
		network,
		currencyName,
	}: IGetExchangeInfoArgs) => {
		try {
			const { data: exchangeInfo } = await getExchangeInfo({
				amount,
				network,
				currencyName,
			}).unwrap()
			const { rate: exchangeRate = 0, to_Amount: exchangeAmount = 0 } =
				exchangeInfo ?? {}
			setCryptoExchange({ exchangeRate, exchangeAmount })
			return { exchangeRate, exchangeAmount }
		} catch (error) {
			return { exchangeRate: 0, exchangeAmount: 0 }
		}
	}

	// 送出 amount 確認
	const handleSubmitAmount = async (amount: number) => {
		const { getFieldState } = amountForm
		// check
		await checkAmount()
		const { error } = getFieldState('amount')
		// error return
		if (error) return

		if (!selectedBankInfo.accountNo && !selectedBankInfo.usdtAddress) {
			modal.error(t('Label_Withdrawal_SelectBankRequired'))
			return
		}

		// state 暫存 amount
		setWithdrawalAmount(amount)

		// modal 彈窗生命週期問題，必須直接傳入正確內容
		let exchangeAmount = 0
		let exchangeRate = 0
		if (selectedBankInfo.type === WithdrawalBankCardEnum.Crypto) {
			// 需傳入真實金額
			const realAmount = converted ? Number(amount) * 1000 : Number(amount)
			const { network = '', currencyName = '' } = selectedBankInfo
			// return 出來的值供 mobile Modal 做使用
			const {
				exchangeAmount: responseExchangeAmount,
				exchangeRate: responseExchangeRate,
			} = await handleGetExchangeInfo({
				amount: realAmount,
				network,
				currencyName,
			})
			exchangeAmount = responseExchangeAmount
			exchangeRate = responseExchangeRate
		}

		// 桌機送到下一個確認畫面
		setWithdrawalStatus(WithdrawalPanelStatusEnum.Confirm)

		if (deviceType === DeviceTypeEnum.Mobile) {
			// 手機會跳彈窗
			// 避免層級混亂，Modal ( Layout 層 ) 所使用的資料均透過 props 正確傳遞
			// 因為 setState 生命週期緣故，故彈窗控制須在此處便傳入指定 amount , exchangeAmount ,exchangeRate 等資料，以維持資料正確性
			modal.open(
				<WithdrawalConfirmModal
					selectedBankInfo={selectedBankInfo}
					withdrawalAmount={amount}
					handleCancelSubmit={handleCancelSubmit}
					accountName={accountName}
					handleWithdrawalConfirm={() => {
						handleWithdrawalConfirm({ amount, exchangeAmount, exchangeRate })
						closeModal()
					}}
					exchangeAmount={exchangeAmount}
				/>
			)
		}
	}

	// 取消
	const handleCancelSubmit = () => {
		setWithdrawalStatus(WithdrawalPanelStatusEnum.Init)
		if (deviceType === DeviceTypeEnum.Mobile) {
			// H5
			closeModal()
		} else {
			// Desktop
			handleInitData()
		}
	}

	// 三方 blackBox , submit 要用
	const getBlackBox = async () => {
		let blackBox = ''
		if (
			typeof window !== undefined &&
			// 引入三方時 windows 必須 as any 斷言，否在編譯時無法正確載入 三方的 function 導致報錯
			typeof (window as any).IGLOO.getBlackbox === 'function'
		) {
			try {
				const result = await (window as any).IGLOO.getBlackbox()
				blackBox = result?.blackbox || ''
			} catch (e) {
				//
			}
		}

		return blackBox
	}

	// 送出 Amount -> backend
	const handleWithdrawalConfirm = async ({
		amount = withdrawalAmount,
		exchangeAmount = cryptoExchange.exchangeAmount,
		exchangeRate = cryptoExchange.exchangeRate,
	}: {
		amount?: number
		exchangeAmount?: number
		exchangeRate?: number
	}) => {
		const {
			type,
			accountNo = '',
			sysId = 0,
			ifscCode,
			usdtAddress = '',
			currencyId = 0,
		} = selectedBankInfo
		let target
		if (type === WithdrawalBankCardEnum.Crypto) {
			target = find(
				usdtDetail,
				item => item.usdtAddress === selectedBankInfo.usdtAddress
			)
		}
		if (target && target.disabled) return

		const blackbox = await getBlackBox()

		// 成功彈窗，手控初始化時機
		const onSuccess = () => {
			if (deviceType === DeviceTypeEnum.Desktop) {
				// 桌機才跳彈窗
				modal.open(
					<WithdrawalSuccessModal
						onClick={() => {
							setWithdrawalStatus(WithdrawalPanelStatusEnum.Init)
							restoreAll()
							handleInitData()
							closeModal()
						}}
					/>
				)
			} else {
				// 手機出金成功直接 reload 畫面
				setWithdrawalStatus(WithdrawalPanelStatusEnum.Init)
				restoreAll()
				handleInitData()
				closeModal()
			}
			// reset form
			amountForm.reset()
		}

		// 真實的金額
		const realAmount = converted ? Number(amount) * 1000 : Number(amount)

		try {
			if (type === WithdrawalBankCardEnum.LocalBank) {
				// local
				await submitWithdrawal({
					accountNo,
					amount: realAmount,
					sysId,
					blackbox,
					ifscCode,
				}).unwrap()
				onSuccess()
			}
			if (type === WithdrawalBankCardEnum.EWallet) {
				await submitEWalletWithdrawal({
					accountNo,
					amount: realAmount,
					sysId,
					memo: '',
					blackbox,
				}).unwrap()
				onSuccess()
			}

			if (type === WithdrawalBankCardEnum.Crypto) {
				await submitCryptoWithdrawal({
					accountNo: usdtAddress,
					amount: realAmount,
					currencyId,
					exchangeRate,
					exchangeAmount,
					blackbox,
				}).unwrap()
				onSuccess()
			}
		} catch (error) {
			if ((error as IAxiosError).errorCode === 2) {
				onSuccess()
			} else if ((error as IAxiosError).errorCode === -1) {
				// 實測這些狀態都會在前端被擋掉，但為求完整，還是先把這些移植過來。
				modal.error(
					`${t('Label_Withdrawal_RolloverOverError')}: ${
						(error as Error).message
					}`
				)
			} else if ((error as IAxiosError).errorCode === -2) {
				modal.error(
					`${t('Label_Withdrawal_DepositOverError')}: ${
						(error as Error).message
					}`
				)
			} else if ((error as IAxiosError).errorCode === -3) {
				// 這個 error 是秀數字,所以才 parseInt
				modal.error(
					`${t('Label_Withdrawal_WithdrawalOverError')}: ${parseInt(
						(error as Error).message,
						10
					).toString()}`
				)
			} else {
				modal.error((error as Error).message)
			}
		}
	}

	/* <-- loading state --> */
	const loading =
		isGetWithdrawalAvailableBalanceLoading ||
		isGetWithdrawalRecentInfoLoading ||
		isGetWithdrawalLimitLoading ||
		isCheckKycLoading

	const bankCardLoading = isCustBankInfoFetching || isCustEWalletInfoFetching

	/* <-- useEffect --> */

	useEffect(() => {
		// init check
		checkKyc()
		checkUserInfo()
	}, [])

	useEffect(() => {
		// h5 版本才需要的 effect , 初始化首選 card
		if (deviceType === DeviceTypeEnum.Mobile && !bankCardLoading) {
			// localBank 初始化
			// localBank 改成找第一個沒有 disabled 的選項
			const initLocalCard = () => {
				const headItem = find(bankInfoDetail, item => !item.disabled)
				if (headItem) {
					const { bankName, accountNo, sysId, ifscCode } = headItem
					handleSelectCard({
						bankName,
						accountNo,
						sysId,
						ifscCode,
						type: WithdrawalBankCardEnum.LocalBank,
					})
				}
			}
			// EWallet 初始化
			const initEWalletCard = () => {
				const headItem = head(custEWalletInfo)
				if (headItem) {
					const { eWalletName, accountNo, sysId } = headItem
					handleSelectCard({
						bankName: eWalletName,
						accountNo,
						sysId,
						type: WithdrawalBankCardEnum.EWallet,
					})
				}
			}

			// Crypto 初始化
			const initCryptoCard = () => {
				const headItem = head(usdtDetail)
				if (headItem) {
					const { usdtAddress, nickName, currencyId, network, currencyName } =
						headItem
					handleSelectCard({
						usdtAddress,
						nickName,
						currencyId,
						network,
						currencyName,
						type: WithdrawalBankCardEnum.Crypto,
					})
				}
			}

			switch (withdrawalType) {
				case WithdrawalBankCardEnum.LocalBank:
					initLocalCard()
					break
				case WithdrawalBankCardEnum.EWallet:
					initEWalletCard()
					break
				case WithdrawalBankCardEnum.Crypto:
					initCryptoCard()
					break
				default:
					break
			}
		}
	}, [pathname, bankCardLoading])

	const value: WithdrawalContextInterface = {
		loading,
		accountName,
		bankData,
		kycStatus,
		amountForm,
		withdrawalType,
		exchangeInfo: {
			exchangeRate: cryptoExchange.exchangeRate,
			exchangeAmount: cryptoExchange.exchangeAmount,
		},
		withdrawalAllowed,
		selectedBankInfo,
		withdrawalAmount,
		withdrawalStatus,
		withdrawalBalance,
		withdrawalLimit,
		withdrawalRecentInfo,
		refetchWithdrawalBalance,
		refetchWithdrawalRecentInfo,
		restoreAll,
		checkAmount,
		cancelWithdrawal,
		handleAddCards,
		handleUploadKyc,
		handleCancelSubmit,
		handleSubmitAmount,
		handleSelectCard,
		handleDeleteBankCard,
		handleDeleteEWalletCard,
		handleWithdrawalConfirm,
	}

	return (
		<WithdrawalContext.Provider value={value}>
			{children}
		</WithdrawalContext.Provider>
	)
}
