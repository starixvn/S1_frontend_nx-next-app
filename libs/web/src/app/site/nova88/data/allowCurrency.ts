import { CurrenciesEnum, IStaticAllowedCurrencies } from '@nx-next-app/types'

const { MYR, USD, THB, CNY, IDR, INR, KHM, BDT } = CurrenciesEnum

export const ALLOWED_CURRENCIES: IStaticAllowedCurrencies = {
	VIP: [MYR, THB, IDR],
	AFFILIATE: [MYR, THB, IDR, CNY, BDT, USD, INR],
	EXCHANGE: [INR, BDT],
	WORLD_CIP: [MYR, THB, IDR, INR],
	REWARDS: [MYR, THB, IDR],

	WITHDRAWAL_METHOD: {
		BANK_CARD: [MYR, THB, IDR, INR, KHM],
		E_WALLET: [IDR, BDT, MYR, THB],
	},

	PRODUCTS: {
		SLOT_AMB: [THB, USD, CNY, KHM],
		SLOT_WM: [MYR, USD, THB, CNY, IDR, INR, KHM],
		GAME_M_POKER: [THB],
		GAME_AMB: [THB],
		GAME_V_GAMING: [MYR, IDR, THB, BDT, CNY, USD, KHM, INR],
		FISHING_GOD: [INR],
		FISHING_ONT_SHOT: [INR],
		FISHING_THAI_LOTTERY: [THB],
	},
}
