import { IStaticSlotTpGameType } from '@nx-next-app/types'

export const CATEGORY_SORT = [
	'random',
	'all',
	'mini',
	'recentlyPlayed',
	'new',
	'featured',
	'jackpot',
	'tableAndCards',
	'buyFeaturesGames',
	'megaways',
	'myFavorite',
]

// * 用於 casino, casino topQuickLink,  hot game
export const SLOT_TP_GAME_TYPE: IStaticSlotTpGameType = {
	SABA: {
		TP_ID: 41,
		TP_GAME_TYPE: 4,
		NAME: 'saba',
	},
	PP: { TP_ID: 5, TP_GAME_TYPE: 7, NAME: 'pragmatic-play' },
	GPI: { TP_ID: 6, TP_GAME_TYPE: 11, NAME: 'gpi' },
	JOKER: { TP_ID: 9, TP_GAME_TYPE: 13, NAME: 'joker' },
	YGG: { TP_ID: 8, TP_GAME_TYPE: 14, NAME: 'ygg' },
	AMB: { TP_ID: 30, TP_GAME_TYPE: 76, NAME: 'amb' },
	SG: { TP_ID: 10, TP_GAME_TYPE: 15, NAME: 'spadegaming' },
	PG: { TP_ID: 14, TP_GAME_TYPE: 17, NAME: 'pg' },
	CQ9: { TP_ID: 16, TP_GAME_TYPE: 29, NAME: 'cq9' },
	PT: { TP_ID: 27, TP_GAME_TYPE: 46, NAME: 'playtech' },
	JI_LI: { TP_ID: 32, TP_GAME_TYPE: 53, NAME: 'jili' },
	AP: { TP_ID: 39, TP_GAME_TYPE: 67, NAME: 'advant-play' },
	MG: { TP_ID: 34, TP_GAME_TYPE: 57, NAME: 'microgaming' },
	RedTiger: { TP_ID: 38, TP_GAME_TYPE: 65, NAME: 'red-tiger' },
	NetEnt: { TP_ID: 37, TP_GAME_TYPE: 64, NAME: 'netent' },
	SIMPLE_PLAY: { TP_ID: 44, TP_GAME_TYPE: 86, NAME: 'simple-play' },
	HA_BA_NERO: { TP_ID: 40, TP_GAME_TYPE: 68, NAME: 'habanero' },
	SKY_WIND: { TP_ID: 43, TP_GAME_TYPE: 82, NAME: 'skywind' },
}
