import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import dayjs from 'dayjs'
import {
	IAxiosResponse,
	IReferralData,
	ITransferHistoryData,
	IDepositInfoHistoryData,
	IStatementData,
	IWithdrawalInfoHistoryData,
	useLazyGetReferralQuery,
	useLazyGetTransferHistoryQuery,
	useLazyGetDepositInfoHistoryQuery,
	useLazyGetStatementQuery,
	useLazyGetWithdrawalInfoHistoryQuery,
	useSetDepositCancelMutation,
	useSetWithdrawalCancelMutation,
	useUploadReceiptMutation,
} from '@nx-next-app/service'
import { DEVICE_TYPE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { HistoryTabsEnum, QuickPickEnum } from 'libs/web/src/app/types/history'
import { useInView } from '@nx-next-app/hooks'
import { useRouter } from 'next/router'

interface IHistoryProviderProps {
	children: ReactNode
	HISTORY_TABS: {
		displayKey: string
		id: HistoryTabsEnum
		allowCurrencies?: number[]
	}[]
	QUICK_PICK_LIST: { value: QuickPickEnum; label: string }[]
	HEADER_TAGS?: { displayKey: string; pathName: string }[]
}

export interface IHistoryContextInterface {
	activeTab: number
	activePeriod: number | string | undefined
	startDate: Date | null
	endDate: Date | null
	displayColumns:
		| (
				| ITransferHistoryData
				| IDepositInfoHistoryData
				| IWithdrawalInfoHistoryData
				| IStatementData
				| IReferralData
		  )[]
	currentPage: number
	totalPage: number
	HISTORY_TABS: {
		displayKey: string
		id: HistoryTabsEnum
		allowCurrencies?: number[]
	}[]
	QUICK_PICK_LIST: { value: QuickPickEnum; label: string }[]
	HEADER_TAGS?: { displayKey: string; pathName: string }[]
	historyListRef?: React.MutableRefObject<null>
	tabsRef?: React.MutableRefObject<null | HTMLDivElement>
	isLoading: boolean
	isShowMobileLoading: boolean
	transferDirection: ({
		direction,
		displayMainWallet,
		displayAdjustment,
		isAdjustment,
		tpName,
	}: {
		direction: number
		displayMainWallet: string
		displayAdjustment: string
		isAdjustment: boolean
		tpName: string
	}) => { startWallet: string; endWallet: string }
	onTabChange: (id: number) => void
	onQuickPickChange: (newPeriod: string | number | undefined) => void
	onPageChange: (selectedItem: { selected: number }) => void
	onSearch: () => void
	onSubmit: ({ transId, receipt }: { transId: string; receipt: string }) => void
	onStartDateChange: (newDate: Date | null) => void
	onEndDateChange: (newDate: Date | null) => void
	onDepositCancel: (transId: string) => void
	onWithdrawalCancel: (transId: string) => void
	onTabsScroll?: () => void
	onReloadSpin?: () => void
}

export const HistoryContext = createContext<IHistoryContextInterface>(null!)

export const useHistory = () => {
	return useContext(HistoryContext)
}

const HistoryProvider = ({
	children,
	HISTORY_TABS,
	QUICK_PICK_LIST,
	HEADER_TAGS,
}: IHistoryProviderProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { modal } = useGlobalModal()
	const tabsRef = useRef<HTMLDivElement | null>(null)
	const { ref: historyListRef, isInView: isHistoryListInView } = useInView({})
	const { pathname } = useRouter()
	const getInitActiveTab = () => {
		switch (pathname) {
			case '/transfer-history':
				return HistoryTabsEnum.Transfer
			case '/deposit-history':
				return HistoryTabsEnum.Deposit
			case '/withdrawal-history':
				return HistoryTabsEnum.Withdrawal
			case '/financial-log':
				return HistoryTabsEnum.Financial
			case '/referral-history':
				return HistoryTabsEnum.Referral
			default:
				return HISTORY_TABS.filter(({ allowCurrencies, id }) => {
					if (allowCurrencies) {
						return allowCurrencies.includes(currencyId as number)
					}
					return true
				})[0].id
		}
	}
	const [activeTab, setActiveTab] = useState(getInitActiveTab())
	const [activePeriod, setActivePeriod] = useState<number | string | undefined>(
		QuickPickEnum.Today
	)
	const [startDate, setStartDate] = useState<Date | null>(
		new Date(new Date().setHours(0, 0, 0, 0))
	)
	const [endDate, setEndDate] = useState<Date | null>(
		new Date(new Date(new Date().setHours(23, 59, 59, 999)))
	)
	const [isShowMobileLoading, setIsShowMobileLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPage, setTotalPage] = useState(1)
	const [displayColumns, setDisplayColumns] = useState<
		| (
				| ITransferHistoryData
				| IDepositInfoHistoryData
				| IWithdrawalInfoHistoryData
				| IStatementData
				| IReferralData
		  )[]
	>([])

	const [
		getTransferHistory,
		{
			data: { data: transferList = [] } = {},
			isFetching: isGetTransferHistoryFetching,
		},
	] = useLazyGetTransferHistoryQuery()

	const [
		getDepositInfoHistory,
		{
			data: { data: depositInfoList = [] } = {},
			isFetching: isGetDepositInfoHistoryFetching,
		},
	] = useLazyGetDepositInfoHistoryQuery()

	const [
		getWithdrawalInfoHistory,
		{
			data: { data: withdrawalInfoList = [] } = {},
			isFetching: isGetWithdrawalInfoHistoryFetching,
		},
	] = useLazyGetWithdrawalInfoHistoryQuery()

	const [
		getStatement,
		{
			data: { data: statementList = [] } = {},
			isFetching: isGetStatementFetching,
		},
	] = useLazyGetStatementQuery()

	const [
		getReferral,
		{
			data: { data: referralList = [] } = {},
			isFetching: isGetReferralFetching,
		},
	] = useLazyGetReferralQuery()

	const [uploadReceipt, { isLoading: isUploadReceiptLoading }] =
		useUploadReceiptMutation()

	const [setDepositCancel, { isLoading: isSetDepositCancelLoading }] =
		useSetDepositCancelMutation()

	const [setWithdrawalCancel, { isLoading: isSetWithdrawalCancelLoading }] =
		useSetWithdrawalCancelMutation()

	const onTabChange = (id: number) => {
		setActiveTab(id)
		setDisplayColumns([])
	}

	const updateDateRangeByPeriod = (newPeriod: string | number | undefined) => {
		switch (newPeriod) {
			case QuickPickEnum.Today:
				setStartDate(dayjs().startOf('day').toDate())
				setEndDate(dayjs().endOf('day').toDate())
				break
			case QuickPickEnum.Yesterday:
				setStartDate(dayjs().subtract(1, 'day').startOf('day').toDate())
				setEndDate(dayjs().subtract(1, 'day').endOf('day').toDate())
				break
			case QuickPickEnum.ThisWeek:
				setStartDate(dayjs().startOf('week').toDate())
				setEndDate(dayjs().toDate())
				break
			case QuickPickEnum.LastWeek:
				setStartDate(dayjs().subtract(1, 'week').startOf('week').toDate())
				setEndDate(dayjs().subtract(1, 'week').endOf('week').toDate())
				break
			case QuickPickEnum.ThisMonth:
				setStartDate(dayjs().startOf('month').toDate())
				setEndDate(dayjs().toDate())
				break
			case QuickPickEnum.LastMonth:
				setStartDate(dayjs().subtract(1, 'month').startOf('month').toDate())
				setEndDate(dayjs().subtract(1, 'month').endOf('month').toDate())
				break
			default:
				break
		}
	}

	const updatePeriodByDateRange = ({
		targetStartDate = startDate,
		targetEndDate = endDate,
	}) => {
		const dayjsStartDate = dayjs(targetStartDate)
		const dayjsEndDate = dayjs(targetEndDate)

		const today = dayjs()
		const todayStart = today.startOf('day')
		const todayEnd = today.endOf('day')
		const yesterdayStart = today.subtract(1, 'day').startOf('day')
		const yesterdayEnd = today.subtract(1, 'day').endOf('day')
		const thisWeekStart = today.startOf('week')
		const thisWeekEnd = today.endOf('day')
		const lastWeekStart = today.subtract(1, 'week').startOf('week')
		const lastWeekEnd = today.subtract(1, 'week').endOf('week')
		const thisMonthStart = today.startOf('month')
		const thisMonthEnd = today.endOf('day')
		const lastMonthStart = today.subtract(1, 'month').startOf('month')
		const lastMonthEnd = today.subtract(1, 'month').endOf('month')

		const periods = [
			{ start: todayStart, end: todayEnd, period: QuickPickEnum.Today },
			{
				start: yesterdayStart,
				end: yesterdayEnd,
				period: QuickPickEnum.Yesterday,
			},
			{
				start: thisWeekStart,
				end: thisWeekEnd,
				period: QuickPickEnum.ThisWeek,
			},
			{
				start: lastWeekStart,
				end: lastWeekEnd,
				period: QuickPickEnum.LastWeek,
			},
			{
				start: thisMonthStart,
				end: thisMonthEnd,
				period: QuickPickEnum.ThisMonth,
			},
			{
				start: lastMonthStart,
				end: lastMonthEnd,
				period: QuickPickEnum.LastMonth,
			},
		]

		const matchedPeriod = periods.find(
			({ start, end, period }) =>
				dayjsStartDate.isSame(start, 'day') && dayjsEndDate.isSame(end, 'day')
		)

		if (matchedPeriod) {
			setActivePeriod(matchedPeriod.period)
		} else {
			setActivePeriod(undefined)
		}
	}

	const onQuickPickChange = (newPeriod: string | number | undefined) => {
		setActivePeriod(newPeriod)
		updateDateRangeByPeriod(newPeriod)
	}

	const onStartDateChange = (newStartDate: Date | null) => {
		setStartDate(newStartDate)
		updatePeriodByDateRange({ targetStartDate: newStartDate })
	}

	const onEndDateChange = (newEndDate: Date | null) => {
		const endDate = dayjs(newEndDate).endOf('day').toDate()
		setEndDate(endDate)
		updatePeriodByDateRange({ targetEndDate: endDate })
	}

	const onPageChange = async ({ selected }: { selected: number }) => {
		await getHistoryData({ startDate, endDate, pageNumber: selected + 1 })

		setCurrentPage(selected + 1)
	}

	const onSearch = () => {
		if (Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile) {
			setDisplayColumns([])
			setIsShowMobileLoading(true)
		}
		getHistoryData({ startDate, endDate })
	}

	const transferDirection = ({
		direction,
		displayMainWallet,
		displayAdjustment,
		isAdjustment,
		tpName,
	}: {
		direction: number
		displayMainWallet: string
		displayAdjustment: string
		isAdjustment: boolean
		tpName: string
	}) => {
		const startWallet =
			direction === 1 && !isAdjustment ? displayMainWallet : tpName
		let endWallet = ''

		if (isAdjustment) {
			endWallet = displayAdjustment
		} else {
			endWallet = direction === 1 ? tpName : displayMainWallet
		}

		return { startWallet, endWallet }
	}

	const getHistoryData = async ({
		startDate,
		endDate,
		pageNumber = 1,
	}: {
		startDate: Date | null
		endDate: Date | null
		pageNumber?: number
	}) => {
		if (!(startDate && endDate)) {
			return
		}
		const args = {
			startDate: dayjs(startDate).unix(),
			endDate: dayjs(endDate).unix(),
			pageNumber,
		}
		let result: IAxiosResponse<
			(
				| ITransferHistoryData
				| IDepositInfoHistoryData
				| IWithdrawalInfoHistoryData
				| IStatementData
				| IReferralData
			)[]
		> = {
			errorCode: 0,
			message: '',
			data: [],
			pageNumber: 1,
			totalPages: 1,
		}

		switch (activeTab) {
			case HistoryTabsEnum.Transfer:
				result = await getTransferHistory(args).unwrap()
				break
			case HistoryTabsEnum.Deposit:
				result = await getDepositInfoHistory(args).unwrap()
				break
			case HistoryTabsEnum.Withdrawal:
				result = await getWithdrawalInfoHistory(args).unwrap()
				break
			case HistoryTabsEnum.Financial:
				result = await getStatement(args).unwrap()
				break
			case HistoryTabsEnum.Referral:
				result = await getReferral({ ...args, pageSize: 10 }).unwrap()
				break
			default:
				break
		}
		setCurrentPage(result?.pageNumber ?? 1)
		setTotalPage(result?.totalPages ?? 1)
		if (Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile) {
			setIsShowMobileLoading(false)
		}
	}

	const onTabsScroll = () => {
		if (tabsRef.current) {
			tabsRef.current.scrollTo({
				left: tabsRef.current.scrollLeft + 80,
				behavior: 'smooth',
			})
		}
	}

	const onDepositCancel = async (transId: string) => {
		await setDepositCancel({ transId }).unwrap()
	}

	const onWithdrawalCancel = async (transId: string) => {
		await setWithdrawalCancel({ transId }).unwrap()
	}

	const onSubmit = async ({
		transId,
		receipt,
	}: {
		transId: string
		receipt: string
	}) => {
		try {
			await uploadReceipt({ transId, receipt }).unwrap()
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onReloadSpin = () => {
		getHistoryData({
			startDate,
			endDate,
			pageNumber: currentPage,
		})
	}

	const updateDisplayColumns = () => {
		const targetList = {
			[HistoryTabsEnum.Transfer]: transferList,
			[HistoryTabsEnum.Deposit]: depositInfoList,
			[HistoryTabsEnum.Withdrawal]: withdrawalInfoList,
			[HistoryTabsEnum.Financial]: statementList,
			[HistoryTabsEnum.Referral]: referralList,
		}[activeTab]

		if (
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
		) {
			setDisplayColumns(
				(targetList ?? []) as (
					| ITransferHistoryData
					| IDepositInfoHistoryData
					| IWithdrawalInfoHistoryData
					| IStatementData
					| IReferralData
				)[]
			)
		}
		if (Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile) {
			const updateColumnsWithNewData = (
				originalColumns: (
					| IDepositInfoHistoryData
					| IWithdrawalInfoHistoryData
				)[],
				newData: (IDepositInfoHistoryData | IWithdrawalInfoHistoryData)[]
			) => {
				const updatedColumns = originalColumns.map(columnItem => {
					const matchItem = newData.find(
						targetItem => targetItem.transId === columnItem.transId
					)
					return matchItem ? { ...columnItem, ...matchItem } : columnItem
				})

				const newTransIds = updatedColumns?.map(item => item.transId)
				const nonMatchedItems =
					newData?.filter(item => !newTransIds?.includes(item.transId)) || []

				return [...updatedColumns, ...nonMatchedItems]
			}

			const newDisplayColumns = updateColumnsWithNewData(
				(displayColumns ?? []) as (
					| IDepositInfoHistoryData
					| IWithdrawalInfoHistoryData
				)[],
				targetList as (IDepositInfoHistoryData | IWithdrawalInfoHistoryData)[]
			)
			setDisplayColumns(newDisplayColumns ?? [])
		}
	}

	const isLoading =
		isGetDepositInfoHistoryFetching ||
		isGetTransferHistoryFetching ||
		isGetWithdrawalInfoHistoryFetching ||
		isGetStatementFetching ||
		isGetReferralFetching ||
		isUploadReceiptLoading ||
		isSetDepositCancelLoading ||
		isSetWithdrawalCancelLoading

	useEffect(() => {
		if (!isLoading) {
			updateDisplayColumns()
		}
	}, [isLoading])

	useEffect(() => {
		if (isHistoryListInView) {
			if (displayColumns && currentPage * 5 > displayColumns.length) {
				return
			}
			getHistoryData({ startDate, endDate, pageNumber: currentPage + 1 })
		}
	}, [isHistoryListInView])

	const value: IHistoryContextInterface = {
		activeTab,
		activePeriod,
		startDate,
		endDate,
		displayColumns,
		currentPage,
		totalPage,
		HISTORY_TABS,
		QUICK_PICK_LIST,
		HEADER_TAGS,
		historyListRef,
		tabsRef,
		isLoading,
		isShowMobileLoading,
		transferDirection,
		onTabChange,
		onQuickPickChange,
		onStartDateChange,
		onEndDateChange,
		onPageChange,
		onSearch,
		onSubmit,
		onDepositCancel,
		onWithdrawalCancel,
		onTabsScroll,
		onReloadSpin,
	}

	return (
		<HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
	)
}
export default HistoryProvider
