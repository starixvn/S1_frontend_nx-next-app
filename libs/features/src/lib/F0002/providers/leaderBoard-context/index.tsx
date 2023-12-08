import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useLazyGetCustRankMonthQuery,
	useLazyGetCustRankQuery,
	useLazyGetLeaderBoardListMonthQuery,
	useLazyGetLeaderBoardListQuery,
} from '@nx-next-app/service'
import dayjs, { Dayjs } from 'dayjs'
import { find, includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	LeaderBoardDayEnum,
	LeaderBoardGameTypeEnum,
	LeaderBoardTabsEnum,
} from '@nx-next-app/site/nova88/data/leaderBoard'
import { useRouter } from 'next/router'
import { useDebounce } from 'usehooks-ts'
import { getTermsConditionsLangId } from '@nx-next-app/utils'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0002/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

interface ILeaderBoardProviderProps {
	children: ReactNode
	LEADER_BOARD_EVENT_CODE: Record<string, string>
	LEADER_BOARD_GAME_POINT_NAV: {
		id: number
		displayKey: string
		imgName: string
	}[]
	LEADER_BOARD_MONTHS: { [key: number]: string }
	LEADER_BOARD_RANK_NUM: { [key: string]: number }
	LEADER_BOARD_REWARD_DATA: {
		[currencyName: string]: {
			section1: {
				turnover: string
				point: string
				displayName: string
				img: string
			}[]
			section2: { rank: string; point: string; bonus: string }[]
		}
	}
	LEADER_BOARD_RANK_NAV: { id: number; displayKey: string }[]
	LEADER_BOARD_TABS: { id: number; displayKey: string }[]
	LeaderBoardDayEnum: typeof LeaderBoardDayEnum
	LeaderBoardGameTypeEnum: typeof LeaderBoardGameTypeEnum
	LeaderBoardTabsEnum: typeof LeaderBoardTabsEnum
}

export interface LeaderBoardContextInterface {
	loading: boolean
	rewardData: {
		section1: {
			turnover: string
			point: string
			displayName: string
			img: string
		}[]
		section2: { rank: string; point: string; bonus: string }[]
	}
	handleTermAndConditionClick: () => void
	backgroundImg: string
	rankList: {
		custId?: number
		userName?: string
		wTurnover?: number
		status?: number
		rank?: string | number
	}[]
	getFormattedUpdateTime: () => string
	formattedEndTime: string
	newPeriodList: {
		value: string
		label: string
	}[]
	activeTab: number
	activeRankTime: number
	activeGameType: number
	activePeriodId: string
	onRankTimeChange: (newRankTime: number) => void
	onGameTypeChange: (newGameType: number) => void
	onPeriodIdChange: (newPeriodId: string) => void
	onTabsChange: (id: number) => void
	LEADER_BOARD_GAME_POINT_NAV: {
		id: LeaderBoardGameTypeEnum
		displayKey: string
		imgName: string
	}[]
	LEADER_BOARD_RANK_NAV: { id: LeaderBoardDayEnum; displayKey: string }[]
	LEADER_BOARD_TABS: { id: LeaderBoardTabsEnum; displayKey: string }[]
	LeaderBoardTabsEnum: typeof LeaderBoardTabsEnum
}

export const LeaderBoardContext = createContext<LeaderBoardContextInterface>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useLeaderBoard = () => {
	return useContext(LeaderBoardContext)
}

const formattedEndTime = dayjs().endOf('month').format('YYYY/MM/DD HH:mm:ss')

const formatDate = (date: Dayjs) => date.format('YYYY-MM-DD')

const getMonthsBetween = (startDate: Dayjs, endDate: Dayjs): Dayjs[] => {
	const diff = endDate.diff(startDate, 'month')
	return Array.from({ length: diff + 1 }, (_, index) =>
		startDate.add(index, 'month')
	)
}

const getPeriodList = (leaderBoardMonths: { [key: number]: string }) => {
	// * 月排名暫時顯示四月到當前月份，等ＰＭ通知再修正回起始月份 "2023-01-01"
	const startDate = dayjs('2023-04-01')
	const currentDate = dayjs()
	const months = getMonthsBetween(startDate, currentDate)
	const monthDataList = months
		.map(date => {
			const month = date.month() + 1
			const year = date.year()
			const startDate = formatDate(date.startOf('month'))
			const endDate = formatDate(date.endOf('month'))
			return {
				id: `${year}-${month}`,
				displayKey: leaderBoardMonths[month],
				year,
				startDate,
				endDate,
			}
		})
		.sort((a, b) => (dayjs(a.startDate).isAfter(dayjs(b.startDate)) ? 1 : -1))
	return monthDataList
}

