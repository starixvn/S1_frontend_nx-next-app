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
} from '@nx-next-app/service'
import { EUROPE_EVENT_AFTER_PREDICT } from '@nx-next-app/site/nova88'

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
	} = useAuth()
	const { modal, closeModal } = useGlobalModal()
	const {
		data: { data: europeEventTicketData = {} as ICupEventTicketData } = {},
	} = useGetCupEventTicketQuery(null, {
		skip: !isLogin,
		// 確保每次進來頁面都拉最新的資料
		refetchOnMountOrArgChange: true,
	})

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
			const newData = value.map(group => ({ ...group, group: key }))

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
	}
}

export { useEuropeCup }
