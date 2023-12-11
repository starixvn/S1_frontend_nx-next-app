import { CurrenciesEnum } from '@nx-next-app/types'

export enum LeaderBoardTabsEnum {
	Event = 1,
	Ranking,
	GamePoint,
	Result,
}

export const LEADER_BOARD_TABS: {
	id: number
	displayKey: string
}[] = [
	{ id: LeaderBoardTabsEnum.Event, displayKey: 'Label_LeaderBoard_Event' },
	{ id: LeaderBoardTabsEnum.Ranking, displayKey: 'Label_LeaderBoard_Ranking' },
	{
		id: LeaderBoardTabsEnum.GamePoint,
		displayKey: 'Label_LeaderBoard_GamePoint',
	},
	{ id: LeaderBoardTabsEnum.Result, displayKey: 'Label_LeaderBoard_Result' },
]

export const LEADER_BOARD_REWARD_DATA: {
	[key: number]: {
		section1: {
			turnover: string
			point: string
			displayName: string
			img: string
		}[]
		section2: { rank: string; point: string; bonus: string }[]
	}
} = {
	[CurrenciesEnum.MYR]: {
		section1: [
			{
				turnover: '100',
				point: '1',
				displayName: 'Label_General_Sports',
				img: 'ball',
			},
			{
				turnover: '500',
				point: '1',
				displayName: 'Label_General_Slots',
				img: 'slot',
			},
			{
				turnover: '1000',
				point: '1',
				displayName: 'Label_General_LiveCasino',
				img: 'casino',
			},
		],
		section2: [
			{
				rank: 'Label_LeaderBoard_RankChampion',
				point: '30,000',
				bonus: '10,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank1',
				point: '25,000',
				bonus: '8,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank2',
				point: '18,000',
				bonus: '6,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank3',
				point: '15,000',
				bonus: '5,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank4',
				point: '12,000',
				bonus: '4,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank5',
				point: '10,000',
				bonus: '3,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank6',
				point: '9,000',
				bonus: '2,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank7',
				point: '8,000',
				bonus: '1,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank9_30',
				point: '5,000',
				bonus: '500',
			},
		],
	},
	[CurrenciesEnum.THB]: {
		section1: [
			{
				turnover: '800',
				point: '1',
				displayName: 'Label_General_Sports',
				img: 'ball',
			},
			{
				turnover: '4,000',
				point: '1',
				displayName: 'Label_General_Slots',
				img: 'slot',
			},
			{
				turnover: '8,000',
				point: '1',
				displayName: 'Label_General_LiveCasino',
				img: 'casino',
			},
		],
		section2: [
			{
				rank: 'Label_LeaderBoard_RankChampion',
				point: '30,000',
				bonus: '80,888',
			},
			{
				rank: 'Label_LeaderBoard_Rank1',
				point: '25,000',
				bonus: '65,388',
			},
			{
				rank: 'Label_LeaderBoard_Rank2',
				point: '18,000',
				bonus: '48,888',
			},
			{
				rank: 'Label_LeaderBoard_Rank3',
				point: '15,000',
				bonus: '40,888',
			},
			{
				rank: 'Label_LeaderBoard_Rank4',
				point: '12,000',
				bonus: '32,688',
			},
			{
				rank: 'Label_LeaderBoard_Rank5',
				point: '10,000',
				bonus: '24,588',
			},
			{
				rank: 'Label_LeaderBoard_Rank6',
				point: '9,000',
				bonus: '16,388',
			},
			{
				rank: 'Label_LeaderBoard_Rank7',
				point: '8,000',
				bonus: '8,188',
			},
			{
				rank: 'Label_LeaderBoard_Rank9_30',
				point: '5,000',
				bonus: '4,088',
			},
		],
	},
	[CurrenciesEnum.IDR]: {
		section1: [
			{
				turnover: '336,000',
				point: '1',
				displayName: 'Label_General_Sports',
				img: 'ball',
			},
			{
				turnover: '1,680,000',
				point: '1',
				displayName: 'Label_General_Slots',
				img: 'slot',
			},
			{
				turnover: '3,368,000',
				point: '1',
				displayName: 'Label_General_LiveCasino',
				img: 'casino',
			},
		],
		section2: [
			{
				rank: 'Label_LeaderBoard_RankChampion',
				point: '30,000',
				bonus: '33,680,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank1',
				point: '25,000',
				bonus: '26,940,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank2',
				point: '18,000',
				bonus: '20,210,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank3',
				point: '15,000',
				bonus: '16,840,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank4',
				point: '12,000',
				bonus: '13,470,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank5',
				point: '10,000',
				bonus: '10,100,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank6',
				point: '9,000',
				bonus: '6,730,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank7',
				point: '8,000',
				bonus: '3,360,000',
			},
			{
				rank: 'Label_LeaderBoard_Rank9_30',
				point: '5,000',
				bonus: '1,680,000',
			},
		],
	},
}

export enum LeaderBoardGameTypeEnum {
	All,
	Sports,
	Slots,
	Casino,
}

export const LEADER_BOARD_RANK_NUM: { [key: string]: number } = {
	current: 50,
	monthly: 30,
}
export const LEADER_BOARD_EVENT_CODE: Record<string, string> = {
	current: '2021051',
	monthly: '2021052',
}

export const LEADER_BOARD_MONTHS: { [key: number]: string } = {
	1: 'Label_General_Jan',
	2: 'Label_General_Feb',
	3: 'Label_General_Mar',
	4: 'Label_General_Apr',
	5: 'Label_General_May',
	6: 'Label_General_Jun',
	7: 'Label_General_Jul',
	8: 'Label_General_Aug',
	9: 'Label_General_Sep',
	10: 'Label_General_Otc',
	11: 'Label_General_Nov',
	12: 'Label_General_Dec',
}

export enum LeaderBoardDayEnum {
	Today,
	Yesterday,
	LastTowDay,
	LstThreeDay,
}

export const LEADER_BOARD_RANK_NAV: { id: number; displayKey: string }[] = [
	{ id: LeaderBoardDayEnum.Today, displayKey: 'Label_LeaderBoard_Today' },
	{
		id: LeaderBoardDayEnum.Yesterday,
		displayKey: 'Label_LeaderBoard_Yesterday',
	},
	{
		id: LeaderBoardDayEnum.LastTowDay,
		displayKey: 'Label_LeaderBoard_2Days_Ago',
	},
	{
		id: LeaderBoardDayEnum.LstThreeDay,
		displayKey: 'Label_LeaderBoard_3Days_Ago',
	},
]

export const LEADER_BOARD_GAME_POINT_NAV: {
	id: number
	displayKey: string
	imgName: string
}[] = [
	{
		id: LeaderBoardGameTypeEnum.Sports,
		displayKey: 'Label_General_Sports',
		imgName: 'ranking_new_sportsbg.jpg',
	},
	{
		id: LeaderBoardGameTypeEnum.Casino,
		displayKey: 'Label_General_LiveCasino',
		imgName: 'ranking_page_bg_casino.jpg',
	},
	{
		id: LeaderBoardGameTypeEnum.Slots,
		displayKey: 'Label_General_Slots',
		imgName: 'ranking_page_bg_slot.jpg',
	},
]
