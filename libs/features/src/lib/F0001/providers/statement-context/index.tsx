import {
	IAxiosResponse,
	ICustTpBetRecordDetailListbyGameTypeData,
	ICustTpBetRecordListbyCategoryIdData,
	ICustTpBetRecordListDateRangeData,
	ICustTpBetRecordListOneDayData,
	useLazyGetCustTpBetRecordDetailListbyGameTypeQuery,
	useLazyGetCustTpBetRecordListbyCategoryIdQuery,
	useLazyGetCustTpBetRecordListDateRangeQuery,
	useLazyGetGetCustTpBetRecordListOneDayQuery,
} from '@nx-next-app/service'
import { QuickPickData, QuickPickEnum } from '@nx-next-app/types'
import { revertTimeZone } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

interface IStatementProviderProps {
	children: ReactNode
	QUICK_PICK_LIST: { value: QuickPickEnum; label: string }[]
	HEADER_TAGS: { label: string; href: string }[]
}

export interface IStatementContextInterface {
	QUICK_PICK_LIST: { value: QuickPickEnum; label: string }[]
	activePeriod: number
	displayColumns: (
		| ICustTpBetRecordListDateRangeData
		| ICustTpBetRecordListOneDayData
		| ICustTpBetRecordListbyCategoryIdData
		| ICustTpBetRecordDetailListbyGameTypeData
	)[]
	activeTab: string | null
	breadcrumbs: { displayKey: string; value: string | null }[]
	totalPage: number
	currentPage: number
	loading: boolean
	totalTurnover: number | string
	totalWinlostAmount: number | string
	HEADER_TAGS: { label: string; href: string }[]
	tabsRef?: React.MutableRefObject<null | HTMLDivElement>
	onPageChange: ({ selected }: { selected: number }) => void
	onQuickPickChange: (newPeriod: number, isSearch: boolean) => void
	onDetails: ({
		targetTab,
		selDate,
		categoryId,
		gameTypeId,
		pageNumber,
		period,
	}: {
		targetTab: string
		selDate: string
		categoryId?: number
		gameTypeId?: number
		pageNumber?: number
		period?: number
	}) => void
	onTabChange: (newTab: string) => void
	onTabsScroll?: () => void
	onSearch?: () => void
}

const StatementContext = createContext<IStatementContextInterface>(null!)

export const useStatement = () => {
	return useContext(StatementContext)
}

const parseQueryString = (queryString: string): Record<string, string> => {
	const params = new URLSearchParams(queryString)
	const result: Record<string, string> = {}

	params.forEach((value, key) => {
		result[key] = value
	})
	return result
}

