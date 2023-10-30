import { CurrenciesEnum, IStaticAllowedCurrencies } from '@nx-next-app/types'

const { INR } = CurrenciesEnum

export const ALLOWED_CURRENCIES: IStaticAllowedCurrencies = {
	VIP: [],
	AFFILIATE: [],
	EXCHANGE: [INR],
	REWARDS: [],
	LEADER_BOARD: [],
	APP_DOWNLOAD: [],

	TRANSFER: [INR],
	BANK_INFO: [INR],

	GAMES_MPOKER: [],

	JACKPOT: [],

	SPORTS_CRICKET: [INR],
	SPORTS_SABA_CLUB: [INR],
	SPORTS_VOLLEYBALL: [],

	LIVE_CASINO_WM: [INR],
	LIVE_CASINO_ALL_BET: [],

	SLOTS_AMB: [],

	GAMES_POKER_M_POKER: [],
	GAMES_POKER_AMB_POKER: [],

	FISHING_SG: [INR],
	FISHING_CQ9_ONE_SHOT_FISHING: [INR],

	LOTTERY_GPI_THAILOTTERY: [],
	LUCKY_WHEEL: [],

	// === withdrawal method ===
	BANK_CARD: [INR],
	E_WALLET: [],

	// === Profile method ===
	ADDRESS: [],
	REFER_FRIENDS: [],
}