const LeaderBoardProvider = ({
	children,
	LEADER_BOARD_EVENT_CODE,
	LEADER_BOARD_GAME_POINT_NAV,
	LEADER_BOARD_MONTHS,
	LEADER_BOARD_RANK_NUM,
	LEADER_BOARD_REWARD_DATA,
	LEADER_BOARD_RANK_NAV,
	LEADER_BOARD_TABS,
	LeaderBoardDayEnum,
	LeaderBoardGameTypeEnum,
	LeaderBoardTabsEnum,
}: ILeaderBoardProviderProps) => {
	const { t } = useTranslation()
	const {
		auth,
		userInfo: { currencyId, langId, userName },
	} = useAuth()
	const { modal } = useGlobalModal()
	const { push } = useRouter()
	const rewardData =
		currencyId === CurrenciesEnum.INR
			? LEADER_BOARD_REWARD_DATA['MYR']
			: LEADER_BOARD_REWARD_DATA[currencyId]

	const [rankList, setRankList] = useState<
		{
			custId?: number
			userName?: string
			wTurnover?: number
			status?: number
			rank?: string | number
		}[]
	>([])
	const [activePeriodId, setActivePeriodId] = useState('')
	const [activeRankTime, setActiveRankTime] = useState(LeaderBoardDayEnum.Today)
	const [activeGameType, setActiveGameType] = useState(
		LeaderBoardGameTypeEnum.All
	)
	const [activeTab, setActiveTab] = useState<LeaderBoardTabsEnum>(
		LeaderBoardTabsEnum.Event
	)

	const [
		getLeaderBoardListMonth,
		{ isFetching: isGetLeaderBoardListMonthFetching },
	] = useLazyGetLeaderBoardListMonthQuery()
	const [getLeaderBoardList, { isFetching: isGetLeaderBoardListFetching }] =
		useLazyGetLeaderBoardListQuery()
	const [getCustRankData, { isFetching: isGetCustRankFetching }] =
		useLazyGetCustRankQuery()
	const [getCustRankMonthData, { isFetching: isGetCustRankMonthFetching }] =
		useLazyGetCustRankMonthQuery()

	const loading =
		isGetLeaderBoardListMonthFetching ||
		isGetLeaderBoardListFetching ||
		isGetCustRankFetching ||
		isGetCustRankMonthFetching

	const debouncedLoading = useDebounce(loading, 50)

	const backgroundImg =
		LEADER_BOARD_GAME_POINT_NAV.find(({ id }) => id === activeGameType)
			?.imgName ?? LEADER_BOARD_GAME_POINT_NAV[0].imgName

	const periodList = getPeriodList(LEADER_BOARD_MONTHS)

	const newPeriodList = periodList.map(({ id, displayKey, year }) => ({
		value: id,
		label: `${t(displayKey)} ${year}`,
	}))

	const handleTermAndConditionClick = () => {
		const targetLangId = getTermsConditionsLangId({ langId, currencyId })
		window.open(
			`${process.env['NEXT_PUBLIC_BANNER_HOST']}/NovaPromotion/ranking_new_tnc/${targetLangId}.html`
		)
	}

	const getFormattedUpdateTime = () => {
		const now = dayjs()
		const startOfHour = dayjs().startOf('hour')
		const threshold = startOfHour.add(30, 'minute')
		const displayTime = now.isAfter(threshold) ? threshold : startOfHour
		return displayTime.format('YYYY/MM/DD HH:mm:ss')
	}

	const getRankMonthData = async (targetPeriodId: string) => {
		const args = {
			lBCategoryId: LeaderBoardGameTypeEnum.All,
			TopNum: LEADER_BOARD_RANK_NUM['monthly'],
			SelectDays: find(periodList, { id: targetPeriodId })?.startDate ?? '',
			EventCode: LEADER_BOARD_EVENT_CODE['monthly'],
		}
		try {
			const { data: leaderBoardListMonth } = await getLeaderBoardListMonth(
				args
			).unwrap()

			if (leaderBoardListMonth.length > 0) {
				const { data: { data: { custRank = 0, point = 0 } = {} } = {} } =
					await getCustRankMonthData({
						LBCategoryId: args.lBCategoryId,
						SelectDays: args.SelectDays,
						EventCode: args.EventCode,
					})

				// * 記錄該使用者當前排名
				const newRanks: {
					custId?: number
					userName?: string
					wTurnover?: number
					status?: number
					rank?: string | number
				}[] = [...leaderBoardListMonth]
				const rank = custRank > 999 || custRank === 0 ? '999+' : custRank
				const rankTopNum =
					activeTab === LeaderBoardTabsEnum.Result
						? LEADER_BOARD_RANK_NUM['monthly']
						: LEADER_BOARD_RANK_NUM['current']
				if (custRank <= rankTopNum && custRank !== 0) {
					newRanks[custRank - 1] = {
						...newRanks[custRank - 1],
						userName,
						rank,
					}
				} else {
					newRanks.push({
						userName,
						wTurnover: point,
						rank,
					})
				}

				setRankList(newRanks)
			} else {
				setRankList([])
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const getRankData = async ({
		targetGameType,
		targetRankTime,
	}: {
		targetGameType?: number
		targetRankTime?: number
	}) => {
		const args = {
			lBCategoryId: targetGameType ?? LeaderBoardGameTypeEnum.All,
			TopNum: LEADER_BOARD_RANK_NUM['current'],
			BeforeDays: targetRankTime ?? LeaderBoardDayEnum.Today,
			EventCode: LEADER_BOARD_EVENT_CODE['current'],
		}
		try {
			const { data: leaderBoardList } = await getLeaderBoardList(args).unwrap()
			if (leaderBoardList.length > 0) {
				const {
					data: { data: { custRank = 0, point = 0, status = 0 } = {} } = {},
				} = await getCustRankData({
					LBCategoryId: args.lBCategoryId,
					BeforeDays: args.BeforeDays,
					EventCode: args.EventCode,
				})

				const newRanks: {
					custId?: number
					userName?: string
					wTurnover?: number
					status?: number
					rank?: string | number
				}[] = [...leaderBoardList]
				const rank = custRank > 999 || custRank === 0 ? '999+' : custRank
				const rankTopNum =
					activeTab === LeaderBoardTabsEnum.Result
						? LEADER_BOARD_RANK_NUM['monthly']
						: LEADER_BOARD_RANK_NUM['current']
				if (custRank <= rankTopNum && custRank !== 0) {
					newRanks[custRank - 1] = {
						...newRanks[custRank - 1],
						userName,
						rank,
					}
				} else {
					newRanks.push({
						userName,
						wTurnover: point,
						status,
						rank,
					})
				}
				setRankList(newRanks)
			} else {
				setRankList([])
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onRankTimeChange = (newRankTime: number) => {
		if (newRankTime !== activeRankTime) {
			setActiveRankTime(newRankTime)
			getRankData({ targetRankTime: newRankTime })
		}
	}

	const onGameTypeChange = (newGameType: number) => {
		if (newGameType !== activeGameType) {
			setActiveGameType(newGameType)
			getRankData({ targetGameType: newGameType })
		}
	}

	const onPeriodIdChange = (newPeriodId: string) => {
		if (newPeriodId !== activePeriodId) {
			setActivePeriodId(newPeriodId)
			getRankMonthData(newPeriodId)
		}
	}

	const onTabsChange = (id: number) => {
		if (id !== LeaderBoardTabsEnum.Event && !auth.isLogin) {
			if (
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
			) {
				modal.open(<LoginModal />)
			}

			if (Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile)
				push(paths.login.root)

			return
		}
		setActiveTab(id)
	}

	// * 初始各 tab 資料
	useEffect(() => {
		const initTabData = async () => {
			setActiveRankTime(LeaderBoardDayEnum.Today)

			if (activeTab === LeaderBoardTabsEnum.Result) {
				const targetPeriodId = periodList[periodList.length - 1].id
				await getRankMonthData(targetPeriodId)
				setActivePeriodId(targetPeriodId)
				setActiveGameType(LeaderBoardGameTypeEnum.All)
			} else {
				setActiveGameType(
					activeTab === LeaderBoardTabsEnum.GamePoint
						? LeaderBoardGameTypeEnum.Sports
						: LeaderBoardGameTypeEnum.All
				)
			}

			if (
				includes(
					[LeaderBoardTabsEnum.Ranking, LeaderBoardTabsEnum.GamePoint],
					activeTab
				)
			) {
				getRankData({
					targetGameType:
						activeTab === LeaderBoardTabsEnum.GamePoint
							? LeaderBoardGameTypeEnum.Sports
							: LeaderBoardGameTypeEnum.All,
				})
			}
		}

		initTabData()
	}, [activeTab])

	const value: LeaderBoardContextInterface = {
		loading: debouncedLoading,
		rankList,
		activeTab,
		rewardData,
		newPeriodList,
		backgroundImg,
		activeRankTime,
		activeGameType,
		activePeriodId,
		formattedEndTime,
		LEADER_BOARD_TABS,
		LeaderBoardTabsEnum,
		LEADER_BOARD_RANK_NAV,
		LEADER_BOARD_GAME_POINT_NAV,
		onTabsChange,
		onRankTimeChange,
		onGameTypeChange,
		onPeriodIdChange,
		getFormattedUpdateTime,
		handleTermAndConditionClick,
	}

	return (
		<LeaderBoardContext.Provider value={value}>
			{children}
		</LeaderBoardContext.Provider>
	)
}

export { LeaderBoardProvider }
