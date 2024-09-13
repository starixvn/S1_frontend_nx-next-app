import { ISelectProps } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
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
		transferModalCallback: (
			turnover: number,
			rollover: number,
			percentage: number
		) => void
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
	handleGetMainWalletInfo: () => void
	handleGetTransferRecent: () => void
	handleAutoTransferStatus: () => void
	handleGetTpWalletInfoByTpId: (tpId: number) => void
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

	const { modal } = useGlobalModal()

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

	const handleAutoTransferStatus = () => {
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
				modal.error((error as Error).message)
			}
		}

		if (Number(autoTransferStatus) === AutoTrasferStatusEnum.close) {
			modal.confirm(t('Label_TransferFunds_AutoTransferHint'), {
				onOK: setStatus,
			})
		} else {
			setStatus()
		}
	}

	const handleTransfer = async ({
		amount,
		toTpId,
		fromTpId,
		transferAction,
		transferModalCallback,
	}: ITransferArgs) => {
		if (transferAction === TransferTypeEnum.transfer) {
			//* tpId 有可能為 0 (Main Wallet)，所以不能用 !toTpId/fromTpId 判斷
			if (toTpId === undefined) {
				modal.error(t('Label_TransferFunds_PleaseSelectFromWallet'))
				return false
			}
			if (fromTpId === undefined) {
				modal.error(t('Label_TransferFunds_PleaseSelectToWallet'))
				return false
			}
		}

		setIsTransferLoading(true)

		try {
			const { data, errorCode } = await transfer({
				amount,
				toTpId,
				fromTpId,
				transferAction,
				langId,
			}).unwrap()

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
			modal.error((error as Error).message)
		}

		setIsTransferLoading(false)

		//* 要 return true 才會 reset amount
		return true
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

	const handleGetTransferRecent = async () => {
		try {
			await getTransferRecent().unwrap()
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleGetTpWalletInfoByTpId = async (tpId: number) => {
		try {
			await getTpWalletInfoByTpId(tpId).unwrap()
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleGetMainWalletInfo = async () => {
		try {
			await getMainWalletInfo(null).unwrap()
		} catch (error) {
			modal.error((error as Error).message)
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

	const handleSubmitForm = async (
		transferModalCallback: TransferModalCallback
	) => {
		const { amount, walletTo, walletFrom } = getValues()

		const success = await handleTransfer({
			amount: isConvert(currencyId) ? Number(amount) * 1000 : Number(amount),
			toTpId: walletTo || 0,
			fromTpId: walletFrom || 0,
			transferAction: TransferTypeEnum.transfer,
			langId,
			transferModalCallback,
		})

		if (success) {
			// success 才重 load 錢包資訊
			onRefetchAllWallet()
			resetField('amount')
		}
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
