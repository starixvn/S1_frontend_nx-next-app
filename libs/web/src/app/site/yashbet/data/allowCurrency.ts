import { CurrenciesEnum, IStaticAllowedCurrencies } from '@nx-next-app/types'

const { INR, BDT } = CurrenciesEnum

export const ALLOWED_CURRENCIES: IStaticAllowedCurrencies = {
	VIP: [INR, BDT],
	AFFILIATE: [INR, BDT],
	EXCHANGE: [INR, BDT],
	REWARDS: [],
	LEADER_BOARD: [],
	APP_DOWNLOAD: [],

	TRANSFER: [INR, BDT],
	BANK_INFO: [INR, BDT],

	GAMES_MPOKER: [],

	JACKPOT: [],

	SPORTS_CRICKET: [INR, BDT],
	SPORTS_SABA_CLUB: [INR, BDT],
	SPORTS_VOLLEYBALL: [],

	LIVE_CASINO_WM: [INR, BDT],
	LIVE_CASINO_ALL_BET: [],

	SLOTS_AMB: [],
	SLOTS_SPRIBE: [INR],

	GAMES_POKER_M_POKER: [],
	GAMES_POKER_AMB_POKER: [],

	FISHING_SG: [INR, BDT],
	FISHING_CQ9_ONE_SHOT_FISHING: [INR, BDT],

	LOTTERY_GPI_THAILOTTERY: [],
	LUCKY_WHEEL: [],

	// === withdrawal method ===
	BANK_CARD: [INR, BDT],
	E_WALLET: [],

	// === Profile method ===
	ADDRESS: [],
	REFER_FRIENDS: [INR, BDT],
}
