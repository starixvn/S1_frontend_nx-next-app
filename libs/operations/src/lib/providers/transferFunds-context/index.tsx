import { ISelectProps } from '@nx-next-app/components/D0001'
import {
	AutoTrasferStatusEnum,
	CURRENCY_TO_TIMEZONE,
	TransferTypeEnum,
	TransferWalletTpId,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import {
	IMainWalletInfoData,
	ITpWalletInfoData,
	ITransferArgs,
	ITransferHistoryData,
	useGetTransferRecentQuery,
	useGetWalletTransferStatusQuery,
	useLazyGetMainWalletInfoQuery,
	useLazyGetTpWalletInfoByTpIdQuery,
	useSetWalletTransferStatusMutation,
	useTransferMutation,
} from '@nx-next-app/service'
import { isConvert } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { ReactNode, createContext, useContext, useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'

interface IForm {
	walletFrom?: number
	walletTo?: number
	amount?: number
}

type TErrorCallback = (message: string) => void

type TransferModalCallback = (
	turnover: number,
	rollover: number,
	percentage: number
) => void

interface ITransferFundsContext {
	loading: boolean
	isTransferLoading: boolean
	isFormValid: boolean
	timezone: string
	maxAmount: number | undefined
	walletOptions: ISelectProps['options']
	isAutoTransfer: boolean
	transferHistory: ITransferHistoryData[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formMethods: UseFormReturn<IForm, any, undefined>
	mainWalletInfo?: IMainWalletInfoData
	tpWalletBalanceList: ITpWalletInfoData[]
	onRefetchAllWallet: () => Promise<void>
	handleTransfer: (args: ITransferArgs) => Promise<boolean>
	getConvertedTime: (time: string) => dayjs.Dayjs

	handleSubmitForm: (
		selectSendingWalletCallback: () => void,
		selectReceivingWalletCallback: () => void,
		transferModalCallback: (
			turnover: number,
			rollover: number,
			percentage: number
		) => void,
		errorCallback: TErrorCallback
	) => void

	handleCheckAmount: () => void
	handleSelectWallet: ({
		tpId,
		wallet,
	}: {
		tpId: ISelectProps['value']
		wallet: 'walletFrom' | 'walletTo'
	}) => void
	handleRestoreAll: (args: { walletTpId: number }) => void
	handleSetMaxAmount: (walletId: number) => void
	handleGetMainWalletInfo: (
		modalErrorCallback: (message: string) => void
	) => void
	handleGetTransferRecent: () => void
	handleAutoTransferStatus: (
		confirmCallBack: () => void,
		errorCallback: TErrorCallback
	) => void

	handleGetTpWalletInfoByTpId: (
		errorCallback: TErrorCallback,
		tpId: number
	) => void
}

const TransferFundsContext = createContext<ITransferFundsContext>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useTransferFunds = () => useContext(TransferFundsContext)

export const TransferFundsProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const { t } = useTranslation()

	const formMethods = useForm<IForm>()

	const {
		watch,
		trigger,
		setValue,
		setError,
		getValues,
		resetField,
		formState: { isValid },
	} = formMethods
	const watchWalletFrom = watch('walletFrom')
	const watchWalletTo = watch('walletTo')

	// * 轉成字串防止 value 為 0 影響邏輯
	const isFormValid = Boolean(
		String(watchWalletFrom) && String(watchWalletTo) && isValid
	)

	const [isTransferLoading, setIsTransferLoading] = useState<boolean>(false)
	const [maxAmount, setMaxAmount] = useState<number | undefined>()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const { mainWalletInfo, tpWalletBalanceList, onRefetchAllWallet } =
		useTpWalletBalanceListFetcher({ langId })

	const {
		data: { data: transferHistory = [] } = {},
		refetch: getTransferRecent,
	} = useGetTransferRecentQuery()

	const {
		data: { data: autoTransferStatus } = {},
		isFetching: isGetWalletTransferStatusFetching,
	} = useGetWalletTransferStatusQuery()

	const [transfer] = useTransferMutation()
	const [getMainWalletInfo, { isFetching: isGetMainWalletInfoFetching }] =
		useLazyGetMainWalletInfoQuery()
	const [
		getTpWalletInfoByTpId,
		{ isFetching: isGetTpWalletInfoByTpIdFetching },
	] = useLazyGetTpWalletInfoByTpIdQuery()
	const [
		setWalletAutoTransferStatus,
		{ isLoading: isSeWalletAutoTransferStatusLoading },
	] = useSetWalletTransferStatusMutation()

	const tpWalletOption = tpWalletBalanceList.map(({ tpId, tpName }) => ({
		value: tpId,
		label: tpName,
	}))

	const walletOptions = [
		{
			value: TransferWalletTpId.mainWallet,
			label: t('Label_Wallet_MainWallet'),
		},
		...tpWalletOption,
	]

	const timezone = CURRENCY_TO_TIMEZONE[currencyId]

	const getConvertedTime = (time: string) => dayjs(time).utcOffset(timezone)

	// used in desktop / h5
	const handleAutoTransferStatus = (
		confirmCallBack: () => void,
		errorCallback: TErrorCallback
	) => {
		const setStatus = async () => {
			const status =
				Number(autoTransferStatus) === AutoTrasferStatusEnum.open
					? AutoTrasferStatusEnum.close
					: AutoTrasferStatusEnum.open

			try {
				await setWalletAutoTransferStatus({
					autoTransfer: status,
				})
			} catch (error) {
				errorCallback((error as Error).message)
			}
		}

		if (Number(autoTransferStatus) === AutoTrasferStatusEnum.close) {
			confirmCallBack()
		} else {
			setStatus()
		}
	}

	const handleRestoreAll = async ({ walletTpId }: { walletTpId: number }) => {
		if (walletTpId === TransferWalletTpId.mainWallet) {
			await Promise.all(
				tpWalletBalanceList
					.filter(({ balance }) => balance !== 0)
					.map(({ balance, tpId }) =>
						handleTransfer({
							amount: balance,
							toTpId: TransferWalletTpId.mainWallet,
							fromTpId: tpId,
							transferAction: TransferTypeEnum.restoreAll,
							langId,
						})
					)
			)
		} else {
			if (mainWalletInfo?.balance && mainWalletInfo.balance !== 0) {
				await handleTransfer({
					amount: mainWalletInfo.balance,
					toTpId: walletTpId,
					fromTpId: TransferWalletTpId.mainWallet,
					transferAction: TransferTypeEnum.restoreAll,
					langId,
				})
			}

			await Promise.all(
				tpWalletBalanceList
					.filter(({ tpId, balance }) => balance !== 0 || tpId !== walletTpId)
					.map(({ balance, tpId }) =>
						handleTransfer({
							amount: balance,
							toTpId: walletTpId,
							fromTpId: tpId,
							transferAction: TransferTypeEnum.restoreAll,
							langId,
						})
					)
			)
		}

		onRefetchAllWallet()
	}

	// used in desktop
	const handleGetTransferRecent = async () => {
		try {
			await getTransferRecent().unwrap()
		} catch (error) {
			// 減少 modal 使用數量，拔除非必要錯誤彈窗
			console.error('getTransferRecent(): ', (error as Error).message)
			// modal.error((error as Error).message)
		}
	}

	// used in h5
	const handleGetTpWalletInfoByTpId = async (
		errorCallback: TErrorCallback,
		tpId: number
	) => {
		try {
			await getTpWalletInfoByTpId(tpId).unwrap()
		} catch (error) {
			errorCallback((error as Error).message)
			// modal.error((error as Error).message)
		}
	}

	// used in h5
	const handleGetMainWalletInfo = async (errorCallback: TErrorCallback) => {
		try {
			await getMainWalletInfo(null).unwrap()
		} catch (error) {
			errorCallback((error as Error).message)
			// modal.error((error as Error).message)
		}
	}

	const handleSetMaxAmount = (walletId: number) => {
		let amount
		if (walletId === TransferWalletTpId.mainWallet) {
			amount = mainWalletInfo?.balance
		} else {
			amount = tpWalletBalanceList.find(
				({ tpId }) => tpId === walletId
			)?.balance
		}
		setMaxAmount(amount)
	}

	const handleSelectWallet = ({
		tpId,
		wallet,
	}: {
		tpId: ISelectProps['value']
		wallet: 'walletFrom' | 'walletTo'
	}) => {
		const otherSideWallet = wallet === 'walletFrom' ? 'walletTo' : 'walletFrom'

		if (getValues(otherSideWallet) === tpId) {
			setValue(otherSideWallet, undefined)
		}

		setValue(wallet, Number(tpId))
	}

	const handleCheckAmount = async () => {
		await trigger('amount')

		const { amount } = getValues()

		if (amount && amount < 1) {
			setError('amount', {
				message: t('Label_General_AmountLessThan', { value1: 1 }) as string,
			})
		}
	}

	// 註解暫時保留原本的modal error訊息

	const handleSubmitForm = async (
		selectSendingWalletCallback: () => void,
		selectReceivingCallback: () => void,
		transferModalCallback: TransferModalCallback,
		errorCallback: TErrorCallback
	) => {
		const { amount, walletTo, walletFrom } = getValues()

		const success = await handleTransfer({
			amount: isConvert(currencyId) ? Number(amount) * 1000 : Number(amount),
			toTpId: walletTo,
			fromTpId: walletFrom,
			transferAction: TransferTypeEnum.transfer,
			langId,
			selectSendingWalletCallback,
			selectReceivingCallback,
			transferModalCallback,
			errorCallback,
		})

		if (success) {
			// 如果成功則重置
			onRefetchAllWallet()
			resetField('amount')
		}
	}

	const handleTransfer = async ({
		amount,
		toTpId,
		fromTpId,
		transferAction,
		selectSendingWalletCallback,
		selectReceivingCallback,
		transferModalCallback,
		errorCallback,
	}: ITransferArgs) => {
		if (transferAction === TransferTypeEnum.transfer) {
			//* tpId 有可能為 0 (Main Wallet)，所以不能用 !toTpId/fromTpId 判斷

			// callback存在且tpId只要不是數字就跳出( undefined, null)

			if (selectSendingWalletCallback && typeof toTpId !== 'number') {
				selectSendingWalletCallback()
				return false
			}
			if (selectReceivingCallback && typeof fromTpId !== 'number') {
				selectReceivingCallback()
				return false
			}
		}

		setIsTransferLoading(true)

		// 09/16/24
		// payload如果是undefined 他送出時會自動忽略 導致判斷不到，所以直接在payload轉換
		// 不用預設值null 是因為 main wallet 是 0 會造成 falsy的問題 導致payload被替換成null

		const transferParams = {
			amount,
			toTpId: toTpId !== undefined ? toTpId : null,
			fromTpId: fromTpId !== undefined ? fromTpId : null,
			transferAction,
			langId,
		}

		try {
			const { data, errorCode } = await transfer(transferParams).unwrap()

			if (errorCode === 9) {
				const { turnover, rollover } = data

				let percentage =
					turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2)
				percentage = percentage === 'NaN' ? 0 : Number(percentage)

				if (transferModalCallback) {
					transferModalCallback(turnover, rollover, percentage)
				}
			}
		} catch (error) {
			if (errorCallback) {
				errorCallback((error as Error).message)
			}
			// modal.error((error as Error).message)
		}
		setIsTransferLoading(false)
		//* 要 return true 才會 reset amount
		return true
	}

	const loading =
		isGetWalletTransferStatusFetching ||
		isGetMainWalletInfoFetching ||
		isGetTpWalletInfoByTpIdFetching ||
		isSeWalletAutoTransferStatusLoading

	const value: ITransferFundsContext = {
		loading,
		isTransferLoading, // transfer loading 動畫與準備資料的動畫拆開
		isFormValid,
		timezone,
		maxAmount,
		walletOptions,
		isAutoTransfer: Number(autoTransferStatus) === AutoTrasferStatusEnum.open,
		transferHistory,
		formMethods,
		mainWalletInfo,
		tpWalletBalanceList,
		onRefetchAllWallet,
		handleTransfer,
		getConvertedTime,
		handleSubmitForm,
		handleCheckAmount,
		handleSelectWallet,
		handleRestoreAll,
		handleSetMaxAmount,
		handleGetMainWalletInfo,
		handleGetTransferRecent,
		handleAutoTransferStatus,
		handleGetTpWalletInfoByTpId,
	}

	return (
		<TransferFundsContext.Provider value={value}>
			{children}
		</TransferFundsContext.Provider>
	)
}
