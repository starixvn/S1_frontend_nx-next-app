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
