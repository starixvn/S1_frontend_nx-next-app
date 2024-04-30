import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	clamp,
	divide,
	gte,
	toString,
	keys,
	find,
	reduce,
	values,
	flatMap,
	upperFirst,
} from 'lodash-es'
import {
	type ICupEventTicketData,
	type IGroupData,
	useGetCupEventTicketQuery,
	useSetUserPollTicketsMutation,
	useGetCupEventPredictionSettingQuery,
	ITeamData,
} from '@nx-next-app/service'
import { EUROPE_EVENT_AFTER_PREDICT } from '@nx-next-app/site/nova88'

// 每場比賽的參賽隊伍 [主, 客]
const MATCHES = {
	// Round of 16
	'Match 38': ['2A', '2B'],
	'Match 37': ['1A', '2C'],
	'Match 40': ['1C', '3D/E/F'],
	'Match 39': ['1B', '3A/D/E/F'],
	'Match 42': ['2D', '2E'],
	'Match 41': ['1F', '3A/B/C'],
	'Match 43': ['1E', '3A/B/C/D'],
	'Match 44': ['1D', '2F'],
	// Quarter-finals
	'Match 45': ['W39', 'W37'],
	'Match 46': ['W41', 'W42'],
	'Match 48': ['W40', 'W38'],
	'Match 47': ['W43', 'W44'],
	// Semi-finals
	'Match 49': ['W45', 'W46'],
	'Match 50': ['W47', 'W48'],
	// Final
	'Match 51': ['W49', 'W50'],
} as Record<string, [string, string]>

// 後端給的排序對應的隊伍
const SORT_NUMBERS = {
	ROUND_OF_16: {
		1: '1A',
		2: '2C',
		3: '1B',
		4: '3A/D/E/F',
		5: '2A',
		6: '2B',
		7: '1C',
		8: '3D/E/F',
	} as Record<number, string>,
	QUARTER_FINALS: {
		1: 'W39',
		2: 'W37',
		3: 'W40',
		4: 'W38',
		5: 'W41',
		6: 'W42',
		7: 'W43',
		8: 'W44',
	} as Record<number, string>,
	SEMI_FINALS: {
		1: 'W45',
		2: 'W48',
		3: 'W47',
		4: 'W46',
	} as Record<number, string>,
	FINAL: {
		1: 'W49',
		2: 'W50',
	} as Record<number, string>,
}
interface ITicketsData {
	ticket1: {
		group: string | number | undefined
		countryId: number | null
	}
	ticket2: {
		group: string | number | undefined
		countryId: number | null
	}
	ticket3: {
		group: string | number | undefined
		countryId: number | null
	}
	ticket4: {
		group: string | number | undefined
		countryId: number | null
	}
}