const StatementProvider = ({
	children,
	QUICK_PICK_LIST,
	HEADER_TAGS,
}: IStatementProviderProps) => {
	const { t } = useTranslation()
	const router = useRouter()
	const tabsRef = useRef<HTMLDivElement | null>(null)
	const [activePeriod, setActivePeriod] = useState<number>(
		Number(router.query['period']) || QuickPickEnum.Today
	)
	const [recordPeriod, setRecordPeriod] = useState<number>(
		Number(router.query['period']) ?? QuickPickEnum.Today
	)
	const [activeTab, setActiveTab] = useState<string | null>('')
	const [startDate, setStartDate] = useState<Date | null>(
		new Date(new Date().setHours(0, 0, 0, 0))
	)
	const [endDate, setEndDate] = useState<Date | null>(
		new Date(new Date(new Date().setHours(23, 59, 59, 999)))
	)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPage, setTotalPage] = useState(1)

	const [displayColumns, setDisplayColumns] = useState<
		(
			| ICustTpBetRecordListDateRangeData
			| ICustTpBetRecordListOneDayData
			| ICustTpBetRecordListbyCategoryIdData
			| ICustTpBetRecordDetailListbyGameTypeData
		)[]
	>([])
	const [totalTurnover, setTotalTurnover] = useState<string | number>(0)
	const [totalWinlostAmount, setTotalWinlostAmount] = useState<string | number>(
		0
	)

	const breadcrumbs = [
		{ displayKey: t('Label_History_QuickPick'), value: null },
		{
			displayKey: t(
				QuickPickData[(recordPeriod as QuickPickEnum) ?? QuickPickEnum.Today]
			),
			value: '',
		},
		{ displayKey: t('Label_General_ByDay'), value: 'byDay' },
		{ displayKey: t('Label_General_ByCategory'), value: 'byCategory' },
		{ displayKey: t('Label_General_ByDetail'), value: 'byDetail' },
	]

	const [
		getCustTpBetRecordListDateRange,
		{ isFetching: isGetCustTpBetRecordListDateRangeFetching },
	] = useLazyGetCustTpBetRecordListDateRangeQuery()

	const [
		getGetCustTpBetRecordListOneDay,
		{ isFetching: isGetGetCustTpBetRecordListOneDayFetching },
	] = useLazyGetGetCustTpBetRecordListOneDayQuery()

	const [
		getCustTpBetRecordListbyCategoryId,
		{ isFetching: isGetCustTpBetRecordListbyCategoryIdFetching },
	] = useLazyGetCustTpBetRecordListbyCategoryIdQuery()

	const [
		getCustTpBetRecordDetailListbyGameType,
		{ isFetching: isGetCustTpBetRecordDetailListbyGameTypeFetching },
	] = useLazyGetCustTpBetRecordDetailListbyGameTypeQuery()

	const loading =
		isGetCustTpBetRecordListDateRangeFetching ||
		isGetGetCustTpBetRecordListOneDayFetching ||
		isGetCustTpBetRecordListbyCategoryIdFetching ||
		isGetCustTpBetRecordDetailListbyGameTypeFetching
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

	const onTabChange = async (newTab: string | null) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		onDetails({
			targetTab: newTab as string,
			...parseQueryString(router.query?.[newTab as string] as string),
		})
		setActiveTab(newTab)
	}

	const onQuickPickChange = (newPeriod: number, isSearch = true) => {
		setActivePeriod(newPeriod)
		updateDateRangeByPeriod(newPeriod)
		const dateRangeData: Record<number, { startDate: Date; endDate: Date }> = {
			[QuickPickEnum.Today]: {
				startDate: dayjs().startOf('day').toDate(),
				endDate: dayjs().endOf('day').toDate(),
			},
			[QuickPickEnum.Yesterday]: {
				startDate: dayjs().subtract(1, 'day').startOf('day').toDate(),
				endDate: dayjs().subtract(1, 'day').endOf('day').toDate(),
			},
			[QuickPickEnum.ThisWeek]: {
				startDate: dayjs().startOf('week').toDate(),
				endDate: dayjs().toDate(),
			},
			[QuickPickEnum.LastWeek]: {
				startDate: dayjs().subtract(1, 'week').startOf('week').toDate(),
				endDate: dayjs().subtract(1, 'week').endOf('week').toDate(),
			},
			[QuickPickEnum.ThisMonth]: {
				startDate: dayjs().startOf('month').toDate(),
				endDate: dayjs().toDate(),
			},
			[QuickPickEnum.LastMonth]: {
				startDate: dayjs().subtract(1, 'month').startOf('month').toDate(),
				endDate: dayjs().subtract(1, 'month').endOf('month').toDate(),
			},
		}
		isSearch &&
			onDetails({
				targetTab: '',
				selDate: '',
				newStartDate: dateRangeData[newPeriod].startDate as Date,
				newEndDate: dateRangeData[newPeriod].endDate as Date,
				period: newPeriod,
			})
	}

	const setUrlArgs = (args: any) => {
		router.push(
			{
				pathname: router.pathname,
				query: args,
			},
			undefined,
			{ shallow: true }
		)
	}

	const onDetails = async ({
		targetTab,
		selDate,
		categoryId,
		gameTypeId,
		pageNumber,
		newStartDate,
		newEndDate,
		period,
	}: {
		targetTab: string
		selDate: string
		categoryId?: number
		gameTypeId?: number
		pageNumber?: number
		newStartDate?: Date
		newEndDate?: Date
		period?: number
	}) => {
		const args = {
			pageNumber: pageNumber ?? currentPage,
			pageSize: 10,
			selDate: selDate ? revertTimeZone(selDate).format('YYYY-MM-DD') : '',
		}
		let result: IAxiosResponse<
			(
				| ICustTpBetRecordListDateRangeData
				| ICustTpBetRecordListOneDayData
				| ICustTpBetRecordListbyCategoryIdData
				| ICustTpBetRecordDetailListbyGameTypeData
			)[]
		> = {
			errorCode: 0,
			message: '',
			data: [],
			pageNumber,
			totalPages: 1,
		}
		switch (targetTab) {
			case '':
				result = await getCustTpBetRecordListDateRange({
					startDate: dayjs(newStartDate ?? startDate).format('YYYY-MM-DD'),
					endDate: dayjs(newEndDate ?? endDate).format('YYYY-MM-DD'),
					pageNumber: currentPage,
					pageSize: 10,
				}).unwrap()
				delete router.query['byDay']
				delete router.query['byCategory']
				delete router.query['byDetail']
				setActiveTab('')
				setUrlArgs({
					period: period ?? activePeriod,
					startDate: dayjs(newStartDate ?? startDate).format('YYYY-MM-DD'),
					endDate: dayjs(newEndDate ?? endDate).format('YYYY-MM-DD'),
					pageNumber: currentPage,
					pageSize: 10,
				})

				break
			case 'byDay':
				result = await getGetCustTpBetRecordListOneDay(args).unwrap()
				delete router.query['byCategory']
				delete router.query['byDetail']
				setActiveTab('byDay')
				setUrlArgs({
					period: period ?? activePeriod,
					...(typeof router.query === 'object' ? router.query : {}),
					...{
						byDay: Object.keys(args)
							.map(key => `${key}=${{ ...args }[key]}`)
							.join('&'),
					},
				})

				break

			case 'byCategory':
				result = await getCustTpBetRecordListbyCategoryId({
					...args,
					categoryId: categoryId as number,
				}).unwrap()
				delete router.query['byDetail']
				setActiveTab('byCategory')
				setUrlArgs({
					period: period ?? activePeriod,
					...(typeof router.query === 'object' ? router.query : {}),
					...{
						byCategory: Object.keys({
							...args,
							categoryId: categoryId as number,
						})
							.map(
								key =>
									`${key}=${{ ...args, categoryId: categoryId as number }[key]}`
							)
							.join('&'),
					},
				})

				break

			case 'byDetail':
				result = await getCustTpBetRecordDetailListbyGameType({
					...args,
					gameTypeId: gameTypeId as number,
				}).unwrap()
				setActiveTab('byDetail')
				setUrlArgs({
					period: period ?? activePeriod,
					...(typeof router.query === 'object' ? router.query : {}),
					...{
						byDetail: Object.keys({ ...args, gameTypeId: gameTypeId as number })
							.map(
								key =>
									`${key}=${{ ...args, gameTypeId: gameTypeId as number }[key]}`
							)
							.join('&'),
					},
				})

				setTotalTurnover(
					result.data.reduce((acc, cur) => acc + cur.turnOver, 0).toFixed(2)
				)
				setTotalWinlostAmount(
					result.data
						.reduce((acc, cur) => acc + cur.winlostAmount, 0)
						.toFixed(2)
				)
				break

			default:
				break
		}

		setActivePeriod(period ?? activePeriod)
		setRecordPeriod(period ?? activePeriod)
		setCurrentPage(result?.pageNumber ?? 1)
		setTotalPage(result?.totalPages ?? 1)
		setDisplayColumns(result?.data ?? [])
	}

	const onPageChange = async ({ selected }: { selected: number }) => {
		const queryObject: Record<string, string> = {}
		if (activeTab !== null) {
			;(router.query[activeTab] as string)
				?.split('&')
				.forEach((pair: string) => {
					const [key, value]: string[] = pair.split('=')
					queryObject[key] = value
				})
		}

		await onDetails({
			targetTab: activeTab,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			...queryObject,
			pageNumber: selected,
		} as {
			targetTab: string
			selDate: string
			categoryId?: number
			gameTypeId?: number
			pageNumber?: number
		})
	}

	const onTabsScroll = () => {
		if (tabsRef.current) {
			tabsRef.current.scrollTo({
				left: tabsRef.current.scrollLeft + 80,
				behavior: 'smooth',
			})
		}
	}

	const onSearch = () =>
		onDetails({ targetTab: '', selDate: '', period: activePeriod })

	const init = async () => {
		let newTab = ''
		if (router.query['byDetail']) {
			newTab = 'byDetail'
		} else if (router.query['byCategory']) {
			newTab = 'byCategory'
		} else if (router.query['byDay']) {
			newTab = 'byDay'
		} else {
			newTab = ''
		}

		const queryString: string = router.query[newTab as string] as string

		const targetSelDate = queryString?.match(/selDate=([^&]+)/)?.[1]

		const queryObject: Record<string, string> = {}
		if (newTab) {
			queryString.split('&').forEach((pair: string) => {
				const [key, value]: string[] = pair.split('=')
				queryObject[key] = value
			})
		}
		onDetails({
			targetTab: newTab as string,
			selDate: targetSelDate as string,
			...(newTab !== ''
				? queryObject
				: {
						...router.query,
						newStartDate: dayjs(router.query['startDate'] as string).format(
							'YYYY-MM-DD'
						),
						newEndDate: dayjs(router.query['endDate'] as string).format(
							'YYYY-MM-DD'
						),
				  }),
		})
	}

	useEffect(() => {
		init()
	}, [])

	const value: IStatementContextInterface = {
		QUICK_PICK_LIST,
		activePeriod: Number(activePeriod),
		displayColumns,
		activeTab,
		breadcrumbs,
		totalPage,
		currentPage,
		loading,
		totalTurnover,
		totalWinlostAmount,
		HEADER_TAGS,
		tabsRef,
		onPageChange,
		onQuickPickChange,
		onDetails,
		onTabChange,
		onTabsScroll,
		onSearch,
	}

	return (
		<StatementContext.Provider value={value}>
			{children}
		</StatementContext.Provider>
	)
}

export { StatementProvider }