const useEuropeCup = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()
	const { modal, closeModal } = useGlobalModal()
	const {
		data: { data: europeEventTicketData = {} as ICupEventTicketData } = {},
		refetch: refetchCupEventTicket,
		isUninitialized: isEuropeEventTicketUninitialized,
	} = useGetCupEventTicketQuery(null, {
		skip: !isLogin,
		// 確保每次進來頁面都拉最新的資料
		refetchOnMountOrArgChange: true,
	})

	const cupEventPredictionSetting = useGetCupEventPredictionSettingQuery(
		{ langId },
		{ refetchOnMountOrArgChange: true }
	)

	const europeEventPredictionSettingData = cupEventPredictionSetting?.data?.data

	const schedule = {
		brackets: {} as Record<string, ITeamData & { position: string }>,
		roundOf16: [] as ITeamData[],
		quarterFinals: [] as ITeamData[],
		semiFinals: [] as ITeamData[],
		final: [] as ITeamData[],
		selectOptions: {} as {
			[key in
				| 'groupA'
				| 'groupB'
				| 'groupC'
				| 'groupD'
				| 'groupE'
				| 'groupF']: (ITeamData & { countryId: number })[]
		},
		matches: [] as {
			name: string
			time: Date
			teams: ITeamData[]
		}[],
	}

	if (europeEventPredictionSettingData) {
		const {
			roundOf16,
			quarterFinals,
			semiFinals,
			final,
			selectOptions,
			matchTimes,
		} = europeEventPredictionSettingData

		roundOf16.forEach(({ sort, ...data }) => {
			const position = SORT_NUMBERS.ROUND_OF_16[sort]
			if (!position) return
			schedule.brackets[position] = { position, ...data }
		})
		quarterFinals.forEach(({ sort, ...data }) => {
			const position = SORT_NUMBERS.QUARTER_FINALS[sort]
			if (!position) return
			schedule.brackets[position] = { position, ...data }
		})
		semiFinals.forEach(({ sort, ...data }) => {
			const position = SORT_NUMBERS.SEMI_FINALS[sort]
			if (!position) return
			schedule.brackets[position] = { position, ...data }
		})
		final.forEach(({ sort, ...data }) => {
			const position = SORT_NUMBERS.FINAL[sort]
			if (!position) return
			schedule.brackets[position] = { position, ...data }
		})
		schedule.selectOptions = selectOptions

		schedule.matches = matchTimes.map(({ matchName, matchTime }) => {
			const teams = MATCHES[matchName].map(
				position => schedule.brackets[position]
			)
			return { name: matchName, time: new Date(matchTime), teams }
		})
		schedule.matches.sort((a, b) => a.time.getTime() - b.time.getTime())
	}

	const [setUserPollTickets] = useSetUserPollTicketsMutation()

	const formMethods = useForm<ITicketsData>({ mode: 'onChange' })

	const {
		cupEventPromotionMissionProgress,
		promotionMission = [],
		selectOptions,
		userTicketResult,
		usedTickets,
		errorCode,
	} = europeEventTicketData || {}

	// * Deposit & Turnover 需要的資料及狀態
	const mission1 = find(promotionMission, { missionNo: 1 })?.depositAmount || 0
	const mission2 = find(promotionMission, { missionNo: 2 })?.depositAmount || 0
	const mission3 = find(promotionMission, { missionNo: 3 })?.turnoverAmount || 0
	const mission4 = find(promotionMission, { missionNo: 4 })?.turnoverAmount || 0

	const mission1Completed = gte(
		divide(cupEventPromotionMissionProgress?.depositAmount, mission1),
		1
	)
	const mission2Completed = gte(
		divide(cupEventPromotionMissionProgress?.depositAmount, mission2),
		1
	)
	const mission3Completed = gte(
		divide(cupEventPromotionMissionProgress?.turnoverSum, mission3),
		1
	)
	const mission4Completed = gte(
		divide(cupEventPromotionMissionProgress?.turnoverSum, mission4),
		1
	)

	const depositProgressPercentage = toString(
		clamp(
			divide(cupEventPromotionMissionProgress?.depositAmount, mission2),
			0,
			1
		) * 100
	)

	const turnoverProgressPercentage = toString(
		clamp(
			divide(cupEventPromotionMissionProgress?.turnoverSum, mission4),
			0,
			1
		) * 100
	)

	const isParticipate =
		isEventPeriod(EUROPE_EVENT_AFTER_PREDICT) && usedTickets > 0
	const isUnParticipate =
		isEventPeriod(EUROPE_EVENT_AFTER_PREDICT) && usedTickets === 0

	// * prediction 需要的資料及狀態
	const userCountryWithTicket1 = find(userTicketResult?.ticketList, {
		ticketType: 1,
	})
	const userCountryWithTicket2 = find(userTicketResult?.ticketList, {
		ticketType: 2,
	})
	const userCountryWithTicket3 = find(userTicketResult?.ticketList, {
		ticketType: 3,
	})
	const userCountryWithTicket4 = find(userTicketResult?.ticketList, {
		ticketType: 4,
	})

	const handleSubmitForm = async (
		ticketType: number,
		countryId: number | null
	) => {
		if (!countryId) return

		try {
			await setUserPollTickets([{ ticketType, countryId }]).unwrap()

			modal.info(t('Label_General_UpdateSuccessful'), {
				title: t('Label_General_UpdateSuccessful'),
				icon: 'icon icon-library',
			})
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onSelectedGroup = (groupName: string | number | undefined) => {
		if (!groupName) return
		return selectOptions[groupName]
	}

	const groupsOptions = keys(selectOptions).map(item => {
		// group 是 key 後端無法翻譯，需在前端套用 i18n
		const groupLabel = `Label_EuropeCup_${upperFirst(item)}`
		return {
			value: item,
			label: t(groupLabel),
		}
	})

	const userTicketData = reduce(
		selectOptions,
		(result, value, key) => {
			// group 是 key 後端無法翻譯，需在前端套用 i18n
			const groupLabel = `Label_EuropeCup_${upperFirst(key)}`
			const newData = value.map(group => ({ ...group, group: t(groupLabel) }))
			return { ...result, [key]: newData }
		},
		{}
	)

	const userTicketsList = flatMap(values(userTicketData))

	// ticket1
	const userTickets1PredictedData = find(userTicketsList, {
		countryId: userCountryWithTicket1?.countryId,
	}) as IGroupData & { group: string }

	const userTicket1tsData = {
		...userCountryWithTicket1,
		...(userTickets1PredictedData && userTickets1PredictedData),
	}

	// ticket2
	const userTickets2PredictedData = find(userTicketsList, {
		countryId: userCountryWithTicket2?.countryId,
	}) as IGroupData & { group: string }

	const userTicket2tsData = {
		...userCountryWithTicket2,
		...(userTickets2PredictedData && userTickets2PredictedData),
	}

	// ticket3
	const userTickets3PredictedData = find(userTicketsList, {
		countryId: userCountryWithTicket3?.countryId,
	}) as IGroupData & { group: string }

	const userTicket3tsData = {
		...userCountryWithTicket3,
		...(userTickets3PredictedData && userTickets3PredictedData),
	}

	// ticket4
	const userTickets4PredictedData = find(userTicketsList, {
		countryId: userCountryWithTicket4?.countryId,
	}) as IGroupData & { group: string }

	const userTicket4tsData = {
		...userCountryWithTicket4,
		...(userTickets4PredictedData && userTickets4PredictedData),
	}

	useEffect(() => {
		// 還未驗證手機跟信箱的狀態有跟後端 Doris 討論，先不接 message 出來，在前端寫死
		if (errorCode === 104) {
			modal.info(t('Label_EuropeCup_Verify_Email_Phone'), {
				onOK: () => closeModal(),
			})
		}
	}, [errorCode])

	// 切換語系重撈 (因為這支 payload 不帶 currencyId langId，沒有辦法自動重撈)
	useEffect(() => {
		if (!isEuropeEventTicketUninitialized) {
			refetchCupEventTicket()
		}
	}, [langId, isEuropeEventTicketUninitialized])

	return {
		europeEventTicketData,
		europeCupData: {
			mission1,
			mission2,
			mission3,
			mission4,
			groupsOptions,
		},
		userData: {
			depositProgressPercentage,
			turnoverProgressPercentage,
		},
		status: {
			mission1Completed,
			mission2Completed,
			mission3Completed,
			mission4Completed,
		},
		prediction: {
			data: {
				userTicket1tsData,
				userTicket2tsData,
				userTicket3tsData,
				userTicket4tsData,
				isParticipate,
				isUnParticipate,
			},
			formMethods,
			onSelectedGroup,
			onSubmitForm: handleSubmitForm,
		},
		schedule,
	}
}

export { useEuropeCup }
